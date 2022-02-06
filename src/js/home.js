import $ from './lib/_jquery-with-plugins';
import 'bootstrap';
import { Modal } from 'bootstrap';
import '../css/style.scss';

import * as util from './lib/_utiltity';
import startup from './lib/_startup';
import AppConfig from './lib/_config';
import AppSessionStorage from './lib/_sessionStorage';
import CSV from './lib/_csv';
import { getCurrentUser } from './lib/_cognito';

import 'bootstrap-table';
import 'bootstrap-table/dist/bootstrap-table.min.css';
import 'bootstrap-table/dist/locale/bootstrap-table-ja-JP';

import 'bootstrap-datepicker';
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.ja.min.js';

import dayjs from 'dayjs';
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

//------------------------------------------------------------------//

const DEBUG = false;

// コントロール_宣言
const _controls = {
  txtSearch: $('#txtSearch'),
  userTable: $('#userTable'),
  btnSearch: $('#btnSearch'),
  modalEdit: new Modal('#modalEdit'),
  modalEditDtpDate: $('#modalEditDtpDate'),
  txtModalEditUserName: $('#txtModalEditUserName'),
  txtModalEditInterviewStartedAt: $('#txtModalEditInterviewStartedAt'),
  btnModalEditOk: $('#btnModalEditOk'),
  btnExportCSV: $('#btnExportCSV'),
};

// テーブルの1ページサイズ
let _pageSizes = [];

// テーブルの最大サイズ
const MAX_PAGESIZE = 10;

// CSVのヘッダ
const CSV_HEADER = [
  '利用者ID',
  '日付',
  '面談開始日',
  '更新日時',
  '体重',
  '朝：最高血圧',
  '朝：最低血圧',
  '夜：最高血圧',
  '夜：最低血圧',
  '歩数',
];

//------------------------------------------------------------------//

$(() => {
  startup();
});

// 初期化
$(window).on('_ready', () => {
  initPageSizes();
  initTable();

  // 検索ボタン_押下
  _controls.btnSearch.on('click', (e) => {
    e.preventDefault();
    onSearch();
  });

  // テーブル_編集ボタン
  _controls.userTable.on('click', '.btnEdit', (e) => {
    onBtnEdit(e);
  });

  // テーブル_グラフボタン
  _controls.userTable.on('click', '.btnChart', (e) => {
    onBtnCahrt(e);
  });

  // モーダル_日付変更ボタン
  _controls.modalEditDtpDate.datepicker({
    format: 'yyyy/mm/dd',
    language: 'ja',
  });

  // モーダル_登録ボタン
  _controls.btnModalEditOk.on('click', () => {
    onModalEditOk();
  });

  // CSVボタン_押下
  _controls.btnExportCSV.on('click', () => {
    onExportCSV();
  });

  // 以前の検索結果を復元（グラフページから来た場合のみ）
  const keyword = AppSessionStorage.getKeyword();
  AppSessionStorage.removeKeyword();
  if (document.referrer.match(/graph.html/)) {
    if (keyword || keyword === '') {
      _controls.txtSearch.val(keyword);
      onSearch();
    }
  }
});

// テーブルの初期化
const initTable = () => {
  const pageSize = getPageSize();
  _controls.userTable.bootstrapTable({
    sidePagination: 'client',
    sortName: 'name',
    sortOrder: 'asc',
    pagination: true,
    pageSize: pageSize,
    pageList: [pageSize],
    locale: 'ja-JP',
    data: [],
    columns: [
      {
        title: 'check',
        width: '40',
        checkbox: true,
        clickToSelect: true,
        align: 'center',
      },
      {
        field: 'name',
        title: '利用者ID',
        sortable: true,
        width: '125',
        align: 'center',
      },
      {
        field: 'interview_started_at',
        title: '面談開始日',
        sortable: true,
        width: '125',
        align: 'center',
      },
      {
        field: 'last_exported_at',
        title: '前回取得日時',
        sortable: true,
        width: '175',
        align: 'center',
      },
      {
        field: 'last_exported_username',
        title: '前回取得者ID',
        sortable: true,
        width: '125',
        align: 'center',
      },
      {
        field: 'actions',
        title: 'Actions',
        width: '100',
        align: 'center',
      },
      {
        field: 'key', // 主キー
        title: 'key',
      },
    ],
  });
  _controls.userTable.bootstrapTable('getData');

  // 主キーを隠す
  _controls.userTable.bootstrapTable('hideColumn', 'key');

  // 行クリックのイベント付加
  _controls.userTable.on('click-row.bs.table', (e, row) => {
    onTrResult(row);
  });
};

