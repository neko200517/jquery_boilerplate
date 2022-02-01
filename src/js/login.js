import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import * as startup from './lib/_startup';
import {
  flash,
  getApiAsync,
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
    flash('ユーザ名を入力してください。');
    return;
  }
  if (!password) {
    flash('パスワードを入力してください。');
    return;
  }

  loading.show();

  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(_config.cognito);
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const key = `cognito-idp.${_config.cognito.region}.amazonaws.com/${_config.cognito.UserPoolId}`;
      AWS.config.region = _config.cognito.region;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: _config.cognito.IdentityPoolId,
        Logins: {
          [key]: result.getIdToken().getJwtToken(),
        },
      });
      AWS.config.credentials.refresh((error) => {
        if (error) {
          loading.hide();
          flash(translation(error, 'ログイン処理に失敗しました。'));
        } else {
          const username = getCurrentUser().username;
          notExistedUserRegist(username).then((x) => {
            confirmedUserGotoLocation(username);
            loading.hide();
          });
        }
      });
    },
    onFailure: (err) => {
      loading.hide();
      flash(translation(err, 'ログイン処理に失敗しました。'));
    },
  });
};

// Usersテーブルに存在しない場合はUserを自動作成
const notExistedUserRegist = async (username) => {
  const url = _config.api.newUser;
  const json = {
    username: username,
  };
  await postApiAsync(url, json).then((x) => {
    return new Promise((resolve) => {
      resolve(true);
    });
  });
};

// 初回登録済みで遷移先を決定する
const confirmedUserGotoLocation = (username) => {
  const url = _config.api.getUser;
  const json = {
    username: username,
  };
  getApiAsync(url, json).then((x) => {
    const obj = x.results[0];
    _localStorage.setConfirmState(obj.is_confirm);
    location.href = obj.is_confirm ? 'home.html' : 'terms.html';
  });
};
