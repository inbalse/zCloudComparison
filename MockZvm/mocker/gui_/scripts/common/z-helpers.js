'use strict';

_.alphanumSort = function (array, caseInsensitive) {
    for (var z = 0, t; t = array[z]; z++) {
        array[z] = new Array();
        var x = 0, y = -1, n = 0, i, j;

        while (i = (j = t.charAt(x++)).charCodeAt(0)) {
            var m = (i == 46 || (i >= 48 && i <= 57));
            if (m !== n) {
                array[z][++y] = "";
                n = m;
            }
            array[z][y] += j;
        }
    }

    array.sort(function (a, b) {
        for (var x = 0, aa, bb; (aa = a[x]) && (bb = b[x]); x++) {
            if (caseInsensitive) {
                aa = aa.toLowerCase();
                bb = bb.toLowerCase();
            }
            if (aa !== bb) {
                var c = Number(aa), d = Number(bb);
                if (c == aa && d == bb) {
                    return c - d;
                } else return (aa > bb) ? 1 : -1;
            }
        }
        return a.length - b.length;
    });

    for (var z = 0; z < array.length; z++)
        array[z] = array[z].join("");
};

_.alphanumSortObjects = function (array, key, caseInsensitive) {
    var toSortArray = _.pluck(array, key), result = [], found;
    _.alphanumSort(toSortArray, caseInsensitive);

    _.forEach(toSortArray, function (value) {
        found = _.find(array, function (item) {
            return _.isEqual(item[key], value);
        });

        result.push(found);
    });

    return result;
};

//lodash plugin that returns intersection for objects
//accepts an arrays as parameters and returns an array
//that contains objects that present in both given arrays
_.intersectionObjects = function (array) {
    var slice = Array.prototype.slice;
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function (item) {
        return _.every(rest, function (other) {
            return _.any(other, function (element) {
                return _.isEqual(element, item);
            });
        });
    });
};

_.htmlInputNumber = function (charCode) {
    return charCode === 46 || (charCode >= 48 && charCode <= 57);
};

_.getAlertsTip = function (alertTips) {
    var result = _.pluck(alertTips.Alerts, 'Description');
    result = result.join('\n');
    if (alertTips.HasMore) {
        result += '\nAdditional Alerts exist, see the Alerts tab.';
    }
    return result;
};

_.isNullOrUndefined = function (value) {
    return value === null || _.isUndefined(value);
};

_.deg2rad = function (degrees) {
    return degrees * Math.PI / 180;
};

_.isHtml = function (string) {
    var htmlRegex = /<?\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>/;
    return htmlRegex.test(string);
};

_.wrapContentWithHtmlTag = function (content, tag) {
    var wrapper = _.template('<' + tag + '><%=content%>' + '</' + tag + '>');

    return wrapper({
        content: content
    });
};

_.removeHtmlTagsFromString = function (string) {
    var regex = /<[^<]*>/;
    return string.split(regex).join("");
};

_.combineVmIdentifier = function (vmId, vpgId) {
    return vmId + vpgId;
};

_.replaceSingleQuotesToDouble = function (string) {
    return string.replace(/'/g, '"'); // jshint ignore:line
};

_.replaceDoubleQuotesToSingle = function (string) {
    return string.replace(/"/g, "'"); // jshint ignore:line
};


(function () {
    window.visibly = {
        b: null,
        q: document,
        p: undefined,
        prefixes: ['webkit', 'ms', 'moz'],
        props: ['VisibilityState', 'visibilitychange', 'Hidden'],
        m: ['focus', 'blur'],
        visibleCallbacks: [],
        hiddenCallbacks: [],
        _callbacks: [],

        onVisible: function (_callback) {
            this.visibleCallbacks.push(_callback);
        },
        onHidden: function (_callback) {
            this.hiddenCallbacks.push(_callback);
        },
        isSupported: function () {
            var i = this.prefixes.length;
            while (i--) {
                if (this._supports(i)) {
                    this.b = this.prefixes[i];
                    return this.b;
                }
            }
        },
        _supports: function (index) {
            return ((this.prefixes[index] + this.props[2]) in this.q);
        },
        runCallbacks: function (index) {
            if (index) {
                this._callbacks = (index === 1) ? this.visibleCallbacks : this.hiddenCallbacks;
                for (var i = 0; i < this._callbacks.length; i++) {
                    this._callbacks[i]();
                }
            }
        },
        _visible: function () {
            window.visibly.runCallbacks(1);
        },
        _hidden: function () {
            window.visibly.runCallbacks(2);
        },
        _nativeSwitch: function () {
            if (this.q[this.b + this.props[2]] === true) {
                this._hidden();
            } else {
                this._visible();
            }
        },
        listen: function () {

            try { /*if no native page visibility support found..*/
                if (!(this.isSupported())) {
                    if (document.addEventListener) { /*for browsers without focusin/out support eg. firefox, opera use focus/blur*/
                        /*window used instead of doc as Opera complains otherwise*/
                        window.addEventListener(this.m[0], this._visible, 1);
                        window.addEventListener(this.m[1], this._hidden, 1);
                    } else { /*IE <10s most reliable focus events are onfocusin/onfocusout*/
                        this.q.attachEvent('onfocusin', this._visible);
                        this.q.attachEvent('onfocusout', this._hidden);
                    }
                } else { /*switch support based on prefix*/
                    this.q.addEventListener(this.b + this.props[1], function () {
                        window.visibly._nativeSwitch.apply(window.visibly, arguments);
                    }, 1);
                }
            } catch (e) {
            }
        },
        init: function () {
            this.listen();
        }
    };


    window.visibly.init();

    window.visibly.onVisible(function () {
        $(window).trigger('zerto::focus');
    });

    window.visibly.onHidden(function () {
        $(window).trigger('zerto::blur');
    });


})();


