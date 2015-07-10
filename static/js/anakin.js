a! function t(e, i, n) {
    function o(a, r) {
        if (!i[a]) {
            if (!e[a]) {
                var l = "function" == typeof require && require;
                if (!r && l) return l(a, !0);
                if (s) return s(a, !0);
                throw new Error("Cannot find module '" + a + "'")
            }
            var p = i[a] = {
                exports: {}
            };
            e[a][0].call(p.exports, function(t) {
                var i = e[a][1][t];
                return o(i ? i : t)
            }, p, p.exports, t, e, i, n)
        }
        return i[a].exports
    }
    for (var s = "function" == typeof require && require, a = 0; a < n.length; a++) o(n[a]);
    return o
}({
    1: [
        function(t, e) {
            function i(t) {
                "use strict";
                this.src = t, this.element = null, "undefined" != typeof t && this.create()
            }
            var n = t("./ImageLoaded.js");
            i.prototype.create = function() {
                "use strict";
                this.element = document.createElement("img"), this.element.setAttribute("src", this.src)
            }, i.prototype.preload = function(t) {
                "use strict";
                n(this.element, function(e, i) {
                    t(e, i)
                })
            }, e.exports = i
        }, {
            "./ImageLoaded.js": 2
        }
    ],
    2: [
        function(t, e) {
            function i(t, e) {
                "use strict";

                function i(t, e, i, n) {
                    t.addEventListener ? t[i ? "addEventListener" : "removeEventListener"](e, n) : t[i ? "attachEvent" : "detachEvent"]("on" + e, n)
                }

                function o() {
                    i(t, "load", !1, o), i(t, "error", !1, o), e(null, !1)
                }
                var s;
                return t.nodeName ? "img" !== t.nodeName.toLowerCase() ? e(new Error("Element supplied is not an image")) : t.src && t.complete && void 0 !== t.naturalWidth ? e(null, !0) : (i(t, "load", !0, o), i(t, "error", !0, o), void((t.readyState || t.complete) && (s = t.src, t.src = n, t.src = s))) : e(new Error("First argument must be an image element"))
            }
            var n = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            e.exports = i
        }, {}
    ],
    3: [
        function(t, e) {
            function i(t) {
                "use strict";
                this.parent = t, this.sources = [], this.images = [], this.loaded = 0, this.deepSearch = !0
            }
            var n = t("./Image.js");
            i.prototype.getImageSrcs = function(t) {
                "use strict";
                if (this.sources = [], "undefined" != typeof t && (this.findImageInElement(t), this.deepSearch === !0))
                    for (var e = t.querySelectorAll("*"), i = 0; i < e.length; i++) "SCRIPT" !== e[i].tagName && this.findImageInElement(e[i]);
                return this.sources
            }, i.prototype.findAndPreload = function(t) {
                "use strict";
                if ("undefined" != typeof t) {
                    this.sources = this.getImageSrcs(t);
                    for (var e = 0; e < this.sources.length; e++) {
                        var i = new n(this.sources[e]);
                        i.preload(this.imageLoaded.bind(this)), this.images.push(i)
                    }
                }
            }, i.prototype.imageLoaded = function() {
                "use strict";
                this.loaded++, this.updateProgress()
            }, i.prototype.updateProgress = function() {
                "use strict";
                this.parent.updateProgress(this.loaded, this.sources.length)
            }, i.prototype.findImageInElement = function(t) {
                "use strict";
                var e = this.determineUrlAndType(t);
                if (!this.hasGradient(e.url)) {
                    e.url = this.stripUrl(e.url);
                    for (var i = e.url.split(", "), n = 0; n < i.length; n++)
                        if (this.validUrl(i[n]) && this.urlIsNew(i[n])) {
                            var o = "";
                            (this.isIE() || this.isOpera()) && (o = "?rand=" + Math.random()), this.sources.push(i[n] + o)
                        }
                }
            }, i.prototype.determineUrlAndType = function(t) {
                "use strict";
                var e = "",
                    i = "normal",
                    n = t.currentStyle || window.getComputedStyle(t, null);
                return "" !== n.backgroundImage && "none" !== n.backgroundImage || "" !== t.style.backgroundImage && "none" !== t.style.backgroundImage ? (e = n.backgroundImage || t.style.backgroundImage, i = "background") : "undefined" != typeof t.getAttribute("src") && "img" === t.nodeName.toLowerCase() && (e = t.getAttribute("src")), {
                    url: e,
                    type: i
                }
            }, i.prototype.hasGradient = function(t) {
                "use strict";
                return "undefined" != typeof t.indexOf ? -1 !== t.indexOf("gradient(") : !1
            }, i.prototype.stripUrl = function(t) {
                "use strict";
                return t = t.replace(/url\(\"/g, ""), t = t.replace(/url\(/g, ""), t = t.replace(/\"\)/g, ""), t = t.replace(/\)/g, "")
            }, i.prototype.validUrl = function(t) {
                "use strict";
                return t.length > 0 && !t.match(/^(data:)/i) ? !0 : !1
            }, i.prototype.urlIsNew = function(t) {
                "use strict";
                return -1 === this.sources.indexOf(t)
            }, i.prototype.isIE = function() {
                "use strict";
                return navigator.userAgent.match(/msie/i)
            }, i.prototype.isOpera = function() {
                "use strict";
                return navigator.userAgent.match(/Opera/i)
            }, e.exports = i
        }, {
            "./Image.js": 1
        }
    ],
    4: [
        function(t, e) {
            function i() {
                "use strict";
                this.element = null, this.className = "queryloader__overlay__bar", this.barHeight = 1, this.barColor = "#fff"
            }
            i.prototype.create = function() {
                "use strict";
                this.element = document.createElement("div"), this.element.setAttribute("class", this.className), this.setStyling(), this.updateProgress(0, 0)
            }, i.prototype.setStyling = function() {
                "use strict";
                this.element.style.height = this.barHeight + "px", this.element.style.marginTop = "-" + this.barHeight / 2 + "px", this.element.style.backgroundColor = this.barColor, this.element.style.position = "absolute", this.element.style.top = 0, this.setTransitionTime(100)
            }, i.prototype.updateProgress = function(t, e) {
                "use strict";
                parseInt(t) < 0 ? t = 0 : parseInt(t) > 100 && (t = 100), 0 !== e && this.setTransitionTime(e), this.element.style.width = parseInt(t) + "%"
            }, i.prototype.setTransitionTime = function(t) {
                "use strict";
                this.element.style.WebkitTransition = "width " + t + "ms", this.element.style.MozTransition = "width " + t + "ms", this.element.style.OTransition = "width " + t + "ms", this.element.style.MsTransition = "width " + t + "ms", this.element.style.Transition = "width " + t + "ms"
            }, e.exports = i
        }, {}
    ],
    5: [
        function(t, e) {
            function i() {
                "use strict";
                this.element = null, this.idName = "qlPercentage", this.className = "queryloader__overlay__percentage", this.barHeight = 1, this.barColor = "#fff"
            }
            i.prototype.create = function() {
                "use strict";
                this.element = document.createElement("div"), this.element.setAttribute("class", this.className), this.element.setAttribute("id", this.idName), this.applyStyling(), this.updateProgress(0, 0)
            }, i.prototype.applyStyling = function() {
                "use strict";
                this.element.style.height = "40px", this.element.style.width = "100%", this.element.style.position = "absolute", this.element.style.fontSize = "3em", this.element.style.top = "50%", this.element.style.left = "0", this.element.style.marginTop = "-" + (59 + this.barHeight) + "px", this.element.style.textAlign = "center", this.element.style.color = this.barColor
            }, i.prototype.updateProgress = function(t) {
                "use strict";
                parseInt(t) < 0 ? t = 0 : parseInt(t) > 100 && (t = 100), this.element.innerHTML = parseInt(t) + "%"
            }, e.exports = i
        }, {}
    ],
    6: [
        function(t, e) {
            function i(t) {
                "use strict";
                this.parentElement = t, this.idName = "qLoverlay", this.percentageId = "qlPercentage", this.className = "queryloader__overlay", this.element = null, this.loadingBar = null, this.percentage = null, this.barColor = "#ff0000", this.backgroundColor = "#000", this.barHeight = 1, this.fadeOutTime = 300, this.showPercentage = !1
            }
            var n = t("./LoadingBar.js"),
                o = t("./Percentage.js");
            i.prototype.init = function() {
                "use strict";
                this.create(), this.loadingBar = new n, this.loadingBar.barHeight = this.barHeight, this.loadingBar.barColor = this.barColor, this.loadingBar.create(), this.element.appendChild(this.loadingBar.element), this.showPercentage && (this.percentage = new o, this.percentage.barColor = this.barColor, this.percentage.idName = this.percentageId, this.percentage.create(), this.element.appendChild(this.percentage.element)), this.parentElement.appendChild(this.element)
            }, i.prototype.create = function() {
                "use strict";
                this.element = document.querySelector("#" + this.idName) || document.createElement("div"), this.element.setAttribute("class", this.className), this.element.setAttribute("id", this.idName), this.applyStyling()
            }, i.prototype.applyStyling = function() {
                "use strict";
                this.element.style.position = this.calculatePosition(), this.element.style.width = "100%", this.element.style.height = "100%", this.element.style.backgroundColor = this.backgroundColor, this.element.style.backgroundPosition = "fixed", this.element.style.zIndex = 666999, this.element.style.top = "0", this.element.style.left = "0", this.element.style.WebkitTransition = "opacity " + this.fadeOutTime + "ms", this.element.style.MozTransition = "opacity " + this.fadeOutTime + "ms", this.element.style.OTransition = "opacity " + this.fadeOutTime + "ms", this.element.style.MsTransition = "opacity " + this.fadeOutTime + "ms", this.element.style.Transition = "opacity " + this.fadeOutTime + "ms"
            }, i.prototype.calculatePosition = function() {
                "use strict";
                var t = "absolute";
                return "body" === this.parentElement.tagName.toLowerCase() ? t = "fixed" : ("fixed" !== this.parentElement.style.position || "absolute" !== this.parentElement.style.position) && (this.parentElement.style.position = "relative"), t
            }, i.prototype.updateProgress = function(t, e) {
                "use strict";
                null !== this.loadingBar && this.loadingBar.updateProgress(t, e), null !== this.percentage && this.percentage.updateProgress(t, e)
            }, i.prototype.remove = function() {
                "use strict";
                this.element.parentNode.removeChild(this.element)
            }, e.exports = i
        }, {
            "./LoadingBar.js": 4,
            "./Percentage.js": 5
        }
    ],
    7: [
        function() {
            Function.prototype.bind || (Function.prototype.bind = function(t) {
                "use strict";
                if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                var e = Array.prototype.slice.call(arguments, 1),
                    i = this,
                    n = function() {}, o = function() {
                        return i.apply(this instanceof n && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
                    };
                return n.prototype = this.prototype, o.prototype = new n, o
            })
        }, {}
    ],
    8: [
        function(t, e) {
            function i(t, e) {
                "use strict";
                this.element = t, this.options = e, this.done = !1, this.maxTimeout = null, this.defaultOptions = {
                    onComplete: function() {},
                    onProgress: function() {},
                    backgroundColor: "#000",
                    barColor: "#fff",
                    overlayId: "qLoverlay",
                    percentageId: "qLpercentage",
                    barHeight: 1,
                    percentage: !1,
                    deepSearch: !0,
                    minimumTime: 300,
                    maxTime: 1e4,
                    fadeOutTime: 1e3
                }, this.overlay = null, this.preloader = null, null !== t && this.init()
            }
            var n = t("./ImagePreloader/"),
                o = t("./Overlay/");
            i.prototype.init = function() {
                "use strict";
                this.options = this.extend(this.defaultOptions, this.options), "undefined" != typeof this.element && (this.createOverlay(), this.removeTempOverlay(), this.createPreloader(), this.startMaxTimeout())
            }, i.prototype.extend = function(t, e) {
                "use strict";
                "undefined" == typeof t && (t = {});
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                return t
            }, i.prototype.startMaxTimeout = function() {
                "use strict";
                this.maxTimeout = window.setTimeout(this.doneLoading.bind(this), this.options.maxTime)
            }, i.prototype.createOverlay = function() {
                "use strict";
                this.overlay = new o(this.element), this.overlay.idName = this.options.overlayId, this.overlay.percentageId = this.options.percentageId, this.overlay.backgroundColor = this.options.backgroundColor, this.overlay.barHeight = this.options.barHeight, this.overlay.barColor = this.options.barColor, this.overlay.showPercentage = this.options.percentage, this.overlay.fadeOutTime = this.options.fadeOutTime, "undefined" != typeof this.element && this.overlay.init()
            }, i.prototype.removeTempOverlay = function() {
                window.setTimeout(function() {
                    var t = document.getElementById("qLtempOverlay");
                    t && t.parentNode.removeChild(t)
                }, 0)
            }, i.createTempOverlay = function() {
                var t = window.setInterval(function() {
                    if ("undefined" != typeof document.getElementsByTagName("body")[0]) {
                        var e = document.createElement("div");
                        e.style.position = "fixed", e.style.width = "100%", e.style.height = "100%", e.style.zIndex = "9999", e.style.backgroundColor = "#000", e.style.left = "0", e.style.top = "0", e.setAttribute("id", "qLtempOverlay"), document.getElementsByTagName("body")[0].appendChild(e), window.clearInterval(t)
                    }
                }, 1)
            }, i.prototype.createPreloader = function() {
                "use strict";
                this.preloader = new n(this), this.preloader.deepSearch = this.options.deepSearch, window.setTimeout(function() {
                    this.preloader.findAndPreload(this.element)
                }.bind(this), 100)
            }, i.prototype.updateProgress = function(t, e) {
                "use strict";
                var i = t / e * 100;
                this.overlay.updateProgress(i, this.options.minimumTime), "function" == typeof this.options.onProgress && this.options.onProgress(i, t, e), t === e && this.done === !1 && (window.clearTimeout(this.maxTimeout), window.setTimeout(this.doneLoading.bind(this), this.options.minimumTime))
            }, i.prototype.doneLoading = function() {
                "use strict";
                window.clearTimeout(this.maxTimeout), this.done = !0, this.overlay.element.style.opacity = 0, window.setTimeout(this.destroy.bind(this), this.options.fadeOutTime)
            }, i.prototype.destroy = function() {
                "use strict";
                this.overlay.remove(), this.options.onComplete()
            }, e.exports = i
        }, {
            "./ImagePreloader/": 3,
            "./Overlay/": 6
        }
    ],
    9: [
        function(t, e) {
            t("./Polyfills/");
            var i = t("./QueryLoader.js");
            (window.jQuery || window.Zepto) && ! function(t) {
                "use strict";
                t.fn.queryLoader2 = function(t) {
                    return this.each(function() {
                        new i(this, t)
                    })
                }
            }(window.jQuery || window.Zepto), "undefined" != typeof e && (e.exports = i), "function" == typeof define && define.amd && define([], function() {
                "use strict";
                return i
            }), window.QueryLoader2 = i, i.createTempOverlay()
        }, {
            "./Polyfills/": 7,
            "./QueryLoader.js": 8
        }
    ]
}, {}, [9]), $(document).ready(function() {
    function t(t, e) {
        t = $(t), t.hover(function() {
            t.addClass("animated " + e)
        }, function() {
            window.setTimeout(function() {
                t.removeClass("animated " + e)
            }, 2e3)
        })
    }

    function e(t, e) {
        t = $(t), t.click(function() {
            t.addClass("animated " + e), window.setTimeout(function() {
                t.removeClass("animated " + e)
            }, 2e3)
        })
    }
    t("#member", "rotateIn"), e("#menu-ani", "flipInX"), e("#menu-ani-close", "zoomOut")
}), $(function() {
    $("a[href*=#]:not([href=#])").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var t = $(this.hash);
            if (t = t.length ? t : $("[name=" + this.hash.slice(1) + "]"), t.length) return $("html,body").animate({
                scrollTop: t.offset().top
            }, 1e3), !1
        }
    })
}),
function() {
    var t, e, i, n, o, s = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        }, a = [].indexOf || function(t) {
            for (var e = 0, i = this.length; i > e; e++)
                if (e in this && this[e] === t) return e;
            return -1
        };
    e = function() {
        function t() {}
        return t.prototype.extend = function(t, e) {
            var i, n;
            for (i in e) n = e[i], null == t[i] && (t[i] = n);
            return t
        }, t.prototype.isMobile = function(t) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t)
        }, t.prototype.addEvent = function(t, e, i) {
            return null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
        }, t.prototype.removeEvent = function(t, e, i) {
            return null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
        }, t.prototype.innerHeight = function() {
            return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
        }, t
    }(), i = this.WeakMap || this.MozWeakMap || (i = function() {
        function t() {
            this.keys = [], this.values = []
        }
        return t.prototype.get = function(t) {
            var e, i, n, o, s;
            for (s = this.keys, e = n = 0, o = s.length; o > n; e = ++n)
                if (i = s[e], i === t) return this.values[e]
        }, t.prototype.set = function(t, e) {
            var i, n, o, s, a;
            for (a = this.keys, i = o = 0, s = a.length; s > o; i = ++o)
                if (n = a[i], n === t) return void(this.values[i] = e);
            return this.keys.push(t), this.values.push(e)
        }, t
    }()), t = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (t = function() {
        function t() {
            "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
        }
        return t.notSupported = !0, t.prototype.observe = function() {}, t
    }()), n = this.getComputedStyle || function(t) {
        return this.getPropertyValue = function(e) {
            var i;
            return "float" === e && (e = "styleFloat"), o.test(e) && e.replace(o, function(t, e) {
                return e.toUpperCase()
            }), (null != (i = t.currentStyle) ? i[e] : void 0) || null
        }, this
    }, o = /(\-([a-z]){1})/g, this.WOW = function() {
        function o(t) {
            null == t && (t = {}), this.scrollCallback = s(this.scrollCallback, this), this.scrollHandler = s(this.scrollHandler, this), this.start = s(this.start, this), this.scrolled = !0, this.config = this.util().extend(t, this.defaults), this.animationNameCache = new i
        }
        return o.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null
        }, o.prototype.init = function() {
            var t;
            return this.element = window.document.documentElement, "interactive" === (t = document.readyState) || "complete" === t ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, o.prototype.start = function() {
            var e, i, n, o;
            if (this.stopped = !1, this.boxes = function() {
                var t, i, n, o;
                for (n = this.element.querySelectorAll("." + this.config.boxClass), o = [], t = 0, i = n.length; i > t; t++) e = n[t], o.push(e);
                return o
            }.call(this), this.all = function() {
                var t, i, n, o;
                for (n = this.boxes, o = [], t = 0, i = n.length; i > t; t++) e = n[t], o.push(e);
                return o
            }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (o = this.boxes, i = 0, n = o.length; n > i; i++) e = o[i], this.applyStyle(e, !0);
            return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new t(function(t) {
                return function(e) {
                    var i, n, o, s, a;
                    for (a = [], o = 0, s = e.length; s > o; o++) n = e[o], a.push(function() {
                        var t, e, o, s;
                        for (o = n.addedNodes || [], s = [], t = 0, e = o.length; e > t; t++) i = o[t], s.push(this.doSync(i));
                        return s
                    }.call(t));
                    return a
                }
            }(this)).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, o.prototype.stop = function() {
            return this.stopped = !0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, o.prototype.sync = function() {
            return t.notSupported ? this.doSync(this.element) : void 0
        }, o.prototype.doSync = function(t) {
            var e, i, n, o, s;
            if (null == t && (t = this.element), 1 === t.nodeType) {
                for (t = t.parentNode || t, o = t.querySelectorAll("." + this.config.boxClass), s = [], i = 0, n = o.length; n > i; i++) e = o[i], a.call(this.all, e) < 0 ? (this.boxes.push(e), this.all.push(e), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(e, !0), s.push(this.scrolled = !0)) : s.push(void 0);
                return s
            }
        }, o.prototype.show = function(t) {
            return this.applyStyle(t), t.className = "" + t.className + " " + this.config.animateClass, null != this.config.callback ? this.config.callback(t) : void 0
        }, o.prototype.applyStyle = function(t, e) {
            var i, n, o;
            return n = t.getAttribute("data-wow-duration"), i = t.getAttribute("data-wow-delay"), o = t.getAttribute("data-wow-iteration"), this.animate(function(s) {
                return function() {
                    return s.customStyle(t, e, n, i, o)
                }
            }(this))
        }, o.prototype.animate = function() {
            return "requestAnimationFrame" in window ? function(t) {
                return window.requestAnimationFrame(t)
            } : function(t) {
                return t()
            }
        }(), o.prototype.resetStyle = function() {
            var t, e, i, n, o;
            for (n = this.boxes, o = [], e = 0, i = n.length; i > e; e++) t = n[e], o.push(t.style.visibility = "visible");
            return o
        }, o.prototype.customStyle = function(t, e, i, n, o) {
            return e && this.cacheAnimationName(t), t.style.visibility = e ? "hidden" : "visible", i && this.vendorSet(t.style, {
                animationDuration: i
            }), n && this.vendorSet(t.style, {
                animationDelay: n
            }), o && this.vendorSet(t.style, {
                animationIterationCount: o
            }), this.vendorSet(t.style, {
                animationName: e ? "none" : this.cachedAnimationName(t)
            }), t
        }, o.prototype.vendors = ["moz", "webkit"], o.prototype.vendorSet = function(t, e) {
            var i, n, o, s;
            s = [];
            for (i in e) n = e[i], t["" + i] = n, s.push(function() {
                var e, s, a, r;
                for (a = this.vendors, r = [], e = 0, s = a.length; s > e; e++) o = a[e], r.push(t["" + o + i.charAt(0).toUpperCase() + i.substr(1)] = n);
                return r
            }.call(this));
            return s
        }, o.prototype.vendorCSS = function(t, e) {
            var i, o, s, a, r, l;
            for (o = n(t), i = o.getPropertyCSSValue(e), l = this.vendors, a = 0, r = l.length; r > a; a++) s = l[a], i = i || o.getPropertyCSSValue("-" + s + "-" + e);
            return i
        }, o.prototype.animationName = function(t) {
            var e;
            try {
                e = this.vendorCSS(t, "animation-name").cssText
            } catch (i) {
                e = n(t).getPropertyValue("animation-name")
            }
            return "none" === e ? "" : e
        }, o.prototype.cacheAnimationName = function(t) {
            return this.animationNameCache.set(t, this.animationName(t))
        }, o.prototype.cachedAnimationName = function(t) {
            return this.animationNameCache.get(t)
        }, o.prototype.scrollHandler = function() {
            return this.scrolled = !0
        }, o.prototype.scrollCallback = function() {
            var t;
            return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                var e, i, n, o;
                for (n = this.boxes, o = [], e = 0, i = n.length; i > e; e++) t = n[e], t && (this.isVisible(t) ? this.show(t) : o.push(t));
                return o
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, o.prototype.offsetTop = function(t) {
            for (var e; void 0 === t.offsetTop;) t = t.parentNode;
            for (e = t.offsetTop; t = t.offsetParent;) e += t.offsetTop;
            return e
        }, o.prototype.isVisible = function(t) {
            var e, i, n, o, s;
            return i = t.getAttribute("data-wow-offset") || this.config.offset, s = window.pageYOffset, o = s + Math.min(this.element.clientHeight, this.util().innerHeight()) - i, n = this.offsetTop(t), e = n + t.clientHeight, o >= n && e >= s
        }, o.prototype.util = function() {
            return null != this._util ? this._util : this._util = new e
        }, o.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, o
    }()
}.call(this), "function" != typeof Object.create && (Object.create = function(t) {
    function e() {}
    return e.prototype = t, new e
}),
function(t, e, i) {
    var n = {
        init: function(e, i) {
            var n = this;
            n.$elem = t(i), n.options = t.extend({}, t.fn.owlCarousel.options, n.$elem.data(), e), n.userOptions = e, n.loadContent()
        },
        loadContent: function() {
            function e(t) {
                var e, i = "";
                if ("function" == typeof n.options.jsonSuccess) n.options.jsonSuccess.apply(this, [t]);
                else {
                    for (e in t.owl) t.owl.hasOwnProperty(e) && (i += t.owl[e].item);
                    n.$elem.html(i)
                }
                n.logIn()
            }
            var i, n = this;
            "function" == typeof n.options.beforeInit && n.options.beforeInit.apply(this, [n.$elem]), "string" == typeof n.options.jsonPath ? (i = n.options.jsonPath, t.getJSON(i, e)) : n.logIn()
        },
        logIn: function() {
            var t = this;
            t.$elem.data("owl-originalStyles", t.$elem.attr("style")), t.$elem.data("owl-originalClasses", t.$elem.attr("class")), t.$elem.css({
                opacity: 0
            }), t.orignalItems = t.options.items, t.checkBrowser(), t.wrapperWidth = 0, t.checkVisible = null, t.setVars()
        },
        setVars: function() {
            var t = this;
            return 0 === t.$elem.children().length ? !1 : (t.baseClass(), t.eventTypes(), t.$userItems = t.$elem.children(), t.itemsAmount = t.$userItems.length, t.wrapItems(), t.$owlItems = t.$elem.find(".owl-item"), t.$owlWrapper = t.$elem.find(".owl-wrapper"), t.playDirection = "next", t.prevItem = 0, t.prevArr = [0], t.currentItem = 0, t.customEvents(), void t.onStartup())
        },
        onStartup: function() {
            var t = this;
            t.updateItems(), t.calculateAll(), t.buildControls(), t.updateControls(), t.response(), t.moveEvents(), t.stopOnHover(), t.owlStatus(), t.options.transitionStyle !== !1 && t.transitionTypes(t.options.transitionStyle), t.options.autoPlay === !0 && (t.options.autoPlay = 5e3), t.play(), t.$elem.find(".owl-wrapper").css("display", "block"), t.$elem.is(":visible") ? t.$elem.css("opacity", 1) : t.watchVisibility(), t.onstartup = !1, t.eachMoveUpdate(), "function" == typeof t.options.afterInit && t.options.afterInit.apply(this, [t.$elem])
        },
        eachMoveUpdate: function() {
            var t = this;
            t.options.lazyLoad === !0 && t.lazyLoad(), t.options.autoHeight === !0 && t.autoHeight(), t.onVisibleItems(), "function" == typeof t.options.afterAction && t.options.afterAction.apply(this, [t.$elem])
        },
        updateVars: function() {
            var t = this;
            "function" == typeof t.options.beforeUpdate && t.options.beforeUpdate.apply(this, [t.$elem]), t.watchVisibility(), t.updateItems(), t.calculateAll(), t.updatePosition(), t.updateControls(), t.eachMoveUpdate(), "function" == typeof t.options.afterUpdate && t.options.afterUpdate.apply(this, [t.$elem])
        },
        reload: function() {
            var t = this;
            e.setTimeout(function() {
                t.updateVars()
            }, 0)
        },
        watchVisibility: function() {
            var t = this;
            return t.$elem.is(":visible") !== !1 ? !1 : (t.$elem.css({
                opacity: 0
            }), e.clearInterval(t.autoPlayInterval), e.clearInterval(t.checkVisible), void(t.checkVisible = e.setInterval(function() {
                t.$elem.is(":visible") && (t.reload(), t.$elem.animate({
                    opacity: 1
                }, 200), e.clearInterval(t.checkVisible))
            }, 500)))
        },
        wrapItems: function() {
            var t = this;
            t.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), t.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), t.wrapperOuter = t.$elem.find(".owl-wrapper-outer"), t.$elem.css("display", "block")
        },
        baseClass: function() {
            var t = this,
                e = t.$elem.hasClass(t.options.baseClass),
                i = t.$elem.hasClass(t.options.theme);
            e || t.$elem.addClass(t.options.baseClass), i || t.$elem.addClass(t.options.theme)
        },
        updateItems: function() {
            var e, i, n = this;
            if (n.options.responsive === !1) return !1;
            if (n.options.singleItem === !0) return n.options.items = n.orignalItems = 1, n.options.itemsCustom = !1, n.options.itemsDesktop = !1, n.options.itemsDesktopSmall = !1, n.options.itemsTablet = !1, n.options.itemsTabletSmall = !1, n.options.itemsMobile = !1, !1;
            if (e = t(n.options.responsiveBaseWidth).width(), e > (n.options.itemsDesktop[0] || n.orignalItems) && (n.options.items = n.orignalItems), n.options.itemsCustom !== !1)
                for (n.options.itemsCustom.sort(function(t, e) {
                    return t[0] - e[0]
                }), i = 0; i < n.options.itemsCustom.length; i += 1) n.options.itemsCustom[i][0] <= e && (n.options.items = n.options.itemsCustom[i][1]);
            else e <= n.options.itemsDesktop[0] && n.options.itemsDesktop !== !1 && (n.options.items = n.options.itemsDesktop[1]), e <= n.options.itemsDesktopSmall[0] && n.options.itemsDesktopSmall !== !1 && (n.options.items = n.options.itemsDesktopSmall[1]), e <= n.options.itemsTablet[0] && n.options.itemsTablet !== !1 && (n.options.items = n.options.itemsTablet[1]), e <= n.options.itemsTabletSmall[0] && n.options.itemsTabletSmall !== !1 && (n.options.items = n.options.itemsTabletSmall[1]), e <= n.options.itemsMobile[0] && n.options.itemsMobile !== !1 && (n.options.items = n.options.itemsMobile[1]);
            n.options.items > n.itemsAmount && n.options.itemsScaleUp === !0 && (n.options.items = n.itemsAmount)
        },
        response: function() {
            var i, n, o = this;
            return o.options.responsive !== !0 ? !1 : (n = t(e).width(), o.resizer = function() {
                t(e).width() !== n && (o.options.autoPlay !== !1 && e.clearInterval(o.autoPlayInterval), e.clearTimeout(i), i = e.setTimeout(function() {
                    n = t(e).width(), o.updateVars()
                }, o.options.responsiveRefreshRate))
            }, void t(e).resize(o.resizer))
        },
        updatePosition: function() {
            var t = this;
            t.jumpTo(t.currentItem), t.options.autoPlay !== !1 && t.checkAp()
        },
        appendItemsSizes: function() {
            var e = this,
                i = 0,
                n = e.itemsAmount - e.options.items;
            e.$owlItems.each(function(o) {
                var s = t(this);
                s.css({
                    width: e.itemWidth
                }).data("owl-item", Number(o)), (o % e.options.items === 0 || o === n) && (o > n || (i += 1)), s.data("owl-roundPages", i)
            })
        },
        appendWrapperSizes: function() {
            var t = this,
                e = t.$owlItems.length * t.itemWidth;
            t.$owlWrapper.css({
                width: 2 * e,
                left: 0
            }), t.appendItemsSizes()
        },
        calculateAll: function() {
            var t = this;
            t.calculateWidth(), t.appendWrapperSizes(), t.loops(), t.max()
        },
        calculateWidth: function() {
            var t = this;
            t.itemWidth = Math.round(t.$elem.width() / t.options.items)
        },
        max: function() {
            var t = this,
                e = -1 * (t.itemsAmount * t.itemWidth - t.options.items * t.itemWidth);
            return t.options.items > t.itemsAmount ? (t.maximumItem = 0, e = 0, t.maximumPixels = 0) : (t.maximumItem = t.itemsAmount - t.options.items, t.maximumPixels = e), e
        },
        min: function() {
            return 0
        },
        loops: function() {
            var e, i, n, o = this,
                s = 0,
                a = 0;
            for (o.positionsInArray = [0], o.pagesInArray = [], e = 0; e < o.itemsAmount; e += 1) a += o.itemWidth, o.positionsInArray.push(-a), o.options.scrollPerPage === !0 && (i = t(o.$owlItems[e]), n = i.data("owl-roundPages"), n !== s && (o.pagesInArray[s] = o.positionsInArray[e], s = n))
        },
        buildControls: function() {
            var e = this;
            (e.options.navigation === !0 || e.options.pagination === !0) && (e.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !e.browser.isTouch).appendTo(e.$elem)), e.options.pagination === !0 && e.buildPagination(), e.options.navigation === !0 && e.buildButtons()
        },
        buildButtons: function() {
            var e = this,
                i = t('<div class="owl-buttons"/>');
            e.owlControls.append(i), e.buttonPrev = t("<div/>", {
                "class": "owl-prev",
                html: e.options.navigationText[0] || ""
            }), e.buttonNext = t("<div/>", {
                "class": "owl-next",
                html: e.options.navigationText[1] || ""
            }), i.append(e.buttonPrev).append(e.buttonNext), i.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(t) {
                t.preventDefault()
            }), i.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(i) {
                i.preventDefault(), t(this).hasClass("owl-next") ? e.next() : e.prev()
            })
        },
        buildPagination: function() {
            var e = this;
            e.paginationWrapper = t('<div class="owl-pagination"/>'), e.owlControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(i) {
                i.preventDefault(), Number(t(this).data("owl-page")) !== e.currentItem && e.goTo(Number(t(this).data("owl-page")), !0)
            })
        },
        updatePagination: function() {
            var e, i, n, o, s, a, r = this;
            if (r.options.pagination === !1) return !1;
            for (r.paginationWrapper.html(""), e = 0, i = r.itemsAmount - r.itemsAmount % r.options.items, o = 0; o < r.itemsAmount; o += 1) o % r.options.items === 0 && (e += 1, i === o && (n = r.itemsAmount - r.options.items), s = t("<div/>", {
                "class": "owl-page"
            }), a = t("<span></span>", {
                text: r.options.paginationNumbers === !0 ? e : "",
                "class": r.options.paginationNumbers === !0 ? "owl-numbers" : ""
            }), s.append(a), s.data("owl-page", i === o ? n : o), s.data("owl-roundPages", e), r.paginationWrapper.append(s));
            r.checkPagination()
        },
        checkPagination: function() {
            var e = this;
            return e.options.pagination === !1 ? !1 : void e.paginationWrapper.find(".owl-page").each(function() {
                t(this).data("owl-roundPages") === t(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active"))
            })
        },
        checkNavigation: function() {
            var t = this;
            return t.options.navigation === !1 ? !1 : void(t.options.rewindNav === !1 && (0 === t.currentItem && 0 === t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.addClass("disabled")) : 0 === t.currentItem && 0 !== t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.removeClass("disabled")) : t.currentItem === t.maximumItem ? (t.buttonPrev.removeClass("disabled"), t.buttonNext.addClass("disabled")) : 0 !== t.currentItem && t.currentItem !== t.maximumItem && (t.buttonPrev.removeClass("disabled"), t.buttonNext.removeClass("disabled"))))
        },
        updateControls: function() {
            var t = this;
            t.updatePagination(), t.checkNavigation(), t.owlControls && (t.options.items >= t.itemsAmount ? t.owlControls.hide() : t.owlControls.show())
        },
        destroyControls: function() {
            var t = this;
            t.owlControls && t.owlControls.remove()
        },
        next: function(t) {
            var e = this;
            if (e.isTransition) return !1;
            if (e.currentItem += e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem > e.maximumItem + (e.options.scrollPerPage === !0 ? e.options.items - 1 : 0)) {
                if (e.options.rewindNav !== !0) return e.currentItem = e.maximumItem, !1;
                e.currentItem = 0, t = "rewind"
            }
            e.goTo(e.currentItem, t)
        },
        prev: function(t) {
            var e = this;
            if (e.isTransition) return !1;
            if (e.options.scrollPerPage === !0 && e.currentItem > 0 && e.currentItem < e.options.items ? e.currentItem = 0 : e.currentItem -= e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem < 0) {
                if (e.options.rewindNav !== !0) return e.currentItem = 0, !1;
                e.currentItem = e.maximumItem, t = "rewind"
            }
            e.goTo(e.currentItem, t)
        },
        goTo: function(t, i, n) {
            var o, s = this;
            return s.isTransition ? !1 : ("function" == typeof s.options.beforeMove && s.options.beforeMove.apply(this, [s.$elem]), t >= s.maximumItem ? t = s.maximumItem : 0 >= t && (t = 0), s.currentItem = s.owl.currentItem = t, s.options.transitionStyle !== !1 && "drag" !== n && 1 === s.options.items && s.browser.support3d === !0 ? (s.swapSpeed(0), s.browser.support3d === !0 ? s.transition3d(s.positionsInArray[t]) : s.css2slide(s.positionsInArray[t], 1), s.afterGo(), s.singleItemTransition(), !1) : (o = s.positionsInArray[t], s.browser.support3d === !0 ? (s.isCss3Finish = !1, i === !0 ? (s.swapSpeed("paginationSpeed"), e.setTimeout(function() {
                s.isCss3Finish = !0
            }, s.options.paginationSpeed)) : "rewind" === i ? (s.swapSpeed(s.options.rewindSpeed), e.setTimeout(function() {
                s.isCss3Finish = !0
            }, s.options.rewindSpeed)) : (s.swapSpeed("slideSpeed"), e.setTimeout(function() {
                s.isCss3Finish = !0
            }, s.options.slideSpeed)), s.transition3d(o)) : i === !0 ? s.css2slide(o, s.options.paginationSpeed) : "rewind" === i ? s.css2slide(o, s.options.rewindSpeed) : s.css2slide(o, s.options.slideSpeed), void s.afterGo()))
        },
        jumpTo: function(t) {
            var e = this;
            "function" == typeof e.options.beforeMove && e.options.beforeMove.apply(this, [e.$elem]), t >= e.maximumItem || -1 === t ? t = e.maximumItem : 0 >= t && (t = 0), e.swapSpeed(0), e.browser.support3d === !0 ? e.transition3d(e.positionsInArray[t]) : e.css2slide(e.positionsInArray[t], 1), e.currentItem = e.owl.currentItem = t, e.afterGo()
        },
        afterGo: function() {
            var t = this;
            t.prevArr.push(t.currentItem), t.prevItem = t.owl.prevItem = t.prevArr[t.prevArr.length - 2], t.prevArr.shift(0), t.prevItem !== t.currentItem && (t.checkPagination(), t.checkNavigation(), t.eachMoveUpdate(), t.options.autoPlay !== !1 && t.checkAp()), "function" == typeof t.options.afterMove && t.prevItem !== t.currentItem && t.options.afterMove.apply(this, [t.$elem])
        },
        stop: function() {
            var t = this;
            t.apStatus = "stop", e.clearInterval(t.autoPlayInterval)
        },
        checkAp: function() {
            var t = this;
            "stop" !== t.apStatus && t.play()
        },
        play: function() {
            var t = this;
            return t.apStatus = "play", t.options.autoPlay === !1 ? !1 : (e.clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = e.setInterval(function() {
                t.next(!0)
            }, t.options.autoPlay)))
        },
        swapSpeed: function(t) {
            var e = this;
            "slideSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.slideSpeed)) : "paginationSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed)) : "string" != typeof t && e.$owlWrapper.css(e.addCssSpeed(t))
        },
        addCssSpeed: function(t) {
            return {
                "-webkit-transition": "all " + t + "ms ease",
                "-moz-transition": "all " + t + "ms ease",
                "-o-transition": "all " + t + "ms ease",
                transition: "all " + t + "ms ease"
            }
        },
        removeTransition: function() {
            return {
                "-webkit-transition": "",
                "-moz-transition": "",
                "-o-transition": "",
                transition: ""
            }
        },
        doTranslate: function(t) {
            return {
                "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
                transform: "translate3d(" + t + "px, 0px,0px)"
            }
        },
        transition3d: function(t) {
            var e = this;
            e.$owlWrapper.css(e.doTranslate(t))
        },
        css2move: function(t) {
            var e = this;
            e.$owlWrapper.css({
                left: t
            })
        },
        css2slide: function(t, e) {
            var i = this;
            i.isCssFinish = !1, i.$owlWrapper.stop(!0, !0).animate({
                left: t
            }, {
                duration: e || i.options.slideSpeed,
                complete: function() {
                    i.isCssFinish = !0
                }
            })
        },
        checkBrowser: function() {
            var t, n, o, s, a = this,
                r = "translate3d(0px, 0px, 0px)",
                l = i.createElement("div");
            l.style.cssText = "  -moz-transform:" + r + "; -ms-transform:" + r + "; -o-transform:" + r + "; -webkit-transform:" + r + "; transform:" + r, t = /translate3d\(0px, 0px, 0px\)/g, n = l.style.cssText.match(t), o = null !== n && 1 === n.length, s = "ontouchstart" in e || e.navigator.msMaxTouchPoints, a.browser = {
                support3d: o,
                isTouch: s
            }
        },
        moveEvents: function() {
            var t = this;
            (t.options.mouseDrag !== !1 || t.options.touchDrag !== !1) && (t.gestures(), t.disabledEvents())
        },
        eventTypes: function() {
            var t = this,
                e = ["s", "e", "x"];
            t.ev_types = {}, t.options.mouseDrag === !0 && t.options.touchDrag === !0 ? e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : t.options.mouseDrag === !1 && t.options.touchDrag === !0 ? e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : t.options.mouseDrag === !0 && t.options.touchDrag === !1 && (e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), t.ev_types.start = e[0], t.ev_types.move = e[1], t.ev_types.end = e[2]
        },
        disabledEvents: function() {
            var e = this;
            e.$elem.on("dragstart.owl", function(t) {
                t.preventDefault()
            }), e.$elem.on("mousedown.disableTextSelect", function(e) {
                return t(e.target).is("input, textarea, select, option")
            })
        },
        gestures: function() {
            function n(t) {
                if (void 0 !== t.touches) return {
                    x: t.touches[0].pageX,
                    y: t.touches[0].pageY
                };
                if (void 0 === t.touches) {
                    if (void 0 !== t.pageX) return {
                        x: t.pageX,
                        y: t.pageY
                    };
                    if (void 0 === t.pageX) return {
                        x: t.clientX,
                        y: t.clientY
                    }
                }
            }

            function o(e) {
                "on" === e ? (t(i).on(l.ev_types.move, a), t(i).on(l.ev_types.end, r)) : "off" === e && (t(i).off(l.ev_types.move), t(i).off(l.ev_types.end))
            }

            function s(i) {
                var s, a = i.originalEvent || i || e.event;
                if (3 === a.which) return !1;
                if (!(l.itemsAmount <= l.options.items)) {
                    if (l.isCssFinish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                    if (l.isCss3Finish === !1 && !l.options.dragBeforeAnimFinish) return !1;
                    l.options.autoPlay !== !1 && e.clearInterval(l.autoPlayInterval), l.browser.isTouch === !0 || l.$owlWrapper.hasClass("grabbing") || l.$owlWrapper.addClass("grabbing"), l.newPosX = 0, l.newRelativeX = 0, t(this).css(l.removeTransition()), s = t(this).position(), p.relativePos = s.left, p.offsetX = n(a).x - s.left, p.offsetY = n(a).y - s.top, o("on"), p.sliding = !1, p.targetElement = a.target || a.srcElement
                }
            }

            function a(o) {
                var s, a, r = o.originalEvent || o || e.event;
                l.newPosX = n(r).x - p.offsetX, l.newPosY = n(r).y - p.offsetY, l.newRelativeX = l.newPosX - p.relativePos, "function" == typeof l.options.startDragging && p.dragging !== !0 && 0 !== l.newRelativeX && (p.dragging = !0, l.options.startDragging.apply(l, [l.$elem])), (l.newRelativeX > 8 || l.newRelativeX < -8) && l.browser.isTouch === !0 && (void 0 !== r.preventDefault ? r.preventDefault() : r.returnValue = !1, p.sliding = !0), (l.newPosY > 10 || l.newPosY < -10) && p.sliding === !1 && t(i).off("touchmove.owl"), s = function() {
                    return l.newRelativeX / 5
                }, a = function() {
                    return l.maximumPixels + l.newRelativeX / 5
                }, l.newPosX = Math.max(Math.min(l.newPosX, s()), a()), l.browser.support3d === !0 ? l.transition3d(l.newPosX) : l.css2move(l.newPosX)
            }

            function r(i) {
                var n, s, a, r = i.originalEvent || i || e.event;
                r.target = r.target || r.srcElement, p.dragging = !1, l.browser.isTouch !== !0 && l.$owlWrapper.removeClass("grabbing"), l.dragDirection = l.owl.dragDirection = l.newRelativeX < 0 ? "left" : "right", 0 !== l.newRelativeX && (n = l.getNewPosition(), l.goTo(n, !1, "drag"), p.targetElement === r.target && l.browser.isTouch !== !0 && (t(r.target).on("click.disable", function(e) {
                    e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.disable")
                }), s = t._data(r.target, "events").click, a = s.pop(), s.splice(0, 0, a))), o("off")
            }
            var l = this,
                p = {
                    offsetX: 0,
                    offsetY: 0,
                    baseElWidth: 0,
                    relativePos: 0,
                    position: null,
                    minSwipe: null,
                    maxSwipe: null,
                    sliding: null,
                    dargging: null,
                    targetElement: null
                };
            l.isCssFinish = !0, l.$elem.on(l.ev_types.start, ".owl-wrapper", s)
        },
        getNewPosition: function() {
            var t = this,
                e = t.closestItem();
            return e > t.maximumItem ? (t.currentItem = t.maximumItem, e = t.maximumItem) : t.newPosX >= 0 && (e = 0, t.currentItem = 0), e
        },
        closestItem: function() {
            var e = this,
                i = e.options.scrollPerPage === !0 ? e.pagesInArray : e.positionsInArray,
                n = e.newPosX,
                o = null;
            return t.each(i, function(s, a) {
                n - e.itemWidth / 20 > i[s + 1] && n - e.itemWidth / 20 < a && "left" === e.moveDirection() ? (o = a, e.currentItem = e.options.scrollPerPage === !0 ? t.inArray(o, e.positionsInArray) : s) : n + e.itemWidth / 20 < a && n + e.itemWidth / 20 > (i[s + 1] || i[s] - e.itemWidth) && "right" === e.moveDirection() && (e.options.scrollPerPage === !0 ? (o = i[s + 1] || i[i.length - 1], e.currentItem = t.inArray(o, e.positionsInArray)) : (o = i[s + 1], e.currentItem = s + 1))
            }), e.currentItem
        },
        moveDirection: function() {
            var t, e = this;
            return e.newRelativeX < 0 ? (t = "right", e.playDirection = "next") : (t = "left", e.playDirection = "prev"), t
        },
        customEvents: function() {
            var t = this;
            t.$elem.on("owl.next", function() {
                t.next()
            }), t.$elem.on("owl.prev", function() {
                t.prev()
            }), t.$elem.on("owl.play", function(e, i) {
                t.options.autoPlay = i, t.play(), t.hoverStatus = "play"
            }), t.$elem.on("owl.stop", function() {
                t.stop(), t.hoverStatus = "stop"
            }), t.$elem.on("owl.goTo", function(e, i) {
                t.goTo(i)
            }), t.$elem.on("owl.jumpTo", function(e, i) {
                t.jumpTo(i)
            })
        },
        stopOnHover: function() {
            var t = this;
            t.options.stopOnHover === !0 && t.browser.isTouch !== !0 && t.options.autoPlay !== !1 && (t.$elem.on("mouseover", function() {
                t.stop()
            }), t.$elem.on("mouseout", function() {
                "stop" !== t.hoverStatus && t.play()
            }))
        },
        lazyLoad: function() {
            var e, i, n, o, s, a = this;
            if (a.options.lazyLoad === !1) return !1;
            for (e = 0; e < a.itemsAmount; e += 1) i = t(a.$owlItems[e]), "loaded" !== i.data("owl-loaded") && (n = i.data("owl-item"), o = i.find(".lazyOwl"), "string" == typeof o.data("src") ? (void 0 === i.data("owl-loaded") && (o.hide(), i.addClass("loading").data("owl-loaded", "checked")), s = a.options.lazyFollow === !0 ? n >= a.currentItem : !0, s && n < a.currentItem + a.options.items && o.length && a.lazyPreload(i, o)) : i.data("owl-loaded", "loaded"))
        },
        lazyPreload: function(t, i) {
            function n() {
                t.data("owl-loaded", "loaded").removeClass("loading"), i.removeAttr("data-src"), "fade" === a.options.lazyEffect ? i.fadeIn(400) : i.show(), "function" == typeof a.options.afterLazyLoad && a.options.afterLazyLoad.apply(this, [a.$elem])
            }

            function o() {
                r += 1, a.completeImg(i.get(0)) || s === !0 ? n() : 100 >= r ? e.setTimeout(o, 100) : n()
            }
            var s, a = this,
                r = 0;
            "DIV" === i.prop("tagName") ? (i.css("background-image", "url(" + i.data("src") + ")"), s = !0) : i[0].src = i.data("src"), o()
        },
        autoHeight: function() {
            function i() {
                var i = t(s.$owlItems[s.currentItem]).height();
                s.wrapperOuter.css("height", i + "px"), s.wrapperOuter.hasClass("autoHeight") || e.setTimeout(function() {
                    s.wrapperOuter.addClass("autoHeight")
                }, 0)
            }

            function n() {
                o += 1, s.completeImg(a.get(0)) ? i() : 100 >= o ? e.setTimeout(n, 100) : s.wrapperOuter.css("height", "")
            }
            var o, s = this,
                a = t(s.$owlItems[s.currentItem]).find("img");
            void 0 !== a.get(0) ? (o = 0, n()) : i()
        },
        completeImg: function(t) {
            var e;
            return t.complete ? (e = typeof t.naturalWidth, "undefined" !== e && 0 === t.naturalWidth ? !1 : !0) : !1
        },
        onVisibleItems: function() {
            var e, i = this;
            for (i.options.addClassActive === !0 && i.$owlItems.removeClass("active"), i.visibleItems = [], e = i.currentItem; e < i.currentItem + i.options.items; e += 1) i.visibleItems.push(e), i.options.addClassActive === !0 && t(i.$owlItems[e]).addClass("active");
            i.owl.visibleItems = i.visibleItems
        },
        transitionTypes: function(t) {
            var e = this;
            e.outClass = "owl-" + t + "-out", e.inClass = "owl-" + t + "-in"
        },
        singleItemTransition: function() {
            function t(t) {
                return {
                    position: "relative",
                    left: t + "px"
                }
            }
            var e = this,
                i = e.outClass,
                n = e.inClass,
                o = e.$owlItems.eq(e.currentItem),
                s = e.$owlItems.eq(e.prevItem),
                a = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                r = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2,
                l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
            e.isTransition = !0, e.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": r + "px",
                "-moz-perspective-origin": r + "px",
                "perspective-origin": r + "px"
            }), s.css(t(a, 10)).addClass(i).on(l, function() {
                e.endPrev = !0, s.off(l), e.clearTransStyle(s, i)
            }), o.addClass(n).on(l, function() {
                e.endCurrent = !0, o.off(l), e.clearTransStyle(o, n)
            })
        },
        clearTransStyle: function(t, e) {
            var i = this;
            t.css({
                position: "",
                left: ""
            }).removeClass(e), i.endPrev && i.endCurrent && (i.$owlWrapper.removeClass("owl-origin"), i.endPrev = !1, i.endCurrent = !1, i.isTransition = !1)
        },
        owlStatus: function() {
            var t = this;
            t.owl = {
                userOptions: t.userOptions,
                baseElement: t.$elem,
                userItems: t.$userItems,
                owlItems: t.$owlItems,
                currentItem: t.currentItem,
                prevItem: t.prevItem,
                visibleItems: t.visibleItems,
                isTouch: t.browser.isTouch,
                browser: t.browser,
                dragDirection: t.dragDirection
            }
        },
        clearEvents: function() {
            var n = this;
            n.$elem.off(".owl owl mousedown.disableTextSelect"), t(i).off(".owl owl"), t(e).off("resize", n.resizer)
        },
        unWrap: function() {
            var t = this;
            0 !== t.$elem.children().length && (t.$owlWrapper.unwrap(), t.$userItems.unwrap().unwrap(), t.owlControls && t.owlControls.remove()), t.clearEvents(), t.$elem.attr("style", t.$elem.data("owl-originalStyles") || "").attr("class", t.$elem.data("owl-originalClasses"))
        },
        destroy: function() {
            var t = this;
            t.stop(), e.clearInterval(t.checkVisible), t.unWrap(), t.$elem.removeData()
        },
        reinit: function(e) {
            var i = this,
                n = t.extend({}, i.userOptions, e);
            i.unWrap(), i.init(n, i.$elem)
        },
        addItem: function(t, e) {
            var i, n = this;
            return t ? 0 === n.$elem.children().length ? (n.$elem.append(t), n.setVars(), !1) : (n.unWrap(), i = void 0 === e || -1 === e ? -1 : e, i >= n.$userItems.length || -1 === i ? n.$userItems.eq(-1).after(t) : n.$userItems.eq(i).before(t), void n.setVars()) : !1
        },
        removeItem: function(t) {
            var e, i = this;
            return 0 === i.$elem.children().length ? !1 : (e = void 0 === t || -1 === t ? -1 : t, i.unWrap(), i.$userItems.eq(e).remove(), void i.setVars())
        }
    };
    t.fn.owlCarousel = function(e) {
        return this.each(function() {
            if (t(this).data("owl-init") === !0) return !1;
            t(this).data("owl-init", !0);
            var i = Object.create(n);
            i.init(e, this), t.data(this, "owlCarousel", i)
        })
    }, t.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: e,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    }
}(jQuery, window, document),
function(t) {
    t.fn.flowtype = function(e) {
        var i = t.extend({
            maximum: 9999,
            minimum: 1,
            maxFont: 9999,
            minFont: 1,
            fontRatio: 35
        }, e),
            n = function(e) {
                var n = t(e),
                    o = n.width(),
                    s = o > i.maximum ? i.maximum : o < i.minimum ? i.minimum : o,
                    a = s / i.fontRatio,
                    r = a > i.maxFont ? i.maxFont : a < i.minFont ? i.minFont : a;
                n.css("font-size", r + "px")
            };
        return this.each(function() {
            var e = this;
            t(window).resize(function() {
                n(e)
            }), n(this)
        })
    }
}(jQuery),
function(t) {
    var e, i = {
            className: "autosizejs",
            id: "autosizejs",
            append: "\n",
            callback: !1,
            resizeDelay: 10,
            placeholder: !0
        }, n = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent", "whiteSpace"],
        o = t('<textarea tabindex="-1"/>').data("autosize", !0)[0];
    o.style.cssText = "position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;", o.style.lineHeight = "99px", "99px" === t(o).css("lineHeight") && n.push("lineHeight"), o.style.lineHeight = "", t.fn.autosize = function(s) {
        return this.length ? (s = t.extend({}, i, s || {}), o.parentNode !== document.body && t(document.body).append(o), this.each(function() {
            function i() {
                var e, i = window.getComputedStyle ? window.getComputedStyle(c, null) : null;
                i ? (e = parseFloat(i.width), ("border-box" === i.boxSizing || "border-box" === i.webkitBoxSizing || "border-box" === i.mozBoxSizing) && t.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], function(t, n) {
                    e -= parseFloat(i[n])
                })) : e = d.width(), o.style.width = Math.max(e, 0) + "px"
            }

            function a() {
                var a = {};
                if (e = c, o.className = s.className, o.id = s.id, p = parseFloat(d.css("maxHeight")), t.each(n, function(t, e) {
                    a[e] = d.css(e)
                }), t(o).css(a).attr("wrap", d.attr("wrap")), i(), window.chrome) {
                    var r = c.style.width;
                    c.style.width = "0px"; {
                        c.offsetWidth
                    }
                    c.style.width = r
                }
            }

            function r() {
                var t, n;
                e !== c ? a() : i(), o.value = !c.value && s.placeholder ? d.attr("placeholder") || "" : c.value, o.value += s.append || "", o.style.overflowY = c.style.overflowY, n = parseFloat(c.style.height) || 0, o.scrollTop = 0, o.scrollTop = 9e4, t = o.scrollTop, p && t > p ? (c.style.overflowY = "scroll", t = p) : (c.style.overflowY = "hidden", u > t && (t = u)), t += m, t -= 113, Math.abs(n - t) > .01 && (c.style.height = t + "px", o.className = o.className, f && s.callback.call(c, c), d.trigger("autosize.resized"))
            }

            function l() {
                clearTimeout(h), h = setTimeout(function() {
                    var t = d.width();
                    t !== v && (v = t, r())
                }, parseInt(s.resizeDelay, 10))
            }
            var p, u, h, c = this,
                d = t(c),
                m = 0,
                f = t.isFunction(s.callback),
                g = {
                    height: c.style.height,
                    overflow: c.style.overflow,
                    overflowY: c.style.overflowY,
                    wordWrap: c.style.wordWrap,
                    resize: c.style.resize
                }, v = d.width(),
                y = d.css("resize");
            d.data("autosize") || (d.data("autosize", !0), ("border-box" === d.css("box-sizing") || "border-box" === d.css("-moz-box-sizing") || "border-box" === d.css("-webkit-box-sizing")) && (m = d.outerHeight() - d.height()), u = Math.max(parseFloat(d.css("minHeight")) - m || 0, d.height()), d.css({
                overflow: "hidden",
                overflowY: "hidden",
                wordWrap: "break-word"
            }), "vertical" === y ? d.css("resize", "none") : "both" === y && d.css("resize", "horizontal"), "onpropertychange" in c ? "oninput" in c ? d.on("input.autosize keyup.autosize", r) : d.on("propertychange.autosize", function() {
                "value" === event.propertyName && r()
            }) : d.on("input.autosize", r), s.resizeDelay !== !1 && t(window).on("resize.autosize", l), d.on("autosize.resize", r), d.on("autosize.resizeIncludeStyle", function() {
                e = null, r()
            }), d.on("autosize.destroy", function() {
                e = null, clearTimeout(h), t(window).off("resize", l), d.off("autosize").off(".autosize").css(g).removeData("autosize")
            }), r())
        })) : this
    }
}(jQuery || $),
function(t, e, i, n) {
    function o(e, n) {
        this.$element = t(e), this.$document = t(i), this.settings = t.extend({}, a, n), this._defaults = a, this._name = s, this._animationInterval = t.noop(), this._charIndex = 0, this._currentPage = this.settings.pages[this.settings.startPage], this._fullstring = "", this._fullstringLength = 0, this._tagTypes = {
            LINK: "link",
            EXTERNAL: "external",
            INPUT: "input"
        }, this._stringTag = {
            start: "[s]",
            end: "[/s]"
        }, this._inputTag = {
            start: "[i]",
            end: "[/i]"
        }, this._tagWrapStart = 0, this._linkIndex = 0, this._inputIndex = 0, this._tagType = this._tagTypes.LINK, this._externalWrapper = t('<a href="#" />'), this._inputWrapper = t("<input />"), this.init()
    }
    var s = "typelink",
        a = {
            pages: {},
            startPage: 0,
            textDelay: 50,
            $wrapper: t("<span>"),
            wrapperClass: "highlight",
            externalClass: "highlight",
            defaultLinkTarget: "_blank",
            defaultInputType: "text",
            deleteDelay: 15
        };
    t.extend(o.prototype, {
        init: function() {
            this.settings.$wrapper = this.buildWordWrap(), this.settings.$wrapper.css("white-space", "pre"), this.createEvents(), this.animateText(this.settings.startPage)
        },
        buildWordWrap: function() {
            return this.settings.$wrapper.addClass(this.settings.wrapperClass)
        },
        animateText: function(e) {
            this.resetValues(e), this._animationInterval = setInterval(t.proxy(this.animationCycle, this), this.settings.textDelay)
        },
        animationCycle: function() {
            var t = this._fullstring.substring(this._charIndex - 1, this._charIndex),
                e = this._fullstring.substring(this._charIndex - 1, this._charIndex + 2),
                i = this._fullstring.substring(this._charIndex - 1, this._charIndex + 3);
            0 === e.indexOf(this._stringTag.start) ? (this._tagWrapStart = this._charIndex, this._tagType = this._tagTypes.LINK, this._charIndex += 2) : 0 === i.indexOf(this._stringTag.end) ? (this.wrapWord(this._tagWrapStart, this._charIndex), this._charIndex += 3) : 0 === e.indexOf(this._inputTag.start) ? (this._tagWrapStart = this._charIndex, this._tagType = this._tagTypes.INPUT, this._charIndex += 2) : 0 === i.indexOf(this._inputTag.end) ? (this.wrapWord(this._tagWrapStart, this._charIndex), this._charIndex += 3) : this.$element.append(t), this._charIndex >= this._fullstringLength && this.stopTyping(), this._charIndex++
        },
        wrapWord: function(t, e) {
            var i = t,
                o = e,
                s = this._fullstring.slice(i + 2, o - 1),
                a = this.$element.html(),
                r = a.length,
                l = a.slice(0, r - s.length),
                p = null;
            if (this._tagType == this._tagTypes.LINK) {
                var u = this._currentPage.links[this._linkIndex];
                u.toText != n ? (p = this.settings.$wrapper.text(s), p.attr("data-page", u.toText)) : (p = this._externalWrapper.text(s), p.addClass(this.settings.externalClass), p.attr({
                    href: u.link,
                    target: u.target || this.settings.defaultLinkTarget
                })), this._linkIndex++
            } else if (this._tagType == this._tagTypes.INPUT) {
                var h = this._currentPage.inputs[this._inputIndex];
                p = this._inputWrapper, p.attr({
                    placeholder: s,
                    type: h.type || this.settings.defaultInputType,
                    name: h.name || s.replace(" ", "_")
                }), this._inputIndex++
            }
            0 == i && (l = ""), this.$element.html(l + " ").append(p)
        },
        stopTyping: function() {
            clearInterval(this._animationInterval)
        },
        resetValues: function(t) {
            this._charIndex = 0, this._linkIndex = 0, this._inputIndex = 0, this._currentPage = this.settings.pages[t], this._fullstring = this._currentPage.text, this._fullstringLength = this._fullstring.length
        },
        createEvents: function() {
            var t = "." + this.settings.wrapperClass,
                e = t + ":not('a')";
            this.$document.on("click", e, this, this.changePage)
        },
        changePage: function(e) {
            var i = e.data,
                n = t(this).data("page");
            clearInterval(i._animationInterval), i.textResetHideAnimation(function() {
                i.animateText(n)
            })
        },
        textResetHideAnimation: function(e) {
            var i = this.settings.$wrapper.parent();
            i.html(i.text());
            var n = i.text(),
                o = n.length;
            this._animationInterval = setInterval(t.proxy(function() {
                var t = n.substring(0, o);
                i.text(t), 0 >= o && (clearInterval(this._animationInterval), e()), o--
            }, this), this.settings.deleteDelay)
        }
    }), t.fn[s] = function(e) {
        return this.each(function() {
            t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new o(this, e))
        }), this
    }
}(jQuery, window, document),
function(t, e, i, n) {
    function o(e, i) {
        var s = this;
        "object" == typeof i && (delete i.refresh, delete i.render, t.extend(this, i)), this.$element = t(e), !this.imageSrc && this.$element.is("img") && (this.imageSrc = this.$element.attr("src"));
        var a = (this.position + "").toLowerCase().match(/\S+/g) || [];
        return a.length < 1 && a.push("center"), 1 == a.length && a.push(a[0]), "top" == a[0] || "bottom" == a[0] || "left" == a[1] || "right" == a[1] ? (s.positionX = a[1], s.positionY = a[0]) : (s.positionX = a[0], s.positionY = a[1]), this.positionX != n && (a[0] = this.positionX.toLowerCase()), this.positionY != n && (a[1] = this.positionY.toLowerCase()), "left" != this.positionX && "right" != this.positionX && (this.positionX = isNaN(parseInt(this.positionX)) ? "center" : parseInt(this.positionX)), "top" != this.positionY && "bottom" != this.positionY && (this.positionY = isNaN(parseInt(this.positionY)) ? "center" : parseInt(this.positionY)), this.position = this.positionX + (isNaN(this.positionX) ? "" : "px") + " " + this.positionY + (isNaN(this.positionY) ? "" : "px"), navigator.userAgent.match(/(iPod|iPhone|iPad)/) ? (this.iosFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this) : navigator.userAgent.match(/(Android)/) ? (this.androidFix && !this.$element.is("img") && this.$element.css({
            backgroundImage: "url(" + this.imageSrc + ")",
            backgroundSize: "cover",
            backgroundPosition: this.position
        }), this) : (this.$mirror = t("<div />").prependTo("body"), this.$slider = t("<img />").prependTo(this.$mirror), this.$mirror.addClass("parallax-mirror").css({
            visibility: "hidden",
            zIndex: this.zIndex,
            position: "fixed",
            top: 0,
            left: 0,
            overflow: "hidden"
        }), this.$slider.addClass("parallax-slider").one("load", function() {
            s.naturalHeight && s.naturalWidth || (s.naturalHeight = this.naturalHeight || this.height || 1, s.naturalWidth = this.naturalWidth || this.width || 1), s.aspectRatio = s.naturalWidth / s.naturalHeight, o.isSetup || o.setup(), o.sliders.push(s), o.isFresh = !1, o.requestRender()
        }), this.$slider[0].src = this.imageSrc, void((this.naturalHeight && this.naturalWidth || this.$slider[0].complete) && this.$slider.trigger("load")))
    }

    function s(n) {
        return this.each(function() {
            var s = t(this),
                a = "object" == typeof n && n;
            this == e || this == i || s.is("body") ? o.configure(a) : s.data("px.parallax") || (a = t.extend({}, s.data(), a), s.data("px.parallax", new o(this, a))), "string" == typeof n && o[n]()
        })
    }! function() {
        for (var t = 0, i = ["ms", "moz", "webkit", "o"], n = 0; n < i.length && !e.requestAnimationFrame; ++n) e.requestAnimationFrame = e[i[n] + "RequestAnimationFrame"], e.cancelAnimationFrame = e[i[n] + "CancelAnimationFrame"] || e[i[n] + "CancelRequestAnimationFrame"];
        e.requestAnimationFrame || (e.requestAnimationFrame = function(i) {
            var n = (new Date).getTime(),
                o = Math.max(0, 16 - (n - t)),
                s = e.setTimeout(function() {
                    i(n + o)
                }, o);
            return t = n + o, s
        }), e.cancelAnimationFrame || (e.cancelAnimationFrame = function(t) {
            clearTimeout(t)
        })
    }(), t.extend(o.prototype, {
        speed: .2,
        bleed: 0,
        zIndex: -100,
        iosFix: !0,
        androidFix: !0,
        position: "center",
        refresh: function() {
            this.boxWidth = this.$element.outerWidth(), this.boxHeight = this.$element.outerHeight() + 2 * this.bleed, this.boxOffsetTop = this.$element.offset().top - this.bleed, this.boxOffsetLeft = this.$element.offset().left, this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;
            var t = o.winHeight,
                e = o.docHeight,
                i = Math.min(this.boxOffsetTop, e - t),
                n = Math.max(this.boxOffsetTop + this.boxHeight - t, 0),
                s = this.boxHeight + (i - n) * (1 - this.speed) | 0,
                a = (this.boxOffsetTop - i) * (1 - this.speed) | 0;
            if (s * this.aspectRatio >= this.boxWidth) {
                this.imageWidth = s * this.aspectRatio | 0, this.imageHeight = s, this.offsetBaseTop = a;
                var r = this.imageWidth - this.boxWidth;
                this.offsetLeft = "left" == this.positionX ? 0 : "right" == this.positionX ? -r : isNaN(this.positionX) ? -r / 2 | 0 : Math.max(this.positionX, -r)
            } else {
                this.imageWidth = this.boxWidth, this.imageHeight = this.boxWidth / this.aspectRatio | 0, this.offsetLeft = 0;
                var r = this.imageHeight - s;
                this.offsetBaseTop = "top" == this.positionY ? a : "bottom" == this.positionY ? a - r : isNaN(this.positionY) ? a - r / 2 | 0 : a + Math.max(this.positionY, -r)
            }
        },
        render: function() {
            var t = o.scrollTop,
                e = o.scrollLeft,
                i = t + o.winHeight;
            this.visibility = this.boxOffsetBottom > t && this.boxOffsetTop < i ? "visible" : "hidden", this.mirrorTop = this.boxOffsetTop - t, this.mirrorLeft = this.boxOffsetLeft - e, this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed), this.$mirror.css({
                transform: "translate3d(0px, 0px, 0px)",
                visibility: this.visibility,
                top: this.mirrorTop,
                left: this.mirrorLeft,
                height: this.boxHeight,
                width: this.boxWidth
            }), this.$slider.css({
                transform: "translate3d(0px, 0px, 0px)",
                position: "absolute",
                top: this.offsetTop,
                left: this.offsetLeft,
                height: this.imageHeight,
                width: this.imageWidth
            })
        }
    }), t.extend(o, {
        scrollTop: 0,
        scrollLeft: 0,
        winHeight: 0,
        winWidth: 0,
        docHeight: 1 << 30,
        docWidth: 1 << 30,
        sliders: [],
        isReady: !1,
        isFresh: !1,
        isBusy: !1,
        setup: function() {
            if (!this.isReady) {
                var n = t(i),
                    s = t(e);
                s.on("scroll.px.parallax load.px.parallax", function() {
                    var t = o.docHeight - o.winHeight,
                        e = o.docWidth - o.winWidth;
                    o.scrollTop = Math.max(0, Math.min(t, s.scrollTop())), o.scrollLeft = Math.max(0, Math.min(e, s.scrollLeft())), o.requestRender()
                }).on("resize.px.parallax load.px.parallax", function() {
                    o.winHeight = s.height(), o.winWidth = s.width(), o.docHeight = n.height(), o.docWidth = n.width(), o.isFresh = !1, o.requestRender()
                }), this.isReady = !0
            }
        },
        configure: function(e) {
            "object" == typeof e && (delete e.refresh, delete e.render, t.extend(this.prototype, e))
        },
        refresh: function() {
            t.each(this.sliders, function() {
                this.refresh()
            }), this.isFresh = !0
        },
        render: function() {
            this.isFresh || this.refresh(), t.each(this.sliders, function() {
                this.render()
            })
        },
        requestRender: function() {
            var t = this;
            this.isBusy || (this.isBusy = !0, e.requestAnimationFrame(function() {
                t.render(), t.isBusy = !1
            }))
        }
    });
    var a = t.fn.parallax;
    t.fn.parallax = s, t.fn.parallax.Constructor = o, t.fn.parallax.noConflict = function() {
        return t.fn.parallax = a, this
    }, t(i).on("ready.px.parallax.data-api", function() {
        t('[data-parallax="scroll"]').parallax()
    })
}(jQuery, window, document);
var feed_header_height = 0,
    about_pages = [{
        text: "ANAKIN WORKS FREE FOR FUN ]& FOR MONEY WE LOVE DO < CI PRINT WEB ECOM N'JOY > AS LONG AS THE [s]FORCE[/s] STAYS WIZ US",
        links: [{
            toText: 1
        }]
    }, {
        text: "BEAUTY = PRICE & PART OF THE FUNCTION [s]SAY HELLO![/s]",
        links: [{
            link: "contact",
            target: "_self"
        }]
    }];
