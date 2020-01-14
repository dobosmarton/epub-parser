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
var parseEpub_1 = __importDefault(require("./parseEpub"));
var lodash_1 = __importDefault(require("lodash"));
var path = __importStar(require("path"));
var baseDir = process.cwd();
var filesToBeTested = ['file-1', 'file-2', 'file-3', 'file-4', 'file-1-no-toc'];
var testFile = function (filename) {
    describe("parser \u6D4B\u8BD5 " + filename + ".epub", function () {
        var fileContent = parseEpub_1.default(path.join(baseDir, "fixtures/" + filename + ".epub"), {
            type: 'path',
            expand: true
        }).catch(function (error) {
            console.log(error);
        });
        test('Result should have keys', function (done) {
            fileContent.then(function (result) {
                var keys = lodash_1.default.keys(result);
                expect(keys.length).not.toBe(0);
                done();
            });
        });
        // it('key 分别为: flesh, nav, meta', done => {
        //   const expectedKeys = ['flesh', 'nav', 'meta']
        //   fileContent.then(result => {
        //     const keys = _.keys(result)
        //     keys.forEach(key => {
        //       expect(expectedKeys.indexOf(key)).to.not.be(-1)
        //     })
        //     done()
        //   })
        // })
    });
};
filesToBeTested.forEach(function (filename) {
    testFile(filename);
});
//# sourceMappingURL=parseEpub.spec.js.map