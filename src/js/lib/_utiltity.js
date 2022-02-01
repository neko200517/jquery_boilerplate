import $ from './_jquery-with-plugins';
import { _localStorage } from './_localStorage';
import { _config } from './_config';
import { getCurrentSession, isSignIn } from './_cognito';

/**
 * HTMLページの埋め込み
 * @param {*} selector
 * @param {*} filepath
 */
export const includeHTML = (selector, filepath) => {
  $(function () {
    $.ajaxSetup({ cache: false });
    $(selector).load(filepath);
  });
};

// ローディング用
export const loading = {
  toggle: () => {
    window._modal.toggle();
    // $('#modalLoading').modal('toggle');
  },
  show: () => {
    window._modal.show();
    // $('#modalLoading').modal('show');
  },
  hide: () => {
    window._modal.hide();
    // $('#modalLoading').modal('hide');
  },
};

// フラッシュメッセージ：タイプ
export const flash_type = {
  info: 'info',
  success: 'success',
  danger: 'danger',
};

let isFlashMessage = null;

/**
 * フラッシュメッセージの表示
 * @param {*} message
 * @param {*} type
 */
export const flash = (message, type = flash_type.danger, delayTime = 2500) => {
  if (isFlashMessage == message) return;
  isFlashMessage = message;
  const target = $('#alert-window');
  target.removeClass();
  target.addClass('alert');
  target.addClass('alert-' + type);
  target.text(message);
  target.slideDown('fast');
  target.delay(delayTime).queue(function () {
    isFlashMessage = null;
    target.slideUp('fast').dequeue();
  });
};

/**
 * URLパラメータの取得
 *
 * @param  name {string} パラメータのキー文字列
 * @return  url {url} 対象のURL文字列（任意）
 */
export const getParam = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * クエリ付きURLでページ遷移する
 * @param {*} url
 * @param {*} params
 */
export const gotoLocationWithQuery = (url, params) => {
  let new_url = url + '?';
  params.forEach((x) => {
    new_url += `${x.key}=${encodeURIComponent(x.value)}`;
    new_url += '&';
  });
  new_url = new_url.slice(0, -1);
  location.href = new_url;
};

// トークンの取得
const getIdToken = async () => {
  const session = await getCurrentSession().catch(() => {
    return null;
  });
  if (!session) {
    return null;
  }
  return session.idToken.jwtToken;
};

/**
 * GET
 * @param {*} params
 * @returns {*}
 */
export const getApiAsync = async (url, json) => {
  const token = await getIdToken();
  if (!token) {
    gotoLoginPage();
    return;
  }
  json = JSON.parse(JSON.stringify(json));
  url = _config.env.baseUrl + url;
  const keys = Object.keys(json);
  let param = '?';
  keys.forEach((key, i) => {
    param += `${key}=${json[key]}`;
    if (keys.length > 1) {
      param += '&';
    }
  });
  const headers = {
    method: 'get',
    headers: {
      Authorization: token,
    },
  };
  const res = await fetch(url + param, headers);
  const res_json = await res.json();
  return new Promise((resolove, reject) => {
    if ((res_json && res_json.status == 200) || res_json.status == 201) {
      resolove(res_json);
    } else {
      reject();
    }
  });
};

/**
 * POST
 * @param {*} url
 * @param {*} json
 * @returns
 */
export const postApiAsync = async (url, json) => {
  const token = await getIdToken();
  if (!token) {
    gotoLoginPage();
    return;
  }
  json = JSON.parse(JSON.stringify(json));
  url = _config.env.baseUrl + url;
  const deffer = new $.Deferred();
  $.ajax({
    type: 'post',
    url: url,
    headers: {
      Authorization: token,
    },
    data: JSON.stringify(json),
    contentType: 'application/json',
    dataType: 'json',
    scriptCharset: 'utf-8',
    success: (data) => {
      if (data.states == 200 || data.status == 201) {
        return deffer.resolve(data);
      } else {
        return deffer.reject(data);
      }
    },
    error: (data) => {
      return deffer.reject(data);
    },
  });
};

/**
 * 規約に同意とパスワードリセットしているか
 * @returns
 */
export const isConfirm = () => {
  const v = _localStorage.getConfirmState();
  return v && JSON.parse(v.toLowerCase());
};

// ログインページに遷移
export const gotoLoginPage = () => {
  location.href = 'login.html';
};

// ホームページに遷移
export const gotoHomePage = () => {
  location.href = 'index.html';
};

// エラーページに遷移
export const gotoErrorPage = () => {
  location.href = 'error.html';
};

