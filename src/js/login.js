import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import startup from './lib/_startup';
import * as util from './lib/_utiltity';
import AppConfig from './lib/_config';
import AppLocalStorage from './lib/_localStorage';
import { signIn, getCurrentUser } from './lib/_cognito';

//------------------------------------------------------------------//

$(() => {
  startup();
});

$(window).on('_ready', () => {
  $('#btnLogin').on('click', (e) => {
    e.preventDefault();
    onSignIn();
  });
});

// サインイン処理
const onSignIn = async () => {
  const username = $('#txtUserName').val();
  const password = $('#txtPassword').val();

  if (!username) {
    util.flash('ユーザ名を入力してください。');
    return;
  }
  if (!password) {
    util.flash('パスワードを入力してください。');
    return;
  }

  util.loading.show();

  await signIn(username, password)
    .then((result) => {
      const currentUserName = getCurrentUser().username;
      notExistedUserRegist(currentUserName).then((x) => {
        confirmedUserGotoLocation(currentUserName);
      });
    })
    .catch((error) => {
      util.flash(util.translation(error, 'ログイン処理に失敗しました。'));
    });

  util.loading.hide();
};

// Usersテーブルに存在しない場合はUserを自動作成
const notExistedUserRegist = async (username) => {
  const url = AppConfig.api.newUser;
  const json = {
    username: username,
  };
  await util.postApiAsync(url, json).then((x) => {
    return new Promise((resolve) => {
      resolve(true);
    });
  });
};

// 初回登録済みで遷移先を決定する
const confirmedUserGotoLocation = (username) => {
  const url = AppConfig.api.getUser;
  const json = {
    username: username,
  };
  util.getApiAsync(url, json).then((x) => {
    const obj = x.results[0];
    AppLocalStorage.setConfirmState(obj.is_confirm);
    location.href = obj.is_confirm ? 'home.html' : 'terms.html';
  });
};
