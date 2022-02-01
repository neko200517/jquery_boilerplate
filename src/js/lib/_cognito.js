import AWS from 'aws-sdk/global';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import AppConfig from './_config';

/**
 * Amazon Cognito 認証情報プロバイダーを初期化します
 */
export const initCognitoProvider = () => {
  AWS.config.region = AppConfig.cognito.region;
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AppConfig.cognito.IdentityPoolId,
  });
};

/**
 * 現在のユーザはログインしているか？
 * @returns
 */
export const isSignIn = () => {
  const cognitoUser = getCurrentUser();
  if (cognitoUser == null) {
    return false;
  }
  cognitoUser.getSession((err, session) => {
    if (err) {
      return false;
    }
  });
  return true;
};

/**
 * ログイン中のユーザを取得
 * @returns
 */
export const getCurrentUser = () => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(AppConfig.cognito);
  const cognitoUser = userPool.getCurrentUser();
  return cognitoUser;
};

// ユーザー情報の取得
export const getCurrentUserData = () => {
  const cognitoUser = getCurrentUser();
  const currentUserData = {};
  try {
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          throw new Exception(err);
        } else {
          console.log(session);

          // ユーザの属性を取得
          cognitoUser.getUserAttributes((err, result) => {
            if (err) {
              throw new Exception(err);
            }
            // 取得した属性情報を連想配列に格納
            for (i = 0; i < result.length; i++) {
              currentUserData[result[i].getName()] = result[i].getValue();
            }
            return currentUserData;
          });
        }
      });
    } else {
      throw new Exception();
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * 現在のユーザーのセッションを取得
 * @returns
 */
export const getCurrentSession = () => {
  const cognitoUser = getCurrentUser();
  if (cognitoUser != null) {
    return new Promise((resolve, reject) => {
      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
        } else {
          resolve(session);
        }
      });
    });
  } else {
    return null;
  }
};

/**
 * JWTトークンのデコード
 * @param {*} token
 * @returns
 */
export const decodeJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
};

/**
 * サインアウト
 * @returns
 */
export const signOut = async () => {
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(AppConfig.cognito);
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    // AWSのセッションデータを削除
    if (AWS.config.credentials && AWS.config.credentials.clearCachedId) {
      AWS.config.credentials.clearCachedId();
    }
    await cognitoUser.signOut();
  }
};

/**
 * サインイン
 * @returns
 */
export const signIn = async (username, password) => {
  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  const userPool = new AmazonCognitoIdentity.CognitoUserPool(AppConfig.cognito);
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return await new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const key = `cognito-idp.${AppConfig.cognito.region}.amazonaws.com/${AppConfig.cognito.UserPoolId}`;
        AWS.config.region = AppConfig.cognito.region;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: AppConfig.cognito.IdentityPoolId,
          Logins: {
            [key]: result.getIdToken().getJwtToken(),
          },
        });
        AWS.config.credentials.refresh((error) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      },
      onFailure: (error) => {
        reject(error);
      },
    });
  });
};
