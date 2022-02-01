import $ from './_jquery-with-plugins';
import { getApiAsync, loading } from './_utiltity';
import { _config } from './_config';
import { Chart, registerables } from 'chart.js';
import { getCurrentUser } from './_cognito';

//------------------------------------------------------------------//

export class ChartBase {
  // チャートインスタンス
  chartWeight;
  chartBp;
  chartStep;

  // デフォルト値
  addDate = -14;
  chartMaxValue = 30;
  username = getCurrentUser().username;

  // チャートの設定
  chart = {
    weight: {
      label: '体重',
      color: '#38b48b',
      type: 'line',
    },
    bp1: {
      label: '朝',
      color: '#e9546b',
      type: 'bar',
    },
    bp2: {
      label: '夜',
      color: '#2ca9e1',
      type: 'bar',
    },
    step: {
      label: '歩数',
      color: '#f39800',
      type: 'bar',
    },
  };

  // コンポーネントの設定
  compornents = [
    {
      tag: 'weight',
      label: '体重',
      subLabel: '',
      paginationEnable: true,
      paginationMaxValue: 1,
    },
    {
      tag: 'bp',
      label: '血圧',
      subLabel: '',
      paginationEnable: true,
      paginationMaxValue: 1,
    },
    {
      tag: 'step',
      label: '歩数',
      subLabel: '',
      paginationEnable: true,
      paginationMaxValue: 1,
    },
  ];

  // 初期化
  constructor() {
    Chart.register(...registerables);
    Chart.defaults.font.size = 13;
    Chart.defaults.font.weight = 600;
  }

  // 一括でページネーションの有効/無効化
  setPaginationEnable(value) {
    this.compornents.forEach((x) => {
      x.paginationEnable = value;
    });
  }

  // コンポーネントの作成
  async createCardComponent() {
    loading.show();
    // データの最大数を算出
    let maxValue = 1;
    await this.getPaginationMaxLength(this.username).then(
      (x) => (maxValue = x)
    );

    this.compornents.forEach((x) => {
      x.paginationMaxValue = maxValue;
    });

    // メインコンポーネントの追加
    this.compornents.forEach((x) => {
      const canvalId = `chart-${x.tag}`;
      const navPgId = `nav-pg-${x.tag}`;
      const html = `
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between" style="height: 48px">
            <div class="card-title-left mt-1">
              <h5 class="display-6">${x.label}
                <small style="font-size: 1rem">
                    <label>${x.subLabel}</label>
                </small>
              </h5>
            </div>
            <div class="card-title-right">
              <nav aria-label="Page navigation" id="${navPgId}"></nav>
            </div>
          </div>
          <canvas id="${canvalId}"></canvas>
        </div>
      `;
      const id = `#card-${x.tag}`;
      $(id).empty();
      $(id).append(html);

      // ページネーションの追加
      // 固定幅、数値は現在のページ位置を表すだけにする
      if (x.paginationEnable && x.paginationMaxValue >= 1) {
        const navPgHtml = `
          <ul class="pagination" id="pg-${x.tag}">
              <li class="page-item">
                <button class="page-link" aria-label="Previous" id="pg-prev-${x.tag}">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li class="page-item"><a class="page-link" id="pg-current-${x.tag}"></a></li>
              <li class="page-item">
                <button class="page-link" aria-label="Next" id="pg-next-${x.tag}">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          `;
        $(`#${navPgId}`).empty();
        if (maxValue > 1) {
          $(`#${navPgId}`).append(navPgHtml);
        }

        // 初期化
        const pgPrev = $(`#pg-prev-${x.tag}`);
        const pgNext = $(`#pg-next-${x.tag}`);

        this.setCurrentPage(x.tag, 1);

        pgNext.on('click', () => {
          this.onPgNext(x.tag);
        });

        pgPrev.on('click', () => {
          this.onPgPrev(x.tag);
        });

        this.refreshPagination(x.tag, false);
      }
    });

    // チャートの初期化
    const index = 0;
    this.initChart(this.username, index);
  }

  // 現在のページを取得
  getCurrentPage(tag) {
    const pgCurrent = $(`#pg-current-${tag}`);
    return Number(pgCurrent.text());
  }

