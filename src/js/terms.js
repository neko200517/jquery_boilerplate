import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import * as startup from './lib/_startup';
import { _config } from './lib/_config';
import { isConfirm } from './lib/_utiltity';

//------------------------------------------------------------------//

const _controls = {
  lblTitle: $('#lblTitle'),
  lblH1: $('#lblH1'),
  btnOk: $('#btnOk'),
  classTerms: $('.terms'),
};

//------------------------------------------------------------------//

$(() => {
  startup.init();
});

$(window).on('_ready', () => {
  // 部分ページの読込
  const path = `${_config.assets.terms}`;
  _controls.classTerms.load(path);

  const href = isConfirm() ? 'home.html' : 'changePassword.html';
  const title = isConfirm() ? '利用規約' : '利用規約';
  const h1 = isConfirm() ? '利用規約' : '利用規約';
  const btnText = isConfirm() ? 'ホーム' : '同意する';
  _controls.lblTitle.text(title);
  _controls.lblH1.text(h1);
  _controls.btnOk.text(btnText);
  _controls.btnOk.on('click', () => {
    location.href = href;
  });
});
