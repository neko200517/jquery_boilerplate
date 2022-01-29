// import '@babel/polyfill';
import './style.scss';
import $ from 'jquery';

export const init = () => {
  const app = $('#app');
  app.html(`
    <p>
      Hello, Page02
    </p>
  `);
};

init();
