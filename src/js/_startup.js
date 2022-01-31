import { initCognitoProvider, isSignIn } from './_cognito';
import {
  isConfirm,
  isLoginPage,
  gotoLoginPage,
  RedirectToHttps,
} from './_utiltity';
import { _config } from './_config';

export const init = () => {
  // httpsにリダイレクト
  if (_config.app.version == 'release') {
    RedirectToHttps();
  }

  // 非表示
  $('body').css('display', 'none');

  // 認証プロバイダの初期化
  initCognitoProvider();

  // 直URLを踏んだときの対策
  if (isSignIn()) {
    if (isConfirm()) {
      if (isLoginPage()) {
        location.href = 'home.html';
      }
    } else {
      if (
        !location.pathname.match(/terms/) &&
        !location.pathname.match(/changePassword/)
      ) {
        // location.href = 'terms.html';
      }
    }
  } else {
    if (!isLoginPage()) {
      gotoLoginPage();
    }
  }

  $(() => {
    // ナビバーを表示
    addNavbar();

    // 非表示を解除
    if (isSignIn()) {
      $('body').show();
    } else {
      if (isLoginPage) {
        $('body').show();
      }
    }
  });
};

const addNavbar = () => {
  const navbar = document.querySelector('._navbar');
  navbar.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="home.html"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" id="nav-login">
              <a class="nav-link active" aria-current="page" href="login.html"
                >ログイン</a
              >
            </li>
            <li class="nav-item nav-signined_contents">
              <a class="nav-link" href="home.html">ホーム</a>
            </li>
            <li class="nav-item nav-signined_contents">
              <a class="nav-link" href="terms.html">利用規約</a>
            </li>
            <li class="nav-item nav-signined_contents">
              <a class="nav-link" href="license.html">ライセンス</a>
            </li>
            <li class="nav-item nav-signined_contents">
              <a class="nav-link" href="changePassword.html">パスワード設定</a>
            </li>
          </ul>
          <form class="d-flex" id="nav-logout">
            <a class="btn btn-outline-success" type="submit" href="logout.html"
              >ログアウト</a
            >
          </form>
        </div>
      </div>
    </nav>

    <!-- フラッシュ -->
    <div class="alert" role="alert" style="display: none" id="alert-window"></div>

    <!-- ローディング -->
    <div
      class="modal hide"
      id="modalLoading"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-loading">
        <div class="modal-content">
          <div class="modal-body">
            <div class="d-flex justify-content-center">
              <p>しばらくお待ちください...</p>
            </div>
            <div class="d-flex justify-content-center">
              <span class="spinner-border" role="status" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  $('.navbar-brand').text(_config.app.productName);

  if (isSignIn()) {
    if (!isConfirm()) {
      $('.nav-signined_contents').remove();
    }
    $('#nav-login').remove();
  } else {
    $('.nav-signined_contents').remove();
    $('#nav-logout').remove();
  }

  // 全ての読み込みが完了したことを宣言する
  $(window).trigger('_ready');
};
