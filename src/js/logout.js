import $ from './lib/_jquery-with-plugins';
import 'bootstrap';
import '../css/style.scss';
import startup from './lib/_startup';
import * as util from './lib/_utiltity';
import AppLocalStorage from './lib/_localStorage';
import AppSessionStorage from './lib/_sessionStorage';
import { isSignIn, signOut } from './lib/_cognito';

//------------------------------------------------------------------//

$(() => {
  startup(!isSignIn());
  onSignOut();
});

// サインアウト
const onSignOut = async () => {
  await signOut();
  AppSessionStorage.removeAll();
  AppLocalStorage.removeAll();

  $(window)
    .delay(3000)
    .queue(function () {
      util.gotoLoginPage();
    });
};
