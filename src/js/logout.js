import AWS from 'aws-sdk/global';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import { _config } from './_config';
import { _localStorage } from './_localStorage';
import { _sessionStorage } from './_sessionStorage';
import { gotoLoginPage } from './_utiltity';

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