// 検索ボタン_押下
const onSearch = async () => {
  const reg = /^[0-9a-zA-Z-_@.]*$/;
  if (!_controls.txtSearch.val().match(reg)) {
    util.flash('キーワードに使用できない文字が含まれています。');
    return;
  }

  util.loading.show();

  let results = [];

  if (DEBUG) {
    const now = '0001/01/01';
    let user_template = {
      pool_username: 'user-1',
      staff_pool_username: 'staff-1',
      interview_started_at: now,
      exported_at: now,
    };
    for (let i = 0; i < 100; i++) {
      results.push(user_template);
    }
  } else {
    const url = AppConfig.api.getLog;
    const json = {
      username: _controls.txtSearch.val() ? _controls.txtSearch.val() : '',
    };
    await util
      .getApiAsync(url, json)
      .then((x) => (results = x.results))
      .catch((err) => {
        util.flash(util.translation(err));
        util.loading.hide();
        return;
      });
  }

  _controls.userTable.bootstrapTable('removeAll');

  const formatText = 'YYYY/MM/DD HH:mm:ss';

  results.forEach((x) => {
    const exportedAt = x ? x.exported_at : null;
    const exportedUserName = x ? x.staff_pool_username : null;
    const rowData = {
      name: x.pool_username,
      interview_started_at: x.interview_started_at
        ? dayjs(x.interview_started_at).format('YYYY/MM/DD')
        : null,
      last_exported_at: exportedAt
        ? dayjs(exportedAt).utc().format(formatText)
        : null,
      last_exported_username: exportedUserName ? exportedUserName : null,

      actions: `
        <div class="d-flex justify-content-center gap-1">
            <button
                class="btn btn-sm btn-success btnEdit"
                data-username="${x.pool_username}"
                data-interview-started-at="${x.interview_started_at}"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#modalEdit"
            >
                <i class="far fa-edit"></i>
            </button>
            <button
                class="btn btn-sm btn-primary btnChart" data-username="${x.pool_username}"
                type="button"
            >
                <i class="far fa-chart-bar"></i>
            </button>
        </div>
        `,
      key: x.pool_username,
    };
    var dataList = _controls.userTable.bootstrapTable('getData');
    _controls.userTable.bootstrapTable('insertRow', {
      index: dataList.length,
      row: rowData,
    });
  });

  AppSessionStorage.setKeyword(_controls.txtSearch.val());

  util.loading.hide();
};

// 検索結果_押下
const onTrResult = (row) => {
  //   console.log(row.key);
};

// 編集ボタン_押下
const onBtnEdit = (e) => {
  const row = getCurrentSelectedRow(e);
  const v1 = row.data('username');
  const v2 = row.data('interview-started-at');
  const date = v2 ? dayjs(v2).format('YYYY/MM/DD') : null;
  _controls.txtModalEditUserName.val(v1);
  _controls.txtModalEditInterviewStartedAt.val(date);
};

// グラフボタン_押下
const onBtnCahrt = (e) => {
  const row = getCurrentSelectedRow(e);
  const username = row.data('username');
  location.href = `graph.html?username=${username}`;
};

// 現在選択中の行のユーザ名を取得する
const getCurrentSelectedRow = (e) => {
  let target = $(e.target);
  if (target.is('.far')) {
    target = target.parent();
  }
  return target;
};

// 面談開始日_モーダル_OK
const onModalEditOk = async () => {
  if (_controls.txtModalEditInterviewStartedAt.val() == '') {
    util.flash('面談開始日を入力してください。');
    return;
  }
  const text = '指定した日付で面談開始日を更新します。<br>登録しますか？';
  const result = await util.showConfirm({ text: text });
  if (!result) {
    return;
  }

  const username = _controls.txtModalEditUserName.val();
  const date = _controls.txtModalEditInterviewStartedAt.val();
  const url = AppConfig.api.setUser;
  const json = {
    username: username,
    interview_started_at: new Date(date),
  };
  await util
    .postApiAsync(url, json)
    .then(() => {
      util.flash('面談開始日を登録しました。', util.flash_type.success);
      _controls.userTable.bootstrapTable('removeAll');
      const target = $(window);
      target.delay(1000).queue(() => {
        onSearch();
        target.dequeue();
      });
    })
    .catch(() => {
      util.flash('登録に失敗しました。');
    });

  _controls.modalEdit.hide();
};

