!function(){"use strict";var n,e={6133:function(n,e,t){var r=t(182),o=t.n(r),i=(t(6124),t(5169),t(1518)),u=t(5200),a=t(4511),c=t(86),f=t(5711),s=t(7547);function l(n,e,t,r,o,i,u){try{var a=n[i](u),c=a.value}catch(n){return void t(n)}a.done?e(c):Promise.resolve(c).then(r,o)}o()((function(){(0,i.Z)()})),o()(window).on("_ready",(function(){u.O()||o()("#lblTutorial1").show(),o()("#btnOk").on("click",(function(n){n.preventDefault(),d()}))}));var d=function(){var n=o()("#txtOldPassword").val(),e=o()("#txtNewPassword1").val(),t=o()("#txtNewPassword2").val();if(n)if(e)if(t)if(e==t){var r=new a.AM(c.Z.cognito).getCurrentUser();null!=r?r.getSession((function(t,o){t||(o.isValid()?r.changePassword(n,e,(function(n,e){n?u.Ke(u.xk(n,"パスワードの変更に失敗しました。")):v()})):u.Ke("トークン情報の再取得に失敗しました。"))})):u.Ke("パスワードの変更に失敗しました。")}else u.Ke("新しいパスワードが一致しません。");else u.Ke("パスワード再入力を入力してください。");else u.Ke("新しいパスワードを入力してください。");else u.Ke("現在のパスワードを入力してください。")},v=function(){var n,e=(n=regeneratorRuntime.mark((function n(){var e,t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e={username:(0,s.ts)().username,confirm:!0},t=c.Z.api.setUser,n.next=4,u.m(t,e).then((function(){f.Z.setConfirmState(!0),location.href="home.html"})).catch((function(){gotoErrorPage()}));case 4:case"end":return n.stop()}}),n)})),function(){var e=this,t=arguments;return new Promise((function(r,o){var i=n.apply(e,t);function u(n){l(i,r,o,u,a,"next",n)}function a(n){l(i,r,o,u,a,"throw",n)}u(void 0)}))});return function(){return e.apply(this,arguments)}}()}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}r.m=e,n=[],r.O=function(e,t,o,i){if(!t){var u=1/0;for(s=0;s<n.length;s++){t=n[s][0],o=n[s][1],i=n[s][2];for(var a=!0,c=0;c<t.length;c++)(!1&i||u>=i)&&Object.keys(r.O).every((function(n){return r.O[n](t[c])}))?t.splice(c--,1):(a=!1,i<u&&(u=i));if(a){n.splice(s--,1);var f=o();void 0!==f&&(e=f)}}return e}i=i||0;for(var s=n.length;s>0&&n[s-1][2]>i;s--)n[s]=n[s-1];n[s]=[t,o,i]},r.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return r.d(e,{a:e}),e},r.d=function(n,e){for(var t in e)r.o(e,t)&&!r.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},r.nmd=function(n){return n.paths=[],n.children||(n.children=[]),n},r.j=830,function(){var n={830:0};r.O.j=function(e){return 0===n[e]};var e=function(e,t){var o,i,u=t[0],a=t[1],c=t[2],f=0;if(u.some((function(e){return 0!==n[e]}))){for(o in a)r.o(a,o)&&(r.m[o]=a[o]);if(c)var s=c(r)}for(e&&e(t);f<u.length;f++)i=u[f],r.o(n,i)&&n[i]&&n[i][0](),n[i]=0;return r.O(s)},t=self.webpackChunkwebpack_test=self.webpackChunkwebpack_test||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))}();var o=r.O(void 0,[736],(function(){return r(6133)}));o=r.O(o)}();