  // 現在のページを取得
  setCurrentPage(tag, value) {
    const pgCurrent = $(`#pg-current-${tag}`);
    pgCurrent.text(value);
  }

  // ページネーション_更新
  refreshPagination(tag, isRefreshChart = true) {
    const pgPrev = $(`#pg-prev-${tag}`);
    const pgNext = $(`#pg-next-${tag}`);
    const currentPage = this.getCurrentPage(tag);

    const target = this.compornents.find((x) => x.tag == tag);
    const max = target.paginationMaxValue;

    if (max <= currentPage) {
      pgNext.addClass('text-black-50');
      pgNext.prop('disabled', true);
    } else {
      pgNext.removeClass('text-black-50');
      pgNext.prop('disabled', false);
    }

    if (currentPage <= 1) {
      pgPrev.prop('disabled', true);
      pgPrev.addClass('text-black-50');
    } else {
      pgPrev.prop('disabled', false);
      pgPrev.removeClass('text-black-50');
    }

    if (isRefreshChart) {
      switch (tag) {
        case 'weight':
          this.refreshChart_weight(this.username, currentPage - 1);
          break;
        case 'bp':
          this.refreshChart_bp1(this.username, currentPage - 1);
          break;
        default:
          this.refreshChart_step(this.username, currentPage - 1);
          break;
      }
    }
  }

  // 前のページ
  onPgPrev(tag) {
    let currentPage = this.getCurrentPage(tag);
    currentPage -= 1;
    this.setCurrentPage(tag, currentPage);
    this.refreshPagination(tag);
  }

  // 次のページ
  onPgNext(tag) {
    let currentPage = this.getCurrentPage(tag);
    currentPage += 1;
    this.setCurrentPage(tag, currentPage);
    this.refreshPagination(tag);
  }

  // チャートの初期化
  async initChart(username, index) {
    const data = await this.getData(username, index);
    const lblWeeks = data.lblWeeks;
    const dataWeight = data.dataWeight;
    const dataBp1 = data.dataBp1;
    const dataBp2 = data.dataBp2;
    const dataBp3 = data.dataBp3;
    const dataBp4 = data.dataBp4;
    const dataStep = data.dataStep;

    const dataSetWeights = {
      labels: lblWeeks,
      datasets: [
        {
          label: this.chart.weight.label,
          backgroundColor: this.chart.weight.color,
          borderColor: this.chart.weight.color,
          data: dataWeight,
        },
      ],
    };

    let dataBp1s = [];
    let dataBp2s = [];
    for (let i = 0; i < dataBp1.length; i++) {
      dataBp1s.push([dataBp1[i], dataBp2[i]]);
      dataBp2s.push([dataBp3[i], dataBp4[i]]);
    }
    const dataBp = {
      labels: lblWeeks,
      datasets: [
        {
          label: this.chart.bp1.label,
          data: dataBp1s,
          backgroundColor: this.chart.bp1.color,
        },
        {
          label: this.chart.bp2.label,
          data: dataBp2s,
          backgroundColor: this.chart.bp2.color,
        },
      ],
    };

    const dataSetSteps = {
      labels: lblWeeks,
      datasets: [
        {
          label: this.chart.step.label,
          backgroundColor: this.chart.step.color,
          borderColor: this.chart.step.color,
          data: dataStep,
        },
      ],
    };

    const scaleWeight = this.getScales([dataWeight]);
    const configWeight = {
      type: this.chart.weight.type,
      data: dataSetWeights,
      options: {
        plugins: {
          legend: {
            display: false,
          },
          responsive: true,
        },
        scales: scaleWeight,
      },
    };

    const scaleBp = this.getScales([dataBp1, dataBp2, dataBp3, dataBp4]);
    const configBp = {
      type: this.chart.bp1.type,
      data: dataBp,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        scales: scaleBp,
      },
    };

    const configStep = {
      type: this.chart.step.type,
      data: dataSetSteps,
      options: {
        plugins: {
          legend: {
            display: false,
          },
          responsive: true,
        },
      },
    };

    this.chartWeight = new Chart($('#chart-weight'), configWeight);
    this.chartBp = new Chart($('#chart-bp'), configBp);
    this.chartStep = new Chart($('#chart-step'), configStep);

