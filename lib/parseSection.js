"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var to_markdown_1 = __importDefault(require("to-markdown"));
var parseLink_1 = __importDefault(require("./parseLink"));
var parseHTML_1 = __importDefault(require("./parseHTML"));
var mdConverters = __importStar(require("./mdConverters"));
var isInternalUri = function (uri) {
    return uri.indexOf('http://') === -1 && uri.indexOf('https://') === -1;
};
var Section = /** @class */ (function () {
    function Section(_a) {
        var id = _a.id, htmlString = _a.htmlString, resourceResolver = _a.resourceResolver, idResolver = _a.idResolver, expand = _a.expand;
        this.id = id;
        this.htmlString = htmlString;
        this._resourceResolver = resourceResolver;
        this._idResolver = idResolver;
        if (expand) {
            this.htmlObjects = this.toHtmlObjects();
        }
    }
    Section.prototype.toMarkdown = function () {
        return to_markdown_1.default(this.htmlString, {
            converters: [
                mdConverters.h,
                mdConverters.span,
                mdConverters.div,
                mdConverters.img,
                mdConverters.a,
            ],
        });
    };
    Section.prototype.toHtmlObjects = function () {
        var _this = this;
        return parseHTML_1.default(this.htmlString, {
            resolveHref: function (href) {
                if (isInternalUri(href)) {
                    var hash = parseLink_1.default(href).hash;
                    // todo: what if a link only contains hash part?
                    var sectionId = _this._idResolver(href);
                    if (hash) {
                        return "#" + sectionId + "," + hash;
                    }
                    return "#" + sectionId;
                }
                return href;
            },
            resolveSrc: function (src) {
                if (isInternalUri(src)) {
                    // todo: may have bugs
                    try {
                        var absolutePath = path_1.default.resolve('/', src).substr(1);
                        var buffer = _this._resourceResolver(absolutePath).asNodeBuffer();
                        var base64 = buffer.toString('base64');
                        return "data:image/png;base64," + base64;
                    }
                    catch (error) {
                        console.log('resolveSrc#error', error.message);
                        return;
                    }
                }
                return src;
            },
        });
    };
    return Section;
}());
exports.Section = Section;
var parseSection = function (config) {
    return new Section(config);
};
exports.default = parseSection;
//# sourceMappingURL=parseSection.js.map