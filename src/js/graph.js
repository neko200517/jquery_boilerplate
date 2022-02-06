import $ from './lib/_jquery-with-plugins';
import 'bootstrap';
import '../css/style.scss';
import '../css/_style-staff.scss';
import startup from './lib/_startup';
import * as util from './lib/_utiltity';
import AppConfig from './lib/_config';
import ChartDate from './lib/_graph_date';
import ChartMonth from './lib/_graph_month';

//------------------------------------------------------------------//

$(() => {
  startup();
});

$(window).on('_ready', () => {
  const username = getUserName();
  isExistInterviewStartedAt(username);

  const btnChartDate = $('#btnChartDate');
  const btnChartMonth = $('#btnChartMonth');

  let chart = new ChartDate(username);
  chart.setPaginationEnable(false);
  chart.createCardComponent();

  btnChartDate.on('click', () => {
    btnChartMonth.removeClass('active');
    btnChartDate.addClass('active');
    onBtnChartDate();
  });
  btnChartMonth.on('click', () => {
    btnChartDate.removeClass('active');
    btnChartMonth.addClass('active');
    onBtnChartMonth();
  });
});

// ユーザー名の取得
const getUserName = () => {
  return util.getParam('username');
};

// 日グラフボタン
const onBtnChartDate = () => {
  const username = getUserName();
  let chart = new ChartDate(username);
  chart.setPaginationEnable(false);
  chart.createCardComponent();
};

// 月グラフボタン
const onBtnChartMonth = () => {
  const username = getUserName();
  let chart = new ChartMonth(username);
  chart.createCardComponent();
};

// 面談開始日が登録されているか
const isExistInterviewStartedAt = async (username) => {
  let results;
  const url = AppConfig.api.getUser;
  const json = {
    username: username,
  };
  await util.getApiAsync(url, json).then((x) => (results = x.results));

  if (!results[0].interview_started_at) {
    $('#lblWarning').show();
  }
};
