!function(e){function n(r){if(t[r])return t[r].exports;var s=t[r]={exports:{},id:r,loaded:!1};return e[r].call(s.exports,s,s.exports,n),s.loaded=!0,s.exports}var t={};return n.m=e,n.c=t,n.p="/assets/",n(0)}([function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar BarChart = __webpack_require__(3);\n\n__webpack_require__(6);\n\nvar barChart2 = new BarChart({ "mount": "#dwh-bar-1",\n  "textBefore": { "en": "",\n    "de": "" },\n  "textAfter": { "en": "",\n    "de": "" },\n  "texts": { "en": ["Gemeinhin würde man annehmen, dass Menschen sich ihren Todestag nicht aussuchen. Wahrscheinlich ist das auch nicht der Fall. Werden jedoch alle Todesfälle Österreichs seit 1970 betrachtet, so zeigt sich ein anderes Bild. Nimmt man den Montag als Referenztag (100%), so sterben mit nahendem Wochenende weniger Menschen. Bis Freitag, der einen Peak darstellt. Mit Abstand am wenigsten Menschen starben an einem Sonntag.", "Zugegeben, die Unterschiede zwischen den Wochentagen waren mit maximal 2,5% (Montag - Sonntag) eher klein. Viel deutlicher fallen sie jedoch übers Jahr betrachtet aus. Im Vergleich zum Jänner (100%) sterben gegen Sommer hin weniger Menschen. Im August und September sogar um fast 20% weniger! Mit nahendem Winter steigt die Sterberate wieder. (Sterberaten sind auf unterschiedliche Monatslängen bereiningt.)"],\n    "de": ["Gemeinhin würde man annehmen, dass Menschen sich ihren Todestag nicht aussuchen. Wahrscheinlich ist das auch nicht der Fall. Werden jedoch alle Todesfälle Österreichs seit 1970 betrachtet, so zeigt sich ein anderes Bild. Nimmt man den Montag als Referenztag (100%), so sterben mit nahendem Wochenende weniger Menschen. Bis Freitag, der einen Peak darstellt. Mit Abstand am wenigsten Menschen starben an einem Sonntag.", "Zugegeben, die Unterschiede zwischen den Wochentagen waren mit maximal 2,5% (Montag - Sonntag) eher klein. Viel deutlicher fallen sie jedoch übers Jahr betrachtet aus. Im Vergleich zum Jänner (100%) sterben gegen Sommer hin weniger Menschen. Im August und September sogar um fast 20% weniger! Mit nahendem Winter steigt die Sterberate wieder. (Sterberaten sind auf unterschiedliche Monatslängen bereiningt.)"] },\n  "csvname": "../assets/_ext/56/sterbezeit.csv",\n  "priorities": ["p1", "p2"],\n  "values": ["v1", "v1"],\n  "legendText2": { "en": "", "de": "" },\n  "legendText": { "en": "Prozent", "de": "Prozent" },\n  "sortValues": false,\n  "yScaleAuto": true,\n  "yScaleMan": [[95, 100], [80, 100]],\n  "sources": [{ "link": "http://www.statistik.at/web_de/services/statcube/index.html", "text": "Statistik Austria" }]\n});\n\nvar barChart3 = new BarChart({ "mount": "#dwh-bar-2",\n  "textBefore": { "en": "",\n    "de": "" },\n  "textAfter": { "en": "",\n    "de": "" },\n  "texts": { "en": ["Einäscherungen nehmen in der Beliebtheit konstant zu. 2014 wurden in Österreich 40% aller Gestorbenen eingeäschert.", "Im EU-Vergleich liegen wir damit im Mittelfeld. Wobei die Unterschiede in Europa recht drastisch ausfallen. So liegen zwischen der Schweiz und Irland 72 Prozentpunkte.", "Weltweit unangefochten beim Anteil an Einäscherungen sind Länder mit hoher Bevölkerungsdichte. Spitzenreiter ist Japan, wo praktisch alle Gestorbenen eingeäschert werden."],\n    "de": ["Einäscherungen nehmen in der Beliebtheit konstant zu. 2014 wurden in Österreich 40% aller Gestorbenen eingeäschert.", "Im EU-Vergleich liegen wir damit im Mittelfeld. Wobei die Unterschiede in Europa recht drastisch ausfallen. So liegen zwischen der Schweiz und Irland 72 Prozentpunkte.", "Weltweit unangefochten beim Anteil an Einäscherungen sind Länder mit hoher Bevölkerungsdichte. Spitzenreiter ist Japan, wo praktisch alle Gestorbenen eingeäschert werden."] },\n  "csvname": "../assets/_ext/56/einaescherung_vergleich.csv",\n  "priorities": ["p1", "p2", "p3"],\n  "values": ["v1", "v1", "v1"],\n  "legendText2": { "en": "", "de": "" },\n  "legendText": { "en": "Prozent", "de": "Prozent" },\n  "sortValues": false,\n  "yScaleAuto": false,\n  "yScaleMan": [[0, 0], [0, 0], [0, 0]],\n  "sources": [{ "link": "http://www.effs.eu/cms/fileadmin/members_only/documents/news_articles/Cremation_statistics_2014.pdf", "text": "European Federation of Funeral Services" }]\n});\n\n//////////////////\n// WEBPACK FOOTER\n// ./index.js\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///./index.js?')},function(module,exports){eval('/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\n// css base code, injected by the css-loader\r\nmodule.exports = function() {\r\n\tvar list = [];\r\n\r\n\t// return the list of modules as css string\r\n\tlist.toString = function toString() {\r\n\t\tvar result = [];\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar item = this[i];\r\n\t\t\tif(item[2]) {\r\n\t\t\t\tresult.push("@media " + item[2] + "{" + item[1] + "}");\r\n\t\t\t} else {\r\n\t\t\t\tresult.push(item[1]);\r\n\t\t\t}\r\n\t\t}\r\n\t\treturn result.join("");\r\n\t};\r\n\r\n\t// import a list of modules into the list\r\n\tlist.i = function(modules, mediaQuery) {\r\n\t\tif(typeof modules === "string")\r\n\t\t\tmodules = [[null, modules, ""]];\r\n\t\tvar alreadyImportedModules = {};\r\n\t\tfor(var i = 0; i < this.length; i++) {\r\n\t\t\tvar id = this[i][0];\r\n\t\t\tif(typeof id === "number")\r\n\t\t\t\talreadyImportedModules[id] = true;\r\n\t\t}\r\n\t\tfor(i = 0; i < modules.length; i++) {\r\n\t\t\tvar item = modules[i];\r\n\t\t\t// skip already imported module\r\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\r\n\t\t\t//  when a module is imported multiple times with different media queries.\r\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\r\n\t\t\tif(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {\r\n\t\t\t\tif(mediaQuery && !item[2]) {\r\n\t\t\t\t\titem[2] = mediaQuery;\r\n\t\t\t\t} else if(mediaQuery) {\r\n\t\t\t\t\titem[2] = "(" + item[2] + ") and (" + mediaQuery + ")";\r\n\t\t\t\t}\r\n\t\t\t\tlist.push(item);\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\treturn list;\r\n};\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/css-loader/lib/css-base.js\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./~/css-loader/lib/css-base.js?')},function(module,exports,__webpack_require__){eval('/*\r\n\tMIT License http://www.opensource.org/licenses/mit-license.php\r\n\tAuthor Tobias Koppers @sokra\r\n*/\r\nvar stylesInDom = {},\r\n\tmemoize = function(fn) {\r\n\t\tvar memo;\r\n\t\treturn function () {\r\n\t\t\tif (typeof memo === "undefined") memo = fn.apply(this, arguments);\r\n\t\t\treturn memo;\r\n\t\t};\r\n\t},\r\n\tisOldIE = memoize(function() {\r\n\t\treturn /msie [6-9]\\b/.test(window.navigator.userAgent.toLowerCase());\r\n\t}),\r\n\tgetHeadElement = memoize(function () {\r\n\t\treturn document.head || document.getElementsByTagName("head")[0];\r\n\t}),\r\n\tsingletonElement = null,\r\n\tsingletonCounter = 0,\r\n\tstyleElementsInsertedAtTop = [];\r\n\r\nmodule.exports = function(list, options) {\r\n\tif(false) {\r\n\t\tif(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");\r\n\t}\r\n\r\n\toptions = options || {};\r\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\r\n\t// tags it will allow on a page\r\n\tif (typeof options.singleton === "undefined") options.singleton = isOldIE();\r\n\r\n\t// By default, add <style> tags to the bottom of <head>.\r\n\tif (typeof options.insertAt === "undefined") options.insertAt = "bottom";\r\n\r\n\tvar styles = listToStyles(list);\r\n\taddStylesToDom(styles, options);\r\n\r\n\treturn function update(newList) {\r\n\t\tvar mayRemove = [];\r\n\t\tfor(var i = 0; i < styles.length; i++) {\r\n\t\t\tvar item = styles[i];\r\n\t\t\tvar domStyle = stylesInDom[item.id];\r\n\t\t\tdomStyle.refs--;\r\n\t\t\tmayRemove.push(domStyle);\r\n\t\t}\r\n\t\tif(newList) {\r\n\t\t\tvar newStyles = listToStyles(newList);\r\n\t\t\taddStylesToDom(newStyles, options);\r\n\t\t}\r\n\t\tfor(var i = 0; i < mayRemove.length; i++) {\r\n\t\t\tvar domStyle = mayRemove[i];\r\n\t\t\tif(domStyle.refs === 0) {\r\n\t\t\t\tfor(var j = 0; j < domStyle.parts.length; j++)\r\n\t\t\t\t\tdomStyle.parts[j]();\r\n\t\t\t\tdelete stylesInDom[domStyle.id];\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n}\r\n\r\nfunction addStylesToDom(styles, options) {\r\n\tfor(var i = 0; i < styles.length; i++) {\r\n\t\tvar item = styles[i];\r\n\t\tvar domStyle = stylesInDom[item.id];\r\n\t\tif(domStyle) {\r\n\t\t\tdomStyle.refs++;\r\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\r\n\t\t\t}\r\n\t\t\tfor(; j < item.parts.length; j++) {\r\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tvar parts = [];\r\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\r\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\r\n\t\t\t}\r\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction listToStyles(list) {\r\n\tvar styles = [];\r\n\tvar newStyles = {};\r\n\tfor(var i = 0; i < list.length; i++) {\r\n\t\tvar item = list[i];\r\n\t\tvar id = item[0];\r\n\t\tvar css = item[1];\r\n\t\tvar media = item[2];\r\n\t\tvar sourceMap = item[3];\r\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\r\n\t\tif(!newStyles[id])\r\n\t\t\tstyles.push(newStyles[id] = {id: id, parts: [part]});\r\n\t\telse\r\n\t\t\tnewStyles[id].parts.push(part);\r\n\t}\r\n\treturn styles;\r\n}\r\n\r\nfunction insertStyleElement(options, styleElement) {\r\n\tvar head = getHeadElement();\r\n\tvar lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];\r\n\tif (options.insertAt === "top") {\r\n\t\tif(!lastStyleElementInsertedAtTop) {\r\n\t\t\thead.insertBefore(styleElement, head.firstChild);\r\n\t\t} else if(lastStyleElementInsertedAtTop.nextSibling) {\r\n\t\t\thead.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);\r\n\t\t} else {\r\n\t\t\thead.appendChild(styleElement);\r\n\t\t}\r\n\t\tstyleElementsInsertedAtTop.push(styleElement);\r\n\t} else if (options.insertAt === "bottom") {\r\n\t\thead.appendChild(styleElement);\r\n\t} else {\r\n\t\tthrow new Error("Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.");\r\n\t}\r\n}\r\n\r\nfunction removeStyleElement(styleElement) {\r\n\tstyleElement.parentNode.removeChild(styleElement);\r\n\tvar idx = styleElementsInsertedAtTop.indexOf(styleElement);\r\n\tif(idx >= 0) {\r\n\t\tstyleElementsInsertedAtTop.splice(idx, 1);\r\n\t}\r\n}\r\n\r\nfunction createStyleElement(options) {\r\n\tvar styleElement = document.createElement("style");\r\n\tstyleElement.type = "text/css";\r\n\tinsertStyleElement(options, styleElement);\r\n\treturn styleElement;\r\n}\r\n\r\nfunction createLinkElement(options) {\r\n\tvar linkElement = document.createElement("link");\r\n\tlinkElement.rel = "stylesheet";\r\n\tinsertStyleElement(options, linkElement);\r\n\treturn linkElement;\r\n}\r\n\r\nfunction addStyle(obj, options) {\r\n\tvar styleElement, update, remove;\r\n\r\n\tif (options.singleton) {\r\n\t\tvar styleIndex = singletonCounter++;\r\n\t\tstyleElement = singletonElement || (singletonElement = createStyleElement(options));\r\n\t\tupdate = applyToSingletonTag.bind(null, styleElement, styleIndex, false);\r\n\t\tremove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);\r\n\t} else if(obj.sourceMap &&\r\n\t\ttypeof URL === "function" &&\r\n\t\ttypeof URL.createObjectURL === "function" &&\r\n\t\ttypeof URL.revokeObjectURL === "function" &&\r\n\t\ttypeof Blob === "function" &&\r\n\t\ttypeof btoa === "function") {\r\n\t\tstyleElement = createLinkElement(options);\r\n\t\tupdate = updateLink.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t\tif(styleElement.href)\r\n\t\t\t\tURL.revokeObjectURL(styleElement.href);\r\n\t\t};\r\n\t} else {\r\n\t\tstyleElement = createStyleElement(options);\r\n\t\tupdate = applyToTag.bind(null, styleElement);\r\n\t\tremove = function() {\r\n\t\t\tremoveStyleElement(styleElement);\r\n\t\t};\r\n\t}\r\n\r\n\tupdate(obj);\r\n\r\n\treturn function updateStyle(newObj) {\r\n\t\tif(newObj) {\r\n\t\t\tif(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)\r\n\t\t\t\treturn;\r\n\t\t\tupdate(obj = newObj);\r\n\t\t} else {\r\n\t\t\tremove();\r\n\t\t}\r\n\t};\r\n}\r\n\r\nvar replaceText = (function () {\r\n\tvar textStore = [];\r\n\r\n\treturn function (index, replacement) {\r\n\t\ttextStore[index] = replacement;\r\n\t\treturn textStore.filter(Boolean).join(\'\\n\');\r\n\t};\r\n})();\r\n\r\nfunction applyToSingletonTag(styleElement, index, remove, obj) {\r\n\tvar css = remove ? "" : obj.css;\r\n\r\n\tif (styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = replaceText(index, css);\r\n\t} else {\r\n\t\tvar cssNode = document.createTextNode(css);\r\n\t\tvar childNodes = styleElement.childNodes;\r\n\t\tif (childNodes[index]) styleElement.removeChild(childNodes[index]);\r\n\t\tif (childNodes.length) {\r\n\t\t\tstyleElement.insertBefore(cssNode, childNodes[index]);\r\n\t\t} else {\r\n\t\t\tstyleElement.appendChild(cssNode);\r\n\t\t}\r\n\t}\r\n}\r\n\r\nfunction applyToTag(styleElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar media = obj.media;\r\n\r\n\tif(media) {\r\n\t\tstyleElement.setAttribute("media", media)\r\n\t}\r\n\r\n\tif(styleElement.styleSheet) {\r\n\t\tstyleElement.styleSheet.cssText = css;\r\n\t} else {\r\n\t\twhile(styleElement.firstChild) {\r\n\t\t\tstyleElement.removeChild(styleElement.firstChild);\r\n\t\t}\r\n\t\tstyleElement.appendChild(document.createTextNode(css));\r\n\t}\r\n}\r\n\r\nfunction updateLink(linkElement, obj) {\r\n\tvar css = obj.css;\r\n\tvar sourceMap = obj.sourceMap;\r\n\r\n\tif(sourceMap) {\r\n\t\t// http://stackoverflow.com/a/26603875\r\n\t\tcss += "\\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";\r\n\t}\r\n\r\n\tvar blob = new Blob([css], { type: "text/css" });\r\n\r\n\tvar oldSrc = linkElement.href;\r\n\r\n\tlinkElement.href = URL.createObjectURL(blob);\r\n\r\n\tif(oldSrc)\r\n\t\tURL.revokeObjectURL(oldSrc);\r\n}\r\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/style-loader/addStyles.js\n// module id = 2\n// module chunks = 0\n//# sourceURL=webpack:///./~/style-loader/addStyles.js?')},function(module,exports,__webpack_require__){eval('\'use strict\';\n\nvar $ = __webpack_require__(9);\nvar d3 = __webpack_require__(8);\n\n__webpack_require__(7);\n\nfunction BarChart(options) {\n    // variable to determine selected language\n    var en = window.location.href.indexOf("/en") > 0;\n    //var en = true;\n\n\n    var mountId = options.mount;\n\n    var sources = options.sources;\n    var sortValues = options.sortValues;\n    var csvname = options.csvname;\n\n    var values = options.values;\n    var priorities = options.priorities;\n    var norm = options.norm;\n    var yScaleAuto = options.yScaleAuto;\n    var yScaleMan = options.yScaleMan;\n    var texts = [];\n    texts.length = options.texts.en.length;\n    var legendText, legendText2;\n\n    if (en) {\n\n        for (var i = 0; i < texts.length; i++) {\n            texts[i] = options.textBefore.en + options.texts.en[i] + options.textAfter.en;\n        };\n        legendText = options.legendText.en;\n        legendText2 = options.legendText2.en;\n    } else {\n\n        for (var i = 0; i < texts.length; i++) {\n            texts[i] = options.textBefore.de + options.texts.de[i] + options.textAfter.de;\n        };\n        legendText = options.legendText.de;\n        legendText2 = options.legendText2.de;\n    }\n\n    function redraw() {\n        var graphratio = 600 / 700;\n        var $mount = $(mountId);\n\n        var mountWidth = $mount.width();\n        var mountHeight = mountWidth * graphratio;\n\n        $mount.addClass(\'balken\');\n\n        var containerDiv = d3.select(mountId).html("");\n        var buttonDiv = containerDiv.append("div").classed("buttons", true).classed("chartjs__controls", true);\n        var backwardsbutton = buttonDiv.append("a").classed("button", true).classed("buttonPrevious", true).classed("chartjs__button", true).classed("chartjs__left", true).html(\'<svg title="Zurück"><use xlink:href="#arrowLeft" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>\');\n        var graphTextDiv = buttonDiv.append("div").classed("graphtext", true).classed("chartjs__text", true);\n        var forwardsbutton = buttonDiv.append("a").classed("button", true).classed("buttonNext", true).classed("chartjs__button", true).classed("chartjs__right", true).html(\'<svg title="Weiter"><use xlink:href="#arrowRight" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg>\');\n        var graphDiv = containerDiv.append("div").classed("sample-chart", true);\n        var tooltipdiv = graphDiv.append("div").classed("tooltipdiv", true).style("opacity", 0);\n        if (sources != "") {\n            var sourceHtml = \'Quellen: \';\n            sourceHtml = sourceHtml + \'<a href="\' + sources[0].link + \'">\' + sources[0].text + \' </a>\';\n            for (var i = 1; i < sources.length; i++) {\n                sourceHtml = sourceHtml + \', <a href="\' + sources[i].link + \'">\' + sources[i].text + \'</a>\';\n            }\n            containerDiv.append("div").classed("quelle_sep", true).html(sourceHtml);\n        }\n\n        var margin = { top: 50, right: 20, bottom: 150, left: 80 };\n        var w = mountWidth - margin.left - margin.right;\n        var h = mountHeight - margin.top - margin.bottom;\n        var currentIndex = 0;\n\n        var labelDegrees = "-70";\n\n        d3.csv(csvname, function (error, data) {\n\n            data.forEach(function (d) {\n                for (var j = 0; j < priorities.length; j++) {\n                    d[priorities[j]] = +d[priorities[j]];\n                    d[values[j]] = +d[values[j]];\n                }\n            });\n\n            if (sortValues) {\n                data.sort(comparefunction);\n            }\n\n            var xPos = data.map(function (d, i, a) {\n                var k = 0;\n                for (var j = 0; j < i; j++) {\n                    k += a[j][priorities[currentIndex]];\n                }\n                return k;\n            });\n\n            var number_of_bars = data.reduce(function (a, b) {\n                if (b[priorities[currentIndex]] == 0) {\n                    return a;\n                } else {\n                    return a + 1;\n                }\n            }, 0);\n\n            forwardsbutton.on("click", function () {\n                return forwardsfunction();\n            });\n            backwardsbutton.on("click", function () {\n                return backwardsfunction();\n            });\n            forwardsbutton.classed("disabled", false);\n            backwardsbutton.classed("disabled", true);\n\n            //initialize bar chart\n            var blankRange = Math.round(d3.max(data.map(function (d) {\n                return d[priorities[currentIndex]];\n            })) / 4);\n            if (number_of_bars == 1) {\n                blankRange = blankRange * 2;\n            }\n\n            var domainSize = xPos[xPos.length - 1] + data[data.length - 1][priorities[currentIndex]] + 2 * blankRange;\n\n            var xScale = d3.scale.ordinal().domain(d3.range(domainSize)).rangeRoundBands([0, w]);\n            var yScale = d3.scale.linear();\n            var yMax, yMin;\n\n            if (yScaleMan[currentIndex][1]) {\n                yMin = yScaleMan[currentIndex][0];\n                yMax = yScaleMan[currentIndex][1];\n            } else {\n                yMax = d3.max(data.map(function (d) {\n                    if (d[priorities[currentIndex]] == 0) {\n                        return 0;\n                    } else {\n                        return d[values[currentIndex]];\n                    }\n                }));\n\n                yMin = d3.min(data.map(function (d) {\n                    if (d[priorities[currentIndex]] == 0) {\n                        return yMax;\n                    } else {\n                        return d[values[currentIndex]];\n                    }\n                }));\n            }\n\n            if (yScaleAuto) {\n                yScale.domain([yMin, yMax]).range([h, 0]);\n            } else {\n                yScale.domain([0, yMax]).range([h, 0]);\n            }\n            var yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(function (d) {\n                var numFormat = d3.format(",");\n                return numFormat(d).replace(/,/g, ".");\n            });\n\n            //Create SVG element\n            var svg = graphDiv.append("svg").attr("width", w + margin.left + margin.right).attr("height", h + margin.top + margin.bottom);\n\n            svg.append("text").html(legendText2).attr("transform", "translate(" + margin.left + "," + margin.top / 3 + ")").classed("yAxTitle", true);\n            svg.append("text").html(legendText).attr("transform", "translate(" + margin.left + "," + 2 * margin.top / 3 + ")").classed("yAxTitle", true);\n\n            var yAx = svg.append("g").attr("class", "y axis").call(yAxis).attr("transform", "translate(" + margin.left + "," + margin.top + ")");\n            yAx.classed("yAx", true);\n\n            //Create bars\n            svg.selectAll("rect").data(data).enter().append("rect").attr("x", function (d, i) {\n                return xScale(xPos[i] + blankRange);\n            }).attr("y", function (d) {\n                //if (d[priorities[currentIndex]] == 0) {\n                //    return h;\n                //} else {\n                return yScale(d[values[currentIndex]]);\n                //}\n            }).attr("width", function (d) {\n                return (d[priorities[currentIndex]] - 0.05) * xScale.rangeBand();\n            }).attr("height", function (d) {\n                //if (d[priorities[currentIndex]] == 0) {\n                //    return 0;\n                //} else {\n                return h - yScale(d[values[currentIndex]]);\n                //}\n            }).attr("class", function (d, i) {\n                if (d[priorities[currentIndex]] == 1) {\n                    return "rectThin";\n                } else {\n                    return "rect" + d[\'colCode\'];\n                }\n            }).attr("transform", "translate(" + margin.left + "," + margin.top + ")").on("mousemove", function (d) {\n                tooltipdiv.style("opacity", 1).style("left", d3.event.layerX - 10 + "px").style("top", d3.event.layerY - 20 + "px").html(d[values[currentIndex]] + " " + legendText2 + " " + legendText);\n            }).on("mouseout", function (d) {\n                tooltipdiv.style("opacity", 0);\n            });\n\n            var reverseTransform = data.map(function (d, i) {\n                return "rotate(60 " + (xScale(xPos[i] + blankRange) + d[priorities[currentIndex]] * xScale.rangeBand() / 2) + " " + (h + margin.bottom / 2) + ")";\n            });\n\n            //Create labels\n            svg.selectAll("label").data(data).enter().append("text").attr("class", "label").text(function (d, i) {\n                if (d[priorities[currentIndex]] > 1) {\n                    return d.key; // + " Platz " + parseFloat(i+1);\n                } else {\n                    return "";\n                }\n            }).attr("text-anchor", "end").attr("x", function (d, i) {\n                return xScale(xPos[i] + blankRange) + d[priorities[currentIndex]] * xScale.rangeBand() / 2;\n            }).attr("y", function (d) {\n                return h;\n            }).attr("dx", "-.8em").attr("dy", ".15em").attr("transform", function (d, i) {\n                return "translate(" + margin.left + "," + margin.top + ") rotate(-70 " + (xScale(xPos[i] + blankRange) + d[priorities[currentIndex]] * xScale.rangeBand() / 2) + " " + h + ")";\n            });\n\n            graphTextDiv.html(texts[currentIndex]);\n\n            function updateChart(nextv, nextp, nextt) {\n\n                graphTextDiv.html(nextt);\n\n                if (sortValues) {\n                    data.sort(comparefunction);\n                    svg.selectAll("rect").sort(comparefunction);\n                    svg.selectAll(".label").sort(comparefunction);\n                }\n                xPos = data.map(function (d, i, a) {\n                    var k = 0;\n                    for (var j = 0; j < i; j++) {\n                        k += a[j][nextp];\n                    }\n                    return k;\n                });\n\n                number_of_bars = data.reduce(function (a, b) {\n                    if (b[priorities[currentIndex]] == 0) {\n                        return a;\n                    } else {\n                        return a + 1;\n                    }\n                }, 0);\n                blankRange = Math.round(d3.max(data.map(function (d) {\n                    return d[priorities[currentIndex]];\n                })) / 4);\n                if (number_of_bars == 1) {\n                    blankRange = blankRange * 2;\n                }\n\n                domainSize = xPos[xPos.length - 1] + data[data.length - 1][nextp] + 2 * blankRange;\n\n                //Translate on x-Axis\n                xScale = d3.scale.ordinal().domain(d3.range(domainSize)).rangeRoundBands([0, w]);\n\n                var t0 = svg.transition().duration(1000);\n                t0.selectAll("rect").attr("x", function (d, i) {\n                    return xScale(xPos[i] + blankRange);\n                }).attr("width", function (d) {\n                    return (d[nextp] - 0.05) * xScale.rangeBand();\n                }).attr("class", function (d, i) {\n                    if (d[nextp] == 1) {\n                        return "rectThin";\n                    } else {\n                        return "rect" + d[\'colCode\'];\n                    }\n                });\n\n                t0.selectAll(".label").attr("transform", null).attr("x", function (d, i) {\n                    return xScale(xPos[i] + blankRange) + d[nextp] * xScale.rangeBand() / 2;\n                }).attr("transform", function (d, i) {\n                    return "translate(" + margin.left + "," + margin.top + ") rotate(-70 " + (xScale(xPos[i] + blankRange) + d[priorities[currentIndex]] * xScale.rangeBand() / 2) + " " + h + ")";\n                });\n\n                //make new bars\n                //var t1 = t0.transition().duration(2000);\n                //Initiate a transition on all elements in the update selection (all rects)\n                //t1.selectAll("rect")\n                //    .attr("y", function (d) {\n                //        if (d[nextp] == 0) {\n                //            return h;\n                //        } else {\n                //            return yScale(d[nextv]);\n                //        }\n                //    })\n                //    .attr("height", function (d) {\n                //        if (d[nextp] == 0) {\n                //            return 0;\n                //        } else {\n                //            return h - yScale(d[nextv]);\n                //        }\n                //    });\n                //t1.selectAll(".label")\n                //.text(function (d,i) {\n                //    if (d[nextp] > 1) {\n                //        return d.key; //+ " Platz " + i;\n                //    } else {\n                //        return "";\n                //    }\n                //})\n                //scale to new axis\n                yScale = d3.scale.linear();\n                if (yScaleMan[currentIndex][1]) {\n                    yMin = yScaleMan[currentIndex][0];\n                    yMax = yScaleMan[currentIndex][1];\n                } else {\n                    yMax = d3.max(data.map(function (d) {\n                        if (d[nextp] == 0) {\n                            return 0;\n                        } else {\n                            return d[nextv];\n                        }\n                    }));\n\n                    yMin = d3.min(data.map(function (d) {\n                        if (d[nextp] == 0) {\n                            return yMax;\n                        } else {\n                            return d[nextv];\n                        }\n                    }));\n                }\n\n                if (yScaleAuto) {\n                    yScale.domain([yMin, yMax]).range([h, 0]);\n                } else {\n                    yScale.domain([0, yMax]).range([h, 0]);\n                }\n\n                yAxis.scale(yScale);\n                var t2 = t0.transition().duration(2000);\n                t2.selectAll("rect").attr("y", function (d) {\n                    //if (d[nextp] == 0) {\n                    //    return h;\n                    //} else {\n                    return yScale(d[nextv]);\n                    //}\n                }).attr("height", function (d) {\n                    //if (d[nextp] == 0) {\n                    //    return 0;\n                    //} else {\n                    return h - yScale(d[nextv]);\n                    //}\n                });\n                t2.selectAll(".label").text(function (d, i) {\n                    if (d[nextp] > 1) {\n                        return d.key; //+ " Platz " + i;\n                    } else {\n                        return "";\n                    }\n                });\n                t2.select("g.y").call(yAxis);\n                //Exit…\n                //bars.exit()\t\t\t\t//References the exit selection (a subset of the update selection)\n                //\t.transition()\t\t//Initiates a transition on the one element we\'re deleting\n                //\t.duration(2000)\n                //\t.attr("x", w)\t\t//Move past the right edge of the SVG\n                //\t.remove();   \t\t//Deletes this element from the DOM once transition is complete\n            }\n\n            function forwardsfunction() {\n                if (forwardsbutton.classed("disabled")) {\n                    return;\n                }\n                currentIndex++;\n                updateChart(values[currentIndex], priorities[currentIndex], texts[currentIndex]);\n                if (currentIndex == priorities.length - 1) {\n                    forwardsbutton.classed("disabled", true);\n                }\n                backwardsbutton.classed("disabled", false);\n            };\n\n            function backwardsfunction() {\n                if (backwardsbutton.classed("disabled")) {\n                    return;\n                }\n                currentIndex--;\n                updateChart(values[currentIndex], priorities[currentIndex], texts[currentIndex]);\n                if (currentIndex == 0) {\n                    backwardsbutton.classed("disabled", true);\n                }\n                forwardsbutton.classed("disabled", false);\n            };\n\n            function comparefunction(data1, data2) {\n                return data2[values[currentIndex]] - data1[values[currentIndex]];\n            }\n        });\n    }\n\n    $(document).ready(redraw);\n    $(window).resize(redraw);\n}\n\nmodule.exports = BarChart;\n\n//////////////////\n// WEBPACK FOOTER\n// ./BarChart.js\n// module id = 3\n// module chunks = 0\n//# sourceURL=webpack:///./BarChart.js?')},function(module,exports,__webpack_require__){eval('exports = module.exports = __webpack_require__(1)();\n// imports\n\n\n// module\nexports.push([module.id, ".quelle_sep,.quelle_sep a{color:#c1c1c1}", ""]);\n\n// exports\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/css-loader!./~/less-loader!./main.less\n// module id = 4\n// module chunks = 0\n//# sourceURL=webpack:///./main.less?./~/css-loader!./~/less-loader')},function(module,exports,__webpack_require__){eval('exports = module.exports = __webpack_require__(1)();\n// imports\n\n\n// module\nexports.push([module.id, ".balken .dropDown{float:right;width:25%}.balken .rectThin{fill:grey}.balken .rectBig{fill:#4d5dd0}.balken .rect1{fill:#384e4b;opacity:.6}.balken .rect2{fill:#384e4b;opacity:1}.balken .group0{fill:#82b4ac}.balken .group1{fill:#384e4b}.balken .label{font-size:12px}.balken .label,.balken .yAx,.balken .yAxTitle{fill:#044260;font-family:sans-serif}.balken .yAxTitle{text-anchor:middle}.balken .yAx line,.balken .yAx path{fill:none;stroke:#000;shape-rendering:crispEdges}.balken .tooltipdiv{margin-bottom:10px;margin-left:30px;position:absolute;pointer-events:none;font-family:sans-serif;border-radius:5px;background:#b7fff3;padding:5px}", ""]);\n\n// exports\n\n\n//////////////////\n// WEBPACK FOOTER\n// ./~/css-loader!./~/less-loader!./styles_balken.less\n// module id = 5\n// module chunks = 0\n//# sourceURL=webpack:///./styles_balken.less?./~/css-loader!./~/less-loader');
},function(module,exports,__webpack_require__){eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(4);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(2)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(false) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(\"!!./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./main.less\", function() {\n\t\t\tvar newContent = require(\"!!./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./main.less\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./main.less\n// module id = 6\n// module chunks = 0\n//# sourceURL=webpack:///./main.less?")},function(module,exports,__webpack_require__){eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(5);\nif(typeof content === 'string') content = [[module.id, content, '']];\n// add the styles to the DOM\nvar update = __webpack_require__(2)(content, {});\nif(content.locals) module.exports = content.locals;\n// Hot Module Replacement\nif(false) {\n\t// When the styles change, update the <style> tags\n\tif(!content.locals) {\n\t\tmodule.hot.accept(\"!!./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./styles_balken.less\", function() {\n\t\t\tvar newContent = require(\"!!./node_modules/css-loader/index.js!./node_modules/less-loader/index.js!./styles_balken.less\");\n\t\t\tif(typeof newContent === 'string') newContent = [[module.id, newContent, '']];\n\t\t\tupdate(newContent);\n\t\t});\n\t}\n\t// When the module is disposed, remove the <style> tags\n\tmodule.hot.dispose(function() { update(); });\n}\n\n//////////////////\n// WEBPACK FOOTER\n// ./styles_balken.less\n// module id = 7\n// module chunks = 0\n//# sourceURL=webpack:///./styles_balken.less?")},function(module,exports){eval('module.exports = d3;\n\n//////////////////\n// WEBPACK FOOTER\n// external "d3"\n// module id = 8\n// module chunks = 0\n//# sourceURL=webpack:///external_%22d3%22?')},function(module,exports){eval('module.exports = jQuery;\n\n//////////////////\n// WEBPACK FOOTER\n// external "jQuery"\n// module id = 9\n// module chunks = 0\n//# sourceURL=webpack:///external_%22jQuery%22?')}]);