window.addEventListener("DOMContentLoaded", function() {
    new QueryLoader2(document.querySelector("body"), {
        barColor: "#000",
        backgroundColor: "#fff",
        barHeight: 3,
        fadeOutTime: 200
    })
});
var resizeInner = function() {
    $(".cases .ito .txt .inner").each(function() {
        var t = $(this).css({
            position: "absolute",
            left: "50%",
            maxWidth: "none"
        });
        t.css("margin-left", "-" + t.width() / 2 + "px")
    })
};
$(document).ready(function() {
    $(window).on("resize", resizeInner), $(".linkAniWrap a[href]").click(function(t) {
        var e = $(this).attr("href"),
            i = $(".linkAniMenu"),
            n = $(".linkAniContent").css("position", "relative");
        i.animate({
            right: "-" + i.width() + "px"
        }, 200, function() {
            n.animate({
                right: $("body").width() + "px"
            }, 800, function() {
                $("#menu").css("background-color", "#fff"), document.location = e
            }), $("header *, footer *").css("visibility", "hidden"), $(".parallax-mirror, .linkAniHide").hide()
        }), t.preventDefault()
    });
    var t = $(window).width();
    $(".feedbg").length > 0 && (feed_header_height = $(".feedbg").height()), $("body").flowtype({
        minimum: 480,
        maximum: 1920,
        minFont: 12,
        maxFont: 28,
        fontRatio: 30
    }), $(".menu").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 300), $("#menu").fadeIn()
    }), $(".icl").click(function() {
        return $("html, body").animate({
            scrollTop: 850
        }, 300), $("#menu").fadeIn(), !1
    }), $("#menu .close").click(function() {
        $("#menu").fadeOut()
    }), $("#text-container").length > 0 && $("#text-container").typelink({
        pages: about_pages
    }), $("#contact-container").length > 0 && $("#contact-container").typelink({
        pages: contact_pages
    }), $(".work .item").hover(function() {
        $(this).find(".hover").fadeIn(300)
    }, function() {
        $(this).find(".hover").fadeOut(300)
    }), $(".item.facebook, .item.instagram").hover(function() {
        $(this).find(".hover").fadeIn(500)
    }, function() {
        $(this).find(".hover").fadeOut(500)
    }), $(".item.vimeo").hover(function() {
        $(this).find(".center.video").css("background-color", "rgba(0, 0, 0, 0.6)"), $(this).find(".video p").fadeIn(500)
    }, function() {
        $(this).find(".center.video").css("background-color", "transparent"), $(this).find(".video p").fadeOut(500)
    }), $(".item.vimeo").click(function() {
        if ($(this).find("img.cover").is(":visible")) {
            var t = $(this).height(),
                e = $(this).width();
            $(this).css("height", t + "px").css("width", e + "px"), $(this).find("iframe").css("height", t + "px").css("width", e + "px"), $(this).find("img.cover, .vcenter").fadeOut(), $(this).find("iframe")[0].src += "?autoplay=1&loop=1&badge=0&byline=0&autopause=0"
        }
    }), $(".contact-info").length > 0 && $(".contact-info textarea").autosize(), $("input.btnSubmit").click(function() {
        var t = $("textarea[name=fromName]"),
            e = $("textarea[name=fromEmail]"),
            i = $("textarea[name=content]");
        return "" == t.val() ? (t.addClass("hlight"), !1) : (t.removeClass("hlight"), "" == e.val() ? (e.addClass("hlight"), !1) : (e.removeClass("hlight"), "" == i.val() ? (i.addClass("hlight"), !1) : (i.removeClass("hlight"), $.ajax({
            url: "/ajax/sendmail.php",
            type: "POST",
            data: {
                name: t.val(),
                email: e.val(),
                message: encodeURIComponent(i.val())
            },
            cache: !1,
            success: function(t) {
                t ? ($(".btnSubmit, .contact-info").fadeOut("slow"), $(".successMsg").fadeIn("slow")) : alert("Sorry, unexpected error. Please try it later.")
            }
        }), !1)))
    }), $(window).on("resize", function() {
        var e = !1;
        document.documentElement.requestFullscreen ? e = !0 : document.documentElement.msRequestFullscreen ? e = !0 : document.documentElement.mozRequestFullScreen ? e = !0 : document.documentElement.webkitRequestFullscreen && (e = !0), !e && $(".item.vimeo").length > 0 && $(".item.vimeo").each(function() {
            $(this).css("height", "").css("width", ""), $(this).find("img.cover, .vcenter").show(), $(this).find("iframe")[0].src = $(this).find("iframe").data("osrc")
        }), t = $(window).width(), $(".feedbg").length > 0 && (feed_header_height = $(".feedbg").height())
    }), $(window).scroll(function() {
        var t = $(window).scrollTop();
        $(".feedbg").length > 0 && ($(".menu img")[0].src = t + 100 > feed_header_height ? "/static/svg/menu.svg" : "/static/svg/menu-white.svg")
    }), $("#owl-flyer").length > 0 && $("#owl-flyer").owlCarousel({
        navigation: !1,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: !0
    }), $("#owl-flyer2").length > 0 && $("#owl-flyer2").owlCarousel({
        navigation: !1,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: !0
    }), $("#owl-flyer3").length > 0 && $("#owl-flyer3").owlCarousel({
        navigation: !1,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: !0
    })
}),
function(t) {
    function e() {
        s = !1;
        for (var e = 0; e < n.length; e++) {
            var o = t(n[e]).filter(function() {
                return t(this).is(":appeared")
            });
            if (o.trigger("appear", [o]), i) {
                var a = i.not(o);
                a.trigger("disappear", [a])
            }
            i = o
        }
    }
    var i, n = [],
        o = !1,
        s = !1,
        a = {
            interval: 250,
            force_process: !1
        }, r = t(window);
    t.expr[":"].appeared = function(e) {
        var i = t(e);
        if (!i.is(":visible")) return !1;
        var n = r.scrollLeft(),
            o = r.scrollTop(),
            s = i.offset(),
            a = s.left,
            l = s.top;
        return l + i.height() >= o && l - (i.data("appear-top-offset") || 0) <= o + r.height() && a + i.width() >= n && a - (i.data("appear-left-offset") || 0) <= n + r.width() ? !0 : !1
    }, t.fn.extend({
        appear: function(i) {
            var r = t.extend({}, a, i || {}),
                l = this.selector || this;
            if (!o) {
                var p = function() {
                    s || (s = !0, setTimeout(e, r.interval))
                };
                t(window).scroll(p).resize(p), o = !0
            }
            return r.force_process && setTimeout(e, r.interval), n.push(l), t(l)
        }
    }), t.extend({
        force_appear: function() {
            return o ? (e(), !0) : !1
        }
    })
}(jQuery),
function(t) {
    "$:nomunge";

    function e(e) {
        function n() {
            e ? a.removeData(e) : c && delete i[c]
        }

        function s() {
            l.id = setTimeout(function() {
                l.fn()
            }, d)
        }
        var a, r = this,
            l = {}, p = e ? t.fn : t,
            u = arguments,
            h = 4,
            c = u[1],
            d = u[2],
            m = u[3];
        if ("string" != typeof c && (h--, c = e = 0, d = u[1], m = u[2]), e ? (a = r.eq(0), a.data(e, l = a.data(e) || {})) : c && (l = i[c] || (i[c] = {})), l.id && clearTimeout(l.id), delete l.id, m) l.fn = function(t) {
            "string" == typeof m && (m = p[m]), m.apply(r, o.call(u, h)) !== !0 || t ? n() : s()
        }, s();
        else {
            if (l.fn) return void 0 === d ? n() : l.fn(d === !1), !0;
            n()
        }
    }
    var i = {}, n = "doTimeout",
        o = Array.prototype.slice;
    t[n] = function() {
        return e.apply(window, [0].concat(o.call(arguments)))
    }, t.fn[n] = function() {
        var t = o.call(arguments),
            i = e.apply(this, [n + t[0]].concat(t));
        return "number" == typeof t[0] || "number" == typeof t[1] ? this : i
    }
}(jQuery), $(".animatedParent").appear(), $(".animatedClick").click(function() {
    var t = $(this).attr("data-target");
    if (void 0 != $(this).attr("data-sequence")) {
        var e = $("." + t + ":first").attr("data-id"),
            i = $("." + t + ":last").attr("data-id"),
            n = e;
        $("." + t + "[data-id=" + n + "]").hasClass("go") ? ($("." + t + "[data-id=" + n + "]").addClass("goAway"), $("." + t + "[data-id=" + n + "]").removeClass("go")) : ($("." + t + "[data-id=" + n + "]").addClass("go"), $("." + t + "[data-id=" + n + "]").removeClass("goAway")), n++, delay = Number($(this).attr("data-sequence")), $.doTimeout(delay, function() {
            return console.log(i), $("." + t + "[data-id=" + n + "]").hasClass("go") ? ($("." + t + "[data-id=" + n + "]").addClass("goAway"), $("." + t + "[data-id=" + n + "]").removeClass("go")) : ($("." + t + "[data-id=" + n + "]").addClass("go"), $("." + t + "[data-id=" + n + "]").removeClass("goAway")), ++n, i >= n ? !0 : void 0
        })
    } else $("." + t).hasClass("go") ? ($("." + t).addClass("goAway"), $("." + t).removeClass("go")) : ($("." + t).addClass("go"), $("." + t).removeClass("goAway"))
}), $(document.body).on("appear", ".animatedParent", function() {
    var t = $(this).find(".animated"),
        e = $(this);
    if (void 0 != e.attr("data-sequence")) {
        var i = $(this).find(".animated:first").attr("data-id"),
            n = i,
            o = $(this).find(".animated:last").attr("data-id");
        $(e).find(".animated[data-id=" + n + "]").addClass("go"), n++, delay = Number(e.attr("data-sequence")), $.doTimeout(delay, function() {
            return $(e).find(".animated[data-id=" + n + "]").addClass("go"), ++n, o >= n ? !0 : void 0
        })
    } else t.addClass("go")
}), $(document.body).on("disappear", ".animatedParent", function() {
    $(this).hasClass("animateOnce") || $(this).find(".animated").removeClass("go")
}), $(window).load(function() {
    $.force_appear()
});
