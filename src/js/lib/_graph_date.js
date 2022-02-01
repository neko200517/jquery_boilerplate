import $ from './_jquery-with-plugins';
import { getApiAsync, loading } from './_utiltity';
import { _config } from './_config';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { ChartBase } from './_graph_base';

//------------------------------------------------------------------//

// 日グラフ
export class ChartDate extends ChartBase {
  currentDate;

  // コンストラクタ
  constructor() {
    super();

    $('.date-wrapper').show();

    this.currentDate = dayjs();
    this.refresh(false);

    $('#btnPrev').on('click', () => {
      this.onPrev();
    });

    $('#btnNext').on('click', () => {
      this.onNext();
    });
  }

  // 再描画
  refresh = async (isRereshChart = true) => {
    if (this.currentDate.isAfter(dayjs())) {
      this.currentDate = dayjs();
    }
    const dtStart = dayjs(this.currentDate).add(this.addDate + 1, 'days');
    const dtEnd = dayjs(this.currentDate);

    const disabled = dtEnd.isSame(dayjs(), 'day');
    $('#btnNext').prop('disabled', disabled);
    if (disabled) {
      $('#btnNext').removeClass('btn-primary');
      $('#btnNext').addClass('btn-secondary');
    } else {
      $('#btnNext').removeClass('btn-secondary');
      $('#btnNext').addClass('btn-primary');
    }

    $('#lblDateTime').text(
      `${dtStart.format('MM/DD')} - ${dtEnd.format('MM/DD')}`
    );

    if (isRereshChart) {
      loading.show();
      await this.refreshChart(this.username, this.addDate);
      loading.hide();
    }
  };

  // 前のページ
  onPrev = () => {
    this.currentDate = this.currentDate.add(this.addDate, 'days');
    this.refresh();
  };

  // 次のページ
  onNext = () => {
    this.currentDate = this.currentDate.add(-1 * this.addDate, 'days');
    this.refresh();
  };

  // チャートの更新
  async refreshChart(username, index) {
    const data = await this.getData(username, index);
    const lblWeeks = data.lblWeeks;

    const dataWeight = data.dataWeight;
    const dataBp1 = data.dataBp1;
    const dataBp2 = data.dataBp2;
    const dataBp3 = data.dataBp3;
    const dataBp4 = data.dataBp4;
    const dataStep = data.dataStep;
    const scaleWeight = this.getScales([dataWeight]);
    const scaleBp = this.getScales([dataBp1, dataBp2, dataBp3, dataBp4]);

    this.chartWeight.data.labels = lblWeeks;
    this.chartWeight.data.datasets[0].data = dataWeight;
    this.chartWeight.options.scales = scaleWeight;
    this.chartWeight.update();

    this.chartBp.data.labels = lblWeeks;
    let dataBp1s = [];
    let dataBp2s = [];
    for (let i = 0; i < dataBp1.length; i++) {
      dataBp1s.push([dataBp1[i], dataBp2[i]]);
      dataBp2s.push([dataBp3[i], dataBp4[i]]);
    }
    this.chartBp.data.datasets[0].data = dataBp1s;
    this.chartBp.data.datasets[1].data = dataBp2s;
    this.chartBp.options.scales = scaleBp;
    this.chartBp.update();

    this.chartStep.data.labels = lblWeeks;
    this.chartStep.data.datasets[0].data = dataStep;
    this.chartStep.update();
  }

  // データの用意
  async getData(username, value, tag = null) {
    value = this.addDate;

    let obj = null;
    const url = _config.api.getGraphDate;
    const json = {
      username: username,
      addDate: value,
      condition_date: this.currentDate.format('YYYYMMDD'),
    };
    await getApiAsync(url, json).then((x) => (obj = x));

    let lblWeeks = [];
    let dataWeight = [];
    let dataBp1 = [];
    let dataBp2 = [];
    let dataBp3 = [];
    let dataBp4 = [];
    let dataStep = [];

    let dt = this.currentDate ? dayjs(this.currentDate) : dayjs();
    dt = dt.add(value + 1, 'days');

    const defaultValue = null;
    for (let i = 0; i < Math.abs(value); i++) {
      const format_date = dt.format('YYYYMMDD');
      const x = obj.results.find((x) => x.condition_date == format_date);
      if (x) {
        dataWeight.push(x.weight ? x.weight : defaultValue);
        dataBp1.push(x.bp1 ? x.bp1 : defaultValue);
        dataBp2.push(x.bp2 ? x.bp2 : defaultValue);
        dataBp3.push(x.bp3 ? x.bp3 : defaultValue);
        dataBp4.push(x.bp4 ? x.bp4 : defaultValue);
        dataStep.push(x.step ? x.step : defaultValue);
      } else {
        dataWeight.push(defaultValue);
        dataBp1.push(defaultValue);
        dataBp2.push(defaultValue);
        dataBp3.push(defaultValue);
        dataBp4.push(defaultValue);
        dataStep.push(defaultValue);
      }

      const lblWeekTexts = ['日', '月', '火', '水', '木', '金', '土'];
      const label = lblWeekTexts[dt.day()];
      lblWeeks.push(label);

      dt = dt.add(1, 'days');
    }
    return {
      lblWeeks: lblWeeks,
      dataWeight: dataWeight,
      dataBp1: dataBp1,
      dataBp2: dataBp2,
      dataBp3: dataBp3,
      dataBp4: dataBp4,
      dataStep: dataStep,
    };
  }
}
