import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import * as startup from './lib/_startup';

//------------------------------------------------------------------//

$(() => {
  startup.init();
});
