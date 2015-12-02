"use strict";
var nodeFs = require('fs'),
    path = require('path'),
    mfile = require('file-plus'),
    images = require('images'),
    imgExt = ['.jpg', '.png'];


class sprite {
    /**
     * 自动创建合并图
     * @param  {String} filePath 图片目录
     * @param  {String} filePath 存储路径
     * @param  {String} jsonPath 原始图片对应的合并后图片位置关系
     * @return {[type]}          [description]
     */
    static mergeImgSync(spritePath, savePath, jsonPath) {
        if (!nodeFs.existsSync(jsonPath)) {
            mfile.createFileSync(jsonPath);
        }
        if (!nodeFs.existsSync(spritePath)) {
            console.warn(spritePath + ' 不存在');
            nodeFs.writeFileSync(jsonPath, '{}', 'utf8');
            return {};
        }
        //取出目录下所有文件夹
        var dirs    = mfile.getAllDirsSync(spritePath),
            imgObj  = {},
            self    = this;

        if (dirs.length) {
            dirs.forEach(function(dir, index) {
                Object.assign(imgObj, self.mergeImgWithFileSync(dir, 
                    savePath, spritePath, savePath));
            });
        }
        nodeFs.writeFileSync(jsonPath, JSON.stringify(imgObj), 'utf8');
        return imgObj;
    }
    /**
     * 将目录内的图片合并，返回对应关系的json
     * @param  {[type]} filePath [description]
     * @param  {[type]} savePath [description]
     * @param  {[type]} cssPath [description]
     * @return {[type]}          [description]
     */
    static mergeImgWithFileSync(filePath, savePath){

        if (!nodeFs.existsSync(filePath)) {
            console.warn(filePath + ' 不存在');
            return {};
        }
        var imgFiles = mfile.getAllFilesSync(filePath, imgExt),
            imgObj = {};
      
        if (imgFiles.length) {
            //如果文件夹下存在文件，生成拼接文件
            var x = 0,
                y = 0;
            var  spriteNameDir = savePath + '/sprite_'+ path.basename(filePath) + '.png';

            creatSprite(spriteNameDir, imgFiles);
           
            imgFiles.forEach(function(imgFile, imgindex) {
                //开始绘制图片
                x = x + 1;
                imgObj[imgFile] = {
                    path: spriteNameDir,
                    pos: '-' + x + 'px 0px'
                };
                images(spriteNameDir).draw(images(imgFile), x, y).save(spriteNameDir);
                x = x + images(imgFile).width();
            })
        }
        return imgObj;

    }


}

function creatSprite(spriteName, imgFiles) {
    var height = 0;
    var width = 0;

    imgFiles.forEach(function(imgFile, imgindex) {
        //开始绘制图片
        var imgObj = images(imgFile);
        width = width + imgObj.width() + 1; //每个图像有1像素间距
        if (imgObj.height() > height) {
            height = imgObj.height();
        };

    })

    images(width, height).save(spriteName);
}
module.exports = sprite;