!(function (t, e) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var r = e();
    for (var n in r) ("object" == typeof exports ? exports : t)[n] = r[n];
  }
})(this, function () {
  return (() => {
    var t = {
        8670: (t, e) => {
          function r(t) {
            if (t)
              return (function (t) {
                for (var e in r.prototype) t[e] = r.prototype[e];
                return t;
              })(t);
          }
          (e.Emitter = r),
            (r.prototype.on = r.prototype.addEventListener =
              function (t, e) {
                return (
                  (this._callbacks = this._callbacks || {}),
                  (this._callbacks["$" + t] =
                    this._callbacks["$" + t] || []).push(e),
                  this
                );
              }),
            (r.prototype.once = function (t, e) {
              function r() {
                this.off(t, r), e.apply(this, arguments);
              }
              return (r.fn = e), this.on(t, r), this;
            }),
            (r.prototype.off =
              r.prototype.removeListener =
              r.prototype.removeAllListeners =
              r.prototype.removeEventListener =
                function (t, e) {
                  if (
                    ((this._callbacks = this._callbacks || {}),
                    0 == arguments.length)
                  )
                    return (this._callbacks = {}), this;
                  var r,
                    n = this._callbacks["$" + t];
                  if (!n) return this;
                  if (1 == arguments.length)
                    return delete this._callbacks["$" + t], this;
                  for (var o = 0; o < n.length; o++)
                    if ((r = n[o]) === e || r.fn === e) {
                      n.splice(o, 1);
                      break;
                    }
                  return (
                    0 === n.length && delete this._callbacks["$" + t], this
                  );
                }),
            (r.prototype.emit = function (t) {
              this._callbacks = this._callbacks || {};
              for (
                var e = new Array(arguments.length - 1),
                  r = this._callbacks["$" + t],
                  n = 1;
                n < arguments.length;
                n++
              )
                e[n - 1] = arguments[n];
              if (r) {
                n = 0;
                for (var o = (r = r.slice(0)).length; n < o; ++n)
                  r[n].apply(this, e);
              }
              return this;
            }),
            (r.prototype.emitReserved = r.prototype.emit),
            (r.prototype.listeners = function (t) {
              return (
                (this._callbacks = this._callbacks || {}),
                this._callbacks["$" + t] || []
              );
            }),
            (r.prototype.hasListeners = function (t) {
              return !!this.listeners(t).length;
            });
        },
        2307: (t) => {
          function e(t) {
            (t = t || {}),
              (this.ms = t.min || 100),
              (this.max = t.max || 1e4),
              (this.factor = t.factor || 2),
              (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
              (this.attempts = 0);
          }
          (t.exports = e),
            (e.prototype.duration = function () {
              var t = this.ms * Math.pow(this.factor, this.attempts++);
              if (this.jitter) {
                var e = Math.random(),
                  r = Math.floor(e * this.jitter * t);
                t = 0 == (1 & Math.floor(10 * e)) ? t - r : t + r;
              }
              return 0 | Math.min(t, this.max);
            }),
            (e.prototype.reset = function () {
              this.attempts = 0;
            }),
            (e.prototype.setMin = function (t) {
              this.ms = t;
            }),
            (e.prototype.setMax = function (t) {
              this.max = t;
            }),
            (e.prototype.setJitter = function (t) {
              this.jitter = t;
            });
        },
        5765: (t, e, r) => {
          "use strict";
          r.r(e), r.d(e, { decode: () => a, encode: () => i });
          for (
            var n =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              o = "undefined" == typeof Uint8Array ? [] : new Uint8Array(256),
              s = 0;
            s < n.length;
            s++
          )
            o[n.charCodeAt(s)] = s;
          var i = function (t) {
              var e,
                r = new Uint8Array(t),
                o = r.length,
                s = "";
              for (e = 0; e < o; e += 3)
                (s += n[r[e] >> 2]),
                  (s += n[((3 & r[e]) << 4) | (r[e + 1] >> 4)]),
                  (s += n[((15 & r[e + 1]) << 2) | (r[e + 2] >> 6)]),
                  (s += n[63 & r[e + 2]]);
              return (
                o % 3 == 2
                  ? (s = s.substring(0, s.length - 1) + "=")
                  : o % 3 == 1 && (s = s.substring(0, s.length - 2) + "=="),
                s
              );
            },
            a = function (t) {
              var e,
                r,
                n,
                s,
                i,
                a = 0.75 * t.length,
                c = t.length,
                u = 0;
              "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
              var p = new ArrayBuffer(a),
                h = new Uint8Array(p);
              for (e = 0; e < c; e += 4)
                (r = o[t.charCodeAt(e)]),
                  (n = o[t.charCodeAt(e + 1)]),
                  (s = o[t.charCodeAt(e + 2)]),
                  (i = o[t.charCodeAt(e + 3)]),
                  (h[u++] = (r << 2) | (n >> 4)),
                  (h[u++] = ((15 & n) << 4) | (s >> 2)),
                  (h[u++] = ((3 & s) << 6) | (63 & i));
              return p;
            };
        },
        7291: (t, e, r) => {
          r(5234),
            r(5769),
            r(3238),
            r(1418),
            r(2107),
            r(3007),
            r(1370),
            r(7460);
          var n = r(9775);
          t.exports = n.Promise;
        },
        5089: (t, e, r) => {
          var n = r(2086),
            o = r(930),
            s = r(9268),
            i = n.TypeError;
          t.exports = function (t) {
            if (o(t)) return t;
            throw i(s(t) + " is not a function");
          };
        },
        1449: (t, e, r) => {
          var n = r(2086),
            o = r(1956),
            s = r(9268),
            i = n.TypeError;
          t.exports = function (t) {
            if (o(t)) return t;
            throw i(s(t) + " is not a constructor");
          };
        },
        1378: (t, e, r) => {
          var n = r(2086),
            o = r(930),
            s = n.String,
            i = n.TypeError;
          t.exports = function (t) {
            if ("object" == typeof t || o(t)) return t;
            throw i("Can't set " + s(t) + " as a prototype");
          };
        },
        8669: (t, e, r) => {
          var n = r(211),
            o = r(4710),
            s = r(7826),
            i = n("unscopables"),
            a = Array.prototype;
          null == a[i] && s.f(a, i, { configurable: !0, value: o(null) }),
            (t.exports = function (t) {
              a[i][t] = !0;
            });
        },
        1855: (t, e, r) => {
          var n = r(2086),
            o = r(5516),
            s = n.TypeError;
          t.exports = function (t, e) {
            if (o(e, t)) return t;
            throw s("Incorrect invocation");
          };
        },
        6112: (t, e, r) => {
          var n = r(2086),
            o = r(8759),
            s = n.String,
            i = n.TypeError;
          t.exports = function (t) {
            if (o(t)) return t;
            throw i(s(t) + " is not an object");
          };
        },
        6198: (t, e, r) => {
          var n = r(4088),
            o = r(7740),
            s = r(2871),
            i = function (t) {
              return function (e, r, i) {
                var a,
                  c = n(e),
                  u = s(c),
                  p = o(i, u);
                if (t && r != r) {
                  for (; u > p; ) if ((a = c[p++]) != a) return !0;
                } else
                  for (; u > p; p++)
                    if ((t || p in c) && c[p] === r) return t || p || 0;
                return !t && -1;
              };
            };
          t.exports = { includes: i(!0), indexOf: i(!1) };
        },
        3329: (t, e, r) => {
          var n = r(2086),
            o = r(7740),
            s = r(2871),
            i = r(9720),
            a = n.Array,
            c = Math.max;
          t.exports = function (t, e, r) {
            for (
              var n = s(t),
                u = o(e, n),
                p = o(void 0 === r ? n : r, n),
                h = a(c(p - u, 0)),
                f = 0;
              u < p;
              u++, f++
            )
              i(h, f, t[u]);
            return (h.length = f), h;
          };
        },
        745: (t, e, r) => {
          var n = r(8240);
          t.exports = n([].slice);
        },
        8939: (t, e, r) => {
          var n = r(211)("iterator"),
            o = !1;
          try {
            var s = 0,
              i = {
                next: function () {
                  return { done: !!s++ };
                },
                return: function () {
                  o = !0;
                },
              };
            (i[n] = function () {
              return this;
            }),
              Array.from(i, function () {
                throw 2;
              });
          } catch (t) {}
          t.exports = function (t, e) {
            if (!e && !o) return !1;
            var r = !1;
            try {
              var s = {};
              (s[n] = function () {
                return {
                  next: function () {
                    return { done: (r = !0) };
                  },
                };
              }),
                t(s);
            } catch (t) {}
            return r;
          };
        },
        2306: (t, e, r) => {
          var n = r(8240),
            o = n({}.toString),
            s = n("".slice);
          t.exports = function (t) {
            return s(o(t), 8, -1);
          };
        },
        375: (t, e, r) => {
          var n = r(2086),
            o = r(2371),
            s = r(930),
            i = r(2306),
            a = r(211)("toStringTag"),
            c = n.Object,
            u =
              "Arguments" ==
              i(
                (function () {
                  return arguments;
                })()
              );
          t.exports = o
            ? i
            : function (t) {
                var e, r, n;
                return void 0 === t
                  ? "Undefined"
                  : null === t
                  ? "Null"
                  : "string" ==
                    typeof (r = (function (t, e) {
                      try {
                        return t[e];
                      } catch (t) {}
                    })((e = c(t)), a))
                  ? r
                  : u
                  ? i(e)
                  : "Object" == (n = i(e)) && s(e.callee)
                  ? "Arguments"
                  : n;
              };
        },
        1765: (t, e, r) => {
          var n = r(8240),
            o = r(3329),
            s = n("".replace),
            i = n("".split),
            a = n([].join),
            c = String(Error("zxcasd").stack),
            u = /\n\s*at [^:]*:[^\n]*/,
            p = u.test(c),
            h = /@[^\n]*\n/.test(c) && !/zxcasd/.test(c);
          t.exports = function (t, e) {
            if ("string" != typeof t) return t;
            if (p) for (; e--; ) t = s(t, u, "");
            else if (h) return a(o(i(t, "\n"), e), "\n");
            return t;
          };
        },
        8474: (t, e, r) => {
          var n = r(9606),
            o = r(6095),
            s = r(4399),
            i = r(7826);
          t.exports = function (t, e) {
            for (var r = o(e), a = i.f, c = s.f, u = 0; u < r.length; u++) {
              var p = r[u];
              n(t, p) || a(t, p, c(e, p));
            }
          };
        },
        7209: (t, e, r) => {
          var n = r(3677);
          t.exports = !n(function () {
            function t() {}
            return (
              (t.prototype.constructor = null),
              Object.getPrototypeOf(new t()) !== t.prototype
            );
          });
        },
        471: (t, e, r) => {
          "use strict";
          var n = r(3083).IteratorPrototype,
            o = r(4710),
            s = r(5736),
            i = r(914),
            a = r(7719),
            c = function () {
              return this;
            };
          t.exports = function (t, e, r, u) {
            var p = e + " Iterator";
            return (
              (t.prototype = o(n, { next: s(+!u, r) })),
              i(t, p, !1, !0),
              (a[p] = c),
              t
            );
          };
        },
        2585: (t, e, r) => {
          var n = r(5283),
            o = r(7826),
            s = r(5736);
          t.exports = n
            ? function (t, e, r) {
                return o.f(t, e, s(1, r));
              }
            : function (t, e, r) {
                return (t[e] = r), t;
              };
        },
        5736: (t) => {
          t.exports = function (t, e) {
            return {
              enumerable: !(1 & t),
              configurable: !(2 & t),
              writable: !(4 & t),
              value: e,
            };
          };
        },
        9720: (t, e, r) => {
          "use strict";
          var n = r(2258),
            o = r(7826),
            s = r(5736);
          t.exports = function (t, e, r) {
            var i = n(e);
            i in t ? o.f(t, i, s(0, r)) : (t[i] = r);
          };
        },
        8432: (t, e, r) => {
          "use strict";
          var n = r(1695),
            o = r(9413),
            s = r(3296),
            i = r(4398),
            a = r(930),
            c = r(471),
            u = r(2130),
            p = r(7530),
            h = r(914),
            f = r(2585),
            l = r(1007),
            d = r(211),
            v = r(7719),
            y = r(3083),
            m = i.PROPER,
            g = i.CONFIGURABLE,
            b = y.IteratorPrototype,
            w = y.BUGGY_SAFARI_ITERATORS,
            _ = d("iterator"),
            k = "keys",
            x = "values",
            C = "entries",
            E = function () {
              return this;
            };
          t.exports = function (t, e, r, i, d, y, S) {
            c(r, e, i);
            var O,
              T,
              P,
              j = function (t) {
                if (t === d && M) return M;
                if (!w && t in F) return F[t];
                switch (t) {
                  case k:
                  case x:
                  case C:
                    return function () {
                      return new r(this, t);
                    };
                }
                return function () {
                  return new r(this);
                };
              },
              R = e + " Iterator",
              A = !1,
              F = t.prototype,
              L = F[_] || F["@@iterator"] || (d && F[d]),
              M = (!w && L) || j(d),
              B = ("Array" == e && F.entries) || L;
            if (
              (B &&
                (O = u(B.call(new t()))) !== Object.prototype &&
                O.next &&
                (s || u(O) === b || (p ? p(O, b) : a(O[_]) || l(O, _, E)),
                h(O, R, !0, !0),
                s && (v[R] = E)),
              m &&
                d == x &&
                L &&
                L.name !== x &&
                (!s && g
                  ? f(F, "name", x)
                  : ((A = !0),
                    (M = function () {
                      return o(L, this);
                    }))),
              d)
            )
              if (
                ((T = { values: j(x), keys: y ? M : j(k), entries: j(C) }), S)
              )
                for (P in T) (w || A || !(P in F)) && l(F, P, T[P]);
              else n({ target: e, proto: !0, forced: w || A }, T);
            return (
              (s && !S) || F[_] === M || l(F, _, M, { name: d }), (v[e] = M), T
            );
          };
        },
        5283: (t, e, r) => {
          var n = r(3677);
          t.exports = !n(function () {
            return (
              7 !=
              Object.defineProperty({}, 1, {
                get: function () {
                  return 7;
                },
              })[1]
            );
          });
        },
        821: (t, e, r) => {
          var n = r(2086),
            o = r(8759),
            s = n.document,
            i = o(s) && o(s.createElement);
          t.exports = function (t) {
            return i ? s.createElement(t) : {};
          };
        },
        933: (t) => {
          t.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0,
          };
        },
        3526: (t, e, r) => {
          var n = r(821)("span").classList,
            o = n && n.constructor && n.constructor.prototype;
          t.exports = o === Object.prototype ? void 0 : o;
        },
        172: (t) => {
          t.exports = "object" == typeof window;
        },
        1848: (t, e, r) => {
          var n = r(4999),
            o = r(2086);
          t.exports = /ipad|iphone|ipod/i.test(n) && void 0 !== o.Pebble;
        },
        4344: (t, e, r) => {
          var n = r(4999);
          t.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(n);
        },
        1801: (t, e, r) => {
          var n = r(2306),
            o = r(2086);
          t.exports = "process" == n(o.process);
        },
        4928: (t, e, r) => {
          var n = r(4999);
          t.exports = /web0s(?!.*chrome)/i.test(n);
        },
        4999: (t, e, r) => {
          var n = r(563);
          t.exports = n("navigator", "userAgent") || "";
        },
        1448: (t, e, r) => {
          var n,
            o,
            s = r(2086),
            i = r(4999),
            a = s.process,
            c = s.Deno,
            u = (a && a.versions) || (c && c.version),
            p = u && u.v8;
          p && (o = (n = p.split("."))[0] > 0 && n[0] < 4 ? 1 : +(n[0] + n[1])),
            !o &&
              i &&
              (!(n = i.match(/Edge\/(\d+)/)) || n[1] >= 74) &&
              (n = i.match(/Chrome\/(\d+)/)) &&
              (o = +n[1]),
            (t.exports = o);
        },
        8684: (t) => {
          t.exports = [
            "constructor",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toLocaleString",
            "toString",
            "valueOf",
          ];
        },
        2114: (t, e, r) => {
          var n = r(3677),
            o = r(5736);
          t.exports = !n(function () {
            var t = Error("a");
            return (
              !("stack" in t) ||
              (Object.defineProperty(t, "stack", o(1, 7)), 7 !== t.stack)
            );
          });
        },
        1695: (t, e, r) => {
          var n = r(2086),
            o = r(4399).f,
            s = r(2585),
            i = r(1007),
            a = r(3648),
            c = r(8474),
            u = r(7189);
          t.exports = function (t, e) {
            var r,
              p,
              h,
              f,
              l,
              d = t.target,
              v = t.global,
              y = t.stat;
            if ((r = v ? n : y ? n[d] || a(d, {}) : (n[d] || {}).prototype))
              for (p in e) {
                if (
                  ((f = e[p]),
                  (h = t.noTargetGet ? (l = o(r, p)) && l.value : r[p]),
                  !u(v ? p : d + (y ? "." : "#") + p, t.forced) && void 0 !== h)
                ) {
                  if (typeof f == typeof h) continue;
                  c(f, h);
                }
                (t.sham || (h && h.sham)) && s(f, "sham", !0), i(r, p, f, t);
              }
          };
        },
        3677: (t) => {
          t.exports = function (t) {
            try {
              return !!t();
            } catch (t) {
              return !0;
            }
          };
        },
        7258: (t) => {
          var e = Function.prototype,
            r = e.apply,
            n = e.bind,
            o = e.call;
          t.exports =
            ("object" == typeof Reflect && Reflect.apply) ||
            (n
              ? o.bind(r)
              : function () {
                  return o.apply(r, arguments);
                });
        },
        8516: (t, e, r) => {
          var n = r(8240),
            o = r(5089),
            s = n(n.bind);
          t.exports = function (t, e) {
            return (
              o(t),
              void 0 === e
                ? t
                : s
                ? s(t, e)
                : function () {
                    return t.apply(e, arguments);
                  }
            );
          };
        },
        9413: (t) => {
          var e = Function.prototype.call;
          t.exports = e.bind
            ? e.bind(e)
            : function () {
                return e.apply(e, arguments);
              };
        },
        4398: (t, e, r) => {
          var n = r(5283),
            o = r(9606),
            s = Function.prototype,
            i = n && Object.getOwnPropertyDescriptor,
            a = o(s, "name"),
            c = a && "something" === function () {}.name,
            u = a && (!n || (n && i(s, "name").configurable));
          t.exports = { EXISTS: a, PROPER: c, CONFIGURABLE: u };
        },
        8240: (t) => {
          var e = Function.prototype,
            r = e.bind,
            n = e.call,
            o = r && r.bind(n);
          t.exports = r
            ? function (t) {
                return t && o(n, t);
              }
            : function (t) {
                return (
                  t &&
                  function () {
                    return n.apply(t, arguments);
                  }
                );
              };
        },
        563: (t, e, r) => {
          var n = r(2086),
            o = r(930),
            s = function (t) {
              return o(t) ? t : void 0;
            };
          t.exports = function (t, e) {
            return arguments.length < 2 ? s(n[t]) : n[t] && n[t][e];
          };
        },
        1667: (t, e, r) => {
          var n = r(375),
            o = r(2964),
            s = r(7719),
            i = r(211)("iterator");
          t.exports = function (t) {
            if (null != t) return o(t, i) || o(t, "@@iterator") || s[n(t)];
          };
        },
        3546: (t, e, r) => {
          var n = r(2086),
            o = r(9413),
            s = r(5089),
            i = r(6112),
            a = r(9268),
            c = r(1667),
            u = n.TypeError;
          t.exports = function (t, e) {
            var r = arguments.length < 2 ? c(t) : e;
            if (s(r)) return i(o(r, t));
            throw u(a(t) + " is not iterable");
          };
        },
        2964: (t, e, r) => {
          var n = r(5089);
          t.exports = function (t, e) {
            var r = t[e];
            return null == r ? void 0 : n(r);
          };
        },
        2086: (t, e, r) => {
          var n = function (t) {
            return t && t.Math == Math && t;
          };
          t.exports =
            n("object" == typeof globalThis && globalThis) ||
            n("object" == typeof window && window) ||
            n("object" == typeof self && self) ||
            n("object" == typeof r.g && r.g) ||
            (function () {
              return this;
            })() ||
            Function("return this")();
        },
        9606: (t, e, r) => {
          var n = r(8240),
            o = r(3060),
            s = n({}.hasOwnProperty);
          t.exports =
            Object.hasOwn ||
            function (t, e) {
              return s(o(t), e);
            };
        },
        7153: (t) => {
          t.exports = {};
        },
        1670: (t, e, r) => {
          var n = r(2086);
          t.exports = function (t, e) {
            var r = n.console;
            r &&
              r.error &&
              (1 == arguments.length ? r.error(t) : r.error(t, e));
          };
        },
        5963: (t, e, r) => {
          var n = r(563);
          t.exports = n("document", "documentElement");
        },
        6761: (t, e, r) => {
          var n = r(5283),
            o = r(3677),
            s = r(821);
          t.exports =
            !n &&
            !o(function () {
              return (
                7 !=
                Object.defineProperty(s("div"), "a", {
                  get: function () {
                    return 7;
                  },
                }).a
              );
            });
        },
        5974: (t, e, r) => {
          var n = r(2086),
            o = r(8240),
            s = r(3677),
            i = r(2306),
            a = n.Object,
            c = o("".split);
          t.exports = s(function () {
            return !a("z").propertyIsEnumerable(0);
          })
            ? function (t) {
                return "String" == i(t) ? c(t, "") : a(t);
              }
            : a;
        },
        9277: (t, e, r) => {
          var n = r(8240),
            o = r(930),
            s = r(4489),
            i = n(Function.toString);
          o(s.inspectSource) ||
            (s.inspectSource = function (t) {
              return i(t);
            }),
            (t.exports = s.inspectSource);
        },
        8945: (t, e, r) => {
          var n = r(8759),
            o = r(2585);
          t.exports = function (t, e) {
            n(e) && "cause" in e && o(t, "cause", e.cause);
          };
        },
        3278: (t, e, r) => {
          var n,
            o,
            s,
            i = r(9316),
            a = r(2086),
            c = r(8240),
            u = r(8759),
            p = r(2585),
            h = r(9606),
            f = r(4489),
            l = r(8944),
            d = r(7153),
            v = "Object already initialized",
            y = a.TypeError,
            m = a.WeakMap;
          if (i || f.state) {
            var g = f.state || (f.state = new m()),
              b = c(g.get),
              w = c(g.has),
              _ = c(g.set);
            (n = function (t, e) {
              if (w(g, t)) throw new y(v);
              return (e.facade = t), _(g, t, e), e;
            }),
              (o = function (t) {
                return b(g, t) || {};
              }),
              (s = function (t) {
                return w(g, t);
              });
          } else {
            var k = l("state");
            (d[k] = !0),
              (n = function (t, e) {
                if (h(t, k)) throw new y(v);
                return (e.facade = t), p(t, k, e), e;
              }),
              (o = function (t) {
                return h(t, k) ? t[k] : {};
              }),
              (s = function (t) {
                return h(t, k);
              });
          }
          t.exports = {
            set: n,
            get: o,
            has: s,
            enforce: function (t) {
              return s(t) ? o(t) : n(t, {});
            },
            getterFor: function (t) {
              return function (e) {
                var r;
                if (!u(e) || (r = o(e)).type !== t)
                  throw y("Incompatible receiver, " + t + " required");
                return r;
              };
            },
          };
        },
        2814: (t, e, r) => {
          var n = r(211),
            o = r(7719),
            s = n("iterator"),
            i = Array.prototype;
          t.exports = function (t) {
            return void 0 !== t && (o.Array === t || i[s] === t);
          };
        },
        930: (t) => {
          t.exports = function (t) {
            return "function" == typeof t;
          };
        },
        1956: (t, e, r) => {
          var n = r(8240),
            o = r(3677),
            s = r(930),
            i = r(375),
            a = r(563),
            c = r(9277),
            u = function () {},
            p = [],
            h = a("Reflect", "construct"),
            f = /^\s*(?:class|function)\b/,
            l = n(f.exec),
            d = !f.exec(u),
            v = function (t) {
              if (!s(t)) return !1;
              try {
                return h(u, p, t), !0;
              } catch (t) {
                return !1;
              }
            };
          t.exports =
            !h ||
            o(function () {
              var t;
              return (
                v(v.call) ||
                !v(Object) ||
                !v(function () {
                  t = !0;
                }) ||
                t
              );
            })
              ? function (t) {
                  if (!s(t)) return !1;
                  switch (i(t)) {
                    case "AsyncFunction":
                    case "GeneratorFunction":
                    case "AsyncGeneratorFunction":
                      return !1;
                  }
                  return d || !!l(f, c(t));
                }
              : v;
        },
        7189: (t, e, r) => {
          var n = r(3677),
            o = r(930),
            s = /#|\.prototype\./,
            i = function (t, e) {
              var r = c[a(t)];
              return r == p || (r != u && (o(e) ? n(e) : !!e));
            },
            a = (i.normalize = function (t) {
              return String(t).replace(s, ".").toLowerCase();
            }),
            c = (i.data = {}),
            u = (i.NATIVE = "N"),
            p = (i.POLYFILL = "P");
          t.exports = i;
        },
        8759: (t, e, r) => {
          var n = r(930);
          t.exports = function (t) {
            return "object" == typeof t ? null !== t : n(t);
          };
        },
        3296: (t) => {
          t.exports = !1;
        },
        2071: (t, e, r) => {
          var n = r(2086),
            o = r(563),
            s = r(930),
            i = r(5516),
            a = r(1876),
            c = n.Object;
          t.exports = a
            ? function (t) {
                return "symbol" == typeof t;
              }
            : function (t) {
                var e = o("Symbol");
                return s(e) && i(e.prototype, c(t));
              };
        },
        4722: (t, e, r) => {
          var n = r(2086),
            o = r(8516),
            s = r(9413),
            i = r(6112),
            a = r(9268),
            c = r(2814),
            u = r(2871),
            p = r(5516),
            h = r(3546),
            f = r(1667),
            l = r(6737),
            d = n.TypeError,
            v = function (t, e) {
              (this.stopped = t), (this.result = e);
            },
            y = v.prototype;
          t.exports = function (t, e, r) {
            var n,
              m,
              g,
              b,
              w,
              _,
              k,
              x = r && r.that,
              C = !(!r || !r.AS_ENTRIES),
              E = !(!r || !r.IS_ITERATOR),
              S = !(!r || !r.INTERRUPTED),
              O = o(e, x),
              T = function (t) {
                return n && l(n, "normal", t), new v(!0, t);
              },
              P = function (t) {
                return C
                  ? (i(t), S ? O(t[0], t[1], T) : O(t[0], t[1]))
                  : S
                  ? O(t, T)
                  : O(t);
              };
            if (E) n = t;
            else {
              if (!(m = f(t))) throw d(a(t) + " is not iterable");
              if (c(m)) {
                for (g = 0, b = u(t); b > g; g++)
                  if ((w = P(t[g])) && p(y, w)) return w;
                return new v(!1);
              }
              n = h(t, m);
            }
            for (_ = n.next; !(k = s(_, n)).done; ) {
              try {
                w = P(k.value);
              } catch (t) {
                l(n, "throw", t);
              }
              if ("object" == typeof w && w && p(y, w)) return w;
            }
            return new v(!1);
          };
        },
        6737: (t, e, r) => {
          var n = r(9413),
            o = r(6112),
            s = r(2964);
          t.exports = function (t, e, r) {
            var i, a;
            o(t);
            try {
              if (!(i = s(t, "return"))) {
                if ("throw" === e) throw r;
                return r;
              }
              i = n(i, t);
            } catch (t) {
              (a = !0), (i = t);
            }
            if ("throw" === e) throw r;
            if (a) throw i;
            return o(i), r;
          };
        },
        3083: (t, e, r) => {
          "use strict";
          var n,
            o,
            s,
            i = r(3677),
            a = r(930),
            c = r(4710),
            u = r(2130),
            p = r(1007),
            h = r(211),
            f = r(3296),
            l = h("iterator"),
            d = !1;
          [].keys &&
            ("next" in (s = [].keys())
              ? (o = u(u(s))) !== Object.prototype && (n = o)
              : (d = !0)),
            null == n ||
            i(function () {
              var t = {};
              return n[l].call(t) !== t;
            })
              ? (n = {})
              : f && (n = c(n)),
            a(n[l]) ||
              p(n, l, function () {
                return this;
              }),
            (t.exports = { IteratorPrototype: n, BUGGY_SAFARI_ITERATORS: d });
        },
        7719: (t) => {
          t.exports = {};
        },
        2871: (t, e, r) => {
          var n = r(4005);
          t.exports = function (t) {
            return n(t.length);
          };
        },
        3173: (t, e, r) => {
          var n,
            o,
            s,
            i,
            a,
            c,
            u,
            p,
            h = r(2086),
            f = r(8516),
            l = r(4399).f,
            d = r(4953).set,
            v = r(4344),
            y = r(1848),
            m = r(4928),
            g = r(1801),
            b = h.MutationObserver || h.WebKitMutationObserver,
            w = h.document,
            _ = h.process,
            k = h.Promise,
            x = l(h, "queueMicrotask"),
            C = x && x.value;
          C ||
            ((n = function () {
              var t, e;
              for (g && (t = _.domain) && t.exit(); o; ) {
                (e = o.fn), (o = o.next);
                try {
                  e();
                } catch (t) {
                  throw (o ? i() : (s = void 0), t);
                }
              }
              (s = void 0), t && t.enter();
            }),
            v || g || m || !b || !w
              ? !y && k && k.resolve
                ? (((u = k.resolve(void 0)).constructor = k),
                  (p = f(u.then, u)),
                  (i = function () {
                    p(n);
                  }))
                : g
                ? (i = function () {
                    _.nextTick(n);
                  })
                : ((d = f(d, h)),
                  (i = function () {
                    d(n);
                  }))
              : ((a = !0),
                (c = w.createTextNode("")),
                new b(n).observe(c, { characterData: !0 }),
                (i = function () {
                  c.data = a = !a;
                }))),
            (t.exports =
              C ||
              function (t) {
                var e = { fn: t, next: void 0 };
                s && (s.next = e), o || ((o = e), i()), (s = e);
              });
        },
        8109: (t, e, r) => {
          var n = r(2086);
          t.exports = n.Promise;
        },
        3193: (t, e, r) => {
          var n = r(1448),
            o = r(3677);
          t.exports =
            !!Object.getOwnPropertySymbols &&
            !o(function () {
              var t = Symbol();
              return (
                !String(t) ||
                !(Object(t) instanceof Symbol) ||
                (!Symbol.sham && n && n < 41)
              );
            });
        },
        9316: (t, e, r) => {
          var n = r(2086),
            o = r(930),
            s = r(9277),
            i = n.WeakMap;
          t.exports = o(i) && /native code/.test(s(i));
        },
        8722: (t, e, r) => {
          "use strict";
          var n = r(5089),
            o = function (t) {
              var e, r;
              (this.promise = new t(function (t, n) {
                if (void 0 !== e || void 0 !== r)
                  throw TypeError("Bad Promise constructor");
                (e = t), (r = n);
              })),
                (this.resolve = n(e)),
                (this.reject = n(r));
            };
          t.exports.f = function (t) {
            return new o(t);
          };
        },
        1879: (t, e, r) => {
          var n = r(4059);
          t.exports = function (t, e) {
            return void 0 === t ? (arguments.length < 2 ? "" : e) : n(t);
          };
        },
        4710: (t, e, r) => {
          var n,
            o = r(6112),
            s = r(7711),
            i = r(8684),
            a = r(7153),
            c = r(5963),
            u = r(821),
            p = r(8944)("IE_PROTO"),
            h = function () {},
            f = function (t) {
              return "<script>" + t + "</script>";
            },
            l = function (t) {
              t.write(f("")), t.close();
              var e = t.parentWindow.Object;
              return (t = null), e;
            },
            d = function () {
              try {
                n = new ActiveXObject("htmlfile");
              } catch (t) {}
              var t, e;
              d =
                "undefined" != typeof document
                  ? document.domain && n
                    ? l(n)
                    : (((e = u("iframe")).style.display = "none"),
                      c.appendChild(e),
                      (e.src = String("javascript:")),
                      (t = e.contentWindow.document).open(),
                      t.write(f("document.F=Object")),
                      t.close(),
                      t.F)
                  : l(n);
              for (var r = i.length; r--; ) delete d.prototype[i[r]];
              return d();
            };
          (a[p] = !0),
            (t.exports =
              Object.create ||
              function (t, e) {
                var r;
                return (
                  null !== t
                    ? ((h.prototype = o(t)),
                      (r = new h()),
                      (h.prototype = null),
                      (r[p] = t))
                    : (r = d()),
                  void 0 === e ? r : s(r, e)
                );
              });
        },
        7711: (t, e, r) => {
          var n = r(5283),
            o = r(7826),
            s = r(6112),
            i = r(4088),
            a = r(8779);
          t.exports = n
            ? Object.defineProperties
            : function (t, e) {
                s(t);
                for (var r, n = i(e), c = a(e), u = c.length, p = 0; u > p; )
                  o.f(t, (r = c[p++]), n[r]);
                return t;
              };
        },
        7826: (t, e, r) => {
          var n = r(2086),
            o = r(5283),
            s = r(6761),
            i = r(6112),
            a = r(2258),
            c = n.TypeError,
            u = Object.defineProperty;
          e.f = o
            ? u
            : function (t, e, r) {
                if ((i(t), (e = a(e)), i(r), s))
                  try {
                    return u(t, e, r);
                  } catch (t) {}
                if ("get" in r || "set" in r)
                  throw c("Accessors not supported");
                return "value" in r && (t[e] = r.value), t;
              };
        },
        4399: (t, e, r) => {
          var n = r(5283),
            o = r(9413),
            s = r(7446),
            i = r(5736),
            a = r(4088),
            c = r(2258),
            u = r(9606),
            p = r(6761),
            h = Object.getOwnPropertyDescriptor;
          e.f = n
            ? h
            : function (t, e) {
                if (((t = a(t)), (e = c(e)), p))
                  try {
                    return h(t, e);
                  } catch (t) {}
                if (u(t, e)) return i(!o(s.f, t, e), t[e]);
              };
        },
        62: (t, e, r) => {
          var n = r(1352),
            o = r(8684).concat("length", "prototype");
          e.f =
            Object.getOwnPropertyNames ||
            function (t) {
              return n(t, o);
            };
        },
        6952: (t, e) => {
          e.f = Object.getOwnPropertySymbols;
        },
        2130: (t, e, r) => {
          var n = r(2086),
            o = r(9606),
            s = r(930),
            i = r(3060),
            a = r(8944),
            c = r(7209),
            u = a("IE_PROTO"),
            p = n.Object,
            h = p.prototype;
          t.exports = c
            ? p.getPrototypeOf
            : function (t) {
                var e = i(t);
                if (o(e, u)) return e[u];
                var r = e.constructor;
                return s(r) && e instanceof r
                  ? r.prototype
                  : e instanceof p
                  ? h
                  : null;
              };
        },
        5516: (t, e, r) => {
          var n = r(8240);
          t.exports = n({}.isPrototypeOf);
        },
        1352: (t, e, r) => {
          var n = r(8240),
            o = r(9606),
            s = r(4088),
            i = r(6198).indexOf,
            a = r(7153),
            c = n([].push);
          t.exports = function (t, e) {
            var r,
              n = s(t),
              u = 0,
              p = [];
            for (r in n) !o(a, r) && o(n, r) && c(p, r);
            for (; e.length > u; ) o(n, (r = e[u++])) && (~i(p, r) || c(p, r));
            return p;
          };
        },
        8779: (t, e, r) => {
          var n = r(1352),
            o = r(8684);
          t.exports =
            Object.keys ||
            function (t) {
              return n(t, o);
            };
        },
        7446: (t, e) => {
          "use strict";
          var r = {}.propertyIsEnumerable,
            n = Object.getOwnPropertyDescriptor,
            o = n && !r.call({ 1: 2 }, 1);
          e.f = o
            ? function (t) {
                var e = n(this, t);
                return !!e && e.enumerable;
              }
            : r;
        },
        7530: (t, e, r) => {
          var n = r(8240),
            o = r(6112),
            s = r(1378);
          t.exports =
            Object.setPrototypeOf ||
            ("__proto__" in {}
              ? (function () {
                  var t,
                    e = !1,
                    r = {};
                  try {
                    (t = n(
                      Object.getOwnPropertyDescriptor(
                        Object.prototype,
                        "__proto__"
                      ).set
                    ))(r, []),
                      (e = r instanceof Array);
                  } catch (t) {}
                  return function (r, n) {
                    return o(r), s(n), e ? t(r, n) : (r.__proto__ = n), r;
                  };
                })()
              : void 0);
        },
        999: (t, e, r) => {
          "use strict";
          var n = r(2371),
            o = r(375);
          t.exports = n
            ? {}.toString
            : function () {
                return "[object " + o(this) + "]";
              };
        },
        7999: (t, e, r) => {
          var n = r(2086),
            o = r(9413),
            s = r(930),
            i = r(8759),
            a = n.TypeError;
          t.exports = function (t, e) {
            var r, n;
            if ("string" === e && s((r = t.toString)) && !i((n = o(r, t))))
              return n;
            if (s((r = t.valueOf)) && !i((n = o(r, t)))) return n;
            if ("string" !== e && s((r = t.toString)) && !i((n = o(r, t))))
              return n;
            throw a("Can't convert object to primitive value");
          };
        },
        6095: (t, e, r) => {
          var n = r(563),
            o = r(8240),
            s = r(62),
            i = r(6952),
            a = r(6112),
            c = o([].concat);
          t.exports =
            n("Reflect", "ownKeys") ||
            function (t) {
              var e = s.f(a(t)),
                r = i.f;
              return r ? c(e, r(t)) : e;
            };
        },
        9775: (t, e, r) => {
          var n = r(2086);
          t.exports = n;
        },
        4522: (t) => {
          t.exports = function (t) {
            try {
              return { error: !1, value: t() };
            } catch (t) {
              return { error: !0, value: t };
            }
          };
        },
        880: (t, e, r) => {
          var n = r(6112),
            o = r(8759),
            s = r(8722);
          t.exports = function (t, e) {
            if ((n(t), o(e) && e.constructor === t)) return e;
            var r = s.f(t);
            return (0, r.resolve)(e), r.promise;
          };
        },
        9431: (t, e, r) => {
          var n = r(1007);
          t.exports = function (t, e, r) {
            for (var o in e) n(t, o, e[o], r);
            return t;
          };
        },
        1007: (t, e, r) => {
          var n = r(2086),
            o = r(930),
            s = r(9606),
            i = r(2585),
            a = r(3648),
            c = r(9277),
            u = r(3278),
            p = r(4398).CONFIGURABLE,
            h = u.get,
            f = u.enforce,
            l = String(String).split("String");
          (t.exports = function (t, e, r, c) {
            var u,
              h = !!c && !!c.unsafe,
              d = !!c && !!c.enumerable,
              v = !!c && !!c.noTargetGet,
              y = c && void 0 !== c.name ? c.name : e;
            o(r) &&
              ("Symbol(" === String(y).slice(0, 7) &&
                (y = "[" + String(y).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
              (!s(r, "name") || (p && r.name !== y)) && i(r, "name", y),
              (u = f(r)).source ||
                (u.source = l.join("string" == typeof y ? y : ""))),
              t !== n
                ? (h ? !v && t[e] && (d = !0) : delete t[e],
                  d ? (t[e] = r) : i(t, e, r))
                : d
                ? (t[e] = r)
                : a(e, r);
          })(Function.prototype, "toString", function () {
            return (o(this) && h(this).source) || c(this);
          });
        },
        9586: (t, e, r) => {
          var n = r(2086).TypeError;
          t.exports = function (t) {
            if (null == t) throw n("Can't call method on " + t);
            return t;
          };
        },
        3648: (t, e, r) => {
          var n = r(2086),
            o = Object.defineProperty;
          t.exports = function (t, e) {
            try {
              o(n, t, { value: e, configurable: !0, writable: !0 });
            } catch (r) {
              n[t] = e;
            }
            return e;
          };
        },
        7420: (t, e, r) => {
          "use strict";
          var n = r(563),
            o = r(7826),
            s = r(211),
            i = r(5283),
            a = s("species");
          t.exports = function (t) {
            var e = n(t),
              r = o.f;
            i &&
              e &&
              !e[a] &&
              r(e, a, {
                configurable: !0,
                get: function () {
                  return this;
                },
              });
          };
        },
        914: (t, e, r) => {
          var n = r(7826).f,
            o = r(9606),
            s = r(211)("toStringTag");
          t.exports = function (t, e, r) {
            t &&
              !o((t = r ? t : t.prototype), s) &&
              n(t, s, { configurable: !0, value: e });
          };
        },
        8944: (t, e, r) => {
          var n = r(9197),
            o = r(5422),
            s = n("keys");
          t.exports = function (t) {
            return s[t] || (s[t] = o(t));
          };
        },
        4489: (t, e, r) => {
          var n = r(2086),
            o = r(3648),
            s = "__core-js_shared__",
            i = n[s] || o(s, {});
          t.exports = i;
        },
        9197: (t, e, r) => {
          var n = r(3296),
            o = r(4489);
          (t.exports = function (t, e) {
            return o[t] || (o[t] = void 0 !== e ? e : {});
          })("versions", []).push({
            version: "3.19.3",
            mode: n ? "pure" : "global",
            copyright: "© 2021 Denis Pushkarev (zloirock.ru)",
          });
        },
        8515: (t, e, r) => {
          var n = r(6112),
            o = r(1449),
            s = r(211)("species");
          t.exports = function (t, e) {
            var r,
              i = n(t).constructor;
            return void 0 === i || null == (r = n(i)[s]) ? e : o(r);
          };
        },
        3448: (t, e, r) => {
          var n = r(8240),
            o = r(9502),
            s = r(4059),
            i = r(9586),
            a = n("".charAt),
            c = n("".charCodeAt),
            u = n("".slice),
            p = function (t) {
              return function (e, r) {
                var n,
                  p,
                  h = s(i(e)),
                  f = o(r),
                  l = h.length;
                return f < 0 || f >= l
                  ? t
                    ? ""
                    : void 0
                  : (n = c(h, f)) < 55296 ||
                    n > 56319 ||
                    f + 1 === l ||
                    (p = c(h, f + 1)) < 56320 ||
                    p > 57343
                  ? t
                    ? a(h, f)
                    : n
                  : t
                  ? u(h, f, f + 2)
                  : p - 56320 + ((n - 55296) << 10) + 65536;
              };
            };
          t.exports = { codeAt: p(!1), charAt: p(!0) };
        },
        4953: (t, e, r) => {
          var n,
            o,
            s,
            i,
            a = r(2086),
            c = r(7258),
            u = r(8516),
            p = r(930),
            h = r(9606),
            f = r(3677),
            l = r(5963),
            d = r(745),
            v = r(821),
            y = r(4344),
            m = r(1801),
            g = a.setImmediate,
            b = a.clearImmediate,
            w = a.process,
            _ = a.Dispatch,
            k = a.Function,
            x = a.MessageChannel,
            C = a.String,
            E = 0,
            S = {};
          try {
            n = a.location;
          } catch (t) {}
          var O = function (t) {
              if (h(S, t)) {
                var e = S[t];
                delete S[t], e();
              }
            },
            T = function (t) {
              return function () {
                O(t);
              };
            },
            P = function (t) {
              O(t.data);
            },
            j = function (t) {
              a.postMessage(C(t), n.protocol + "//" + n.host);
            };
          (g && b) ||
            ((g = function (t) {
              var e = d(arguments, 1);
              return (
                (S[++E] = function () {
                  c(p(t) ? t : k(t), void 0, e);
                }),
                o(E),
                E
              );
            }),
            (b = function (t) {
              delete S[t];
            }),
            m
              ? (o = function (t) {
                  w.nextTick(T(t));
                })
              : _ && _.now
              ? (o = function (t) {
                  _.now(T(t));
                })
              : x && !y
              ? ((i = (s = new x()).port2),
                (s.port1.onmessage = P),
                (o = u(i.postMessage, i)))
              : a.addEventListener &&
                p(a.postMessage) &&
                !a.importScripts &&
                n &&
                "file:" !== n.protocol &&
                !f(j)
              ? ((o = j), a.addEventListener("message", P, !1))
              : (o =
                  "onreadystatechange" in v("script")
                    ? function (t) {
                        l.appendChild(v("script")).onreadystatechange =
                          function () {
                            l.removeChild(this), O(t);
                          };
                      }
                    : function (t) {
                        setTimeout(T(t), 0);
                      })),
            (t.exports = { set: g, clear: b });
        },
        7740: (t, e, r) => {
          var n = r(9502),
            o = Math.max,
            s = Math.min;
          t.exports = function (t, e) {
            var r = n(t);
            return r < 0 ? o(r + e, 0) : s(r, e);
          };
        },
        4088: (t, e, r) => {
          var n = r(5974),
            o = r(9586);
          t.exports = function (t) {
            return n(o(t));
          };
        },
        9502: (t) => {
          var e = Math.ceil,
            r = Math.floor;
          t.exports = function (t) {
            var n = +t;
            return n != n || 0 === n ? 0 : (n > 0 ? r : e)(n);
          };
        },
        4005: (t, e, r) => {
          var n = r(9502),
            o = Math.min;
          t.exports = function (t) {
            return t > 0 ? o(n(t), 9007199254740991) : 0;
          };
        },
        3060: (t, e, r) => {
          var n = r(2086),
            o = r(9586),
            s = n.Object;
          t.exports = function (t) {
            return s(o(t));
          };
        },
        1288: (t, e, r) => {
          var n = r(2086),
            o = r(9413),
            s = r(8759),
            i = r(2071),
            a = r(2964),
            c = r(7999),
            u = r(211),
            p = n.TypeError,
            h = u("toPrimitive");
          t.exports = function (t, e) {
            if (!s(t) || i(t)) return t;
            var r,
              n = a(t, h);
            if (n) {
              if (
                (void 0 === e && (e = "default"),
                (r = o(n, t, e)),
                !s(r) || i(r))
              )
                return r;
              throw p("Can't convert object to primitive value");
            }
            return void 0 === e && (e = "number"), c(t, e);
          };
        },
        2258: (t, e, r) => {
          var n = r(1288),
            o = r(2071);
          t.exports = function (t) {
            var e = n(t, "string");
            return o(e) ? e : e + "";
          };
        },
        2371: (t, e, r) => {
          var n = {};
          (n[r(211)("toStringTag")] = "z"),
            (t.exports = "[object z]" === String(n));
        },
        4059: (t, e, r) => {
          var n = r(2086),
            o = r(375),
            s = n.String;
          t.exports = function (t) {
            if ("Symbol" === o(t))
              throw TypeError("Cannot convert a Symbol value to a string");
            return s(t);
          };
        },
        9268: (t, e, r) => {
          var n = r(2086).String;
          t.exports = function (t) {
            try {
              return n(t);
            } catch (t) {
              return "Object";
            }
          };
        },
        5422: (t, e, r) => {
          var n = r(8240),
            o = 0,
            s = Math.random(),
            i = n((1).toString);
          t.exports = function (t) {
            return "Symbol(" + (void 0 === t ? "" : t) + ")_" + i(++o + s, 36);
          };
        },
        1876: (t, e, r) => {
          var n = r(3193);
          t.exports = n && !Symbol.sham && "symbol" == typeof Symbol.iterator;
        },
        211: (t, e, r) => {
          var n = r(2086),
            o = r(9197),
            s = r(9606),
            i = r(5422),
            a = r(3193),
            c = r(1876),
            u = o("wks"),
            p = n.Symbol,
            h = p && p.for,
            f = c ? p : (p && p.withoutSetter) || i;
          t.exports = function (t) {
            if (!s(u, t) || (!a && "string" != typeof u[t])) {
              var e = "Symbol." + t;
              a && s(p, t) ? (u[t] = p[t]) : (u[t] = c && h ? h(e) : f(e));
            }
            return u[t];
          };
        },
        5234: (t, e, r) => {
          "use strict";
          var n = r(1695),
            o = r(2086),
            s = r(5516),
            i = r(2130),
            a = r(7530),
            c = r(8474),
            u = r(4710),
            p = r(2585),
            h = r(5736),
            f = r(1765),
            l = r(8945),
            d = r(4722),
            v = r(1879),
            y = r(211),
            m = r(2114),
            g = y("toStringTag"),
            b = o.Error,
            w = [].push,
            _ = function (t, e) {
              var r,
                n = arguments.length > 2 ? arguments[2] : void 0,
                o = s(k, this);
              a
                ? (r = a(new b(void 0), o ? i(this) : k))
                : ((r = o ? this : u(k)), p(r, g, "Error")),
                p(r, "message", v(e, "")),
                m && p(r, "stack", f(r.stack, 1)),
                l(r, n);
              var c = [];
              return d(t, w, { that: c }), p(r, "errors", c), r;
            };
          a ? a(_, b) : c(_, b);
          var k = (_.prototype = u(b.prototype, {
            constructor: h(1, _),
            message: h(1, ""),
            name: h(1, "AggregateError"),
          }));
          n({ global: !0 }, { AggregateError: _ });
        },
        5769: (t, e, r) => {
          "use strict";
          var n = r(4088),
            o = r(8669),
            s = r(7719),
            i = r(3278),
            a = r(8432),
            c = "Array Iterator",
            u = i.set,
            p = i.getterFor(c);
          (t.exports = a(
            Array,
            "Array",
            function (t, e) {
              u(this, { type: c, target: n(t), index: 0, kind: e });
            },
            function () {
              var t = p(this),
                e = t.target,
                r = t.kind,
                n = t.index++;
              return !e || n >= e.length
                ? ((t.target = void 0), { value: void 0, done: !0 })
                : "keys" == r
                ? { value: n, done: !1 }
                : "values" == r
                ? { value: e[n], done: !1 }
                : { value: [n, e[n]], done: !1 };
            },
            "values"
          )),
            (s.Arguments = s.Array),
            o("keys"),
            o("values"),
            o("entries");
        },
        3238: (t, e, r) => {
          var n = r(2371),
            o = r(1007),
            s = r(999);
          n || o(Object.prototype, "toString", s, { unsafe: !0 });
        },
        2107: (t, e, r) => {
          "use strict";
          var n = r(1695),
            o = r(9413),
            s = r(5089),
            i = r(8722),
            a = r(4522),
            c = r(4722);
          n(
            { target: "Promise", stat: !0 },
            {
              allSettled: function (t) {
                var e = this,
                  r = i.f(e),
                  n = r.resolve,
                  u = r.reject,
                  p = a(function () {
                    var r = s(e.resolve),
                      i = [],
                      a = 0,
                      u = 1;
                    c(t, function (t) {
                      var s = a++,
                        c = !1;
                      u++,
                        o(r, e, t).then(
                          function (t) {
                            c ||
                              ((c = !0),
                              (i[s] = { status: "fulfilled", value: t }),
                              --u || n(i));
                          },
                          function (t) {
                            c ||
                              ((c = !0),
                              (i[s] = { status: "rejected", reason: t }),
                              --u || n(i));
                          }
                        );
                    }),
                      --u || n(i);
                  });
                return p.error && u(p.value), r.promise;
              },
            }
          );
        },
        3007: (t, e, r) => {
          "use strict";
          var n = r(1695),
            o = r(5089),
            s = r(563),
            i = r(9413),
            a = r(8722),
            c = r(4522),
            u = r(4722),
            p = "No one promise resolved";
          n(
            { target: "Promise", stat: !0 },
            {
              any: function (t) {
                var e = this,
                  r = s("AggregateError"),
                  n = a.f(e),
                  h = n.resolve,
                  f = n.reject,
                  l = c(function () {
                    var n = o(e.resolve),
                      s = [],
                      a = 0,
                      c = 1,
                      l = !1;
                    u(t, function (t) {
                      var o = a++,
                        u = !1;
                      c++,
                        i(n, e, t).then(
                          function (t) {
                            u || l || ((l = !0), h(t));
                          },
                          function (t) {
                            u ||
                              l ||
                              ((u = !0), (s[o] = t), --c || f(new r(s, p)));
                          }
                        );
                    }),
                      --c || f(new r(s, p));
                  });
                return l.error && f(l.value), n.promise;
              },
            }
          );
        },
        1370: (t, e, r) => {
          "use strict";
          var n = r(1695),
            o = r(3296),
            s = r(8109),
            i = r(3677),
            a = r(563),
            c = r(930),
            u = r(8515),
            p = r(880),
            h = r(1007);
          if (
            (n(
              {
                target: "Promise",
                proto: !0,
                real: !0,
                forced:
                  !!s &&
                  i(function () {
                    s.prototype.finally.call(
                      { then: function () {} },
                      function () {}
                    );
                  }),
              },
              {
                finally: function (t) {
                  var e = u(this, a("Promise")),
                    r = c(t);
                  return this.then(
                    r
                      ? function (r) {
                          return p(e, t()).then(function () {
                            return r;
                          });
                        }
                      : t,
                    r
                      ? function (r) {
                          return p(e, t()).then(function () {
                            throw r;
                          });
                        }
                      : t
                  );
                },
              }
            ),
            !o && c(s))
          ) {
            var f = a("Promise").prototype.finally;
            s.prototype.finally !== f &&
              h(s.prototype, "finally", f, { unsafe: !0 });
          }
        },
        1418: (t, e, r) => {
          "use strict";
          var n,
            o,
            s,
            i,
            a = r(1695),
            c = r(3296),
            u = r(2086),
            p = r(563),
            h = r(9413),
            f = r(8109),
            l = r(1007),
            d = r(9431),
            v = r(7530),
            y = r(914),
            m = r(7420),
            g = r(5089),
            b = r(930),
            w = r(8759),
            _ = r(1855),
            k = r(9277),
            x = r(4722),
            C = r(8939),
            E = r(8515),
            S = r(4953).set,
            O = r(3173),
            T = r(880),
            P = r(1670),
            j = r(8722),
            R = r(4522),
            A = r(3278),
            F = r(7189),
            L = r(211),
            M = r(172),
            B = r(1801),
            N = r(1448),
            I = L("species"),
            D = "Promise",
            q = A.getterFor(D),
            U = A.set,
            V = A.getterFor(D),
            K = f && f.prototype,
            W = f,
            Y = K,
            H = u.TypeError,
            z = u.document,
            G = u.process,
            $ = j.f,
            X = $,
            J = !!(z && z.createEvent && u.dispatchEvent),
            Z = b(u.PromiseRejectionEvent),
            Q = "unhandledrejection",
            tt = !1,
            et = F(D, function () {
              var t = k(W),
                e = t !== String(W);
              if (!e && 66 === N) return !0;
              if (c && !Y.finally) return !0;
              if (N >= 51 && /native code/.test(t)) return !1;
              var r = new W(function (t) {
                  t(1);
                }),
                n = function (t) {
                  t(
                    function () {},
                    function () {}
                  );
                };
              return (
                ((r.constructor = {})[I] = n),
                !(tt = r.then(function () {}) instanceof n) || (!e && M && !Z)
              );
            }),
            rt =
              et ||
              !C(function (t) {
                W.all(t).catch(function () {});
              }),
            nt = function (t) {
              var e;
              return !(!w(t) || !b((e = t.then))) && e;
            },
            ot = function (t, e) {
              if (!t.notified) {
                t.notified = !0;
                var r = t.reactions;
                O(function () {
                  for (
                    var n = t.value, o = 1 == t.state, s = 0;
                    r.length > s;

                  ) {
                    var i,
                      a,
                      c,
                      u = r[s++],
                      p = o ? u.ok : u.fail,
                      f = u.resolve,
                      l = u.reject,
                      d = u.domain;
                    try {
                      p
                        ? (o || (2 === t.rejection && ct(t), (t.rejection = 1)),
                          !0 === p
                            ? (i = n)
                            : (d && d.enter(),
                              (i = p(n)),
                              d && (d.exit(), (c = !0))),
                          i === u.promise
                            ? l(H("Promise-chain cycle"))
                            : (a = nt(i))
                            ? h(a, i, f, l)
                            : f(i))
                        : l(n);
                    } catch (t) {
                      d && !c && d.exit(), l(t);
                    }
                  }
                  (t.reactions = []),
                    (t.notified = !1),
                    e && !t.rejection && it(t);
                });
              }
            },
            st = function (t, e, r) {
              var n, o;
              J
                ? (((n = z.createEvent("Event")).promise = e),
                  (n.reason = r),
                  n.initEvent(t, !1, !0),
                  u.dispatchEvent(n))
                : (n = { promise: e, reason: r }),
                !Z && (o = u["on" + t])
                  ? o(n)
                  : t === Q && P("Unhandled promise rejection", r);
            },
            it = function (t) {
              h(S, u, function () {
                var e,
                  r = t.facade,
                  n = t.value;
                if (
                  at(t) &&
                  ((e = R(function () {
                    B ? G.emit("unhandledRejection", n, r) : st(Q, r, n);
                  })),
                  (t.rejection = B || at(t) ? 2 : 1),
                  e.error)
                )
                  throw e.value;
              });
            },
            at = function (t) {
              return 1 !== t.rejection && !t.parent;
            },
            ct = function (t) {
              h(S, u, function () {
                var e = t.facade;
                B
                  ? G.emit("rejectionHandled", e)
                  : st("rejectionhandled", e, t.value);
              });
            },
            ut = function (t, e, r) {
              return function (n) {
                t(e, n, r);
              };
            },
            pt = function (t, e, r) {
              t.done ||
                ((t.done = !0),
                r && (t = r),
                (t.value = e),
                (t.state = 2),
                ot(t, !0));
            },
            ht = function (t, e, r) {
              if (!t.done) {
                (t.done = !0), r && (t = r);
                try {
                  if (t.facade === e)
                    throw H("Promise can't be resolved itself");
                  var n = nt(e);
                  n
                    ? O(function () {
                        var r = { done: !1 };
                        try {
                          h(n, e, ut(ht, r, t), ut(pt, r, t));
                        } catch (e) {
                          pt(r, e, t);
                        }
                      })
                    : ((t.value = e), (t.state = 1), ot(t, !1));
                } catch (e) {
                  pt({ done: !1 }, e, t);
                }
              }
            };
          if (
            et &&
            ((Y = (W = function (t) {
              _(this, Y), g(t), h(n, this);
              var e = q(this);
              try {
                t(ut(ht, e), ut(pt, e));
              } catch (t) {
                pt(e, t);
              }
            }).prototype),
            ((n = function (t) {
              U(this, {
                type: D,
                done: !1,
                notified: !1,
                parent: !1,
                reactions: [],
                rejection: !1,
                state: 0,
                value: void 0,
              });
            }).prototype = d(Y, {
              then: function (t, e) {
                var r = V(this),
                  n = r.reactions,
                  o = $(E(this, W));
                return (
                  (o.ok = !b(t) || t),
                  (o.fail = b(e) && e),
                  (o.domain = B ? G.domain : void 0),
                  (r.parent = !0),
                  (n[n.length] = o),
                  0 != r.state && ot(r, !1),
                  o.promise
                );
              },
              catch: function (t) {
                return this.then(void 0, t);
              },
            })),
            (o = function () {
              var t = new n(),
                e = q(t);
              (this.promise = t),
                (this.resolve = ut(ht, e)),
                (this.reject = ut(pt, e));
            }),
            (j.f = $ =
              function (t) {
                return t === W || t === s ? new o(t) : X(t);
              }),
            !c && b(f) && K !== Object.prototype)
          ) {
            (i = K.then),
              tt ||
                (l(
                  K,
                  "then",
                  function (t, e) {
                    var r = this;
                    return new W(function (t, e) {
                      h(i, r, t, e);
                    }).then(t, e);
                  },
                  { unsafe: !0 }
                ),
                l(K, "catch", Y.catch, { unsafe: !0 }));
            try {
              delete K.constructor;
            } catch (t) {}
            v && v(K, Y);
          }
          a({ global: !0, wrap: !0, forced: et }, { Promise: W }),
            y(W, D, !1, !0),
            m(D),
            (s = p(D)),
            a(
              { target: D, stat: !0, forced: et },
              {
                reject: function (t) {
                  var e = $(this);
                  return h(e.reject, void 0, t), e.promise;
                },
              }
            ),
            a(
              { target: D, stat: !0, forced: c || et },
              {
                resolve: function (t) {
                  return T(c && this === s ? W : this, t);
                },
              }
            ),
            a(
              { target: D, stat: !0, forced: rt },
              {
                all: function (t) {
                  var e = this,
                    r = $(e),
                    n = r.resolve,
                    o = r.reject,
                    s = R(function () {
                      var r = g(e.resolve),
                        s = [],
                        i = 0,
                        a = 1;
                      x(t, function (t) {
                        var c = i++,
                          u = !1;
                        a++,
                          h(r, e, t).then(function (t) {
                            u || ((u = !0), (s[c] = t), --a || n(s));
                          }, o);
                      }),
                        --a || n(s);
                    });
                  return s.error && o(s.value), r.promise;
                },
                race: function (t) {
                  var e = this,
                    r = $(e),
                    n = r.reject,
                    o = R(function () {
                      var o = g(e.resolve);
                      x(t, function (t) {
                        h(o, e, t).then(r.resolve, n);
                      });
                    });
                  return o.error && n(o.value), r.promise;
                },
              }
            );
        },
        7460: (t, e, r) => {
          "use strict";
          var n = r(3448).charAt,
            o = r(4059),
            s = r(3278),
            i = r(8432),
            a = "String Iterator",
            c = s.set,
            u = s.getterFor(a);
          i(
            String,
            "String",
            function (t) {
              c(this, { type: a, string: o(t), index: 0 });
            },
            function () {
              var t,
                e = u(this),
                r = e.string,
                o = e.index;
              return o >= r.length
                ? { value: void 0, done: !0 }
                : ((t = n(r, o)),
                  (e.index += t.length),
                  { value: t, done: !1 });
            }
          );
        },
        4078: (t, e, r) => {
          var n = r(2086),
            o = r(933),
            s = r(3526),
            i = r(5769),
            a = r(2585),
            c = r(211),
            u = c("iterator"),
            p = c("toStringTag"),
            h = i.values,
            f = function (t, e) {
              if (t) {
                if (t[u] !== h)
                  try {
                    a(t, u, h);
                  } catch (e) {
                    t[u] = h;
                  }
                if ((t[p] || a(t, p, e), o[e]))
                  for (var r in i)
                    if (t[r] !== i[r])
                      try {
                        a(t, r, i[r]);
                      } catch (e) {
                        t[r] = i[r];
                      }
              }
            };
          for (var l in o) f(n[l] && n[l].prototype, l);
          f(s, "DOMTokenList");
        },
        6401: (t, e, r) => {
          var n = r(7291);
          r(4078), (t.exports = n);
        },
        6292: (t, e, r) => {
          (e.formatArgs = function (e) {
            if (
              ((e[0] =
                (this.useColors ? "%c" : "") +
                this.namespace +
                (this.useColors ? " %c" : " ") +
                e[0] +
                (this.useColors ? "%c " : " ") +
                "+" +
                t.exports.humanize(this.diff)),
              !this.useColors)
            )
              return;
            const r = "color: " + this.color;
            e.splice(1, 0, r, "color: inherit");
            let n = 0,
              o = 0;
            e[0].replace(/%[a-zA-Z%]/g, (t) => {
              "%%" !== t && (n++, "%c" === t && (o = n));
            }),
              e.splice(o, 0, r);
          }),
            (e.save = function (t) {
              try {
                t
                  ? e.storage.setItem("debug", t)
                  : e.storage.removeItem("debug");
              } catch (t) {}
            }),
            (e.load = function () {
              let t;
              try {
                t = e.storage.getItem("debug");
              } catch (t) {}
              return (
                !t &&
                  "undefined" != typeof process &&
                  "env" in process &&
                  (t = process.env.DEBUG),
                t
              );
            }),
            (e.useColors = function () {
              return (
                !(
                  "undefined" == typeof window ||
                  !window.process ||
                  ("renderer" !== window.process.type && !window.process.__nwjs)
                ) ||
                (("undefined" == typeof navigator ||
                  !navigator.userAgent ||
                  !navigator.userAgent
                    .toLowerCase()
                    .match(/(edge|trident)\/(\d+)/)) &&
                  (("undefined" != typeof document &&
                    document.documentElement &&
                    document.documentElement.style &&
                    document.documentElement.style.WebkitAppearance) ||
                    ("undefined" != typeof window &&
                      window.console &&
                      (window.console.firebug ||
                        (window.console.exception && window.console.table))) ||
                    ("undefined" != typeof navigator &&
                      navigator.userAgent &&
                      navigator.userAgent
                        .toLowerCase()
                        .match(/firefox\/(\d+)/) &&
                      parseInt(RegExp.$1, 10) >= 31) ||
                    ("undefined" != typeof navigator &&
                      navigator.userAgent &&
                      navigator.userAgent
                        .toLowerCase()
                        .match(/applewebkit\/(\d+)/))))
              );
            }),
            (e.storage = (function () {
              try {
                return localStorage;
              } catch (t) {}
            })()),
            (e.destroy = (() => {
              let t = !1;
              return () => {
                t ||
                  ((t = !0),
                  console.warn(
                    "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                  ));
              };
            })()),
            (e.colors = [
              "#0000CC",
              "#0000FF",
              "#0033CC",
              "#0033FF",
              "#0066CC",
              "#0066FF",
              "#0099CC",
              "#0099FF",
              "#00CC00",
              "#00CC33",
              "#00CC66",
              "#00CC99",
              "#00CCCC",
              "#00CCFF",
              "#3300CC",
              "#3300FF",
              "#3333CC",
              "#3333FF",
              "#3366CC",
              "#3366FF",
              "#3399CC",
              "#3399FF",
              "#33CC00",
              "#33CC33",
              "#33CC66",
              "#33CC99",
              "#33CCCC",
              "#33CCFF",
              "#6600CC",
              "#6600FF",
              "#6633CC",
              "#6633FF",
              "#66CC00",
              "#66CC33",
              "#9900CC",
              "#9900FF",
              "#9933CC",
              "#9933FF",
              "#99CC00",
              "#99CC33",
              "#CC0000",
              "#CC0033",
              "#CC0066",
              "#CC0099",
              "#CC00CC",
              "#CC00FF",
              "#CC3300",
              "#CC3333",
              "#CC3366",
              "#CC3399",
              "#CC33CC",
              "#CC33FF",
              "#CC6600",
              "#CC6633",
              "#CC9900",
              "#CC9933",
              "#CCCC00",
              "#CCCC33",
              "#FF0000",
              "#FF0033",
              "#FF0066",
              "#FF0099",
              "#FF00CC",
              "#FF00FF",
              "#FF3300",
              "#FF3333",
              "#FF3366",
              "#FF3399",
              "#FF33CC",
              "#FF33FF",
              "#FF6600",
              "#FF6633",
              "#FF9900",
              "#FF9933",
              "#FFCC00",
              "#FFCC33",
            ]),
            (e.log = console.debug || console.log || (() => {})),
            (t.exports = r(9374)(e));
          const { formatters: n } = t.exports;
          n.j = function (t) {
            try {
              return JSON.stringify(t);
            } catch (t) {
              return "[UnexpectedJSONParseError]: " + t.message;
            }
          };
        },
        9374: (t, e, r) => {
          t.exports = function (t) {
            function e(t) {
              let r,
                o,
                s,
                i = null;
              function a(...t) {
                if (!a.enabled) return;
                const n = a,
                  o = Number(new Date()),
                  s = o - (r || o);
                (n.diff = s),
                  (n.prev = r),
                  (n.curr = o),
                  (r = o),
                  (t[0] = e.coerce(t[0])),
                  "string" != typeof t[0] && t.unshift("%O");
                let i = 0;
                (t[0] = t[0].replace(/%([a-zA-Z%])/g, (r, o) => {
                  if ("%%" === r) return "%";
                  i++;
                  const s = e.formatters[o];
                  if ("function" == typeof s) {
                    const e = t[i];
                    (r = s.call(n, e)), t.splice(i, 1), i--;
                  }
                  return r;
                })),
                  e.formatArgs.call(n, t),
                  (n.log || e.log).apply(n, t);
              }
              return (
                (a.namespace = t),
                (a.useColors = e.useColors()),
                (a.color = e.selectColor(t)),
                (a.extend = n),
                (a.destroy = e.destroy),
                Object.defineProperty(a, "enabled", {
                  enumerable: !0,
                  configurable: !1,
                  get: () =>
                    null !== i
                      ? i
                      : (o !== e.namespaces &&
                          ((o = e.namespaces), (s = e.enabled(t))),
                        s),
                  set: (t) => {
                    i = t;
                  },
                }),
                "function" == typeof e.init && e.init(a),
                a
              );
            }
            function n(t, r) {
              const n = e(this.namespace + (void 0 === r ? ":" : r) + t);
              return (n.log = this.log), n;
            }
            function o(t) {
              return t
                .toString()
                .substring(2, t.toString().length - 2)
                .replace(/\.\*\?$/, "*");
            }
            return (
              (e.debug = e),
              (e.default = e),
              (e.coerce = function (t) {
                return t instanceof Error ? t.stack || t.message : t;
              }),
              (e.disable = function () {
                const t = [
                  ...e.names.map(o),
                  ...e.skips.map(o).map((t) => "-" + t),
                ].join(",");
                return e.enable(""), t;
              }),
              (e.enable = function (t) {
                let r;
                e.save(t), (e.namespaces = t), (e.names = []), (e.skips = []);
                const n = ("string" == typeof t ? t : "").split(/[\s,]+/),
                  o = n.length;
                for (r = 0; r < o; r++)
                  n[r] &&
                    ("-" === (t = n[r].replace(/\*/g, ".*?"))[0]
                      ? e.skips.push(new RegExp("^" + t.substr(1) + "$"))
                      : e.names.push(new RegExp("^" + t + "$")));
              }),
              (e.enabled = function (t) {
                if ("*" === t[t.length - 1]) return !0;
                let r, n;
                for (r = 0, n = e.skips.length; r < n; r++)
                  if (e.skips[r].test(t)) return !1;
                for (r = 0, n = e.names.length; r < n; r++)
                  if (e.names[r].test(t)) return !0;
                return !1;
              }),
              (e.humanize = r(8628)),
              (e.destroy = function () {
                console.warn(
                  "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
                );
              }),
              Object.keys(t).forEach((r) => {
                e[r] = t[r];
              }),
              (e.names = []),
              (e.skips = []),
              (e.formatters = {}),
              (e.selectColor = function (t) {
                let r = 0;
                for (let e = 0; e < t.length; e++)
                  (r = (r << 5) - r + t.charCodeAt(e)), (r |= 0);
                return e.colors[Math.abs(r) % e.colors.length];
              }),
              e.enable(e.load()),
              e
            );
          };
        },
        343: (t) => {
          "use strict";
          var e,
            r = "object" == typeof Reflect ? Reflect : null,
            n =
              r && "function" == typeof r.apply
                ? r.apply
                : function (t, e, r) {
                    return Function.prototype.apply.call(t, e, r);
                  };
          e =
            r && "function" == typeof r.ownKeys
              ? r.ownKeys
              : Object.getOwnPropertySymbols
              ? function (t) {
                  return Object.getOwnPropertyNames(t).concat(
                    Object.getOwnPropertySymbols(t)
                  );
                }
              : function (t) {
                  return Object.getOwnPropertyNames(t);
                };
          var o =
            Number.isNaN ||
            function (t) {
              return t != t;
            };
          function s() {
            s.init.call(this);
          }
          (t.exports = s),
            (t.exports.once = function (t, e) {
              return new Promise(function (r, n) {
                function o(r) {
                  t.removeListener(e, s), n(r);
                }
                function s() {
                  "function" == typeof t.removeListener &&
                    t.removeListener("error", o),
                    r([].slice.call(arguments));
                }
                v(t, e, s, { once: !0 }),
                  "error" !== e &&
                    (function (t, e, r) {
                      "function" == typeof t.on &&
                        v(t, "error", e, { once: !0 });
                    })(t, o);
              });
            }),
            (s.EventEmitter = s),
            (s.prototype._events = void 0),
            (s.prototype._eventsCount = 0),
            (s.prototype._maxListeners = void 0);
          var i = 10;
          function a(t) {
            if ("function" != typeof t)
              throw new TypeError(
                'The "listener" argument must be of type Function. Received type ' +
                  typeof t
              );
          }
          function c(t) {
            return void 0 === t._maxListeners
              ? s.defaultMaxListeners
              : t._maxListeners;
          }
          function u(t, e, r, n) {
            var o, s, i, u;
            if (
              (a(r),
              void 0 === (s = t._events)
                ? ((s = t._events = Object.create(null)), (t._eventsCount = 0))
                : (void 0 !== s.newListener &&
                    (t.emit("newListener", e, r.listener ? r.listener : r),
                    (s = t._events)),
                  (i = s[e])),
              void 0 === i)
            )
              (i = s[e] = r), ++t._eventsCount;
            else if (
              ("function" == typeof i
                ? (i = s[e] = n ? [r, i] : [i, r])
                : n
                ? i.unshift(r)
                : i.push(r),
              (o = c(t)) > 0 && i.length > o && !i.warned)
            ) {
              i.warned = !0;
              var p = new Error(
                "Possible EventEmitter memory leak detected. " +
                  i.length +
                  " " +
                  String(e) +
                  " listeners added. Use emitter.setMaxListeners() to increase limit"
              );
              (p.name = "MaxListenersExceededWarning"),
                (p.emitter = t),
                (p.type = e),
                (p.count = i.length),
                (u = p),
                console && console.warn && console.warn(u);
            }
            return t;
          }
          function p() {
            if (!this.fired)
              return (
                this.target.removeListener(this.type, this.wrapFn),
                (this.fired = !0),
                0 === arguments.length
                  ? this.listener.call(this.target)
                  : this.listener.apply(this.target, arguments)
              );
          }
          function h(t, e, r) {
            var n = {
                fired: !1,
                wrapFn: void 0,
                target: t,
                type: e,
                listener: r,
              },
              o = p.bind(n);
            return (o.listener = r), (n.wrapFn = o), o;
          }
          function f(t, e, r) {
            var n = t._events;
            if (void 0 === n) return [];
            var o = n[e];
            return void 0 === o
              ? []
              : "function" == typeof o
              ? r
                ? [o.listener || o]
                : [o]
              : r
              ? (function (t) {
                  for (var e = new Array(t.length), r = 0; r < e.length; ++r)
                    e[r] = t[r].listener || t[r];
                  return e;
                })(o)
              : d(o, o.length);
          }
          function l(t) {
            var e = this._events;
            if (void 0 !== e) {
              var r = e[t];
              if ("function" == typeof r) return 1;
              if (void 0 !== r) return r.length;
            }
            return 0;
          }
          function d(t, e) {
            for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t[n];
            return r;
          }
          function v(t, e, r, n) {
            if ("function" == typeof t.on) n.once ? t.once(e, r) : t.on(e, r);
            else {
              if ("function" != typeof t.addEventListener)
                throw new TypeError(
                  'The "emitter" argument must be of type EventEmitter. Received type ' +
                    typeof t
                );
              t.addEventListener(e, function o(s) {
                n.once && t.removeEventListener(e, o), r(s);
              });
            }
          }
          Object.defineProperty(s, "defaultMaxListeners", {
            enumerable: !0,
            get: function () {
              return i;
            },
            set: function (t) {
              if ("number" != typeof t || t < 0 || o(t))
                throw new RangeError(
                  'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                    t +
                    "."
                );
              i = t;
            },
          }),
            (s.init = function () {
              (void 0 !== this._events &&
                this._events !== Object.getPrototypeOf(this)._events) ||
                ((this._events = Object.create(null)), (this._eventsCount = 0)),
                (this._maxListeners = this._maxListeners || void 0);
            }),
            (s.prototype.setMaxListeners = function (t) {
              if ("number" != typeof t || t < 0 || o(t))
                throw new RangeError(
                  'The value of "n" is out of range. It must be a non-negative number. Received ' +
                    t +
                    "."
                );
              return (this._maxListeners = t), this;
            }),
            (s.prototype.getMaxListeners = function () {
              return c(this);
            }),
            (s.prototype.emit = function (t) {
              for (var e = [], r = 1; r < arguments.length; r++)
                e.push(arguments[r]);
              var o = "error" === t,
                s = this._events;
              if (void 0 !== s) o = o && void 0 === s.error;
              else if (!o) return !1;
              if (o) {
                var i;
                if ((e.length > 0 && (i = e[0]), i instanceof Error)) throw i;
                var a = new Error(
                  "Unhandled error." + (i ? " (" + i.message + ")" : "")
                );
                throw ((a.context = i), a);
              }
              var c = s[t];
              if (void 0 === c) return !1;
              if ("function" == typeof c) n(c, this, e);
              else {
                var u = c.length,
                  p = d(c, u);
                for (r = 0; r < u; ++r) n(p[r], this, e);
              }
              return !0;
            }),
            (s.prototype.addListener = function (t, e) {
              return u(this, t, e, !1);
            }),
            (s.prototype.on = s.prototype.addListener),
            (s.prototype.prependListener = function (t, e) {
              return u(this, t, e, !0);
            }),
            (s.prototype.once = function (t, e) {
              return a(e), this.on(t, h(this, t, e)), this;
            }),
            (s.prototype.prependOnceListener = function (t, e) {
              return a(e), this.prependListener(t, h(this, t, e)), this;
            }),
            (s.prototype.removeListener = function (t, e) {
              var r, n, o, s, i;
              if ((a(e), void 0 === (n = this._events))) return this;
              if (void 0 === (r = n[t])) return this;
              if (r === e || r.listener === e)
                0 == --this._eventsCount
                  ? (this._events = Object.create(null))
                  : (delete n[t],
                    n.removeListener &&
                      this.emit("removeListener", t, r.listener || e));
              else if ("function" != typeof r) {
                for (o = -1, s = r.length - 1; s >= 0; s--)
                  if (r[s] === e || r[s].listener === e) {
                    (i = r[s].listener), (o = s);
                    break;
                  }
                if (o < 0) return this;
                0 === o
                  ? r.shift()
                  : (function (t, e) {
                      for (; e + 1 < t.length; e++) t[e] = t[e + 1];
                      t.pop();
                    })(r, o),
                  1 === r.length && (n[t] = r[0]),
                  void 0 !== n.removeListener &&
                    this.emit("removeListener", t, i || e);
              }
              return this;
            }),
            (s.prototype.off = s.prototype.removeListener),
            (s.prototype.removeAllListeners = function (t) {
              var e, r, n;
              if (void 0 === (r = this._events)) return this;
              if (void 0 === r.removeListener)
                return (
                  0 === arguments.length
                    ? ((this._events = Object.create(null)),
                      (this._eventsCount = 0))
                    : void 0 !== r[t] &&
                      (0 == --this._eventsCount
                        ? (this._events = Object.create(null))
                        : delete r[t]),
                  this
                );
              if (0 === arguments.length) {
                var o,
                  s = Object.keys(r);
                for (n = 0; n < s.length; ++n)
                  "removeListener" !== (o = s[n]) && this.removeAllListeners(o);
                return (
                  this.removeAllListeners("removeListener"),
                  (this._events = Object.create(null)),
                  (this._eventsCount = 0),
                  this
                );
              }
              if ("function" == typeof (e = r[t])) this.removeListener(t, e);
              else if (void 0 !== e)
                for (n = e.length - 1; n >= 0; n--)
                  this.removeListener(t, e[n]);
              return this;
            }),
            (s.prototype.listeners = function (t) {
              return f(this, t, !0);
            }),
            (s.prototype.rawListeners = function (t) {
              return f(this, t, !1);
            }),
            (s.listenerCount = function (t, e) {
              return "function" == typeof t.listenerCount
                ? t.listenerCount(e)
                : l.call(t, e);
            }),
            (s.prototype.listenerCount = l),
            (s.prototype.eventNames = function () {
              return this._eventsCount > 0 ? e(this._events) : [];
            });
        },
        6048: (t) => {
          try {
            t.exports =
              "undefined" != typeof XMLHttpRequest &&
              "withCredentials" in new XMLHttpRequest();
          } catch (e) {
            t.exports = !1;
          }
        },
        8628: (t) => {
          var e = 1e3,
            r = 60 * e,
            n = 60 * r,
            o = 24 * n;
          function s(t, e, r, n) {
            var o = e >= 1.5 * r;
            return Math.round(t / r) + " " + n + (o ? "s" : "");
          }
          t.exports = function (t, i) {
            i = i || {};
            var a,
              c,
              u = typeof t;
            if ("string" === u && t.length > 0)
              return (function (t) {
                if (!((t = String(t)).length > 100)) {
                  var s =
                    /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                      t
                    );
                  if (s) {
                    var i = parseFloat(s[1]);
                    switch ((s[2] || "ms").toLowerCase()) {
                      case "years":
                      case "year":
                      case "yrs":
                      case "yr":
                      case "y":
                        return 315576e5 * i;
                      case "weeks":
                      case "week":
                      case "w":
                        return 6048e5 * i;
                      case "days":
                      case "day":
                      case "d":
                        return i * o;
                      case "hours":
                      case "hour":
                      case "hrs":
                      case "hr":
                      case "h":
                        return i * n;
                      case "minutes":
                      case "minute":
                      case "mins":
                      case "min":
                      case "m":
                        return i * r;
                      case "seconds":
                      case "second":
                      case "secs":
                      case "sec":
                      case "s":
                        return i * e;
                      case "milliseconds":
                      case "millisecond":
                      case "msecs":
                      case "msec":
                      case "ms":
                        return i;
                      default:
                        return;
                    }
                  }
                }
              })(t);
            if ("number" === u && isFinite(t))
              return i.long
                ? ((a = t),
                  (c = Math.abs(a)) >= o
                    ? s(a, c, o, "day")
                    : c >= n
                    ? s(a, c, n, "hour")
                    : c >= r
                    ? s(a, c, r, "minute")
                    : c >= e
                    ? s(a, c, e, "second")
                    : a + " ms")
                : (function (t) {
                    var s = Math.abs(t);
                    return s >= o
                      ? Math.round(t / o) + "d"
                      : s >= n
                      ? Math.round(t / n) + "h"
                      : s >= r
                      ? Math.round(t / r) + "m"
                      : s >= e
                      ? Math.round(t / e) + "s"
                      : t + "ms";
                  })(t);
            throw new Error(
              "val is not a non-empty string or a valid number. val=" +
                JSON.stringify(t)
            );
          };
        },
        8370: (t, e) => {
          (e.encode = function (t) {
            var e = "";
            for (var r in t)
              t.hasOwnProperty(r) &&
                (e.length && (e += "&"),
                (e += encodeURIComponent(r) + "=" + encodeURIComponent(t[r])));
            return e;
          }),
            (e.decode = function (t) {
              for (
                var e = {}, r = t.split("&"), n = 0, o = r.length;
                n < o;
                n++
              ) {
                var s = r[n].split("=");
                e[decodeURIComponent(s[0])] = decodeURIComponent(s[1]);
              }
              return e;
            });
        },
        5649: (t) => {
          var e =
              /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            r = [
              "source",
              "protocol",
              "authority",
              "userInfo",
              "user",
              "password",
              "host",
              "port",
              "relative",
              "path",
              "directory",
              "file",
              "query",
              "anchor",
            ];
          t.exports = function (t) {
            var n,
              o,
              s = t,
              i = t.indexOf("["),
              a = t.indexOf("]");
            -1 != i &&
              -1 != a &&
              (t =
                t.substring(0, i) +
                t.substring(i, a).replace(/:/g, ";") +
                t.substring(a, t.length));
            for (var c, u, p = e.exec(t || ""), h = {}, f = 14; f--; )
              h[r[f]] = p[f] || "";
            return (
              -1 != i &&
                -1 != a &&
                ((h.source = s),
                (h.host = h.host
                  .substring(1, h.host.length - 1)
                  .replace(/;/g, ":")),
                (h.authority = h.authority
                  .replace("[", "")
                  .replace("]", "")
                  .replace(/;/g, ":")),
                (h.ipv6uri = !0)),
              (h.pathNames =
                ((n = h.path),
                (o = n.replace(/\/{2,9}/g, "/").split("/")),
                ("/" != n.substr(0, 1) && 0 !== n.length) || o.splice(0, 1),
                "/" == n.substr(n.length - 1, 1) && o.splice(o.length - 1, 1),
                o)),
              (h.queryKey =
                ((c = h.query),
                (u = {}),
                c.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, r) {
                  e && (u[e] = r);
                }),
                u)),
              h
            );
          };
        },
        1114: function (t, e, r) {
          "use strict";
          var n,
            o =
              (this && this.__extends) ||
              ((n = function (t, e) {
                return (
                  (n =
                    Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array &&
                      function (t, e) {
                        t.__proto__ = e;
                      }) ||
                    function (t, e) {
                      for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) &&
                          (t[r] = e[r]);
                    }),
                  n(t, e)
                );
              }),
              function (t, e) {
                if ("function" != typeof e && null !== e)
                  throw new TypeError(
                    "Class extends value " +
                      String(e) +
                      " is not a constructor or null"
                  );
                function r() {
                  this.constructor = t;
                }
                n(t, e),
                  (t.prototype =
                    null === e
                      ? Object.create(e)
                      : ((r.prototype = e.prototype), new r()));
              }),
            s =
              (this && this.__assign) ||
              function () {
                return (
                  (s =
                    Object.assign ||
                    function (t) {
                      for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var o in (e = arguments[r]))
                          Object.prototype.hasOwnProperty.call(e, o) &&
                            (t[o] = e[o]);
                      return t;
                    }),
                  s.apply(this, arguments)
                );
              };
          (e.__esModule = !0), (e.BrowserToRtmpClient = void 0);
          var i = r(343),
            a = r(7915),
            c = {
              port: 8086,
              audioBitsPerSecond: 128e3,
              videoBitsPerSecond: 25e5,
              framerate: 25,
            },
            u = (function (t) {
              function e(e, r) {
                var n = t.call(this) || this;
                if (
                  ((n.stream = e),
                  (n.options = s(s({}, c), r)),
                  n.options.audioSampleRate ||
                    (n.options.audioSampleRate = Math.round(
                      n.options.audioBitsPerSecond / 4
                    )),
                  !r.host)
                )
                  throw new Error("Missing required 'host' value");
                "/" === r.host[r.host.length - 1] &&
                  (r.host = r.host.substring(0, r.host.length - 2)),
                  0 === r.host.indexOf("http://") &&
                    (r.host = "ws://" + r.host.substring("http://".length));
                var o = s({ reconnectionDelayMax: 1e4 }, r.socketio || {});
                return (
                  (n.socket = (0, a.io)(
                    "".concat(r.host, ":").concat(r.port),
                    o
                  )),
                  n.socket.on("error", function (t) {
                    return n.onRemoteError(t);
                  }),
                  n.socket.on("ffmpegOutput", function (t) {
                    return n.emit("ffmpegOutput", t);
                  }),
                  n
                );
              }
              return (
                o(e, t),
                (e.prototype.start = function () {
                  var t = this;
                  return new Promise(function (e, r) {
                    if (t.mediaRecorder)
                      return (
                        "inactive" === t.mediaRecorder.state
                          ? t.mediaRecorder.start()
                          : "paused" === t.mediaRecorder.state &&
                            t.mediaRecorder.resume(),
                        void e()
                      );
                    (t.mediaRecorder = new MediaRecorder(t.stream, {
                      audioBitsPerSecond: t.options.audioBitsPerSecond,
                      videoBitsPerSecond: t.options.videoBitsPerSecond,
                    })),
                      t.socket.emit("start", t.options, function () {
                        e(),
                          (t.mediaRecorder.ondataavailable = function (e) {
                            return t.onMediaRecorderDataAvailable(e);
                          });
                        try {
                          t.mediaRecorder.start(250);
                        } catch (e) {
                          throw (t.socket.emit("stop"), e);
                        }
                      });
                  });
                }),
                (e.prototype.pause = function () {
                  this.mediaRecorder && this.mediaRecorder.pause();
                }),
                (e.prototype.stop = function () {
                  var t = this;
                  return new Promise(function (e, r) {
                    if (t.mediaRecorder) {
                      if ("inactive" === t.mediaRecorder.state) return void e();
                      (t.mediaRecorder.onstop = function () {
                        t.socket.emit("stop", function () {
                          (t.mediaRecorder = void 0), e();
                        });
                      }),
                        t.mediaRecorder.stop();
                    }
                  });
                }),
                (e.prototype.onRemoteError = function (t) {
                  var e = this;
                  this.emit("error", t),
                    t.fatal &&
                      this.mediaRecorder &&
                      "inactive" !== this.mediaRecorder.state &&
                      ((this.mediaRecorder.onstop = function () {
                        return (e.mediaRecorder = void 0);
                      }),
                      this.mediaRecorder.stop());
                }),
                (e.prototype.onMediaRecorderDataAvailable = function (t) {
                  var e = this;
                  this.socket.emit("binarystream", t.data, function (t) {
                    t && e.onRemoteError(t);
                  });
                }),
                e
              );
            })(i.EventEmitter);
          e.BrowserToRtmpClient = u;
        },
        327: (t) => {
          "use strict";
          var e,
            r =
              "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
                ""
              ),
            n = {},
            o = 0,
            s = 0;
          function i(t) {
            var e = "";
            do {
              (e = r[t % 64] + e), (t = Math.floor(t / 64));
            } while (t > 0);
            return e;
          }
          function a() {
            var t = i(+new Date());
            return t !== e ? ((o = 0), (e = t)) : t + "." + i(o++);
          }
          for (; s < 64; s++) n[r[s]] = s;
          (a.encode = i),
            (a.decode = function (t) {
              var e = 0;
              for (s = 0; s < t.length; s++) e = 64 * e + n[t.charAt(s)];
              return e;
            }),
            (t.exports = a);
        },
        8258: (t, e) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.default =
              "undefined" != typeof self
                ? self
                : "undefined" != typeof window
                ? window
                : Function("return this")());
        },
        5611: (t, e, r) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.installTimerFunctions =
              e.transports =
              e.Transport =
              e.protocol =
              e.Socket =
                void 0);
          const n = r(6411);
          Object.defineProperty(e, "Socket", {
            enumerable: !0,
            get: function () {
              return n.Socket;
            },
          }),
            (e.protocol = n.Socket.protocol);
          var o = r(1821);
          Object.defineProperty(e, "Transport", {
            enumerable: !0,
            get: function () {
              return o.Transport;
            },
          });
          var s = r(5991);
          Object.defineProperty(e, "transports", {
            enumerable: !0,
            get: function () {
              return s.transports;
            },
          });
          var i = r(7307);
          Object.defineProperty(e, "installTimerFunctions", {
            enumerable: !0,
            get: function () {
              return i.installTimerFunctions;
            },
          });
        },
        6411: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.Socket = void 0);
          const o = r(5991),
            s = r(7307),
            i = n(r(8370)),
            a = n(r(5649)),
            c = n(r(6292)),
            u = r(8670),
            p = r(5147),
            h = (0, c.default)("engine.io-client:socket");
          class f extends u.Emitter {
            constructor(t, e = {}) {
              super(),
                t && "object" == typeof t && ((e = t), (t = null)),
                t
                  ? ((t = (0, a.default)(t)),
                    (e.hostname = t.host),
                    (e.secure = "https" === t.protocol || "wss" === t.protocol),
                    (e.port = t.port),
                    t.query && (e.query = t.query))
                  : e.host && (e.hostname = (0, a.default)(e.host).host),
                (0, s.installTimerFunctions)(this, e),
                (this.secure =
                  null != e.secure
                    ? e.secure
                    : "undefined" != typeof location &&
                      "https:" === location.protocol),
                e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
                (this.hostname =
                  e.hostname ||
                  ("undefined" != typeof location
                    ? location.hostname
                    : "localhost")),
                (this.port =
                  e.port ||
                  ("undefined" != typeof location && location.port
                    ? location.port
                    : this.secure
                    ? "443"
                    : "80")),
                (this.transports = e.transports || ["polling", "websocket"]),
                (this.readyState = ""),
                (this.writeBuffer = []),
                (this.prevBufferLen = 0),
                (this.opts = Object.assign(
                  {
                    path: "/engine.io",
                    agent: !1,
                    withCredentials: !1,
                    upgrade: !0,
                    timestampParam: "t",
                    rememberUpgrade: !1,
                    rejectUnauthorized: !0,
                    perMessageDeflate: { threshold: 1024 },
                    transportOptions: {},
                    closeOnBeforeunload: !0,
                  },
                  e
                )),
                (this.opts.path = this.opts.path.replace(/\/$/, "") + "/"),
                "string" == typeof this.opts.query &&
                  (this.opts.query = i.default.decode(this.opts.query)),
                (this.id = null),
                (this.upgrades = null),
                (this.pingInterval = null),
                (this.pingTimeout = null),
                (this.pingTimeoutTimer = null),
                "function" == typeof addEventListener &&
                  (this.opts.closeOnBeforeunload &&
                    addEventListener(
                      "beforeunload",
                      () => {
                        this.transport &&
                          (this.transport.removeAllListeners(),
                          this.transport.close());
                      },
                      !1
                    ),
                  "localhost" !== this.hostname &&
                    ((this.offlineEventListener = () => {
                      this.onClose("transport close");
                    }),
                    addEventListener(
                      "offline",
                      this.offlineEventListener,
                      !1
                    ))),
                this.open();
            }
            createTransport(t) {
              h('creating transport "%s"', t);
              const e = (function (t) {
                const e = {};
                for (let r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                return e;
              })(this.opts.query);
              (e.EIO = p.protocol),
                (e.transport = t),
                this.id && (e.sid = this.id);
              const r = Object.assign(
                {},
                this.opts.transportOptions[t],
                this.opts,
                {
                  query: e,
                  socket: this,
                  hostname: this.hostname,
                  secure: this.secure,
                  port: this.port,
                }
              );
              return h("options: %j", r), new o.transports[t](r);
            }
            open() {
              let t;
              if (
                this.opts.rememberUpgrade &&
                f.priorWebsocketSuccess &&
                -1 !== this.transports.indexOf("websocket")
              )
                t = "websocket";
              else {
                if (0 === this.transports.length)
                  return void this.setTimeoutFn(() => {
                    this.emitReserved("error", "No transports available");
                  }, 0);
                t = this.transports[0];
              }
              this.readyState = "opening";
              try {
                t = this.createTransport(t);
              } catch (t) {
                return (
                  h("error while creating transport: %s", t),
                  this.transports.shift(),
                  void this.open()
                );
              }
              t.open(), this.setTransport(t);
            }
            setTransport(t) {
              h("setting transport %s", t.name),
                this.transport &&
                  (h("clearing existing transport %s", this.transport.name),
                  this.transport.removeAllListeners()),
                (this.transport = t),
                t
                  .on("drain", this.onDrain.bind(this))
                  .on("packet", this.onPacket.bind(this))
                  .on("error", this.onError.bind(this))
                  .on("close", () => {
                    this.onClose("transport close");
                  });
            }
            probe(t) {
              h('probing transport "%s"', t);
              let e = this.createTransport(t),
                r = !1;
              f.priorWebsocketSuccess = !1;
              const n = () => {
                r ||
                  (h('probe transport "%s" opened', t),
                  e.send([{ type: "ping", data: "probe" }]),
                  e.once("packet", (n) => {
                    if (!r)
                      if ("pong" === n.type && "probe" === n.data) {
                        if (
                          (h('probe transport "%s" pong', t),
                          (this.upgrading = !0),
                          this.emitReserved("upgrading", e),
                          !e)
                        )
                          return;
                        (f.priorWebsocketSuccess = "websocket" === e.name),
                          h(
                            'pausing current transport "%s"',
                            this.transport.name
                          ),
                          this.transport.pause(() => {
                            r ||
                              ("closed" !== this.readyState &&
                                (h(
                                  "changing transport and sending upgrade packet"
                                ),
                                u(),
                                this.setTransport(e),
                                e.send([{ type: "upgrade" }]),
                                this.emitReserved("upgrade", e),
                                (e = null),
                                (this.upgrading = !1),
                                this.flush()));
                          });
                      } else {
                        h('probe transport "%s" failed', t);
                        const r = new Error("probe error");
                        (r.transport = e.name),
                          this.emitReserved("upgradeError", r);
                      }
                  }));
              };
              function o() {
                r || ((r = !0), u(), e.close(), (e = null));
              }
              const s = (r) => {
                const n = new Error("probe error: " + r);
                (n.transport = e.name),
                  o(),
                  h('probe transport "%s" failed because of error: %s', t, r),
                  this.emitReserved("upgradeError", n);
              };
              function i() {
                s("transport closed");
              }
              function a() {
                s("socket closed");
              }
              function c(t) {
                e &&
                  t.name !== e.name &&
                  (h('"%s" works - aborting "%s"', t.name, e.name), o());
              }
              const u = () => {
                e.removeListener("open", n),
                  e.removeListener("error", s),
                  e.removeListener("close", i),
                  this.off("close", a),
                  this.off("upgrading", c);
              };
              e.once("open", n),
                e.once("error", s),
                e.once("close", i),
                this.once("close", a),
                this.once("upgrading", c),
                e.open();
            }
            onOpen() {
              if (
                (h("socket open"),
                (this.readyState = "open"),
                (f.priorWebsocketSuccess = "websocket" === this.transport.name),
                this.emitReserved("open"),
                this.flush(),
                "open" === this.readyState &&
                  this.opts.upgrade &&
                  this.transport.pause)
              ) {
                h("starting upgrade probes");
                let t = 0;
                const e = this.upgrades.length;
                for (; t < e; t++) this.probe(this.upgrades[t]);
              }
            }
            onPacket(t) {
              if (
                "opening" === this.readyState ||
                "open" === this.readyState ||
                "closing" === this.readyState
              )
                switch (
                  (h('socket receive: type "%s", data "%s"', t.type, t.data),
                  this.emitReserved("packet", t),
                  this.emitReserved("heartbeat"),
                  t.type)
                ) {
                  case "open":
                    this.onHandshake(JSON.parse(t.data));
                    break;
                  case "ping":
                    this.resetPingTimeout(),
                      this.sendPacket("pong"),
                      this.emitReserved("ping"),
                      this.emitReserved("pong");
                    break;
                  case "error":
                    const e = new Error("server error");
                    (e.code = t.data), this.onError(e);
                    break;
                  case "message":
                    this.emitReserved("data", t.data),
                      this.emitReserved("message", t.data);
                }
              else
                h(
                  'packet received with socket readyState "%s"',
                  this.readyState
                );
            }
            onHandshake(t) {
              this.emitReserved("handshake", t),
                (this.id = t.sid),
                (this.transport.query.sid = t.sid),
                (this.upgrades = this.filterUpgrades(t.upgrades)),
                (this.pingInterval = t.pingInterval),
                (this.pingTimeout = t.pingTimeout),
                this.onOpen(),
                "closed" !== this.readyState && this.resetPingTimeout();
            }
            resetPingTimeout() {
              this.clearTimeoutFn(this.pingTimeoutTimer),
                (this.pingTimeoutTimer = this.setTimeoutFn(() => {
                  this.onClose("ping timeout");
                }, this.pingInterval + this.pingTimeout)),
                this.opts.autoUnref && this.pingTimeoutTimer.unref();
            }
            onDrain() {
              this.writeBuffer.splice(0, this.prevBufferLen),
                (this.prevBufferLen = 0),
                0 === this.writeBuffer.length
                  ? this.emitReserved("drain")
                  : this.flush();
            }
            flush() {
              "closed" !== this.readyState &&
                this.transport.writable &&
                !this.upgrading &&
                this.writeBuffer.length &&
                (h("flushing %d packets in socket", this.writeBuffer.length),
                this.transport.send(this.writeBuffer),
                (this.prevBufferLen = this.writeBuffer.length),
                this.emitReserved("flush"));
            }
            write(t, e, r) {
              return this.sendPacket("message", t, e, r), this;
            }
            send(t, e, r) {
              return this.sendPacket("message", t, e, r), this;
            }
            sendPacket(t, e, r, n) {
              if (
                ("function" == typeof e && ((n = e), (e = void 0)),
                "function" == typeof r && ((n = r), (r = null)),
                "closing" === this.readyState || "closed" === this.readyState)
              )
                return;
              (r = r || {}).compress = !1 !== r.compress;
              const o = { type: t, data: e, options: r };
              this.emitReserved("packetCreate", o),
                this.writeBuffer.push(o),
                n && this.once("flush", n),
                this.flush();
            }
            close() {
              const t = () => {
                  this.onClose("forced close"),
                    h("socket closing - telling transport to close"),
                    this.transport.close();
                },
                e = () => {
                  this.off("upgrade", e), this.off("upgradeError", e), t();
                },
                r = () => {
                  this.once("upgrade", e), this.once("upgradeError", e);
                };
              return (
                ("opening" !== this.readyState && "open" !== this.readyState) ||
                  ((this.readyState = "closing"),
                  this.writeBuffer.length
                    ? this.once("drain", () => {
                        this.upgrading ? r() : t();
                      })
                    : this.upgrading
                    ? r()
                    : t()),
                this
              );
            }
            onError(t) {
              h("socket error %j", t),
                (f.priorWebsocketSuccess = !1),
                this.emitReserved("error", t),
                this.onClose("transport error", t);
            }
            onClose(t, e) {
              ("opening" !== this.readyState &&
                "open" !== this.readyState &&
                "closing" !== this.readyState) ||
                (h('socket close with reason: "%s"', t),
                this.clearTimeoutFn(this.pingTimeoutTimer),
                this.transport.removeAllListeners("close"),
                this.transport.close(),
                this.transport.removeAllListeners(),
                "function" == typeof removeEventListener &&
                  removeEventListener("offline", this.offlineEventListener, !1),
                (this.readyState = "closed"),
                (this.id = null),
                this.emitReserved("close", t, e),
                (this.writeBuffer = []),
                (this.prevBufferLen = 0));
            }
            filterUpgrades(t) {
              const e = [];
              let r = 0;
              const n = t.length;
              for (; r < n; r++) ~this.transports.indexOf(t[r]) && e.push(t[r]);
              return e;
            }
          }
          (e.Socket = f), (f.protocol = p.protocol);
        },
        1821: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.Transport = void 0);
          const o = r(5147),
            s = r(8670),
            i = r(7307),
            a = (0, n(r(6292)).default)("engine.io-client:transport");
          class c extends s.Emitter {
            constructor(t) {
              super(),
                (this.writable = !1),
                (0, i.installTimerFunctions)(this, t),
                (this.opts = t),
                (this.query = t.query),
                (this.readyState = ""),
                (this.socket = t.socket);
            }
            onError(t, e) {
              const r = new Error(t);
              return (
                (r.type = "TransportError"),
                (r.description = e),
                super.emit("error", r),
                this
              );
            }
            open() {
              return (
                ("closed" !== this.readyState && "" !== this.readyState) ||
                  ((this.readyState = "opening"), this.doOpen()),
                this
              );
            }
            close() {
              return (
                ("opening" !== this.readyState && "open" !== this.readyState) ||
                  (this.doClose(), this.onClose()),
                this
              );
            }
            send(t) {
              "open" === this.readyState
                ? this.write(t)
                : a("transport is not open, discarding packets");
            }
            onOpen() {
              (this.readyState = "open"),
                (this.writable = !0),
                super.emit("open");
            }
            onData(t) {
              const e = (0, o.decodePacket)(t, this.socket.binaryType);
              this.onPacket(e);
            }
            onPacket(t) {
              super.emit("packet", t);
            }
            onClose() {
              (this.readyState = "closed"), super.emit("close");
            }
          }
          e.Transport = c;
        },
        5991: (t, e, r) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.transports = void 0);
          const n = r(1422),
            o = r(4492);
          e.transports = { websocket: o.WS, polling: n.XHR };
        },
        1422: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.Request = e.XHR = void 0);
          const o = n(r(885)),
            s = n(r(6292)),
            i = n(r(8258)),
            a = r(7307),
            c = r(8670),
            u = r(2188),
            p = (0, s.default)("engine.io-client:polling-xhr");
          function h() {}
          const f = null != new o.default({ xdomain: !1 }).responseType;
          class l extends u.Polling {
            constructor(t) {
              if ((super(t), "undefined" != typeof location)) {
                const e = "https:" === location.protocol;
                let r = location.port;
                r || (r = e ? "443" : "80"),
                  (this.xd =
                    ("undefined" != typeof location &&
                      t.hostname !== location.hostname) ||
                    r !== t.port),
                  (this.xs = t.secure !== e);
              }
              const e = t && t.forceBase64;
              this.supportsBinary = f && !e;
            }
            request(t = {}) {
              return (
                Object.assign(t, { xd: this.xd, xs: this.xs }, this.opts),
                new d(this.uri(), t)
              );
            }
            doWrite(t, e) {
              const r = this.request({ method: "POST", data: t });
              r.on("success", e),
                r.on("error", (t) => {
                  this.onError("xhr post error", t);
                });
            }
            doPoll() {
              p("xhr poll");
              const t = this.request();
              t.on("data", this.onData.bind(this)),
                t.on("error", (t) => {
                  this.onError("xhr poll error", t);
                }),
                (this.pollXhr = t);
            }
          }
          e.XHR = l;
          class d extends c.Emitter {
            constructor(t, e) {
              super(),
                (0, a.installTimerFunctions)(this, e),
                (this.opts = e),
                (this.method = e.method || "GET"),
                (this.uri = t),
                (this.async = !1 !== e.async),
                (this.data = void 0 !== e.data ? e.data : null),
                this.create();
            }
            create() {
              const t = (0, a.pick)(
                this.opts,
                "agent",
                "pfx",
                "key",
                "passphrase",
                "cert",
                "ca",
                "ciphers",
                "rejectUnauthorized",
                "autoUnref"
              );
              (t.xdomain = !!this.opts.xd), (t.xscheme = !!this.opts.xs);
              const e = (this.xhr = new o.default(t));
              try {
                p("xhr open %s: %s", this.method, this.uri),
                  e.open(this.method, this.uri, this.async);
                try {
                  if (this.opts.extraHeaders) {
                    e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0);
                    for (let t in this.opts.extraHeaders)
                      this.opts.extraHeaders.hasOwnProperty(t) &&
                        e.setRequestHeader(t, this.opts.extraHeaders[t]);
                  }
                } catch (t) {}
                if ("POST" === this.method)
                  try {
                    e.setRequestHeader(
                      "Content-type",
                      "text/plain;charset=UTF-8"
                    );
                  } catch (t) {}
                try {
                  e.setRequestHeader("Accept", "*/*");
                } catch (t) {}
                "withCredentials" in e &&
                  (e.withCredentials = this.opts.withCredentials),
                  this.opts.requestTimeout &&
                    (e.timeout = this.opts.requestTimeout),
                  (e.onreadystatechange = () => {
                    4 === e.readyState &&
                      (200 === e.status || 1223 === e.status
                        ? this.onLoad()
                        : this.setTimeoutFn(() => {
                            this.onError(
                              "number" == typeof e.status ? e.status : 0
                            );
                          }, 0));
                  }),
                  p("xhr data %s", this.data),
                  e.send(this.data);
              } catch (t) {
                return void this.setTimeoutFn(() => {
                  this.onError(t);
                }, 0);
              }
              "undefined" != typeof document &&
                ((this.index = d.requestsCount++),
                (d.requests[this.index] = this));
            }
            onSuccess() {
              this.emit("success"), this.cleanup();
            }
            onData(t) {
              this.emit("data", t), this.onSuccess();
            }
            onError(t) {
              this.emit("error", t), this.cleanup(!0);
            }
            cleanup(t) {
              if (void 0 !== this.xhr && null !== this.xhr) {
                if (((this.xhr.onreadystatechange = h), t))
                  try {
                    this.xhr.abort();
                  } catch (t) {}
                "undefined" != typeof document && delete d.requests[this.index],
                  (this.xhr = null);
              }
            }
            onLoad() {
              const t = this.xhr.responseText;
              null !== t && this.onData(t);
            }
            abort() {
              this.cleanup();
            }
          }
          if (
            ((e.Request = d),
            (d.requestsCount = 0),
            (d.requests = {}),
            "undefined" != typeof document)
          )
            if ("function" == typeof attachEvent) attachEvent("onunload", v);
            else if ("function" == typeof addEventListener) {
              const t = "onpagehide" in i.default ? "pagehide" : "unload";
              addEventListener(t, v, !1);
            }
          function v() {
            for (let t in d.requests)
              d.requests.hasOwnProperty(t) && d.requests[t].abort();
          }
        },
        2188: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.Polling = void 0);
          const o = r(1821),
            s = n(r(6292)),
            i = n(r(327)),
            a = n(r(8370)),
            c = r(5147),
            u = (0, s.default)("engine.io-client:polling");
          class p extends o.Transport {
            constructor() {
              super(...arguments), (this.polling = !1);
            }
            get name() {
              return "polling";
            }
            doOpen() {
              this.poll();
            }
            pause(t) {
              this.readyState = "pausing";
              const e = () => {
                u("paused"), (this.readyState = "paused"), t();
              };
              if (this.polling || !this.writable) {
                let t = 0;
                this.polling &&
                  (u("we are currently polling - waiting to pause"),
                  t++,
                  this.once("pollComplete", function () {
                    u("pre-pause polling complete"), --t || e();
                  })),
                  this.writable ||
                    (u("we are currently writing - waiting to pause"),
                    t++,
                    this.once("drain", function () {
                      u("pre-pause writing complete"), --t || e();
                    }));
              } else e();
            }
            poll() {
              u("polling"),
                (this.polling = !0),
                this.doPoll(),
                this.emit("poll");
            }
            onData(t) {
              u("polling got data %s", t),
                (0, c.decodePayload)(t, this.socket.binaryType).forEach((t) => {
                  if (
                    ("opening" === this.readyState &&
                      "open" === t.type &&
                      this.onOpen(),
                    "close" === t.type)
                  )
                    return this.onClose(), !1;
                  this.onPacket(t);
                }),
                "closed" !== this.readyState &&
                  ((this.polling = !1),
                  this.emit("pollComplete"),
                  "open" === this.readyState
                    ? this.poll()
                    : u(
                        'ignoring poll - transport state "%s"',
                        this.readyState
                      ));
            }
            doClose() {
              const t = () => {
                u("writing close packet"), this.write([{ type: "close" }]);
              };
              "open" === this.readyState
                ? (u("transport open - closing"), t())
                : (u("transport not open - deferring close"),
                  this.once("open", t));
            }
            write(t) {
              (this.writable = !1),
                (0, c.encodePayload)(t, (t) => {
                  this.doWrite(t, () => {
                    (this.writable = !0), this.emit("drain");
                  });
                });
            }
            uri() {
              let t = this.query || {};
              const e = this.opts.secure ? "https" : "http";
              let r = "";
              !1 !== this.opts.timestampRequests &&
                (t[this.opts.timestampParam] = (0, i.default)()),
                this.supportsBinary || t.sid || (t.b64 = 1),
                this.opts.port &&
                  (("https" === e && 443 !== Number(this.opts.port)) ||
                    ("http" === e && 80 !== Number(this.opts.port))) &&
                  (r = ":" + this.opts.port);
              const n = a.default.encode(t);
              return (
                e +
                "://" +
                (-1 !== this.opts.hostname.indexOf(":")
                  ? "[" + this.opts.hostname + "]"
                  : this.opts.hostname) +
                r +
                this.opts.path +
                (n.length ? "?" + n : "")
              );
            }
          }
          e.Polling = p;
        },
        5167: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.defaultBinaryType =
              e.usingBrowserWebSocket =
              e.WebSocket =
              e.nextTick =
                void 0);
          const o = n(r(8258));
          (e.nextTick =
            "function" == typeof Promise && "function" == typeof Promise.resolve
              ? (t) => Promise.resolve().then(t)
              : (t, e) => e(t, 0)),
            (e.WebSocket = o.default.WebSocket || o.default.MozWebSocket),
            (e.usingBrowserWebSocket = !0),
            (e.defaultBinaryType = "arraybuffer");
        },
        4492: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.WS = void 0);
          const o = r(1821),
            s = n(r(8370)),
            i = n(r(327)),
            a = r(7307),
            c = r(5167),
            u = n(r(6292)),
            p = r(5147),
            h = (0, u.default)("engine.io-client:websocket"),
            f =
              "undefined" != typeof navigator &&
              "string" == typeof navigator.product &&
              "reactnative" === navigator.product.toLowerCase();
          class l extends o.Transport {
            constructor(t) {
              super(t), (this.supportsBinary = !t.forceBase64);
            }
            get name() {
              return "websocket";
            }
            doOpen() {
              if (!this.check()) return;
              const t = this.uri(),
                e = this.opts.protocols,
                r = f
                  ? {}
                  : (0, a.pick)(
                      this.opts,
                      "agent",
                      "perMessageDeflate",
                      "pfx",
                      "key",
                      "passphrase",
                      "cert",
                      "ca",
                      "ciphers",
                      "rejectUnauthorized",
                      "localAddress",
                      "protocolVersion",
                      "origin",
                      "maxPayload",
                      "family",
                      "checkServerIdentity"
                    );
              this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
              try {
                this.ws =
                  c.usingBrowserWebSocket && !f
                    ? e
                      ? new c.WebSocket(t, e)
                      : new c.WebSocket(t)
                    : new c.WebSocket(t, e, r);
              } catch (t) {
                return this.emit("error", t);
              }
              (this.ws.binaryType =
                this.socket.binaryType || c.defaultBinaryType),
                this.addEventListeners();
            }
            addEventListeners() {
              (this.ws.onopen = () => {
                this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
              }),
                (this.ws.onclose = this.onClose.bind(this)),
                (this.ws.onmessage = (t) => this.onData(t.data)),
                (this.ws.onerror = (t) => this.onError("websocket error", t));
            }
            write(t) {
              this.writable = !1;
              for (let e = 0; e < t.length; e++) {
                const r = t[e],
                  n = e === t.length - 1;
                (0, p.encodePacket)(r, this.supportsBinary, (t) => {
                  const e = {};
                  !c.usingBrowserWebSocket &&
                    (r.options && (e.compress = r.options.compress),
                    this.opts.perMessageDeflate) &&
                    ("string" == typeof t ? Buffer.byteLength(t) : t.length) <
                      this.opts.perMessageDeflate.threshold &&
                    (e.compress = !1);
                  try {
                    c.usingBrowserWebSocket
                      ? this.ws.send(t)
                      : this.ws.send(t, e);
                  } catch (t) {
                    h("websocket closed before onclose event");
                  }
                  n &&
                    (0, c.nextTick)(() => {
                      (this.writable = !0), this.emit("drain");
                    }, this.setTimeoutFn);
                });
              }
            }
            doClose() {
              void 0 !== this.ws && (this.ws.close(), (this.ws = null));
            }
            uri() {
              let t = this.query || {};
              const e = this.opts.secure ? "wss" : "ws";
              let r = "";
              this.opts.port &&
                (("wss" === e && 443 !== Number(this.opts.port)) ||
                  ("ws" === e && 80 !== Number(this.opts.port))) &&
                (r = ":" + this.opts.port),
                this.opts.timestampRequests &&
                  (t[this.opts.timestampParam] = (0, i.default)()),
                this.supportsBinary || (t.b64 = 1);
              const n = s.default.encode(t);
              return (
                e +
                "://" +
                (-1 !== this.opts.hostname.indexOf(":")
                  ? "[" + this.opts.hostname + "]"
                  : this.opts.hostname) +
                r +
                this.opts.path +
                (n.length ? "?" + n : "")
              );
            }
            check() {
              return !(
                !c.WebSocket ||
                ("__initialize" in c.WebSocket &&
                  this.name === l.prototype.name)
              );
            }
          }
          e.WS = l;
        },
        885: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 });
          const o = n(r(6048)),
            s = n(r(8258));
          e.default = function (t) {
            const e = t.xdomain;
            try {
              if ("undefined" != typeof XMLHttpRequest && (!e || o.default))
                return new XMLHttpRequest();
            } catch (t) {}
            if (!e)
              try {
                return new s.default[["Active"].concat("Object").join("X")](
                  "Microsoft.XMLHTTP"
                );
              } catch (t) {}
          };
        },
        7307: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.installTimerFunctions = e.pick = void 0);
          const o = n(r(8258));
          e.pick = function (t, ...e) {
            return e.reduce(
              (e, r) => (t.hasOwnProperty(r) && (e[r] = t[r]), e),
              {}
            );
          };
          const s = setTimeout,
            i = clearTimeout;
          e.installTimerFunctions = function (t, e) {
            e.useNativeTimers
              ? ((t.setTimeoutFn = s.bind(o.default)),
                (t.clearTimeoutFn = i.bind(o.default)))
              : ((t.setTimeoutFn = setTimeout.bind(o.default)),
                (t.clearTimeoutFn = clearTimeout.bind(o.default)));
          };
        },
        3768: (t, e) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.ERROR_PACKET = e.PACKET_TYPES_REVERSE = e.PACKET_TYPES = void 0);
          const r = Object.create(null);
          (e.PACKET_TYPES = r),
            (r.open = "0"),
            (r.close = "1"),
            (r.ping = "2"),
            (r.pong = "3"),
            (r.message = "4"),
            (r.upgrade = "5"),
            (r.noop = "6");
          const n = Object.create(null);
          (e.PACKET_TYPES_REVERSE = n),
            Object.keys(r).forEach((t) => {
              n[r[t]] = t;
            }),
            (e.ERROR_PACKET = { type: "error", data: "parser error" });
        },
        4456: (t, e, r) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 });
          const n = r(3768),
            o = r(5765),
            s = "function" == typeof ArrayBuffer,
            i = (t, e) => {
              if (s) {
                const r = (0, o.decode)(t);
                return a(r, e);
              }
              return { base64: !0, data: t };
            },
            a = (t, e) =>
              "blob" === e && t instanceof ArrayBuffer ? new Blob([t]) : t;
          e.default = (t, e) => {
            if ("string" != typeof t) return { type: "message", data: a(t, e) };
            const r = t.charAt(0);
            return "b" === r
              ? { type: "message", data: i(t.substring(1), e) }
              : n.PACKET_TYPES_REVERSE[r]
              ? t.length > 1
                ? { type: n.PACKET_TYPES_REVERSE[r], data: t.substring(1) }
                : { type: n.PACKET_TYPES_REVERSE[r] }
              : n.ERROR_PACKET;
          };
        },
        440: (t, e, r) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 });
          const n = r(3768),
            o =
              "function" == typeof Blob ||
              ("undefined" != typeof Blob &&
                "[object BlobConstructor]" ===
                  Object.prototype.toString.call(Blob)),
            s = "function" == typeof ArrayBuffer,
            i = (t, e) => {
              const r = new FileReader();
              return (
                (r.onload = function () {
                  const t = r.result.split(",")[1];
                  e("b" + t);
                }),
                r.readAsDataURL(t)
              );
            };
          e.default = ({ type: t, data: e }, r, a) => {
            return o && e instanceof Blob
              ? r
                ? a(e)
                : i(e, a)
              : s &&
                (e instanceof ArrayBuffer ||
                  ((c = e),
                  "function" == typeof ArrayBuffer.isView
                    ? ArrayBuffer.isView(c)
                    : c && c.buffer instanceof ArrayBuffer))
              ? r
                ? a(e)
                : i(new Blob([e]), a)
              : a(n.PACKET_TYPES[t] + (e || ""));
            var c;
          };
        },
        5147: (t, e, r) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.decodePayload =
              e.decodePacket =
              e.encodePayload =
              e.encodePacket =
              e.protocol =
                void 0);
          const n = r(440);
          e.encodePacket = n.default;
          const o = r(4456);
          e.decodePacket = o.default;
          const s = String.fromCharCode(30);
          (e.encodePayload = (t, e) => {
            const r = t.length,
              o = new Array(r);
            let i = 0;
            t.forEach((t, a) => {
              (0, n.default)(t, !1, (t) => {
                (o[a] = t), ++i === r && e(o.join(s));
              });
            });
          }),
            (e.decodePayload = (t, e) => {
              const r = t.split(s),
                n = [];
              for (let t = 0; t < r.length; t++) {
                const s = (0, o.default)(r[t], e);
                if ((n.push(s), "error" === s.type)) break;
              }
              return n;
            }),
            (e.protocol = 4);
        },
        7915: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.default =
              e.connect =
              e.io =
              e.Socket =
              e.Manager =
              e.protocol =
                void 0);
          const o = r(3098),
            s = r(590);
          Object.defineProperty(e, "Manager", {
            enumerable: !0,
            get: function () {
              return s.Manager;
            },
          });
          const i = r(996);
          Object.defineProperty(e, "Socket", {
            enumerable: !0,
            get: function () {
              return i.Socket;
            },
          });
          const a = n(r(6292)).default("socket.io-client"),
            c = {};
          function u(t, e) {
            "object" == typeof t && ((e = t), (t = void 0)), (e = e || {});
            const r = o.url(t, e.path || "/socket.io"),
              n = r.source,
              i = r.id,
              u = r.path,
              p = c[i] && u in c[i].nsps;
            let h;
            return (
              e.forceNew || e["force new connection"] || !1 === e.multiplex || p
                ? (a("ignoring socket cache for %s", n),
                  (h = new s.Manager(n, e)))
                : (c[i] ||
                    (a("new io instance for %s", n),
                    (c[i] = new s.Manager(n, e))),
                  (h = c[i])),
              r.query && !e.query && (e.query = r.queryKey),
              h.socket(r.path, e)
            );
          }
          (e.io = u),
            (e.connect = u),
            (e.default = u),
            Object.assign(u, {
              Manager: s.Manager,
              Socket: i.Socket,
              io: u,
              connect: u,
            });
          var p = r(9656);
          Object.defineProperty(e, "protocol", {
            enumerable: !0,
            get: function () {
              return p.protocol;
            },
          }),
            (t.exports = u);
        },
        590: function (t, e, r) {
          "use strict";
          var n =
              (this && this.__createBinding) ||
              (Object.create
                ? function (t, e, r, n) {
                    void 0 === n && (n = r),
                      Object.defineProperty(t, n, {
                        enumerable: !0,
                        get: function () {
                          return e[r];
                        },
                      });
                  }
                : function (t, e, r, n) {
                    void 0 === n && (n = r), (t[n] = e[r]);
                  }),
            o =
              (this && this.__setModuleDefault) ||
              (Object.create
                ? function (t, e) {
                    Object.defineProperty(t, "default", {
                      enumerable: !0,
                      value: e,
                    });
                  }
                : function (t, e) {
                    t.default = e;
                  }),
            s =
              (this && this.__importStar) ||
              function (t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t)
                  for (var r in t)
                    "default" !== r &&
                      Object.prototype.hasOwnProperty.call(t, r) &&
                      n(e, t, r);
                return o(e, t), e;
              },
            i =
              (this && this.__importDefault) ||
              function (t) {
                return t && t.__esModule ? t : { default: t };
              };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.Manager = void 0);
          const a = r(5611),
            c = r(996),
            u = s(r(9656)),
            p = r(1588),
            h = i(r(2307)),
            f = r(8670),
            l = i(r(6292)).default("socket.io-client:manager");
          class d extends f.Emitter {
            constructor(t, e) {
              var r;
              super(),
                (this.nsps = {}),
                (this.subs = []),
                t && "object" == typeof t && ((e = t), (t = void 0)),
                ((e = e || {}).path = e.path || "/socket.io"),
                (this.opts = e),
                a.installTimerFunctions(this, e),
                this.reconnection(!1 !== e.reconnection),
                this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
                this.reconnectionDelay(e.reconnectionDelay || 1e3),
                this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
                this.randomizationFactor(
                  null !== (r = e.randomizationFactor) && void 0 !== r ? r : 0.5
                ),
                (this.backoff = new h.default({
                  min: this.reconnectionDelay(),
                  max: this.reconnectionDelayMax(),
                  jitter: this.randomizationFactor(),
                })),
                this.timeout(null == e.timeout ? 2e4 : e.timeout),
                (this._readyState = "closed"),
                (this.uri = t);
              const n = e.parser || u;
              (this.encoder = new n.Encoder()),
                (this.decoder = new n.Decoder()),
                (this._autoConnect = !1 !== e.autoConnect),
                this._autoConnect && this.open();
            }
            reconnection(t) {
              return arguments.length
                ? ((this._reconnection = !!t), this)
                : this._reconnection;
            }
            reconnectionAttempts(t) {
              return void 0 === t
                ? this._reconnectionAttempts
                : ((this._reconnectionAttempts = t), this);
            }
            reconnectionDelay(t) {
              var e;
              return void 0 === t
                ? this._reconnectionDelay
                : ((this._reconnectionDelay = t),
                  null === (e = this.backoff) || void 0 === e || e.setMin(t),
                  this);
            }
            randomizationFactor(t) {
              var e;
              return void 0 === t
                ? this._randomizationFactor
                : ((this._randomizationFactor = t),
                  null === (e = this.backoff) || void 0 === e || e.setJitter(t),
                  this);
            }
            reconnectionDelayMax(t) {
              var e;
              return void 0 === t
                ? this._reconnectionDelayMax
                : ((this._reconnectionDelayMax = t),
                  null === (e = this.backoff) || void 0 === e || e.setMax(t),
                  this);
            }
            timeout(t) {
              return arguments.length
                ? ((this._timeout = t), this)
                : this._timeout;
            }
            maybeReconnectOnOpen() {
              !this._reconnecting &&
                this._reconnection &&
                0 === this.backoff.attempts &&
                this.reconnect();
            }
            open(t) {
              if (
                (l("readyState %s", this._readyState),
                ~this._readyState.indexOf("open"))
              )
                return this;
              l("opening %s", this.uri),
                (this.engine = new a.Socket(this.uri, this.opts));
              const e = this.engine,
                r = this;
              (this._readyState = "opening"), (this.skipReconnect = !1);
              const n = p.on(e, "open", function () {
                  r.onopen(), t && t();
                }),
                o = p.on(e, "error", (e) => {
                  l("error"),
                    r.cleanup(),
                    (r._readyState = "closed"),
                    this.emitReserved("error", e),
                    t ? t(e) : r.maybeReconnectOnOpen();
                });
              if (!1 !== this._timeout) {
                const t = this._timeout;
                l("connect attempt will timeout after %d", t), 0 === t && n();
                const r = this.setTimeoutFn(() => {
                  l("connect attempt timed out after %d", t),
                    n(),
                    e.close(),
                    e.emit("error", new Error("timeout"));
                }, t);
                this.opts.autoUnref && r.unref(),
                  this.subs.push(function () {
                    clearTimeout(r);
                  });
              }
              return this.subs.push(n), this.subs.push(o), this;
            }
            connect(t) {
              return this.open(t);
            }
            onopen() {
              l("open"),
                this.cleanup(),
                (this._readyState = "open"),
                this.emitReserved("open");
              const t = this.engine;
              this.subs.push(
                p.on(t, "ping", this.onping.bind(this)),
                p.on(t, "data", this.ondata.bind(this)),
                p.on(t, "error", this.onerror.bind(this)),
                p.on(t, "close", this.onclose.bind(this)),
                p.on(this.decoder, "decoded", this.ondecoded.bind(this))
              );
            }
            onping() {
              this.emitReserved("ping");
            }
            ondata(t) {
              this.decoder.add(t);
            }
            ondecoded(t) {
              this.emitReserved("packet", t);
            }
            onerror(t) {
              l("error", t), this.emitReserved("error", t);
            }
            socket(t, e) {
              let r = this.nsps[t];
              return (
                r || ((r = new c.Socket(this, t, e)), (this.nsps[t] = r)), r
              );
            }
            _destroy(t) {
              const e = Object.keys(this.nsps);
              for (const t of e)
                if (this.nsps[t].active)
                  return void l("socket %s is still active, skipping close", t);
              this._close();
            }
            _packet(t) {
              l("writing packet %j", t);
              const e = this.encoder.encode(t);
              for (let r = 0; r < e.length; r++)
                this.engine.write(e[r], t.options);
            }
            cleanup() {
              l("cleanup"),
                this.subs.forEach((t) => t()),
                (this.subs.length = 0),
                this.decoder.destroy();
            }
            _close() {
              l("disconnect"),
                (this.skipReconnect = !0),
                (this._reconnecting = !1),
                this.onclose("forced close"),
                this.engine && this.engine.close();
            }
            disconnect() {
              return this._close();
            }
            onclose(t) {
              l("closed due to %s", t),
                this.cleanup(),
                this.backoff.reset(),
                (this._readyState = "closed"),
                this.emitReserved("close", t),
                this._reconnection && !this.skipReconnect && this.reconnect();
            }
            reconnect() {
              if (this._reconnecting || this.skipReconnect) return this;
              const t = this;
              if (this.backoff.attempts >= this._reconnectionAttempts)
                l("reconnect failed"),
                  this.backoff.reset(),
                  this.emitReserved("reconnect_failed"),
                  (this._reconnecting = !1);
              else {
                const e = this.backoff.duration();
                l("will wait %dms before reconnect attempt", e),
                  (this._reconnecting = !0);
                const r = this.setTimeoutFn(() => {
                  t.skipReconnect ||
                    (l("attempting reconnect"),
                    this.emitReserved("reconnect_attempt", t.backoff.attempts),
                    t.skipReconnect ||
                      t.open((e) => {
                        e
                          ? (l("reconnect attempt error"),
                            (t._reconnecting = !1),
                            t.reconnect(),
                            this.emitReserved("reconnect_error", e))
                          : (l("reconnect success"), t.onreconnect());
                      }));
                }, e);
                this.opts.autoUnref && r.unref(),
                  this.subs.push(function () {
                    clearTimeout(r);
                  });
              }
            }
            onreconnect() {
              const t = this.backoff.attempts;
              (this._reconnecting = !1),
                this.backoff.reset(),
                this.emitReserved("reconnect", t);
            }
          }
          e.Manager = d;
        },
        1588: (t, e) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.on = void 0),
            (e.on = function (t, e, r) {
              return (
                t.on(e, r),
                function () {
                  t.off(e, r);
                }
              );
            });
        },
        996: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.Socket = void 0);
          const o = r(9656),
            s = r(1588),
            i = r(8670),
            a = n(r(6292)).default("socket.io-client:socket"),
            c = Object.freeze({
              connect: 1,
              connect_error: 1,
              disconnect: 1,
              disconnecting: 1,
              newListener: 1,
              removeListener: 1,
            });
          class u extends i.Emitter {
            constructor(t, e, r) {
              super(),
                (this.connected = !1),
                (this.disconnected = !0),
                (this.receiveBuffer = []),
                (this.sendBuffer = []),
                (this.ids = 0),
                (this.acks = {}),
                (this.flags = {}),
                (this.io = t),
                (this.nsp = e),
                r && r.auth && (this.auth = r.auth),
                this.io._autoConnect && this.open();
            }
            subEvents() {
              if (this.subs) return;
              const t = this.io;
              this.subs = [
                s.on(t, "open", this.onopen.bind(this)),
                s.on(t, "packet", this.onpacket.bind(this)),
                s.on(t, "error", this.onerror.bind(this)),
                s.on(t, "close", this.onclose.bind(this)),
              ];
            }
            get active() {
              return !!this.subs;
            }
            connect() {
              return (
                this.connected ||
                  (this.subEvents(),
                  this.io._reconnecting || this.io.open(),
                  "open" === this.io._readyState && this.onopen()),
                this
              );
            }
            open() {
              return this.connect();
            }
            send(...t) {
              return t.unshift("message"), this.emit.apply(this, t), this;
            }
            emit(t, ...e) {
              if (c.hasOwnProperty(t))
                throw new Error('"' + t + '" is a reserved event name');
              e.unshift(t);
              const r = { type: o.PacketType.EVENT, data: e, options: {} };
              if (
                ((r.options.compress = !1 !== this.flags.compress),
                "function" == typeof e[e.length - 1])
              ) {
                const t = this.ids++;
                a("emitting packet with ack id %d", t);
                const n = e.pop();
                this._registerAckCallback(t, n), (r.id = t);
              }
              const n =
                this.io.engine &&
                this.io.engine.transport &&
                this.io.engine.transport.writable;
              return (
                !this.flags.volatile || (n && this.connected)
                  ? this.connected
                    ? this.packet(r)
                    : this.sendBuffer.push(r)
                  : a(
                      "discard packet as the transport is not currently writable"
                    ),
                (this.flags = {}),
                this
              );
            }
            _registerAckCallback(t, e) {
              const r = this.flags.timeout;
              if (void 0 === r) return void (this.acks[t] = e);
              const n = this.io.setTimeoutFn(() => {
                delete this.acks[t];
                for (let e = 0; e < this.sendBuffer.length; e++)
                  this.sendBuffer[e].id === t &&
                    (a("removing packet with ack id %d from the buffer", t),
                    this.sendBuffer.splice(e, 1));
                a("event with ack id %d has timed out after %d ms", t, r),
                  e.call(this, new Error("operation has timed out"));
              }, r);
              this.acks[t] = (...t) => {
                this.io.clearTimeoutFn(n), e.apply(this, [null, ...t]);
              };
            }
            packet(t) {
              (t.nsp = this.nsp), this.io._packet(t);
            }
            onopen() {
              a("transport is open - connecting"),
                "function" == typeof this.auth
                  ? this.auth((t) => {
                      this.packet({ type: o.PacketType.CONNECT, data: t });
                    })
                  : this.packet({
                      type: o.PacketType.CONNECT,
                      data: this.auth,
                    });
            }
            onerror(t) {
              this.connected || this.emitReserved("connect_error", t);
            }
            onclose(t) {
              a("close (%s)", t),
                (this.connected = !1),
                (this.disconnected = !0),
                delete this.id,
                this.emitReserved("disconnect", t);
            }
            onpacket(t) {
              if (t.nsp === this.nsp)
                switch (t.type) {
                  case o.PacketType.CONNECT:
                    if (t.data && t.data.sid) {
                      const e = t.data.sid;
                      this.onconnect(e);
                    } else
                      this.emitReserved(
                        "connect_error",
                        new Error(
                          "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                        )
                      );
                    break;
                  case o.PacketType.EVENT:
                  case o.PacketType.BINARY_EVENT:
                    this.onevent(t);
                    break;
                  case o.PacketType.ACK:
                  case o.PacketType.BINARY_ACK:
                    this.onack(t);
                    break;
                  case o.PacketType.DISCONNECT:
                    this.ondisconnect();
                    break;
                  case o.PacketType.CONNECT_ERROR:
                    this.destroy();
                    const e = new Error(t.data.message);
                    (e.data = t.data.data),
                      this.emitReserved("connect_error", e);
                }
            }
            onevent(t) {
              const e = t.data || [];
              a("emitting event %j", e),
                null != t.id &&
                  (a("attaching ack callback to event"),
                  e.push(this.ack(t.id))),
                this.connected
                  ? this.emitEvent(e)
                  : this.receiveBuffer.push(Object.freeze(e));
            }
            emitEvent(t) {
              if (this._anyListeners && this._anyListeners.length) {
                const e = this._anyListeners.slice();
                for (const r of e) r.apply(this, t);
              }
              super.emit.apply(this, t);
            }
            ack(t) {
              const e = this;
              let r = !1;
              return function (...n) {
                r ||
                  ((r = !0),
                  a("sending ack %j", n),
                  e.packet({ type: o.PacketType.ACK, id: t, data: n }));
              };
            }
            onack(t) {
              const e = this.acks[t.id];
              "function" == typeof e
                ? (a("calling ack %s with %j", t.id, t.data),
                  e.apply(this, t.data),
                  delete this.acks[t.id])
                : a("bad ack %s", t.id);
            }
            onconnect(t) {
              a("socket connected with id %s", t),
                (this.id = t),
                (this.connected = !0),
                (this.disconnected = !1),
                this.emitBuffered(),
                this.emitReserved("connect");
            }
            emitBuffered() {
              this.receiveBuffer.forEach((t) => this.emitEvent(t)),
                (this.receiveBuffer = []),
                this.sendBuffer.forEach((t) => this.packet(t)),
                (this.sendBuffer = []);
            }
            ondisconnect() {
              a("server disconnect (%s)", this.nsp),
                this.destroy(),
                this.onclose("io server disconnect");
            }
            destroy() {
              this.subs &&
                (this.subs.forEach((t) => t()), (this.subs = void 0)),
                this.io._destroy(this);
            }
            disconnect() {
              return (
                this.connected &&
                  (a("performing disconnect (%s)", this.nsp),
                  this.packet({ type: o.PacketType.DISCONNECT })),
                this.destroy(),
                this.connected && this.onclose("io client disconnect"),
                this
              );
            }
            close() {
              return this.disconnect();
            }
            compress(t) {
              return (this.flags.compress = t), this;
            }
            get volatile() {
              return (this.flags.volatile = !0), this;
            }
            timeout(t) {
              return (this.flags.timeout = t), this;
            }
            onAny(t) {
              return (
                (this._anyListeners = this._anyListeners || []),
                this._anyListeners.push(t),
                this
              );
            }
            prependAny(t) {
              return (
                (this._anyListeners = this._anyListeners || []),
                this._anyListeners.unshift(t),
                this
              );
            }
            offAny(t) {
              if (!this._anyListeners) return this;
              if (t) {
                const e = this._anyListeners;
                for (let r = 0; r < e.length; r++)
                  if (t === e[r]) return e.splice(r, 1), this;
              } else this._anyListeners = [];
              return this;
            }
            listenersAny() {
              return this._anyListeners || [];
            }
          }
          e.Socket = u;
        },
        3098: function (t, e, r) {
          "use strict";
          var n =
            (this && this.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t };
            };
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.url = void 0);
          const o = n(r(5649)),
            s = n(r(6292)).default("socket.io-client:url");
          e.url = function (t, e = "", r) {
            let n = t;
            (r = r || ("undefined" != typeof location && location)),
              null == t && (t = r.protocol + "//" + r.host),
              "string" == typeof t &&
                ("/" === t.charAt(0) &&
                  (t = "/" === t.charAt(1) ? r.protocol + t : r.host + t),
                /^(https?|wss?):\/\//.test(t) ||
                  (s("protocol-less url %s", t),
                  (t = void 0 !== r ? r.protocol + "//" + t : "https://" + t)),
                s("parse %s", t),
                (n = o.default(t))),
              n.port ||
                (/^(http|ws)$/.test(n.protocol)
                  ? (n.port = "80")
                  : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")),
              (n.path = n.path || "/");
            const i = -1 !== n.host.indexOf(":") ? "[" + n.host + "]" : n.host;
            return (
              (n.id = n.protocol + "://" + i + ":" + n.port + e),
              (n.href =
                n.protocol +
                "://" +
                i +
                (r && r.port === n.port ? "" : ":" + n.port)),
              n
            );
          };
        },
        1431: (t, e, r) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.reconstructPacket = e.deconstructPacket = void 0);
          const n = r(6700);
          function o(t, e) {
            if (!t) return t;
            if (n.isBinary(t)) {
              const r = { _placeholder: !0, num: e.length };
              return e.push(t), r;
            }
            if (Array.isArray(t)) {
              const r = new Array(t.length);
              for (let n = 0; n < t.length; n++) r[n] = o(t[n], e);
              return r;
            }
            if ("object" == typeof t && !(t instanceof Date)) {
              const r = {};
              for (const n in t) t.hasOwnProperty(n) && (r[n] = o(t[n], e));
              return r;
            }
            return t;
          }
          function s(t, e) {
            if (!t) return t;
            if (t && t._placeholder) return e[t.num];
            if (Array.isArray(t))
              for (let r = 0; r < t.length; r++) t[r] = s(t[r], e);
            else if ("object" == typeof t)
              for (const r in t) t.hasOwnProperty(r) && (t[r] = s(t[r], e));
            return t;
          }
          (e.deconstructPacket = function (t) {
            const e = [],
              r = t.data,
              n = t;
            return (
              (n.data = o(r, e)),
              (n.attachments = e.length),
              { packet: n, buffers: e }
            );
          }),
            (e.reconstructPacket = function (t, e) {
              return (t.data = s(t.data, e)), (t.attachments = void 0), t;
            });
        },
        9656: (t, e, r) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.Decoder = e.Encoder = e.PacketType = e.protocol = void 0);
          const n = r(8670),
            o = r(1431),
            s = r(6700),
            i = r(6292).default("socket.io-parser");
          var a;
          (e.protocol = 5),
            (function (t) {
              (t[(t.CONNECT = 0)] = "CONNECT"),
                (t[(t.DISCONNECT = 1)] = "DISCONNECT"),
                (t[(t.EVENT = 2)] = "EVENT"),
                (t[(t.ACK = 3)] = "ACK"),
                (t[(t.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
                (t[(t.BINARY_EVENT = 5)] = "BINARY_EVENT"),
                (t[(t.BINARY_ACK = 6)] = "BINARY_ACK");
            })((a = e.PacketType || (e.PacketType = {}))),
            (e.Encoder = class {
              encode(t) {
                return (
                  i("encoding packet %j", t),
                  (t.type !== a.EVENT && t.type !== a.ACK) || !s.hasBinary(t)
                    ? [this.encodeAsString(t)]
                    : ((t.type =
                        t.type === a.EVENT ? a.BINARY_EVENT : a.BINARY_ACK),
                      this.encodeAsBinary(t))
                );
              }
              encodeAsString(t) {
                let e = "" + t.type;
                return (
                  (t.type !== a.BINARY_EVENT && t.type !== a.BINARY_ACK) ||
                    (e += t.attachments + "-"),
                  t.nsp && "/" !== t.nsp && (e += t.nsp + ","),
                  null != t.id && (e += t.id),
                  null != t.data && (e += JSON.stringify(t.data)),
                  i("encoded %j as %s", t, e),
                  e
                );
              }
              encodeAsBinary(t) {
                const e = o.deconstructPacket(t),
                  r = this.encodeAsString(e.packet),
                  n = e.buffers;
                return n.unshift(r), n;
              }
            });
          class c extends n.Emitter {
            constructor() {
              super();
            }
            add(t) {
              let e;
              if ("string" == typeof t)
                (e = this.decodeString(t)),
                  e.type === a.BINARY_EVENT || e.type === a.BINARY_ACK
                    ? ((this.reconstructor = new u(e)),
                      0 === e.attachments && super.emitReserved("decoded", e))
                    : super.emitReserved("decoded", e);
              else {
                if (!s.isBinary(t) && !t.base64)
                  throw new Error("Unknown type: " + t);
                if (!this.reconstructor)
                  throw new Error(
                    "got binary data when not reconstructing a packet"
                  );
                (e = this.reconstructor.takeBinaryData(t)),
                  e &&
                    ((this.reconstructor = null),
                    super.emitReserved("decoded", e));
              }
            }
            decodeString(t) {
              let e = 0;
              const r = { type: Number(t.charAt(0)) };
              if (void 0 === a[r.type])
                throw new Error("unknown packet type " + r.type);
              if (r.type === a.BINARY_EVENT || r.type === a.BINARY_ACK) {
                const n = e + 1;
                for (; "-" !== t.charAt(++e) && e != t.length; );
                const o = t.substring(n, e);
                if (o != Number(o) || "-" !== t.charAt(e))
                  throw new Error("Illegal attachments");
                r.attachments = Number(o);
              }
              if ("/" === t.charAt(e + 1)) {
                const n = e + 1;
                for (; ++e && "," !== t.charAt(e) && e !== t.length; );
                r.nsp = t.substring(n, e);
              } else r.nsp = "/";
              const n = t.charAt(e + 1);
              if ("" !== n && Number(n) == n) {
                const n = e + 1;
                for (; ++e; ) {
                  const r = t.charAt(e);
                  if (null == r || Number(r) != r) {
                    --e;
                    break;
                  }
                  if (e === t.length) break;
                }
                r.id = Number(t.substring(n, e + 1));
              }
              if (t.charAt(++e)) {
                const n = (function (t) {
                  try {
                    return JSON.parse(t);
                  } catch (t) {
                    return !1;
                  }
                })(t.substr(e));
                if (!c.isPayloadValid(r.type, n))
                  throw new Error("invalid payload");
                r.data = n;
              }
              return i("decoded %s as %j", t, r), r;
            }
            static isPayloadValid(t, e) {
              switch (t) {
                case a.CONNECT:
                  return "object" == typeof e;
                case a.DISCONNECT:
                  return void 0 === e;
                case a.CONNECT_ERROR:
                  return "string" == typeof e || "object" == typeof e;
                case a.EVENT:
                case a.BINARY_EVENT:
                  return Array.isArray(e) && e.length > 0;
                case a.ACK:
                case a.BINARY_ACK:
                  return Array.isArray(e);
              }
            }
            destroy() {
              this.reconstructor && this.reconstructor.finishedReconstruction();
            }
          }
          e.Decoder = c;
          class u {
            constructor(t) {
              (this.packet = t), (this.buffers = []), (this.reconPack = t);
            }
            takeBinaryData(t) {
              if (
                (this.buffers.push(t),
                this.buffers.length === this.reconPack.attachments)
              ) {
                const t = o.reconstructPacket(this.reconPack, this.buffers);
                return this.finishedReconstruction(), t;
              }
              return null;
            }
            finishedReconstruction() {
              (this.reconPack = null), (this.buffers = []);
            }
          }
        },
        6700: (t, e) => {
          "use strict";
          Object.defineProperty(e, "__esModule", { value: !0 }),
            (e.hasBinary = e.isBinary = void 0);
          const r = "function" == typeof ArrayBuffer,
            n = Object.prototype.toString,
            o =
              "function" == typeof Blob ||
              ("undefined" != typeof Blob &&
                "[object BlobConstructor]" === n.call(Blob)),
            s =
              "function" == typeof File ||
              ("undefined" != typeof File &&
                "[object FileConstructor]" === n.call(File));
          function i(t) {
            return (
              (r &&
                (t instanceof ArrayBuffer ||
                  ((t) =>
                    "function" == typeof ArrayBuffer.isView
                      ? ArrayBuffer.isView(t)
                      : t.buffer instanceof ArrayBuffer)(t))) ||
              (o && t instanceof Blob) ||
              (s && t instanceof File)
            );
          }
          (e.isBinary = i),
            (e.hasBinary = function t(e, r) {
              if (!e || "object" != typeof e) return !1;
              if (Array.isArray(e)) {
                for (let r = 0, n = e.length; r < n; r++)
                  if (t(e[r])) return !0;
                return !1;
              }
              if (i(e)) return !0;
              if (
                e.toJSON &&
                "function" == typeof e.toJSON &&
                1 === arguments.length
              )
                return t(e.toJSON(), !0);
              for (const r in e)
                if (Object.prototype.hasOwnProperty.call(e, r) && t(e[r]))
                  return !0;
              return !1;
            });
        },
      },
      e = {};
    function r(n) {
      var o = e[n];
      if (void 0 !== o) return o.exports;
      var s = (e[n] = { exports: {} });
      return t[n].call(s.exports, s, s.exports, r), s.exports;
    }
    return (
      (r.d = (t, e) => {
        for (var n in e)
          r.o(e, n) &&
            !r.o(t, n) &&
            Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
      }),
      (r.g = (function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (t) {
          if ("object" == typeof window) return window;
        }
      })()),
      (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (r.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      r(6401),
      r(1114)
    );
  })();
});
