import $ from './lib/_jquery-with-plugins';
import 'bootstrap';
import '../css/style.scss';
import startup from './lib/_startup';
import * as util from './lib/_utiltity';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import AppConfig from './lib/_config';
import AppLocalStorage from './lib/_localStorage';
import { getCurrentUser } from './lib/_cognito';

//------------------------------------------------------------------//

$(() => {
  startup();
});

$(window).on('_ready', () => {
  if (!util.isConfirm()) $('#lblTutorial1').show();
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
    util.flash('現在のパスワードを入力してください。');
    return;
  }
  if (!newPassword1) {
    util.flash('新しいパスワードを入力してください。');
    return;
  }
  if (!newPassword2) {
    util.flash('パスワード再入力を入力してください。');
    return;
  }
  if (newPassword1 != newPassword2) {
    util.flash('新しいパスワードが一致しません。');
    return;
  }

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(AppConfig.cognito);
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
                util.flash(
                  util.translation(err, 'パスワードの変更に失敗しました。')
                );
              } else {
                setConfirm();
              }
            }
          );
        } else {
          util.flash('トークン情報の再取得に失敗しました。');
        }
      }
    });
  } else {
    util.flash('パスワードの変更に失敗しました。');
  }
};

// 初回登録完了
const setConfirm = async () => {
  const json = {
    username: getCurrentUser().username,
    confirm: true,
  };
  const url = AppConfig.api.setUser;
  await util
    .postApiAsync(url, json)
    .then(() => {
      $('#btnOk').prop('disabled', true);
      util.flash('登録に成功しました。', util.flash_type.success);
      $(window)
        .delay(3000)
        .queue(() => {
          AppLocalStorage.setConfirmState(true);
          location.href = 'home.html';
        });
    })
    .catch(() => {
      util.flash('登録に失敗しました。');
    });
};