    loading.hide();
  }

  // 配列の平均値
  getAverage(arr) {
    const total = arr.reduce((a, b) => a + b);
    return total / arr.length;
  }

  // 配列の最大値
  getMax(arr) {
    return arr.reduce((a, b) => (a > b ? a : b));
  }

  // 配列の最小値
  getMin(arr) {
    // return arr.reduce((a, b) => (a < b ? a : b));
    let new_arr = [];
    arr.forEach((x) => {
      if (x) {
        new_arr.push(x);
      }
    });
    let min = new_arr[0];
    new_arr.forEach((x) => {
      if (x < min) {
        min = x;
      }
    });
    return min;
  }

  // グラフのy軸スケールを取得する
  getScales(datas) {
    const padding = 10;

    let maxs = [];
    datas.forEach((x) => {
      maxs.push(this.getMax(x));
    });
    let max = this.getMax(maxs);
    let yMax = Math.round((max + padding) / 10) * 10;

    let mins = [];
    datas.forEach((x) => {
      mins.push(this.getMin(x));
    });
    let min = this.getMin(mins);
    let yMin = Math.round((min - padding) / 10) * 10;

    let isEnabled = false;
    for (let i = 0; i < datas.length; i++) {
      for (let j = 0; j < datas[i].length; j++) {
        if (datas[i][j]) {
          isEnabled = true;
          break;
        }
      }
    }

    let scales = {};
    if (isEnabled) {
      scales = {
        y: {
          max: yMax,
          min: yMin,
        },
      };
    }
    return scales;
  }

  // チャートの更新
  async refreshChart(username, index) {
    //
  }

  // チャートの更新_体重
  async refreshChart_weight(username, index) {
    const data = await this.getData(username, index, 'weight');
    const lblWeeks = data.lblWeeks;
    const dataWeight = data.dataWeight;
    const scaleWeight = this.getScales([dataWeight]);
    this.chartWeight.data.labels = lblWeeks;
    this.chartWeight.data.datasets[0].data = dataWeight;
    this.chartWeight.options.scales = scaleWeight;
    this.chartWeight.update();
  }

  // チャートの更新_血圧１
  async refreshChart_bp1(username, index) {
    const data = await this.getData(username, index, 'bp');
    const lblWeeks = data.lblWeeks;
    const dataBp1 = data.dataBp1;
    const dataBp2 = data.dataBp2;
    const dataBp3 = data.dataBp3;
    const dataBp4 = data.dataBp4;
    const scaleBp = this.getScales([dataBp1, dataBp2, dataBp3, dataBp4]);
    let dataBp1s = [];
    let dataBp2s = [];
    for (let i = 0; i < dataBp1.length; i++) {
      dataBp1s.push([dataBp1[i], dataBp2[i]]);
      dataBp2s.push([dataBp3[i], dataBp4[i]]);
    }
    this.chartBp.data.labels = lblWeeks;
    this.chartBp.data.datasets[0].data = dataBp1s;
    this.chartBp.data.datasets[1].data = dataBp2s;
    this.chartBp.options.scales = scaleBp;
    this.chartBp.update();
  }

  // チャートの更新_歩数
  async refreshChart_step(username, index) {
    const data = await this.getData(username, index, 'step');
    const lblWeeks = data.lblWeeks;
    const dataStep = data.dataStep;
    this.chartStep.data.labels = lblWeeks;
    this.chartStep.data.datasets[0].data = dataStep;
    this.chartStep.update();
  }

  // データの用意
  async getData(username, index, tag = null) {
    // override
  }

  // ページネーションの最大ページ数を求める
  async getPaginationMaxLength(username) {
    let results = null;
    const url = _config.api.getUser;
    const json = {
      username: username,
    };
    await getApiAsync(url, json).then((x) => (results = x.results));

    // 面談開始日から現在の経過日 / 8 で最大週を求める
    const dt1 = results[0].interview_started_at
      ? new Date(results[0].interview_started_at)
      : new Date();
    const dt2 = new Date();
    const diffDate = Math.floor((dt2 - dt1) / 86400000);
    const count = Math.ceil(diffDate / 8);
    const maxPage = Math.ceil(count / this.chartMaxValue);

    // this.chartMaxValueの余り
    return new Promise((resolve) => {
      resolve(maxPage);
    });
  }
}