// CSV出力ボタン_押下
const onExportCSV = async () => {
  const users = _controls.userTable
    .bootstrapTable('getSelections')
    .map((x) => x.name);

  if (users.length <= 0) {
    util.flash('利用者を選択してください。');
    return;
  }

  const text = '選択した利用者のCSVを書き出します。<br>よろしいですか？';
  const result = await util.showConfirm({ text: text });
  if (!result) {
    return;
  }

  util.loading.show();

  const staff_username = getCurrentUser().username;
  const now = dayjs(new Date());

  let datas = [CSV_HEADER];

  let existedUsers = [];

  for (let i = 0; i < users.length; i++) {
    // データの取得
    const user_username = users[i];
    let results = null;
    const url = AppConfig.api.getCsv;
    const json = {
      username: user_username,
    };
    await util
      .getApiAsync(url, json)
      .then((x) => (results = x.results))
      .catch((err) => {
        util.flash(util.translation(err));
        util.loading.hide();
        return;
      });

    if (results.length > 0) {
      existedUsers.push(user_username);
    } else {
      continue;
    }

    // 範囲の判定
    const startDate = dayjs(
      new Date(util.formatDate(results[0].condition_date))
    );
    const endDate = dayjs(
      new Date(util.formatDate(results[results.length - 1].condition_date))
    );
    const diff = endDate.diff(startDate, 'days');
    let tmpDate = dayjs(startDate);
    for (let i = 0; i <= diff; i++) {
      const date = tmpDate.format('YYYYMMDD');
      const strDate = tmpDate.format('YYYY/MM/DD');
      const result = results.find((x) => x.condition_date == date);
      let strInterviewStartedAt = '';
      let strUpdateAt = '';
      if (result) {
        if (result.interview_started_at) {
          strInterviewStartedAt = dayjs(result.interview_started_at)
            .utc()
            .format('YYYY/MM/DD');
        }
        strUpdateAt = dayjs(result.updated_at)
          .utc()
          .format('YYYY/MM/DD HH:mm:ss');
      }
      if (result) {
        datas.push([
          user_username,
          strDate,
          strInterviewStartedAt ? strInterviewStartedAt : '',
          strUpdateAt,
          result.weight ? result.weight : '',
          result.bp1 ? result.bp1 : '',
          result.bp2 ? result.bp2 : '',
          result.bp3 ? result.bp3 : '',
          result.bp4 ? result.bp4 : '',
          result.step ? result.step : '',
        ]);
      } else {
        // データが存在しない場合もダミーデータを挿入
        datas.push([user_username, strDate]);
      }
      tmpDate.add(1, 'd');
    }
  }

  if (existedUsers.length <= 0) {
    util.loading.hide();
    util.flash('選択した利用者のデータが存在しませんでした。');
    return;
  }

  const filename = `${staff_username}_${now.format('YYYYMMDDHHmmss')}.csv`;
  const csv = new CSV(datas);
  csv.save(filename);

  for (let i = 0; i < existedUsers.length; i++) {
    await saveLog(existedUsers[i], staff_username);
  }

  util.loading.hide();

  // リストの再描画
  onSearch();
};

// ログの保存
const saveLog = async (user_username, staff_username) => {
  const json = {
    user_username: user_username,
    staff_username: staff_username,
  };
  const url = AppConfig.api.newLog;
  await util.postApiAsync(url, json);
};

// ウィンドウ_解像度変更
$(window).on('resize', () => {
  refresh();
});

// 解像度ごとに最適なページサイズをあらかじめ用意する
const initPageSizes = () => {
  const oy = 44;
  let base = 350 - oy;
  for (let i = 0; i < 40; i++) {
    // 4k対応
    _pageSizes[i] = { a: base, b: base + oy, c: i + 1 };
    base += oy;
  }
  _pageSizes[0].a = 0;
  _pageSizes[_pageSizes.length - 1].b = 9999;
};

// 解像度ごとに最適なページサイズを取得
const getPageSize = () => {
  if (!_pageSizes) return 1;
  const height = document.documentElement.clientHeight;
  const result = _pageSizes.find((v) => height >= v.a && height < v.b);
  return result.c > MAX_PAGESIZE ? MAX_PAGESIZE : result.c;
};

// 再描画
const refresh = () => {
  const pageSize = getPageSize();
  _controls.userTable.bootstrapTable('refreshOptions', {
    pageSize: pageSize,
  });
};
