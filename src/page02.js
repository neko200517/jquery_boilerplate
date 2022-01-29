// import '@babel/polyfill';
import './style.scss';
import $ from 'jquery';

export const init = () => {
  const app = $('#app');
  app.html(`
    <p>
      page02
    </p>
  `);
};

init();
