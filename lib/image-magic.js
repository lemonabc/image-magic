var fs = require('fs'), 
    gm = require('gm');

var images = {
    /**
     * 图片设置交错属性,异步方法
     * @param  {String} imgPath  图片路径
     * @param  {String} savePath 保存路径
     */
    interlace: function(imgPath, savePath, callback) {
        gm(imgPath).interlace('Line').quality(99).noProfile().write(savePath, function(err) {
            if (err) console.error(err, '\n',
                'imgPath:', imgPath, 
                'savePath:', savePath);

            if (callback) {
                callback(err);
            }
        });
    },
    /**
     * 返回图片的base64
     * @param  {String} imgPath 图片路径
     * @return {String}         图片base64，null为不存在
     */
    toBase64: function(imgPath){
        if(fs.existsSync(originalImgPath)){
            return null;
        }
        var imageBuf = fs.readFileSync(imgPath);
        return imageBuf.toString("base64");
    }
};
images.size = require('./size');
images.sprite = require('./sprite');

module.exports = images;