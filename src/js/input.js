import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import 'jquery-confirm/css/jquery-confirm.css';
import startup from './lib/_startup';
import * as util from './lib/_utiltity';
import AppConfig from './lib/_config';
import { getCurrentUser } from './lib/_cognito';

//------------------------------------------------------------------//

// コントロール_宣言
const _controls = {
  classNumpads: $('.numpad'),
  txtValue: $('#txt-value'),
  btnSave: $('#btnSave'),
  btnCancel: $('#btnCancel'),
  lblTitle: $('#lblTitle'),
  lblH1: $('#lblH1'),
  lblSmall: $('#lblSmall'),
  lblUnit: $('#lblUnit'),
};

// 変数_宣言
const _username = getCurrentUser().username;
let _currentFormatDate;
let _inputed = false; // 初回入力フラグ
let _isDialogShowed = false; // ダイアログ表示フラグ

// 定数_宣言
const LABEL_CLEAR = 'クリア';
const LABEL_PERIOD = '.';
const CONFIRM_TITLE = '<h1 class="display-2">確認</h1>';
const CONFIRM_CONTENT =
  '<p>直近の記録と差が開きすぎています。<br>それでも登録しますか？</p>';
const CONFIRM_CONTENT_BP =
  '<p>最高血圧 より 最低血圧 が大きい値です。<br>それでも登録しますか？</p>';
const CONFIRM_CONTENT_RANGE =
  '<p>入力できる値の範囲ではありません。<br>それでも登録しますか？</p>';
const MAX_INPUTABLE = 5;

//------------------------------------------------------------------//

startup();

$(window).on('_ready', () => {
  // 日付(YYYYMMDD)の読み込み
  // todo:5 ホーム画面の表示日時は本日を基本にする
  _currentFormatDate = util.getParam('date');

  // ボタンの生成
  createButtons();

  // イベントハンドラの付与
  $('.btn-num').on('click', (e) => {
    onNumPad_Click(e);
  });

  // 戻るボタン
  _controls.btnCancel.on('click', () => {
    if (_currentFormatDate) {
      location.href = `home.html?date=${_currentFormatDate}`;
    } else {
      location.href = `home.html`;
    }
  });
});

// ボタンの生成
const createButtons = async () => {
  util.loading.show();
  const inputType = util.getParam('type');
  const btns = ['1', '2', '3', '4', '5', '6', '7', '8', '9', LABEL_CLEAR, '0'];
  if (
    inputType == 'weight' ||
    !_controls.classNumpads.hasClass('numpad-decimal')
  ) {
    btns.push(LABEL_PERIOD);
  }
  const temp1 = '<div class="col-4 h-100">';
  const temp2 = '<button class="btn btn-primary btn-num w-100 h-100 btn-lg">';
  const temp2ex =
    '<button class="btn btn-primary btn-num btn-clear w-100 h-100 btn-lg">';
  const temp3 = '</button>';
  const temp4 = '</div>';
  btns.forEach((btn, i) => {
    const temp = i == 9 ? temp2ex : temp2;
    const html = `${temp1}${temp}${btn}${temp3}${temp4}`;
    _controls.classNumpads.append(html);
  });

  // データ読み込み
  let obj = null;
  const url = AppConfig.api.getCondition;
  const json = {
    username: _username,
    startDate: _currentFormatDate,
    endDate: _currentFormatDate,
  };
  await util.getApiAsync(url, json).then((x) => (obj = x.results[0]));

  let props = {};
  let val = null;
  let html = ';';
  switch (inputType) {
    case 'weight':
      _controls.lblTitle.text('体重');
      html = `
        体重
      `;
      _controls.lblH1.html(html);
      _controls.lblUnit.text('Kg');
      props = {
        minValue: 20,
        maxValue: 300,
        capacityRate: 0.2,
        type: inputType,
      };
      if (obj) {
        val = obj.weight;
      }
      _controls.btnSave.on('click', () => {
        onNumpadSave(props);
      });
      break;
    case 'bp1':
      _controls.lblTitle.text('朝：最高血圧');
      html = `
        <span class="home-item-morning">朝 : </span>
        <span class="num-item-subtitle">
          <span class="home-item-high">最高血圧</span>
        </span>
      `;
      _controls.lblH1.html(html);
      _controls.lblUnit.text('mmHg');
      props = {
        minValue: 50,
        maxValue: 300,
        capacityRate: 0.5,
        type: inputType,
      };
      if (obj) {
        val = obj.bp1;
      }
      _controls.btnSave.on('click', () => {
        onNumpadSave(props);
      });
      break;
    case 'bp2':
      _controls.lblTitle.text('朝：最低血圧');
      html = `
        <span class="home-item-morning">朝 : </span>
        <span class="num-item-subtitle">
          <span class="home-item-low">最低血圧</span>
        </span>
      `;
      _controls.lblH1.html(html);
      _controls.lblUnit.text('mmHg');
      props = {
        minValue: 50,
        maxValue: 300,
        capacityRate: 0.5,
        type: inputType,
      };
      if (obj) {
        val = obj.bp2;
      }
      _controls.btnSave.on('click', () => {
        onNumpadSave(props);
      });
      break;
    case 'bp3':
      _controls.lblTitle.text('夜：最高血圧');
      html = `
        <span class="home-item-night">夜 : </span>
        <span class="num-item-subtitle">
          <span class="home-item-high">最高血圧</span>
        </span>
      `;
      _controls.lblH1.html(html);
      _controls.lblUnit.text('mmHg');
      props = {
        minValue: 50,
        maxValue: 300,
        capacityRate: 0.5,
        type: inputType,
      };
      if (obj) {
        val = obj.bp3;
      }
      _controls.btnSave.on('click', () => {
        onNumpadSave(props);
      });
      break;
    case 'bp4':
      _controls.lblTitle.text('夜：最低血圧');
      html = `
        <span class="home-item-night">夜 : </span>
        <span class="num-item-subtitle">
          <span class="home-item-low">最低血圧</span>
        </span>
      `;
      _controls.lblH1.html(html);
      _controls.lblUnit.text('mmHg');
      props = {
        minValue: 50,
        maxValue: 300,
        capacityRate: 0.5,
        type: inputType,
      };
      if (obj) {
        val = obj.bp4;
      }
      _controls.btnSave.on('click', () => {
        onNumpadSave(props);
      });
      break;
    default:
      _controls.lblTitle.text('歩数');
      _controls.lblH1.text('歩数');
      _controls.lblSmall.text('');
      _controls.lblUnit.text('歩');
      props = {
        minValue: 0,
        maxValue: 99999999,
        capacityRate: -1,
        type: inputType,
      };
      if (obj) {
        val = obj.step;
      }
      _controls.btnSave.on('click', () => {
        onNumpadSave(props);
      });
      break;
  }
  val = !util.isNull(val) ? val : '';
  _controls.txtValue.val(val);
  util.loading.hide();
};

