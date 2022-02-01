import $ from './lib/_jquery-with-plugins';
import 'babel-polyfill';
import 'bootstrap';
import '../css/style.scss';
import startup from './lib/_startup';

//------------------------------------------------------------------//

$(() => {
  startup();
});

$(window).on('_ready', () => {
  const type = {
    mit: 'MIT License',
    apache: 'Apache License 2.0',
    cc: 'CC BY 4.0',
    sil: 'SIL OFL 1.1',
    undefined: '-',
  };
  const licenses = [
    {
      name: 'amazon-cognito-identity-js',
      type: type.apache,
      copyright: '2016 Amazon.com',
      url: 'https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js',
    },
    {
      name: 'aws-cognito-sdk',
      type: type.apache,
      copyright: '2016 Amazon.com',
      url: 'https://raw.githubusercontent.com/aws/amazon-cognito-identity-js/master/dist/aws-cognito-sdk.min.js',
    },
    {
      name: 'aws-sdk-js',
      type: type.apache,
      copyright: '2016 Amazon.com',
      url: 'https://github.com/aws/aws-sdk-js',
    },
    {
      name: 'bootstrap',
      type: type.mit,
      copyright: '2011-2021 Twitter, Inc.',
      url: 'https://github.com/twbs/bootstrap',
    },
    {
      name: 'bootstrap-datepicker',
      type: type.apache,
      copyright: 'other contributors',
      url: 'https://github.com/uxsolutions/bootstrap-datepicker',
    },
    {
      name: 'bootstrap-table',
      type: type.mit,
      copyright: '2012-2019 Zhixin Wen',
      url: 'https://github.com/wenzhixin/bootstrap-table',
    },
    {
      name: 'Chart.js',
      type: type.mit,
      copyright: '2014-2021 Chart.js Contributors',
      url: 'https://github.com/chartjs/Chart.js',
    },
    {
      name: 'Font Awesome Free',
      type: `
          <ul style="margin:0;">
            <li class="text-muted">
              Icons: <a href="https://creativecommons.org/licenses/by/4.0/deed.en">CC BY 4.0</a>
            </li>
            <li class="text-muted">
              Fonts: <a href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL">
                SIL OFL 1.1</a>
            </li>
            <li class="text-muted">
              Code: MIT License
            </li>
          </ul>
        `,
      copyright: 'fontawesome.com',
      url: 'https://fontawesome.com/',
    },
    {
      name: 'jquery',
      type: type.mit,
      copyright: 'jquery.com',
      url: 'https://github.com/jquery/jquery',
    },
    {
      name: 'jquery-confirm',
      type: type.mit,
      copyright: '2019 Boniface Pereira',
      url: 'https://github.com/craftpip/jquery-confirm',
    },
    {
      name: 'jsbn',
      type: type.undefined,
      copyright: "Tom Wu's",
      url: 'https://github.com/andyperlitch/jsbn',
    },
    {
      name: 'jsbn2',
      type: type.undefined,
      copyright: "Tom Wu's",
      url: 'https://gist.github.com/Blackbaud-CameronBlack/76fbe4040818a4c5dd3ba59c4275ecb2',
    },
    {
      name: 'Moment.js',
      type: type.mit,
      copyright: 'momentjs.com',
      url: 'https://github.com/moment/moment/',
    },
    {
      name: 'sjcl',
      type: 'BSD-2-Clause, GPL-2.0',
      copyright: 'sjcl@ovt.me',
      url: 'https://github.com/bitwiseshiftleft/sjcl',
    },
  ];

  licenses.forEach((x) => {
    let html = '';
    html += `
        <div class="card">
          <div class="card-body">
          <h2 class="card-title mb-2">${x.name}</h2>
          <h6 class="card-subtitle text-muted mb-2">${x.type}</h6>
          <h6 class="card-subtitle text-muted mb-1">
            Copyright(c) ${x.copyright} All rights reserved.
          </h6>
          <a href="${x.url}" class="card-link">${x.url}</a>
          </div>
        </div>
      `;

    $('#license').append(html);
  });
});
