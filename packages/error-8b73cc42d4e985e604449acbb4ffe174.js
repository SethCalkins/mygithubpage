/*! Raven.js 1.1.18 (e4f5a1b) | github.com/getsentry/raven-js */

!function(a,b){"use strict";function c(a,b){var c,d;b=b||{},a="raven"+a.substr(0,1).toUpperCase()+a.substr(1),document.createEvent?(c=document.createEvent("HTMLEvents"),c.initEvent(a,!0,!0)):(c=document.createEventObject(),c.eventType=a);for(d in b)l(b,d)&&(c[d]=b[d]);if(document.createEvent)document.dispatchEvent(c);else try{document.fireEvent("on"+c.eventType.toLowerCase(),c)}catch(e){}}function d(a){this.name="RavenConfigError",this.message=a}function e(a){var b=V.exec(a),c={},e=7;try{for(;e--;)c[U[e]]=b[e]||""}catch(f){throw new d("Invalid DSN: "+a)}if(c.pass)throw new d("Do not specify your private key in the DSN!");return c}function f(a){return"undefined"==typeof a}function g(a){return"function"==typeof a}function h(a){return"string"==typeof a}function i(a){return"object"==typeof a&&null!==a}function j(a){for(var b in a)return!1;return!0}function k(a){return i(a)&&"[object Error]"===R.toString.call(a)||a instanceof Error}function l(a,b){return R.hasOwnProperty.call(a,b)}function m(a,b){var c,d;if(f(a.length))for(c in a)l(a,c)&&b.call(null,c,a[c]);else if(d=a.length)for(c=0;d>c;c++)b.call(null,c,a[c])}function n(){M="?sentry_version=4&sentry_client=raven-js/"+T.VERSION+"&sentry_key="+K}function o(a,b){var d=[];a.stack&&a.stack.length&&m(a.stack,function(a,b){var c=p(b);c&&d.push(c)}),c("handle",{stackInfo:a,options:b}),r(a.name,a.message,a.url,a.lineno,d,b)}function p(a){if(a.url){var b,c={filename:a.url,lineno:a.line,colno:a.column,"function":a.func||"?"},d=q(a);if(d){var e=["pre_context","context_line","post_context"];for(b=3;b--;)c[e[b]]=d[b]}return c.in_app=!(!P.includePaths.test(c.filename)||/(Raven|TraceKit)\./.test(c["function"])||/raven\.(min\.)?js$/.test(c.filename)),c}}function q(a){if(a.context&&P.fetchContext){for(var b=a.context,c=~~(b.length/2),d=b.length,e=!1;d--;)if(b[d].length>300){e=!0;break}if(e){if(f(a.column))return;return[[],b[c].substr(a.column,50),[]]}return[b.slice(0,c),b[c],b.slice(c+1)]}}function r(a,b,c,d,e,f){var g,h;b+="",("Error"!==a||b)&&(P.ignoreErrors.test(b)||(e&&e.length?(c=e[0].filename||c,e.reverse(),g={frames:e}):c&&(g={frames:[{filename:c,lineno:d,in_app:!0}]}),b=t(b,P.maxMessageLength),P.ignoreUrls&&P.ignoreUrls.test(c)||(!P.whitelistUrls||P.whitelistUrls.test(c))&&(h=d?b+" at "+d:b,w(s({exception:{type:a,value:b},stacktrace:g,culprit:c,message:h},f)))))}function s(a,b){return b?(m(b,function(b,c){a[b]=c}),a):a}function t(a,b){return a.length<=b?a:a.substr(0,b)+"…"}function u(){return+new Date}function v(){var a={url:document.location.href,headers:{"User-Agent":navigator.userAgent}};return document.referrer&&(a.headers.Referer=document.referrer),a}function w(a){y()&&(a=s({project:L,logger:P.logger,platform:"javascript",request:v()},a),a.tags=s(s({},P.tags),a.tags),a.extra=s(s({},P.extra),a.extra),a.extra=s({"session:duration":u()-S},a.extra),j(a.tags)&&delete a.tags,J&&(a.user=J),P.release&&(a.release=P.release),g(P.dataCallback)&&(a=P.dataCallback(a)),(!g(P.shouldSendCallback)||P.shouldSendCallback(a))&&(H=a.event_id||(a.event_id=A()),x(a)))}function x(a){var b=new Image,d=I+M+"&sentry_data="+encodeURIComponent(JSON.stringify(a));b.crossOrigin="anonymous",b.onload=function(){c("success",{data:a,src:d})},b.onerror=b.onabort=function(){c("failure",{data:a,src:d})},b.src=d}function y(){return O?I?!0:(B("error","Error: Raven has not been configured."),!1):!1}function z(a){for(var b,c=[],d=0,e=a.length;e>d;d++)b=a[d],h(b)?c.push(b.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")):b&&b.source&&c.push(b.source);return new RegExp(c.join("|"),"i")}function A(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}function B(b,c){a.console&&console[b]&&T.debug&&console[b](c)}function C(){var b=a.RavenConfig;b&&T.config(b.dsn,b.config).install()}var D={remoteFetching:!1,collectWindowErrors:!0,linesOfContext:7},E=[].slice,F="?";D.wrap=function(a){function b(){try{return a.apply(this,arguments)}catch(b){throw D.report(b),b}}return b},D.report=function(){function c(a){h(),o.push(a)}function d(a){for(var b=o.length-1;b>=0;--b)o[b]===a&&o.splice(b,1)}function e(){i(),o=[]}function f(a,b){var c=null;if(!b||D.collectWindowErrors){for(var d in o)if(l(o,d))try{o[d].apply(null,[a].concat(E.call(arguments,2)))}catch(e){c=e}if(c)throw c}}function g(a,b,c,d,e){var g=null;if(r)D.computeStackTrace.augmentStackTraceWithInitialElement(r,b,c,a),j();else if(e)g=D.computeStackTrace(e),f(g,!0);else{var h={url:b,line:c,column:d};h.func=D.computeStackTrace.guessFunctionName(h.url,h.line),h.context=D.computeStackTrace.gatherContext(h.url,h.line),g={message:a,url:document.location.href,stack:[h]},f(g,!0)}return m?m.apply(this,arguments):!1}function h(){n||(m=a.onerror,a.onerror=g,n=!0)}function i(){n&&(a.onerror=m,n=!1,m=b)}function j(){var a=r,b=p;p=null,r=null,q=null,f.apply(null,[a,!1].concat(b))}function k(b,c){var d=E.call(arguments,1);if(r){if(q===b)return;j()}var e=D.computeStackTrace(b);if(r=e,q=b,p=d,a.setTimeout(function(){q===b&&j()},e.incomplete?2e3:0),c!==!1)throw b}var m,n,o=[],p=null,q=null,r=null;return k.subscribe=c,k.unsubscribe=d,k.uninstall=e,k}(),D.computeStackTrace=function(){function b(b){if(!D.remoteFetching)return"";try{var c=function(){try{return new a.XMLHttpRequest}catch(b){return new a.ActiveXObject("Microsoft.XMLHTTP")}},d=c();return d.open("get.html",b,!1),d.send(""),d.responseText}catch(e){return""}}function c(a){if(!h(a))return[];if(!l(u,a)){var c="";-1!==a.indexOf(document.domain)&&(c=b(a)),u[a]=c?c.split("\n"):[]}return u[a]}function d(a,b){var d,e=/function ([^(]*)\(([^)]*)\)/,g=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,h="",i=10,j=c(a);if(!j.length)return F;for(var k=0;i>k;++k)if(h=j[b-k]+h,!f(h)){if(d=g.exec(h))return d[1];if(d=e.exec(h))return d[1]}return F}function e(a,b){var d=c(a);if(!d.length)return null;var e=[],g=Math.floor(D.linesOfContext/2),h=g+D.linesOfContext%2,i=Math.max(0,b-g-1),j=Math.min(d.length,b+h-1);b-=1;for(var k=i;j>k;++k)f(d[k])||e.push(d[k]);return e.length>0?e:null}function g(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function i(a){return g(a).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function j(a,b){for(var d,e,f=0,g=b.length;g>f;++f)if((d=c(b[f])).length&&(d=d.join("\n"),e=a.exec(d)))return{url:b[f],line:d.substring(0,e.index).split("\n").length,column:e.index-d.lastIndexOf("\n",e.index)-1};return null}function k(a,b,d){var e,f=c(b),h=new RegExp("\\b"+g(a)+"\\b");return d-=1,f&&f.length>d&&(e=h.exec(f[d]))?e.index:null}function m(b){for(var c,d,e,f,h=[a.location.href],k=document.getElementsByTagName("script"),l=""+b,m=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,n=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,o=0;o<k.length;++o){var p=k[o];p.src&&h.push(p.src)}if(e=m.exec(l)){var q=e[1]?"\\s+"+e[1]:"",r=e[2].split(",").join("\\s*,\\s*");c=g(e[3]).replace(/;$/,";?"),d=new RegExp("function"+q+"\\s*\\(\\s*"+r+"\\s*\\)\\s*{\\s*"+c+"\\s*}")}else d=new RegExp(g(l).replace(/\s+/g,"\\s+"));if(f=j(d,h))return f;if(e=n.exec(l)){var s=e[1];if(c=i(e[2]),d=new RegExp("on"+s+"=[\\'\"]\\s*"+c+"\\s*[\\'\"]","i"),f=j(d,h[0]))return f;if(d=new RegExp(c),f=j(d,h))return f}return null}function n(a){if(!a.stack)return null;for(var b,c,g=/^\s*at (.*?) ?\(?((?:file|https?|chrome-extension):.*?):(\d+)(?::(\d+))?\)?\s*$/i,h=/^\s*(.*?)(?:\((.*?)\))?@((?:file|https?|chrome).*?):(\d+)(?::(\d+))?\s*$/i,i=a.stack.split("\n"),j=[],l=/^(.*) is undefined$/.exec(a.message),m=0,n=i.length;n>m;++m){if(b=h.exec(i[m]))c={url:b[3],func:b[1]||F,args:b[2]?b[2].split(","):"",line:+b[4],column:b[5]?+b[5]:null};else{if(!(b=g.exec(i[m])))continue;c={url:b[2],func:b[1]||F,line:+b[3],column:b[4]?+b[4]:null}}!c.func&&c.line&&(c.func=d(c.url,c.line)),c.line&&(c.context=e(c.url,c.line)),j.push(c)}return j.length?(j[0].line&&!j[0].column&&l?j[0].column=k(l[1],j[0].url,j[0].line):j[0].column||f(a.columnNumber)||(j[0].column=a.columnNumber+1),{name:a.name,message:a.message,url:document.location.href,stack:j}):null}function o(a){for(var b,c=a.stacktrace,f=/ line (\d+), column (\d+) in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\) in (.*):\s*$/i,g=c.split("\n"),h=[],i=0,j=g.length;j>i;i+=2)if(b=f.exec(g[i])){var k={line:+b[1],column:+b[2],func:b[3]||b[4],args:b[5]?b[5].split(","):[],url:b[6]};if(!k.func&&k.line&&(k.func=d(k.url,k.line)),k.line)try{k.context=e(k.url,k.line)}catch(l){}k.context||(k.context=[g[i+1]]),h.push(k)}return h.length?{name:a.name,message:a.message,url:document.location.href,stack:h}:null}function p(b){var f=b.message.split("\n");if(f.length<4)return null;var g,h,k,m,n=/^\s*Line (\d+) of linked script ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,o=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?)\S+)(?:: in function (\S+))?\s*$/i,p=/^\s*Line (\d+) of function script\s*$/i,q=[],r=document.getElementsByTagName("script"),s=[];for(h in r)l(r,h)&&!r[h].src&&s.push(r[h]);for(h=2,k=f.length;k>h;h+=2){var t=null;if(g=n.exec(f[h]))t={url:g[2],func:g[3],line:+g[1]};else if(g=o.exec(f[h])){t={url:g[3],func:g[4]};var u=+g[1],v=s[g[2]-1];if(v&&(m=c(t.url))){m=m.join("\n");var w=m.indexOf(v.innerText);w>=0&&(t.line=u+m.substring(0,w).split("\n").length)}}else if(g=p.exec(f[h])){var x=a.location.href.replace(/#.*$/,""),y=g[1],z=new RegExp(i(f[h+1]));m=j(z,[x]),t={url:x,line:m?m.line:y,func:""}}if(t){t.func||(t.func=d(t.url,t.line));var A=e(t.url,t.line),B=A?A[Math.floor(A.length/2)]:null;t.context=A&&B.replace(/^\s*/,"")===f[h+1].replace(/^\s*/,"")?A:[f[h+1]],q.push(t)}}return q.length?{name:b.name,message:f[0],url:document.location.href,stack:q}:null}function q(a,b,c,f){var g={url:b,line:c};if(g.url&&g.line){a.incomplete=!1,g.func||(g.func=d(g.url,g.line)),g.context||(g.context=e(g.url,g.line));var h=/ '([^']+)' /.exec(f);if(h&&(g.column=k(h[1],g.url,g.line)),a.stack.length>0&&a.stack[0].url===g.url){if(a.stack[0].line===g.line)return!1;if(!a.stack[0].line&&a.stack[0].func===g.func)return a.stack[0].line=g.line,a.stack[0].context=g.context,!1}return a.stack.unshift(g),a.partial=!0,!0}return a.incomplete=!0,!1}function r(a,b){for(var c,e,f,g=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,h=[],i={},j=!1,l=r.caller;l&&!j;l=l.caller)if(l!==s&&l!==D.report){if(e={url:null,func:F,line:null,column:null},l.name?e.func=l.name:(c=g.exec(l.toString()))&&(e.func=c[1]),f=m(l)){e.url=f.url,e.line=f.line,e.func===F&&(e.func=d(e.url,e.line));var n=/ '([^']+)' /.exec(a.message||a.description);n&&(e.column=k(n[1],f.url,f.line))}i[""+l]?j=!0:i[""+l]=!0,h.push(e)}b&&h.splice(0,b);var o={name:a.name,message:a.message,url:document.location.href,stack:h};return q(o,a.sourceURL||a.fileName,a.line||a.lineNumber,a.message||a.description),o}function s(a,b){var c=null;b=null==b?0:+b;try{if(c=o(a))return c}catch(d){if(t)throw d}try{if(c=n(a))return c}catch(d){if(t)throw d}try{if(c=p(a))return c}catch(d){if(t)throw d}try{if(c=r(a,b+1))return c}catch(d){if(t)throw d}return{}}var t=!1,u={};return s.augmentStackTraceWithInitialElement=q,s.computeStackTraceFromStackProp=n,s.guessFunctionName=d,s.gatherContext=e,s}();var G,H,I,J,K,L,M,N=a.Raven,O=!("object"!=typeof JSON||!JSON.stringify),P={logger:"javascript",ignoreErrors:[],ignoreUrls:[],whitelistUrls:[],includePaths:[],collectWindowErrors:!0,tags:{},maxMessageLength:100,extra:{}},Q=!1,R=Object.prototype,S=u(),T={VERSION:"1.1.18",debug:!0,noConflict:function(){return a.Raven=N,T},config:function(a,b){if(I)return B("error","Error: Raven has already been configured"),T;if(!a)return T;var c=e(a),d=c.path.lastIndexOf("/"),f=c.path.substr(1,d);return b&&m(b,function(a,b){P[a]=b}),P.ignoreErrors.push(/^Script error\.?$/),P.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/),P.ignoreErrors=z(P.ignoreErrors),P.ignoreUrls=P.ignoreUrls.length?z(P.ignoreUrls):!1,P.whitelistUrls=P.whitelistUrls.length?z(P.whitelistUrls):!1,P.includePaths=z(P.includePaths),K=c.user,L=c.path.substr(d+1),I="//"+c.host+(c.port?":"+c.port:"")+"/"+f+"api/"+L+"/store/",c.protocol&&(I=c.protocol+":"+I),P.fetchContext&&(D.remoteFetching=!0),P.linesOfContext&&(D.linesOfContext=P.linesOfContext),D.collectWindowErrors=!!P.collectWindowErrors,n(),T},install:function(){return y()&&!Q&&(D.report.subscribe(o),Q=!0),T},context:function(a,c,d){return g(a)&&(d=c||[],c=a,a=b),T.wrap(a,c).apply(this,d)},wrap:function(a,c){function d(){for(var b=[],d=arguments.length,e=!a||a&&a.deep!==!1;d--;)b[d]=e?T.wrap(a,arguments[d]):arguments[d];try{return c.apply(this,b)}catch(f){throw T.captureException(f,a),f}}if(f(c)&&!g(a))return a;if(g(a)&&(c=a,a=b),!g(c))return c;if(c.__raven__)return c;for(var e in c)l(c,e)&&(d[e]=c[e]);return d.__raven__=!0,d.__inner__=c,d},uninstall:function(){return D.report.uninstall(),Q=!1,T},captureException:function(a,b){if(!k(a))return T.captureMessage(a,b);G=a;try{D.report(a,b)}catch(c){if(a!==c)throw c}return T},captureMessage:function(a,b){return P.ignoreErrors.test&&P.ignoreErrors.test(a)?void 0:(w(s({message:a+""},b)),T)},setUserContext:function(a){return J=a,T},setExtraContext:function(a){return P.extra=a||{},T},setTagsContext:function(a){return P.tags=a||{},T},setReleaseContext:function(a){return P.release=a,T},lastException:function(){return G},lastEventId:function(){return H},isSetup:function(){return y()}};T.setUser=T.setUserContext;var U="source protocol user pass host port path".split(" "),V=/^(?:(\w+):)?\/\/(\w+)(:\w+)?@([\w\.-]+)(?::(\d+))?(\/.*)/;d.prototype=new Error,d.prototype.constructor=d,C(),"function"==typeof define&&define.amd?(a.Raven=T,define("raven",[],function(){return T})):"object"==typeof module?module.exports=T:"object"==typeof exports?exports=T:a.Raven=T}(window),function(a,b,c){"use strict";if(c){var d=c.event.add;c.event.add=function(a,e,f,g,h){var i;return f&&f.handler?(i=f.handler,f.handler=b.wrap(f.handler)):(i=f,f=b.wrap(f)),f.guid=i.guid?i.guid:i.guid=c.guid++,d.call(this,a,e,f,g,h)};var e=c.fn.ready;c.fn.ready=function(a){return e.call(this,b.wrap(a))};var f=c.ajax;c.ajax=function(a,d){var e,g=["complete","error","success"];for("object"==typeof a&&(d=a,a=void 0),d=d||{};e=g.pop();)c.isFunction(d[e])&&(d[e]=b.wrap(d[e]));try{return f.call(this,a,d)}catch(h){throw b.captureException(h),h}}}}(window,window.Raven,window.jQuery),function(a,b){"use strict";var c=function(c){var d=a[c];a[c]=function(){var a=[].slice.call(arguments),c=a[0];return"function"==typeof c&&(a[0]=b.wrap(c)),d.apply?d.apply(this,a):d(a[0],a[1])}};c("setTimeout"),c("setInterval")}(window,window.Raven);
//# sourceMappingURL=raven.min.map
;
/**
 * Angular.js plugin
 *
 * Provides an $exceptionHandler for Angular.js
 * Original Source: https://github.com/getsentry/raven-js/blob/master/plugins/angular.js
 */

;(function(Raven, angular) {
  'use strict';

// quit if angular isn't on the page
  if (!angular) {
    return;
  }

  function ngRavenProvider($provide) {
    $provide.decorator('$exceptionHandler', [
      'RavenConfig', '$delegate',
      ngRavenExceptionHandler
    ]);
  }

  function ngRavenExceptionHandler(RavenConfig, $delegate) {
    if (!RavenConfig)
      throw new Error('RavenConfig must be set before using this');

    Raven.config(RavenConfig.dsn, RavenConfig.config).install();
    return function angularExceptionHandler(ex, cause) {
      $delegate(ex, cause);
      Raven.captureException(ex, {
        checksum: ex.message.replace(/\d/g, '').slice(0, 128), // custom error aggregation
        extra: {cause: cause}
      });
    };
  }

  angular.module('ngRaven', [])
    .config(['$provide', ngRavenProvider])
    .value('Raven', Raven);

})(window.Raven, window.angular);
/**
 * console plugin for Raven.js
 *
 * Monkey patches console.* calls into Sentry messages with their appropriate log levels.
 * Original Source: https://github.com/getsentry/raven-js/blob/master/plugins/console.js
 */

;(function(window, Raven, console) {
  'use strict';

  var originalConsole = console,
    logLevels = ['debug', 'info', 'warn', 'error'],
    level = logLevels.pop();

  var logForGivenLevel = function(level) {
    var originalConsoleLevel = console[level];

    // Only track errors
    if (level === 'warn' || level === 'info' || level === 'debug') return function() {};
    return function () {
      var args = [].slice.call(arguments);

      // Capture the error as an exception (messages are hard to debug)
      if (arguments[0] instanceof Error) var error = arguments[0];
      else var error = new Error(args);
      Raven.captureException(error, {
        level: level,
        logger: 'console',
        checksum: error.message.replace(/\d/g, '').slice(0,32)
      });

      // this fails for some browsers. :(
      if (originalConsoleLevel) {
        // IE9 doesn't allow calling apply on console functions directly
        // See: https://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function#answer-5473193
        Function.prototype.bind
          .call(originalConsoleLevel, originalConsole)
          .apply(originalConsole, args);
      }
    };
  };


  while(level) {
    console[level] = logForGivenLevel(level);
    level = logLevels.pop();
  }
// export
  window.console = console;

}(window, window.Raven, window.console || {}));
//Customized script: http://ravenjs.com/
//NOTE: passing in a custom checksom allows you to control error aggregation:
// - Raven.captureException(new Error(msg), {logger: 'alert', level: 'warning', checksum: '9B4ED28285A44BDB276AF504D3CF88C0'});




// Error logging, original blacklist: https://gist.github.com/impressiver/5092952
Raven.config('https://bb28ffaec2f1408886721af5f496e6f9@app.getsentry.com/24519', {
  ignoreErrors: [
    'cross-origin frame',
    'canvas.contentDocument',
    'fb_xd_fragment'
  ],
  ignoreUrls: [
    /visualcv/i, // TODO remove this ignore?
    /graph\.facebook\.com/i,
    /connect\.facebook\.net\/en_US\/all\.js/i,
    /extensions\//i,
    /^chrome:\/\//i
  ]
}).install();
if (window._user && window._user.id) {
  Raven.setUserContext({
    id: window._user.id,
    email: window._user.email
  });
}
;
