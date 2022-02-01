import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import * as startup from './lib/_startup';
import {
  flash,
  getApiAsync,
  isConfirm,
  loading,
  postApiAsync,
  translation,
} from './lib/_utiltity';
import AWS from 'aws-sdk/global';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { _config } from './lib/_config';
import { _localStorage } from './lib/_localStorage';
import { _sessionStorage } from './lib/_sessionStorage';
import { getCurrentUser } from './lib/_cognito';

//------------------------------------------------------------------//

$(() => {
  startup.init();
});

$(window).on('_ready', () => {
  if (!isConfirm()) $('#lblTutorial1').show();
  $('#btnOk').on('click', (e) => {
    e.preventDefault();
    onChangePassword();
  });
});

// パスワードの変更
const onChangePassword = () => {
  var oldPassword = $('#txtOldPassword').val();
  var newPassword1 = $('#txtNewPassword1').val();
  var newPassword2 = $('#txtNewPassword2').val();
  if (!oldPassword) {
    flash('現在のパスワードを入力してください。');
    return;
  }
  if (!newPassword1) {
    flash('新しいパスワードを入力してください。');
    return;
  }
  if (!newPassword2) {
    flash('パスワード再入力を入力してください。');
    return;
  }
  if (newPassword1 != newPassword2) {
    flash('新しいパスワードが一致しません。');
    return;
  }

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(_config.cognito);
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        //
      } else {
        if (session.isValid()) {
          // パスワード変更処理
          cognitoUser.changePassword(
            oldPassword,
            newPassword1,
            function (err, result) {
              if (err) {
                flash(translation(err, 'パスワードの変更に失敗しました。'));
              } else {
                setConfirm();
              }
            }
          );
        } else {
          flash('トークン情報の再取得に失敗しました。');
        }
      }
    });
  } else {
    flash('パスワードの変更に失敗しました。');
  }
};

// 初回登録完了
const setConfirm = async () => {
  const json = {
    username: getCurrentUser().username,
    confirm: true,
  };
  const url = _config.api.setUser;
  await postApiAsync(url, json)
    .then(() => {
      _localStorage.setConfirmState(true);
      location.href = 'home.html';
    })
    .catch(() => {
      gotoErrorPage();
    });
};
