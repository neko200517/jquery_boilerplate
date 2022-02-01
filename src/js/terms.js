import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import startup from './lib/_startup';
import AppConfig from './lib/_config';
import * as util from './lib/_utiltity';

//------------------------------------------------------------------//

const _controls = {
  lblTitle: $('#lblTitle'),
  lblH1: $('#lblH1'),
  btnOk: $('#btnOk'),
  classTerms: $('.terms'),
};

//------------------------------------------------------------------//

$(() => {
  startup();
});

$(window).on('_ready', () => {
  // 部分ページの読込
  const path = `${AppConfig.assets.terms}`;
  _controls.classTerms.load(path);

  const href = util.isConfirm() ? 'home.html' : 'changePassword.html';
  const title = util.isConfirm() ? '利用規約' : '利用規約';
  const h1 = util.isConfirm() ? '利用規約' : '利用規約';
  const btnText = util.isConfirm() ? 'ホーム' : '同意する';
  _controls.lblTitle.text(title);
  _controls.lblH1.text(h1);
  _controls.btnOk.text(btnText);
  _controls.btnOk.on('click', () => {
    location.href = href;
  });
});
