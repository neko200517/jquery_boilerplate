import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import * as startup from './lib/_startup';
import {
  flash,
  getApiAsync,
  getParam,
  isNull,
  loading,
  postApiAsync,
  translation,
} from './lib/_utiltity';
import { _config } from './lib/_config';
import { _localStorage } from './lib/_localStorage';
import { _sessionStorage } from './lib/_sessionStorage';
import { getCurrentUser } from './lib/_cognito';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

//------------------------------------------------------------------//

// コントロール_宣言
const _controls = {
  lblDateTime: $('#lblDateTime'),
  btnPrev: $('#btnPrev'),
  btnNext: $('#btnNext'),
  cardConditions: $('#cardConditions'),
  btnGraph: $('#btnGraph'),
};

// 宣言
let _currentDate;
const _username = getCurrentUser().username;

//------------------------------------------------------------------//

$(() => {
  startup.init();
});

$(window).on('_ready', () => {
  $(window).trigger('_refresh');

  // 日付(YYYYMMDD)の保存
  // todo:5 ホーム画面の表示日時は本日を基本にする
  let fdate = getParam('date');
  if (!fdate) {
    const fnow = dayjs().format('YYYYMMDD');
    fdate = fnow;
  }
  _currentDate = toDate(fdate);

  // イベントリスナーの付加
  _controls.btnPrev.on('click', () => {
    refresh(-1);
  });
  _controls.btnNext.on('click', () => {
    refresh(1);
  });

  refresh(0);
});

// YYYYMMDD形式の文字列をを日付型に変換
const toDate = (fdate) => {
  const date = `${fdate.substr(0, 4)}-${fdate.substr(4, 2)}-${fdate.substr(
    6,
    2
  )}`;
  return dayjs(new Date(date));
};

// 再描画
const refresh = (value) => {
  // 日付を加算（減算）
  _currentDate = _currentDate.add(value, 'days');
  _controls.lblDateTime.text(_currentDate.format('YYYY年MM月DD日'));
  const fdate = _currentDate.format('YYYYMMDD');

  // 日付変更のイベント発動
  _config.currentFormatDate = fdate;
  $(window).trigger('_refresh');

  // todo:1 未来の入力は不可
  const fnow = dayjs().format('YYYYMMDD');
  _controls.btnNext.prop('disabled', fnow == fdate);
  if (fnow == fdate) {
    _controls.btnNext.removeClass('btn-primary');
    _controls.btnNext.addClass('btn-secondary');
  } else {
    _controls.btnNext.removeClass('btn-secondary');
    _controls.btnNext.addClass('btn-primary');
  }

  // カードの更新
  refreshCard(_username, fdate);
};

// カードを更新
const refreshCard = async (username, date) => {
  loading.show();
  let obj = null;
  const url = _config.api.getCondition;
  const json = {
    username: username,
    startDate: date,
    endDate: date,
  };
  await getApiAsync(url, json).then((x) => (obj = x.results[0]));

  const con = {
    weight: obj ? obj.weight : null,
    bp1: obj ? obj.bp1 : null,
    bp2: obj ? obj.bp2 : null,
    bp3: obj ? obj.bp3 : null,
    bp4: obj ? obj.bp4 : null,
    step: obj ? obj.step : null,
  };

  const fdate = _currentDate.format('YYYYMMDD');

  const defs = [
    {
      id: 'lblWeight',
      data: con.weight,
      unit: `<span class="home-item-unit-big">Kg</span>`,
      href: `input.html?type=weight&date=${fdate}`,
      icon: `<i class="fas fa-weight"></i>`,
      title: `体重`,
      subtitle: ``,
      type: 'card-weight',
    },
    {
      id: 'lblBp1',
      data: con.bp1,
      unit: `<span class="home-item-unit-sm">mmHg</span>`,
      href: `input.html?type=bp1&date=${fdate}`,
      icon: `<i class="fas fa-sun"></i>`,
      title: `<span class="home-item-morning">朝 : </span>`,
      subtitle: `<span class="home-item-high">最高血圧</span>`,
      type: 'card-bp1',
    },
    {
      id: 'lblBp2',
      data: con.bp2,
      unit: `<span class="home-item-unit-sm">mmHg</span>`,
      href: `input.html?type=bp2&date=${fdate}`,
      icon: `<i class="fas fa-sun"></i>`,
      title: `<span class="home-item-morning">朝 : </span>`,
      subtitle: `<span class="home-item-low">最低血圧</span>`,
      type: 'card-bp2',
    },
    {
      id: 'lblBp3',
      data: con.bp3,
      unit: `<span class="home-item-unit-sm">mmHg</span>`,
      href: `input.html?type=bp3&date=${fdate}`,
      icon: `<i class="fas fa-moon"></i>`,
      title: `<span class="home-item-night">夜 : </span>`,
      subtitle: `<span class="home-item-high">最高血圧</span>`,
      type: 'card-bp3',
    },
    {
      id: 'lblBp4',
      data: con.bp4,
      unit: `<span class="home-item-unit-sm">mmHg</span>`,
      href: `input.html?type=bp4&date=${fdate}`,
      icon: `<i class="fas fa-moon"></i>`,
      title: `<span class="home-item-night">夜 : </span>`,
      subtitle: `<span class="home-item-high">最低血圧</span>`,
      type: 'card-bp4',
    },
    {
      id: 'lblStep',
      data: con.step,
      unit: `<span class="home-item-unit-big">歩</span>`,
      href: `input.html?type=step&date=${fdate}`,
      icon: `<i class="fas fa-walking"></i>`,
      title: '歩数',
      subtitle: '',
      type: 'card-step',
    },
  ];
  _controls.cardConditions.empty();
  defs.forEach((x) => {
    const html = `
                    <a href="${x.href}" class="btn card mb-2 ${x.type}">
                      <div class="d-flex align-items-center justify-content-start home-item-card">
                        <label class="col-6 home-item-title">
                          ${x.title}
                          <span class="home-item-subtitle">
                            ${x.subtitle}
                          </span>
                        </label>
                        <label class="col-4 home-item-data" id="${x.id}"></label>
                        <label class="col-2">
                          ${x.unit}
                        </label>
                      </div>
                    </a>
                    `;
    _controls.cardConditions.append(html);
    if (!isNull(x.data)) {
      $(`#${x.id}`).text(`${x.data.toLocaleString()}`);
      $(`#${x.id}`).addClass('text-success');
    } else {
      $(`#${x.id}`).text(`---`);
      $(`#${x.id}`).addClass('home-item-text-mute');
    }
  });

  drawRefresh();

  loading.hide();
};

// ウィンドウ_解像度変更
$(window).on('resize', () => {
  drawRefresh();
});

const drawRefresh = () => {
  let height = (document.documentElement.clientHeight - 500) / 5 + 10;
  height = height > 75 ? 75 : height;
  $('.home-item-card').css('height', height);
};
