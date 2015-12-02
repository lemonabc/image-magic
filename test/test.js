var images = require("../");
var assert = require("assert");
// describe("getImg", function() {
//     it("根据2倍图创建原图", function(done) {
//         var res = images.size.copyHelfImg('test2x.jpg');
//         assert.equal(true,res);
//         done();
//     });
// });

// describe("interlaceImg", function() {
//     it("设置图片交错属性", function(done) {
//         var res = images.interlace.interlaceImg('about.jpg','aboutX.jpg',function(){
//         	assert.equal(undefined,res);
//         	done();
//         });

//     });
// });
// 
// describe("createImgFrom2xWithCacheSync", function() {
//     it("创建2倍图的原图", function() {
//         var res = images.size.createImgFrom2xWithCacheSync('test.jpg','a.json');
//         assert.equal(true,res);
//     });
// });
// describe("mergeImgWithFileSync", function() {
//     it("图片合并", function() {
//         var res = images.sprite.mergeImgWithFileSync('a','xx.jpg');
//         //assert.equal(true,res);
//     });
// });

describe("mergeImgSync", function() {
    it("图片合并", function() {
        var res = images.sprite.mergeImgSync('a','a/a.json');
        //assert.equal(true,res);
    });
});