// 数値ボタン_押下
const onNumPad_Click = (e) => {
  // ※アロー関数を使う場合、thisはe.target, e.currentTargetを使う
  const target = $(e.target);

  // クリアボタン
  if (target.text() == LABEL_CLEAR) {
    clearTextValue();
    return;
  }

  let txt = _controls.txtValue.val();

  // 先頭0とピリオドを削除
  txt = txt.replace(/^[0\.]+/, '');

  // 2つ以上ピリオドを打てないようにする
  if (target.text() == LABEL_PERIOD) {
    if (txt.match(/\./)) {
      return;
    }
  }

  // 文字数チェック
  const tmp = txt.match(/[0-9]/g);
  if (tmp && tmp.length >= MAX_INPUTABLE) {
    util.flash('これ以上入力できません。');
    return;
  }

  if (_inputed) {
    txt = txt.concat(target.text());
  } else {
    txt = target.text();
    _inputed = true;
  }
  _controls.txtValue.val(txt);
};

// 保存ボタン
const onNumpadSave = async (props) => {
  // ボタン無効化
  setButtonsEnabled(false);

  // 入力チェック
  if (!isEnableValue(props)) {
    setButtonsEnabled(true);
    return;
  }

  // 直近データの取得(前日分)
  let lastValue = 0;
  await getLastValue(props.type).then((x) => {
    lastValue = x;
  });

  // jsonの組み立て
  let json = {
    username: _username,
    date: _currentFormatDate,
  };
  json = JSON.parse(JSON.stringify(json));
  json[props.type] = _controls.txtValue.val();

  // 上限値の判定
  if (
    parseFloat(_controls.txtValue.val()) < props.minValue ||
    parseFloat(_controls.txtValue.val()) > props.maxValue
  ) {
    const text =
      CONFIRM_CONTENT_RANGE +
      `<br><div class="text-primary">
      許容値：${props.minValue} ~ ${props.maxValue}</div>`;
    const result = await util.showConfirm({ text: text, title: CONFIRM_TITLE });
    _inputed = false;
    if (!result) {
      setButtonsEnabled(true);
      return;
    }
  }

  // 血圧の上下を判定
  if (
    props.type == 'bp1' ||
    props.type == 'bp2' ||
    props.type == 'bp3' ||
    props.type == 'bp4'
  ) {
    const ret = await isBpUpper(props.type, _controls.txtValue.val());
    if (ret && ret.result) {
      const text =
        CONFIRM_CONTENT_BP +
        `<br><div class="text-primary">最高血圧：${ret.up}
        <span style="margin-right: 12px;"></span>
        最低血圧：${ret.down}</div>`;
      const result = await util.showConfirm({
        text: text,
        title: CONFIRM_TITLE,
      });
      _inputed = false;
      if (!result) {
        setButtonsEnabled(true);
        return;
      }
    }
  }

  // 許容値の判定
  if (isCapacity(lastValue, props) || props.capacityRate < 0) {
    onNumpadSave_Common(json);
  } else {
    const min = Math.floor(lastValue * (1 - props.capacityRate));
    const max = Math.floor(lastValue * (1 + props.capacityRate));
    const text =
      CONFIRM_CONTENT +
      `<br><div class="text-primary">直近の値：${lastValue}
      <span style="margin-right: 12px;"></span>
      許容値：${min} ~ ${max}</div>`;
    const result = await util.showConfirm({ text: text, title: CONFIRM_TITLE });
    _inputed = false;
    if (result) {
      onNumpadSave_Common(json);
    } else {
      setButtonsEnabled(true);
    }
  }
};

