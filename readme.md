# image-magic

简单封装图片处理相关方法，包含图片尺寸调整，图片拼接，图片交错属性，2倍图处理等方法

## Installation
1. 首先安装graphicsmagick

   [graphicsmagick](http://www.graphicsmagick.org/)官方网站
   
2. 安装image-magic

        npm install image-magic
    
## Usage

	 var images = require('image-magic'); 
	 
images 下有3类命名空间分别为自由方法、size、sprite

## api方法

### 自有方法

#### image.interlace(imgPath, savePath, callback)
    
无损压缩图片，并增加交错属性

```note: 需要安装graphicsmagick```

* 参数：

	* **imgPath**：图片路径；
	* **savePath**：保存路径；
	* **callback**：回调函数，成功为空，失败为err；

* 实例：

	```javascript
	    // 原图路径
	    var imgPath = '~/img/abc.jpg';
	    // 新图存储路径
	    var savePath = '~/img/rel/abc.jpg';
	    
	    images.interlace(imgPath, savePath, function(error){
	        if(error){
	            //...
	        }
	        // do something
	    });
	    
	```



#### image.toBase64(imgPath)

将图片转换为base64

* 参数：

	* **imgPath**：图片路径；
* 返回：

	* **base64**：base64图片；

----------

###size命名空间方法

#### image.size.createImgFrom2xWithCacheSync(filePath, jsonPath)

在同级目录创建2x图片原图,并缓存图片信息
	 
* 参数：

	* **filePath**：图片路径；
	* **jsonPath**：缓存用json文件路径；


#### image.size.createImgFrom2xSync(filePath)

在同级目录创建2x图片原图

* 参数：

	* **filePath**：图片路径；


#### image.size.createHalfImgSync(filePath, savePath)

创建原图一半的图片

* 参数：
	* **filePath**：原图片路径；
	* **savePath**：存储图片路径；

#### image.size.copyImgWithSizeSync(filePath, savePath, width, height)
以新尺寸创建图片

* 参数：

	* **filePath**：原图路径；
	* **saveFile**：新图存储路径；
	* **width**：新图片宽度；
	* **height**：新图片高度；

----------
###sprite命名空间方法

#### image.sprite.mergeImgSync(filePath, jsonPath)

自动拼接雪碧图

* 参数：

	* **filePath**：图片文件夹路径，文件夹下需要有sprite目录；
	* **jsonPath**：缓存用json文件路径；

* 示例
	
	文件列表
	
	```
	~/img/sprite
	~/img/sprite/icon/back.png
	~/img/sprite/icon/home.png 
	~/img/sprite/icon/canlendar.png
	~/img/sprite/icon/calc.png
	```
	```
	images.sprite.mergeImgSync('~/img/');
	```
	合并后的图片路径及名称如下
	
		~/img/icon.png
		
#### image.sprite.mergeImgWithFileSync(filePath, savePath, oldCssPath, newCssPath)
手动设定拼接参数

* 参数：

	* **filePath**：图片文件夹路径；
	* **savePath**：保存后的图片路径；
	* **oldCssPath**：替换前的图片路径；
	* **newCssPath**：替换后的图片路径；	

##License

(The MIT License)

Copyright (c) 2015 atmwjf

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.