// import '@babel/polyfill';
import 'bootstrap';
import './bootstrap-custom.scss';

import './style.scss';
import $ from 'jquery';

const name = 'Index';
const title = $('title');
const h1 = $('h1');
title.text(name);
h1.text(name);
