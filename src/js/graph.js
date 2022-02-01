import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import * as startup from './lib/_startup';
import { getApiAsync } from './lib/_utiltity';
import { _config } from './lib/_config';
import { getCurrentUser } from './lib/_cognito';
import { ChartDate } from './lib/_graph_date';
import { ChartMonth } from './lib/_graph_month';

//------------------------------------------------------------------//

$(() => {
  startup.init();
});

$(window).on('_ready', () => {
  const username = getCurrentUser().username;
  isExistInterviewStartedAt(username);

  const btnChartDate = $('#btnChartDate');
  const btnChartMonth = $('#btnChartMonth');

  let chart = new ChartDate();
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

// 日グラフボタン
const onBtnChartDate = () => {
  let chart = new ChartDate();
  chart.setPaginationEnable(false);
  chart.createCardComponent();
};

// 月グラフボタン
const onBtnChartMonth = () => {
  let chart = new ChartMonth();
  chart.createCardComponent();
};

// 面談開始日が登録されているか
const isExistInterviewStartedAt = async (username) => {
  let results;
  const url = _config.api.getUser;
  const json = {
    username: username,
  };
  await getApiAsync(url, json).then((x) => (results = x.results));

  if (!results[0].interview_started_at) {
    $('#lblWarning').show();
  }
};