// 直近のデータを取得
const getLastValue = async (prop) => {
  let results = null;
  const url = AppConfig.api.getCondition;
  const json = {
    username: _username,
    startDate: '20220101',
    endDate: _currentFormatDate,
    orderBy: 'condition_date',
  };
  await util.getApiAsync(url, json).then((x) => (results = x.results));

  console.log(results);

  let lastValue = 0;
  results = results.reverse();
  for (let i = 0; i < results.length; i++) {
    const x = results[i];
    if (x.condition_date != _currentFormatDate) {
      const v = JSON.parse(JSON.stringify(x))[prop];
      if (v) {
        lastValue = v;
        break;
      }
    }
  }
  return new Promise((resolve) => {
    resolve(lastValue);
  });
};

// 血圧を比較。上より下が大きければtrueを返す
const isBpUpper = async (type, value) => {
  let results = null;
  const url = AppConfig.api.getCondition;
  const json = {
    username: _username,
    startDate: _currentFormatDate,
    endDate: _currentFormatDate,
  };
  await util.getApiAsync(url, json).then((x) => (results = x.results));

  let v, result, up, down;
  if (results.length > 0) {
    switch (type) {
      case 'bp1':
        v = results[0].bp2;
        result = v && value < v;
        up = value;
        down = v;
        break;
      case 'bp2':
        v = results[0].bp1;
        result = v && value > v;
        up = v;
        down = value;
        break;
      case 'bp3':
        v = results[0].bp4;
        result = v && value < v;
        up = value;
        down = v;
        break;
      default:
        v = results[0].bp3;
        result = v && value > v;
        up = v;
        down = value;
        break;
    }
    return {
      result: result,
      up: up,
      down: down,
    };
  }
};

// 前処理_保存
const isEnableValue = (props) => {
  const value = _controls.txtValue.val();
  if (value == '' || value == null || value == undefined) {
    util.flash('未入力です。');
    return false;
  }
  if (value.slice(-1) == '.') {
    util.flash('数値を入力してください。');
    return false;
  }
  return true;
};

// 許容値の判定
const isCapacity = (lastValue, props) => {
  const value = _controls.txtValue.val();
  if (lastValue <= 0) return true;
  const min = lastValue * (1 - props.capacityRate);
  const max = lastValue * (1 + props.capacityRate);
  return value >= min && value <= max;
};

// テキストボックスの初期化
const clearTextValue = () => {
  _controls.txtValue.val('');
};

// ボタンの無効化
const setButtonsEnabled = (enabled) => {
  $('.btn-num').prop('disabled', !enabled);
  _controls.btnSave.prop('disabled', !enabled);
};

// 共通処理_保存
const onNumpadSave_Common = async (json) => {
  util.loading.show();
  const url = AppConfig.api.setCondition;
  await util
    .postApiAsync(url, json)
    .then(() => {
      setButtonsEnabled(false);
      util.loading.hide();
      util.flash('登録に成功しました。', util.flash_type.success);
      // todo:3 登録後、ホーム画面に戻る
      $(window)
        .delay(1000)
        .queue(() => {
          const param = util.getParam('date')
            ? `?date=${util.getParam('date')}`
            : '';
          location.href = 'home.html' + param;
        });
    })
    .catch(() => {
      util.loading.hide();
      util.flash('登録に失敗しました。');
    });
};
