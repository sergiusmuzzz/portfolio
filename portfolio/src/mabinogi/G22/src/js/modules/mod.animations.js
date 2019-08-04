/*! parallaxer.js - v0.1.42 - 2014-05-28 - https://github.com/andrzejdus/parallaxer.js.git */
var andrzejdus = {utils: {}};
andrzejdus.utils.events = {};
andrzejdus.utils.events.EventManager = {};

function EventManager(a) {
    var b = [];
    this.addEventListener = function (a) {
        a instanceof Function ? b.push(a) : console.error("Couldn't add event listener. Target isn't a function.")
    };
    this.removeEventListener = function (a) {
        if (a instanceof Function) {
            for (var d = [], e = 0; e < b.length; e++) {
                var f = b[e];
                f !== a && d.push(f)
            }
            b = d
        } else console.error("Couldn't remove event listener. Target isn't a function.")
    };
    this.dispatch = function (c) {
        a && console.log("Dispatching to event listeners. Targets serialization: " + JSON.stringify(b));
        for (var d =
            0; d < b.length; d++) b[d].apply(this, arguments)
    }
};andrzejdus.utils.events.EventsManager = {};

function EventsManager(a) {
    var b = {};
    this.registerType = function (c) {
        a && console.log('Registering type "' + c + '".');
        void 0 === b[c] ? b[c] = new EventManager(a) : console.error('Type "' + JSON.stringify(c) + '" already registered.')
    };
    this.addEventListener = function (c, d) {
        a && console.log('Adding event listener for "' + c + '".');
        b[c] ? b[c].addEventListener(d) : console.error("Couldn't add event. Type \"" + JSON.stringify(c) + '" doesn\'t exist. Please use "registerType" method first.')
    };
    this.removeEventListener = function (c, d) {
        a && console.log('Removing event listener for "' +
            c + '".');
        b[c] ? b[c].removeEventListener(d) : console.error("Couldn't remove event. Type \"" + JSON.stringify(c) + '" doesn\'t exist. Please use "registerType" method first.')
    };
    this.dispatch = function (c) {
        a && console.log('Dispatching to event listeners for "' + c + '". Event managers serialization: ' + JSON.stringify(b));
        if (b[c]) {
            var d = Array.prototype.slice.call(arguments);
            d.shift();
            b[c].dispatch.apply(this, d)
        } else console.error("Couldn't dispatch event. Type \"" + JSON.stringify(c) + '" doesn\'t exist. Please use "registerType" method first.')
    }
}
;andrzejdus.utils.Utils = {};
var Utils = {
    delegate: function (a, b) {
        return function () {
            return b.apply(a, arguments)
        }
    }, getComputedStyle: function (a, b) {
        return a.currentStyle ? a.currentStyle[b] : window.getComputedStyle(a)[b]
    }, addEventListener: function (a, b, c) {
        a.addEventListener ? a.addEventListener(b, c) : a.attachEvent && a.attachEvent(b, c)
    }, removeEventListener: function (a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c) : a.detachEvent && a.detachEvent(b, c)
    }
};
andrzejdus.utils.Log = {};
var DEBUG = !0, Log = function () {
    this.l = function (a) {
        try {
            console
        } catch (b) {
            console = {}
        }
        if (DEBUG && console && console.log) {
            var c = Error();
            if ((c = c ? c.stack : null) && console.groupCollapsed && console.groupEnd) {
                var d = 2;
                0 <= c.search("Error") && (d = 3);
                var e = null;
                c.split("\n").length >= d && (e = c.split("\n"));
                console.groupCollapsed(a + " [" + e[d - 1].split("/").pop().replace(/\)*\n\s*/g, "") + "]");
                console.log(c.replace(/^Error/, "STACK TRACE"));
                console.groupEnd()
            } else console.log(a)
        }
    };
    return this
}();
andrzejdus.utils.Looper = {};
var Looper = function (a) {
    var b = !1, c = null, d = null;
    this.start = function () {
        !1 === b && (b = !0, d = Date.now() - 1, e())
    };
    this.stop = function () {
        !0 === b && (b = !1)
    };
    var e = function () {
        if (!0 === b) {
            var f = Date.now();
            c = f - d;
            d = f;
            requestAnimationFrame(e);
            a(c)
        }
    }
};
andrzejdus.parallaxer = {};
andrzejdus.parallaxer.ParallaxerCoreEvent = {};
andrzejdus = andrzejdus || {};
andrzejdus.parallaxer = andrzejdus.parallaxer || {};
(function (a, b) {
    var c = function (a) {
        this.source = a
    };
    c.CURRENT_POSITION_CHANGED = "current_position_changed";
    c.TARGET_POSITION_CHANGED = "target_position_changed";
    c.AFTER_FIRST_DRAW = "after_first_draw";
    c.AFTER_LOOP_STOP = "after_loop_stop";
    a.ParallaxerCoreEvent = c
})(andrzejdus.parallaxer);
andrzejdus.parallaxer.drawer = {};
andrzejdus.parallaxer.drawer.Cache = {};
andrzejdus = andrzejdus || {};
andrzejdus.parallaxer = andrzejdus.parallaxer || {};
(function (a, b) {
    a.Cache = function (a) {
        var b = {};
        this.get = function (e) {
            var f = b[e];
            f || (f = a(e), b[e] = f);
            return f
        }
    }
})(andrzejdus.parallaxer);
andrzejdus.parallaxer.drawer.VisibilityChecker = {};
andrzejdus = andrzejdus || {};
andrzejdus.parallaxer = andrzejdus.parallaxer || {};
(function (a, b) {
    a.VisibilityChecker = function () {
        var a = null, b = null, e = function () {
            a = 0;
            b = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight
        };
        e();
        $(window).on("resize", function () {
            e()
        });
        this.isVisible = function (e, g) {
            var h = !1;
            if (e >= a && e <= b || g >= a && g <= b || e < a && g > b) h = !0;
            return h
        }
    }
})(andrzejdus.parallaxer);
andrzejdus.parallaxer.drawer.DrawerObject = {};
andrzejdus = andrzejdus || {};
andrzejdus.parallaxer = andrzejdus.parallaxer || {};
(function (a, b) {
    var c = function (a, b, c) {
        var g = !0;
        this.getElement = function () {
            return a
        };
        this.getOffset = function () {
            return c
        };
        this.setOffset = function (a) {
            c = a
        };
        this.getType = function () {
            return b
        };
        this.isVisible = function () {
            return g
        };
        this.updateVisibility = function (a) {
            g = a
        }
    };
    c.HORIZONTAL = "horizontal";
    c.VERTICAL = "vertical";
    a.DrawerObject = c
})(andrzejdus.parallaxer);
andrzejdus.parallaxer.drawer.Drawer = {};
andrzejdus = andrzejdus || {};
andrzejdus.parallaxer = andrzejdus.parallaxer || {};
(function (a, b) {
    a.Drawer = function () {
        var a = andrzejdus.parallaxer.DrawerObject, b = andrzejdus.parallaxer.Cache,
            e = andrzejdus.parallaxer.VisibilityChecker, f = Modernizr.prefixed("transform"), g = {}, h = {}, l = null,
            k = new e;
        Utils.delegate(this, function () {
            l = new b(function (a) {
            })
        })();
        this.addObject = function (b, d, e, f) {
            g[b] = new a(d, e, f);
            h = {}
        };
        this.startFrame = function () {
            h = {}
        };
        this.updateOffset = function (a, b) {
            var c = g[a];
            if (c) {
                c.setOffset(b);
                var d = c.getElement();
                c.updateVisibility(k.isVisible(c.getOffset(), l.get(d)));
                h[a] =
                    c
            } else console.error("Unknown object id " + a)
        };
        this.draw = function () {
            for (var b in h) {
                var d = h[b], e = d.getElement();
                e && (e.style[f] = "translate" + (d.getType() === a.HORIZONTAL ? "X" : "Y") + "(" + d.getOffset() + "px) translateZ(0px)")
            }
        }
    }
})(andrzejdus.parallaxer);
andrzejdus.parallaxer.ParallaxerCore = {};
andrzejdus = andrzejdus || {};
andrzejdus.parallaxer = andrzejdus.parallaxer || {};
(function (a, b) {
    var c = function (a) {
        var e = andrzejdus.parallaxer.ParallaxerCoreEvent, f = andrzejdus.parallaxer.Drawer,
            g = andrzejdus.parallaxer.DrawerObject, h, l, k, s, t, m, n, p, q = null, r = function () {
                return s
            }, v = function (a) {
                !1 === u(a, !1) && (p.stop(), k.dispatch(e.AFTER_LOOP_STOP, new e(this)));
                q && q(a)
            }.bind(this), u = function (a, b) {
                var c = l - h, d = Math.abs(c), g = !1;
                if (0.2 < d || b) {
                    g = !0;
                    r ? (c = c / 30 * (a / (1E3 / 60)), 1 > Math.abs(c) && (c = 0 < c ? 1 : -1), h += c, 0 > d - Math.abs(c) && (h = l)) : h = l;
                    k.dispatch(e.CURRENT_POSITION_CHANGED, new e(this));
                    n.startFrame();
                    var d = h, f;
                    for (f in m) c = m[f], n.updateOffset(c.id, Math.floor((c.scrollOffset - d) * c.speed));
                    n.draw();
                    !0 === t && (t = !1, k.dispatch(e.AFTER_FIRST_DRAW, new e(this)))
                }
                return g
            }.bind(this);
        l = a === b ? h = 0 : h = a;
        k = new EventsManager;
        k.registerType(e.CURRENT_POSITION_CHANGED);
        k.registerType(e.TARGET_POSITION_CHANGED);
        k.registerType(e.AFTER_FIRST_DRAW);
        k.registerType(e.AFTER_LOOP_STOP);
        s = !1;
        m = [];
        n = new f;
        p = new Looper(v);
        this.addEventListener = function (a, b) {
            k.addEventListener(a, b)
        };
        this.removeEventListener = function (a, b) {
            k.removeEventListener(a,
                b)
        };
        this.addElement = function (a, d, e, f) {
            if (a === b) return null;
            d = {id: m.length, element: a, speed: d, type: f, scrollOffset: e};
            m.push(d);
            n.addObject(d.id, a, d.type === c.HORIZONTAL ? g.HORIZONTAL : g.VERTICAL, 0);
            return d
        };
        this.refresh = function () {
            u(0, !0)
        };
        this.isSmoothScrollEnabled = r;
        this.setSmoothScrollEnabled = function (a) {
            r = a
        };
        this.getCurrentScrollPosition = function () {
            return h
        };
        this.getTargetScrollPosition = function () {
            return l
        };
        this.setTargetScrollPosition = function (a) {
            l !== a && (l = a, k.dispatch(e.TARGET_POSITION_CHANGED,
                new e(this)), p.start())
        };
        this.setLoopFrameHook = function (a) {
            q = a
        }
    };
    c.HORIZONTAL = "horizontal";
    c.VERTICAL = "vertical";
    a.ParallaxerCore = c
})(andrzejdus.parallaxer);
andrzejdus.parallaxer.Parallaxer = {};
andrzejdus = andrzejdus || {};
andrzejdus.parallaxer = andrzejdus.parallaxer || {};
andrzejdus.DEBUG = !1;
(function (a, b) {
    a.Parallaxer = new function () {
        var a = !1, b, e = new andrzejdus.parallaxer.ParallaxerCore;
        this.start = function () {
            var f = $("body").height();
            $("body").height(f);
            b = [];
            $('[data-parallaxer="enabled"]').each(function () {
                var a = $(this);
                b.push({
                    element: this,
                    $element: a,
                    initialElementOffsetTop: a.offset().top,
                    offsetTop: parseInt(a.data("parallaxer-offset-top"), 10) || 0,
                    speed: a.data("parallaxer-speed"),
                    orientation: a.data("parallaxer-orientation"),
                    autoCss: "false" !== a.attr("data-parallaxer-auto-css")
                })
            });
            for (f =
                     0; f < b.length; f++) {
                var g = b[f];
                g.autoCss;
                e.addElement(g.element, g.speed, g.initialElementOffsetTop, andrzejdus.parallaxer.ParallaxerCore.VERTICAL)
            }
            var h = $(window);
            h.on("scroll.andrzejdus-parallaxer", function () {
                var a = h.scrollTop();
                e.setTargetScrollPosition(a)
            });
            e.setSmoothScrollEnabled(a);
            e.refresh()
        };
        this.stop = function () {
            $(window).off("scroll.andrzejdus-parallaxer");
            for (var a = Modernizr.prefixed("transform"), c = 0; c < b.length; c++) {
                var e = b[c];
                e.autoCss && (e.$element.css({
                    position: "",
                    top: ""
                }), e.element.style[a] = "")
            }
        };
        this.setSmoothScrollEnabled = function (b) {
            a = b
        };
        this.getCore = function () {
            return e
        }
    }
})(andrzejdus.parallaxer);
!function () {
    "use strict";

    function e(n) {
        return "undefined" == typeof this || Object.getPrototypeOf(this) !== e.prototype ? new e(n) : (E = this, E.version = "3.2.0", E.tools = new O, E.isSupported() ? (E.tools.extend(E.defaults, n || {}), t(E.defaults), E.store = {
            elements: {},
            containers: []
        }, E.sequences = {}, E.history = [], E.uid = 0, E.initialized = !1) : "undefined" != typeof console && null !== console, E)
    }

    function t(e) {
        if (e && e.container) {
            if ("string" == typeof e.container) return window.document.documentElement.querySelector(e.container);
            if (E.tools.isNode(e.container)) return e.container
        }
        return E.defaults.container
    }

    function n(e, t) {
        return "string" == typeof e ? Array.prototype.slice.call(t.querySelectorAll(e)) : E.tools.isNode(e) ? [e] : E.tools.isNodeList(e) ? Array.prototype.slice.call(e) : []
    }

    function i() {
        return ++E.uid
    }

    function o(e, t, n) {
        t.container && (t.container = n), e.config ? e.config = E.tools.extendClone(e.config, t) : e.config = E.tools.extendClone(E.defaults, t), "top" === e.config.origin || "bottom" === e.config.origin ? e.config.axis = "Y" : e.config.axis = "X"
    }

    function r(e) {
        var t = window.getComputedStyle(e.domEl);
        e.styles || (e.styles = {
            transition: {},
            transform: {},
            computed: {}
        }, e.styles.inline = e.domEl.getAttribute("style") || "", e.styles.inline += "; visibility: visible; ", e.styles.computed.opacity = t.opacity, t.transition && "all 0s ease 0s" !== t.transition ? e.styles.computed.transition = t.transition + ", " : e.styles.computed.transition = ""), e.styles.transition.instant = s(e, 0), e.styles.transition.delayed = s(e, e.config.delay), e.styles.transform.initial = " -webkit-transform:", e.styles.transform.target = " -webkit-transform:", a(e), e.styles.transform.initial += "transform:", e.styles.transform.target += "transform:", a(e)
    }

    function s(e, t) {
        var n = e.config;
        return "-webkit-transition: " + e.styles.computed.transition + "-webkit-transform " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s, opacity " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s; transition: " + e.styles.computed.transition + "transform " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s, opacity " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s; "
    }

    function a(e) {
        var t, n = e.config, i = e.styles.transform;
        t = "top" === n.origin || "left" === n.origin ? /^-/.test(n.distance) ? n.distance.substr(1) : "-" + n.distance : n.distance, parseInt(n.distance) && (i.initial += " translate" + n.axis + "(" + t + ")", i.target += " translate" + n.axis + "(0)"), n.scale && (i.initial += " scale(" + n.scale + ")", i.target += " scale(1)"), n.rotate.x && (i.initial += " rotateX(" + n.rotate.x + "deg)", i.target += " rotateX(0)"), n.rotate.y && (i.initial += " rotateY(" + n.rotate.y + "deg)", i.target += " rotateY(0)"), n.rotate.z && (i.initial += " rotateZ(" + n.rotate.z + "deg)", i.target += " rotateZ(0)"), i.initial += "; opacity: " + n.opacity + ";", i.target += "; opacity: " + e.styles.computed.opacity + ";"
    }

    function l(e) {
        var t = e.config.container;
        t && E.store.containers.indexOf(t) === -1 && E.store.containers.push(e.config.container), E.store.elements[e.id] = e
    }

    function c(e, t, n) {
        var i = {target: e, config: t, interval: n};
        E.history.push(i)
    }

    function d() {
        if (E.isSupported()) {
            y();
            for (var e = 0; e < E.store.containers.length; e++) E.store.containers[e].addEventListener("scroll", f), E.store.containers[e].addEventListener("resize", f);
            E.initialized || (window.addEventListener("scroll", f), window.addEventListener("resize", f), E.initialized = !0)
        }
        return E
    }

    function f() {
        T(y)
    }

    function u() {
        var e, t, n, i;
        E.tools.forOwn(E.sequences, function (o) {
            i = E.sequences[o], e = !1;
            for (var r = 0; r < i.elemIds.length; r++) n = i.elemIds[r], t = E.store.elements[n], q(t) && !e && (e = !0);
            i.active = e
        })
    }

    function y() {
        var e, t;
        u(), E.tools.forOwn(E.store.elements, function (n) {
            t = E.store.elements[n], e = w(t), g(t) ? (e ? t.domEl.setAttribute("style", t.styles.inline + t.styles.transform.target + t.styles.transition.delayed) : t.domEl.setAttribute("style", t.styles.inline + t.styles.transform.target + t.styles.transition.instant), p("reveal", t, e), t.revealing = !0, t.seen = !0, t.sequence && m(t, e)) : v(t) && (t.domEl.setAttribute("style", t.styles.inline + t.styles.transform.initial + t.styles.transition.instant), p("reset", t), t.revealing = !1)
        })
    }

    function m(e, t) {
        var n = 0, i = 0, o = E.sequences[e.sequence.id];
        o.blocked = !0, t && "onload" === e.config.useDelay && (i = e.config.delay), e.sequence.timer && (n = Math.abs(e.sequence.timer.started - new Date), window.clearTimeout(e.sequence.timer)), e.sequence.timer = {started: new Date}, e.sequence.timer.clock = window.setTimeout(function () {
            o.blocked = !1, e.sequence.timer = null, f()
        }, Math.abs(o.interval) + i - n)
    }

    function p(e, t, n) {
        var i = 0, o = 0, r = "after";
        switch (e) {
            case"reveal":
                o = t.config.duration, n && (o += t.config.delay), r += "Reveal";
                break;
            case"reset":
                o = t.config.duration, r += "Reset"
        }
        t.timer && (i = Math.abs(t.timer.started - new Date), window.clearTimeout(t.timer.clock)), t.timer = {started: new Date}, t.timer.clock = window.setTimeout(function () {
            t.config[r](t.domEl), t.timer = null
        }, o - i)
    }

    function g(e) {
        if (e.sequence) {
            var t = E.sequences[e.sequence.id];
            return t.active && !t.blocked && !e.revealing && !e.disabled
        }
        return q(e) && !e.revealing && !e.disabled
    }

    function w(e) {
        var t = e.config.useDelay;
        return "always" === t || "onload" === t && !E.initialized || "once" === t && !e.seen
    }

    function v(e) {
        if (e.sequence) {
            var t = E.sequences[e.sequence.id];
            return !t.active && e.config.reset && e.revealing && !e.disabled
        }
        return !q(e) && e.config.reset && e.revealing && !e.disabled
    }

    function b(e) {
        return {width: e.clientWidth, height: e.clientHeight}
    }

    function h(e) {
        if (e && e !== window.document.documentElement) {
            var t = x(e);
            return {x: e.scrollLeft + t.left, y: e.scrollTop + t.top}
        }
        return {x: window.pageXOffset, y: window.pageYOffset}
    }

    function x(e) {
        var t = 0, n = 0, i = e.offsetHeight, o = e.offsetWidth;
        do isNaN(e.offsetTop) || (t += e.offsetTop), isNaN(e.offsetLeft) || (n += e.offsetLeft), e = e.offsetParent; while (e);
        return {top: t, left: n, height: i, width: o}
    }

    function q(e) {
        function t() {
            var t = c + a * s, n = d + l * s, i = f - a * s, y = u - l * s, m = r.y + e.config.viewOffset.top,
                p = r.x + e.config.viewOffset.left, g = r.y - e.config.viewOffset.bottom + o.height,
                w = r.x - e.config.viewOffset.right + o.width;
            return t < g && i > m && n > p && y < w
        }

        function n() {
            return "fixed" === window.getComputedStyle(e.domEl).position
        }

        var i = x(e.domEl), o = b(e.config.container), r = h(e.config.container), s = e.config.viewFactor, a = i.height,
            l = i.width, c = i.top, d = i.left, f = c + a, u = d + l;
        return t() || n()
    }

    function O() {
    }

    var E, T;
    e.prototype.defaults = {
        origin: "bottom",
        distance: "20px",
        duration: 500,
        delay: 0,
        rotate: {x: 0, y: 0, z: 0},
        opacity: 0,
        scale: .9,
        easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",
        container: window.document.documentElement,
        mobile: !0,
        reset: !1,
        useDelay: "always",
        viewFactor: .2,
        viewOffset: {top: 0, right: 0, bottom: 0, left: 0},
        afterReveal: function (e) {
        },
        afterReset: function (e) {
        }
    }, e.prototype.isSupported = function () {
        var e = document.documentElement.style;
        return "WebkitTransition" in e && "WebkitTransform" in e || "transition" in e && "transform" in e
    }, e.prototype.reveal = function (e, s, a, f) {
        var u, y, m, p, g, w;
        if (void 0 !== s && "number" == typeof s ? (a = s, s = {}) : void 0 !== s && null !== s || (s = {}), u = t(s), y = n(e, u), !y.length) return E;
        a && "number" == typeof a && (w = i(), g = E.sequences[w] = {id: w, interval: a, elemIds: [], active: !1});
        for (var v = 0; v < y.length; v++) p = y[v].getAttribute("data-sr-id"), p ? m = E.store.elements[p] : (m = {
            id: i(),
            domEl: y[v],
            seen: !1,
            revealing: !1
        }, m.domEl.setAttribute("data-sr-id", m.id)), g && (m.sequence = {
            id: g.id,
            index: g.elemIds.length
        }, g.elemIds.push(m.id)), o(m, s, u), r(m), l(m), E.tools.isMobile() && !m.config.mobile || !E.isSupported() ? (m.domEl.setAttribute("style", m.styles.inline), m.disabled = !0) : m.revealing || m.domEl.setAttribute("style", m.styles.inline + m.styles.transform.initial);
        return !f && E.isSupported() && (c(e, s, a), E.initTimeout && window.clearTimeout(E.initTimeout), E.initTimeout = window.setTimeout(d, 0)), E
    }, e.prototype.sync = function () {
        if (E.history.length && E.isSupported()) {
            for (var e = 0; e < E.history.length; e++) {
                var t = E.history[e];
                E.reveal(t.target, t.config, t.interval, !0)
            }
            d()
        }
        return E
    }, O.prototype.isObject = function (e) {
        return null !== e && "object" == typeof e && e.constructor === Object
    }, O.prototype.isNode = function (e) {
        return "object" == typeof window.Node ? e instanceof window.Node : e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName
    }, O.prototype.isNodeList = function (e) {
        var t = Object.prototype.toString.call(e), n = /^\[object (HTMLCollection|NodeList|Object)\]$/;
        return "object" == typeof window.NodeList ? e instanceof window.NodeList : e && "object" == typeof e && n.test(t) && "number" == typeof e.length && (0 === e.length || this.isNode(e[0]))
    }, O.prototype.forOwn = function (e, t) {
        if (!this.isObject(e)) throw new TypeError('Expected "object", but received "' + typeof e + '".');
        for (var n in e) e.hasOwnProperty(n) && t(n)
    }, O.prototype.extend = function (e, t) {
        return this.forOwn(t, function (n) {
            this.isObject(t[n]) ? (e[n] && this.isObject(e[n]) || (e[n] = {}), this.extend(e[n], t[n])) : e[n] = t[n]
        }.bind(this)), e
    }, O.prototype.extendClone = function (e, t) {
        return this.extend(this.extend({}, e), t)
    }, O.prototype.isMobile = function () {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }, T = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e) {
        window.setTimeout(e, 1e3 / 60)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
        return e
    }) : "undefined" != typeof module && module.exports ? module.exports = e : window.ScrollReveal = e
}();
!function () {
    function e() {
        z.keyboardSupport && m("keydown", a)
    }

    function t() {
        if (!A && document.body) {
            A = !0;
            var t = document.body, o = document.documentElement, n = window.innerHeight, r = t.scrollHeight;
            if (B = document.compatMode.indexOf("CSS") >= 0 ? o : t, D = t, e(), top != self) X = !0; else if (r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
                var a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + B.scrollHeight + "px", document.body.appendChild(a);
                var i;
                T = function () {
                    i || (i = setTimeout(function () {
                        L || (a.style.height = "0", a.style.height = B.scrollHeight + "px", i = null)
                    }, 500))
                }, setTimeout(T, 10), m("resize", T);
                var l = {attributes: !0, childList: !0, characterData: !1};
                if (M = new W(T), M.observe(t, l), B.offsetHeight <= n) {
                    var c = document.createElement("div");
                    c.style.clear = "both", t.appendChild(c)
                }
            }
            z.fixedBackground || L || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
        }
    }

    function o() {
        M && M.disconnect(), w(_, r), w("mousedown", i), w("keydown", a), w("resize", T), w("load", t)
    }

    function n(e, t, o) {
        if (p(t, o), 1 != z.accelerationMax) {
            var n = Date.now(), r = n - j;
            if (r < z.accelerationDelta) {
                var a = (1 + 50 / r) / 2;
                a > 1 && (a = Math.min(a, z.accelerationMax), t *= a, o *= a)
            }
            j = Date.now()
        }
        if (q.push({x: t, y: o, lastX: 0 > t ? .99 : -.99, lastY: 0 > o ? .99 : -.99, start: Date.now()}), !P) {
            var i = e === document.body, l = function (n) {
                for (var r = Date.now(), a = 0, c = 0, u = 0; u < q.length; u++) {
                    var d = q[u], s = r - d.start, f = s >= z.animationTime, m = f ? 1 : s / z.animationTime;
                    z.pulseAlgorithm && (m = x(m));
                    var w = d.x * m - d.lastX >> 0, h = d.y * m - d.lastY >> 0;
                    a += w, c += h, d.lastX += w, d.lastY += h, f && (q.splice(u, 1), u--)
                }
                i ? window.scrollBy(a, c) : (a && (e.scrollLeft += a), c && (e.scrollTop += c)), t || o || (q = []), q.length ? V(l, e, 1e3 / z.frameRate + 1) : P = !1
            };
            V(l, e, 0), P = !0
        }
    }

    function r(e) {
        A || t();
        var o = e.target, r = u(o);
        if (!r || e.defaultPrevented || e.ctrlKey) return !0;
        if (h(D, "embed") || h(o, "embed") && /\.pdf/i.test(o.src) || h(D, "object") || o.shadowRoot) return !0;
        var a = -e.wheelDeltaX || e.deltaX || 0, i = -e.wheelDeltaY || e.deltaY || 0;
        return O && (e.wheelDeltaX && b(e.wheelDeltaX, 120) && (a = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))), e.wheelDeltaY && b(e.wheelDeltaY, 120) && (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))), a || i || (i = -e.wheelDelta || 0), 1 === e.deltaMode && (a *= 40, i *= 40), !z.touchpadSupport && v(i) ? !0 : (Math.abs(a) > 1.2 && (a *= z.stepSize / 120), Math.abs(i) > 1.2 && (i *= z.stepSize / 120), n(r, a, i), e.preventDefault(), void l())
    }

    function a(e) {
        var t = e.target, o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== K.spacebar;
        document.body.contains(D) || (D = document.activeElement);
        var r = /^(textarea|select|embed|object)$/i, a = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (e.defaultPrevented || r.test(t.nodeName) || h(t, "input") && !a.test(t.type) || h(D, "video") || g(e) || t.isContentEditable || o) return !0;
        if ((h(t, "button") || h(t, "input") && a.test(t.type)) && e.keyCode === K.spacebar) return !0;
        if (h(t, "input") && "radio" == t.type && R[e.keyCode]) return !0;
        var i, c = 0, d = 0, s = u(D), f = s.clientHeight;
        switch (s == document.body && (f = window.innerHeight), e.keyCode) {
            case K.up:
                d = -z.arrowScroll;
                break;
            case K.down:
                d = z.arrowScroll;
                break;
            case K.spacebar:
                i = e.shiftKey ? 1 : -1, d = -i * f * .9;
                break;
            case K.pageup:
                d = .9 * -f;
                break;
            case K.pagedown:
                d = .9 * f;
                break;
            case K.home:
                d = -s.scrollTop;
                break;
            case K.end:
                var m = s.scrollHeight - s.scrollTop - f;
                d = m > 0 ? m + 10 : 0;
                break;
            case K.left:
                c = -z.arrowScroll;
                break;
            case K.right:
                c = z.arrowScroll;
                break;
            default:
                return !0
        }
        n(s, c, d), e.preventDefault(), l()
    }

    function i(e) {
        D = e.target
    }

    function l() {
        clearTimeout(E), E = setInterval(function () {
            I = {}
        }, 1e3)
    }

    function c(e, t) {
        for (var o = e.length; o--;) I[F(e[o])] = t;
        return t
    }

    function u(e) {
        var t = [], o = document.body, n = B.scrollHeight;
        do {
            var r = I[F(e)];
            if (r) return c(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = s(B) && s(o), i = a || f(B);
                if (X && d(B) || !X && i) return c(t, $())
            } else if (d(e) && f(e)) return c(t, e)
        } while (e = e.parentElement)
    }

    function d(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function s(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "hidden" !== t
    }

    function f(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function m(e, t) {
        window.addEventListener(e, t, !1)
    }

    function w(e, t) {
        window.removeEventListener(e, t, !1)
    }

    function h(e, t) {
        return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }

    function p(e, t) {
        e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (Y.x !== e || Y.y !== t) && (Y.x = e, Y.y = t, q = [], j = 0)
    }

    function v(e) {
        return e ? (N.length || (N = [e, e, e]), e = Math.abs(e), N.push(e), N.shift(), clearTimeout(C), C = setTimeout(function () {
            window.localStorage && (localStorage.SS_deltaBuffer = N.join(","))
        }, 1e3), !y(120) && !y(100)) : void 0
    }

    function b(e, t) {
        return Math.floor(e / t) == e / t
    }

    function y(e) {
        return b(N[0], e) && b(N[1], e) && b(N[2], e)
    }

    function g(e) {
        var t = e.target, o = !1;
        if (-1 != document.URL.indexOf("www.youtube.com/watch")) do if (o = t.classList && t.classList.contains("html5-video-controls")) break; while (t = t.parentNode);
        return o
    }

    function S(e) {
        var t, o, n;
        return e *= z.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * z.pulseNormalize
    }

    function x(e) {
        return e >= 1 ? 1 : 0 >= e ? 0 : (1 == z.pulseNormalize && (z.pulseNormalize /= S(1)), S(e))
    }

    function k(e) {
        for (var t in e) H.hasOwnProperty(t) && (z[t] = e[t])
    }

    var D, M, T, E, C, H = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            touchpadSupport: !1,
            fixedBackground: !0,
            excluded: ""
        }, z = H, L = !1, X = !1, Y = {x: 0, y: 0}, A = !1, B = document.documentElement, N = [],
        O = /^Mac/.test(navigator.platform),
        K = {left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36},
        R = {37: 1, 38: 1, 39: 1, 40: 1}, q = [], P = !1, j = Date.now(), F = function () {
            var e = 0;
            return function (t) {
                return t.uniqueID || (t.uniqueID = e++)
            }
        }(), I = {};
    window.localStorage && localStorage.SS_deltaBuffer && (N = localStorage.SS_deltaBuffer.split(","));
    var _, V = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e, t, o) {
                window.setTimeout(e, o || 1e3 / 60)
            }
        }(), W = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, $ = function () {
            var e;
            return function () {
                if (!e) {
                    var t = document.createElement("div");
                    t.style.cssText = "height:10000px;width:1px;", document.body.appendChild(t);
                    var o = document.body.scrollTop;
                    document.documentElement.scrollTop;
                    window.scrollBy(0, 3), e = document.body.scrollTop != o ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(t)
                }
                return e
            }
        }(), U = window.navigator.userAgent, G = /Edge/.test(U), J = /chrome/i.test(U) && !G, Q = /safari/i.test(U) && !G,
        Z = /mobile/i.test(U), ee = /Windows NT 6.1/i.test(U) && /rv:11/i.test(U), te = (J || Q || ee) && !Z;
    "onwheel" in document.createElement("div") ? _ = "wheel" : "onmousewheel" in document.createElement("div") && (_ = "mousewheel"), _ && te && (m(_, r), m("mousedown", i), m("load", t)), k.destroy = o, window.SmoothScrollOptions && k(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () {
        return k
    }) : "object" == typeof exports ? module.exports = k : window.SmoothScroll = k
}();