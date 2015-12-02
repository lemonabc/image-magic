"use strict";
var fs = require('fs'),
    path = require('path'),
    mutil = require('lang-utils'),
    mfile = require('file-plus'),
    images = require('images'),
    crypto = require('crypto');


class size {
    /**
     * 在同级目录创建2x图片原图,并缓存图片信息
     *
     * @method createImgFrom2xWithCacheSync
     * @param  {String}   filePath 原图地址
     * @param {String} jsonPath 缓存文件地址
     */
    static createImgFrom2xWithCacheSync(filePath, jsonPath) {
        var imgType = path.extname(filePath),
            imgName = path.basename(filePath, imgType),
            originalImgName =  imgName + (/2x$/.test(imgName)?'':'2x'),
            originalImgPath = path.join(path.dirname(filePath), 
                originalImgName + imgType);

            // console.log('abcdefg','\n', filePath, '\n', originalImgPath);

        // 不存在2x图，返回错误
        if (!fs.existsSync(originalImgPath)) {
            return false;
        }

        var jsonImgConf = {};

        if (fs.existsSync(jsonPath)) {
            jsonImgConf = fs.readFileSync(jsonPath, 'utf8').toString(), //读取img.json配置
            jsonImgConf = !mutil.isEmptyObject(jsonImgConf) ? JSON.parse(jsonImgConf) : {};
            //md5图片对比   
        } else {
            mfile.createFileSync(jsonPath);
        }

        //2倍图MD5
        var imgbuf = fs.readFileSync(originalImgPath);
        var imgmd5 = crypto.createHash('md5').update(imgbuf).digest('hex');
        var hasImg = fs.existsSync(filePath);
        var cache = jsonImgConf[originalImgPath] && jsonImgConf[originalImgPath] == imgmd5;

        if(!cache || !hasImg){
            this.createImgFrom2xSync(originalImgPath);
        }

        if (!cache) {
            jsonImgConf[originalImgPath] = imgmd5;
            jsonImgConf = JSON.stringify(jsonImgConf);
            //写入json配置
            fs.writeFileSync(jsonPath, jsonImgConf, 'utf8');
        }
        return true;

    }
    /**
     * 在同级目录创建2x图片原图
     * @method createImgFrom2xSync
     * @param  {String}    filePath 原图片路径
     */
    static createImgFrom2xSync(filePath){
        var imgType = path.extname(filePath),
            imgName = path.basename(filePath, imgType),
            saveFileName = imgName.replace(/2x$/, ''),
            imaFile = path.dirname(filePath),
            saveFileD = path.join(imaFile, saveFileName + imgType);
        try{
            this.createHalfImgSync(filePath, saveFileD);

            return true;
        }catch(e){
            return false;
        }
    }

    /**
     * 创建原图一半的图片
     * @method createHalfImgSync
     * @param  {String}    filePath 原图片路径
     * @param  {String}    savePath 存储图片路径
     */
    static createHalfImgSync(filePath,savePath) {
        var img = images(filePath),
            width = img.width() / 2,
            height = img.height() / 2;

        try{
            this.copyImgWithSizeSync(filePath, savePath, width, height);
            return true;
        }catch(e){

            return false;
        }

    }

    /**
     * 以新尺寸创建图片
     * @method copyImgWithSizeSync
     * @param  {String}        filePath 原图片路径
     * @param  {String}        saveFile 存储图片路径
     * @param  {Number}        width    新图片宽度
     * @param  {Number}        height   新图片高度
     */
    static copyImgWithSizeSync(filePath, saveFile, width, height) {
        images(filePath).resize(width, height).save(saveFile);
    }

}

module.exports = size;