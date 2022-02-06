import $ from './lib/_jquery-with-plugins';
import 'bootstrap';
import '../css/style.scss';
import startup from './lib/_startup';

const json = require('../assets/licenses.json');

//------------------------------------------------------------------//

$(() => {
  startup();
});

$(window).on('_ready', () => {
  const list = Object.values(json);
  list.forEach((x) => {
    let html = '';
    let copyright = x.copyright
      ? x.copyright
      : `Copyright(c) ${x.publisher} All rights reserved`;
    let url = x.repository ? x.repository : x.url;
    html += `
        <div class="card">
          <div class="card-body">
          <h2 class="card-title">${x.name}@${x.version}</h2>
          <h6 class="card-subtitle text-muted mb-2">${x.licenses} License</h6>
          <h6 class="card-subtitle text-muted mb-1">
            ${copyright}
          </h6>
          <a href="${url}" class="card-link">${url}</a>
          </div>
        </div>
      `;
    $('#license').append(html);
  });
});