// サインアウトページに遷移
export const gotoSignOutPage = () => {
  location.href = 'signout.html';
};

// ルートページか
export const isLoginPage = () => {
  return location.href.match(/login/);
};

/**
 * httpを検出したらhttpsでリダイレクト
 */
export const redirectToHttps = () => {
  const url = location.href;
  if (url.match(/http:/)) {
    const newUrl = url.replace('http:', 'https:');
    location.replace(newUrl);
  }
};

/**
 * 0埋め
 * @param {*} num
 * @param {*} len
 * @returns
 */
export const zeroPadding = (num, len) => {
  return (Array(len).join('0') + num).slice(-len);
};

/**
 * Date型をYYYYMMDDの形式に変換
 * @param {Date} dt
 * @returns
 */
export const formatYYYYMMDD = (dt) => {
  const y = zeroPadding(dt.getFullYear(), 4);
  const m = zeroPadding(dt.getMonth() + 1, 2);
  const d = zeroPadding(dt.getDate(), 2);
  return y + m + d;
};

/**
 * YYYYMMDDをDate型にする
 * @param {*} str
 * @returns
 */
export const formatDate = (str) => {
  const y = str.substr(0, 4);
  const m = str.substr(4, 2);
  const d = str.substr(6, 2);
  return new Date(`${y}/${m}/${d}`);
};

/**
 * Date型をYYYY/MM/DDの形式に変換
 * @param {Date} dt
 * @returns
 */
export const formatDateYYYYMMDDJp = (dt) => {
  const y = zeroPadding(dt.getFullYear(), 4);
  const m = zeroPadding(dt.getMonth() + 1, 2);
  const d = zeroPadding(dt.getDate(), 2);
  return `${y}/${m}/${d}`;
};

/**
 * Date型をMM/DDの形式に変換
 * @param {Date} dt
 * @returns
 */
export const formatDateMMDDJp = (dt) => {
  const m = zeroPadding(dt.getMonth() + 1, 2);
  const d = zeroPadding(dt.getDate(), 2);
  return `${m}/${d}`;
};

/**
 * null および　undefined のみ trueを返す
 * @param {*} value
 */
export const isNull = (value) => {
  return value === null || value === undefined;
};

// Confirm_表示
export const showConfirm = (obj) => {
  return new Promise((resolve) => {
    $.confirm({
      title: obj.title ? obj.title : '確認',
      content: obj.text,
      columnClass: obj.columnClass ? obj.columnClass : 'col-md-6',
      buttons: {
        cancel: {
          text: obj.btnCancelText
            ? obj.btnCancelText
            : '<div class="jconfirm-buttons-content">いいえ</div>',
          action: () => {
            resolve(false);
          },
        },
        ok: {
          text: obj.btnOkText
            ? obj.btnOkText
            : '<div class="jconfirm-buttons-content">はい</div>',
          action: () => {
            resolve(true);
          },
        },
      },
    });
  });
};

// エラーメッセージなどを翻訳
export const translation = (obj, defaultMessage = null) => {
  const msg =
    typeof obj === 'string' ? obj : obj.message || JSON.stringify(obj);

  console.log(msg);

  if (msg.match(/Missing required parameter USERNAME/)) {
    return 'ユーザー名を入力してください。';
  }
  if (msg.match(/Incorrect username or password./)) {
    return 'ユーザー名またはパスワードが違います。';
  }
  if (msg.match(/previousPassword/)) {
    return '現在のパスワードが一致しません。';
  }
  if (msg.match(/Attempt limit exceeded, please try after some time./)) {
    return '試行制限を超えました。しばらくしてから試してください。';
  }
  if (msg.match(/proposedPassword/)) {
    // 何らかのエラー
    return 'パスワードは最低13文字以上、英数字と記号の組み合わせを使用してください。';
  }
  if (msg.match(/Password not long enough/)) {
    // 長さが不足
    return 'パスワードは最低13文字以上、英数字と記号の組み合わせを使用してください。';
  }
  if (msg.match(/Password must have symbol characters/)) {
    // 記号が不足
    // ^ $ * . [ ] { } ( ) ? " ! @ # % & / \ , > < ' : ; | _ ~ `
    return 'パスワードは最低13文字以上、英数字と記号の組み合わせを使用してください。';
  }
  if (msg.match(/Password must have numeric characters/)) {
    // 数値が不足
    return 'パスワードは最低13文字以上、英数字と記号の組み合わせを使用してください。';
  }
  if (msg.match(/Failed to fetch/)) {
    return 'キーワードに使用できない文字が含まれています。';
  }

  if (defaultMessage) {
    return defaultMessage;
  } else {
    return msg;
  }
};
