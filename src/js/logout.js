import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import * as startup from './lib/_startup';
import AWS from 'aws-sdk/global';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { _config } from './lib/_config';
import { _localStorage } from './lib/_localStorage';
import { _sessionStorage } from './lib/_sessionStorage';
import { gotoLoginPage } from './lib/_utiltity';

//------------------------------------------------------------------//

$(() => {
  startup.init();
  onSignOut();
});

$(window)
  .delay(3000)
  .queue(function () {
    gotoLoginPage();
  });

// サインアウト
const onSignOut = () => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(_config.cognito);
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    // セッションデータの削除
    _sessionStorage.removeAll();

    // ローカルデータの削除
    _localStorage.removeAll();

    // AWSのセッションデータを削除
    if (AWS.config.credentials && AWS.config.credentials.clearCachedId) {
      AWS.config.credentials.clearCachedId();
    }

    cognitoUser.signOut();
  }
};
