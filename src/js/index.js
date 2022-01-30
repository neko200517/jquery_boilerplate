// import '@babel/polyfill';
import 'bootstrap';
import './bootstrap-custom.scss';

import './style.scss';
import $ from 'jquery';

import AWS from 'aws-sdk';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';

console.log(process.env);

const name = 'Index';
const title = $('title');
const h1 = $('h1');
title.text(name);
h1.text(name);
