
#Cesium-angular-app

A small map app build with angular && Cesiumjs and work with tilestream 
------
##Features:

> * situation including kml/geojson/czml add. remove. show&search entities 
> * tilestream layer add. remove. metadata
> * terrain
> * grid 
> * mapThumbnail with hostspots

##Dependency:

tilestream

##Useage
1. open your tilestream which can provide tiles.
2. run it with http-server or any other web server
3. now you can run it with node-webkit

##Work with node-webkit （打包成单独可运行exe文件, windows下）
1. 下载一个node-webkit
2. 在项目目录中除了git的文件全部压缩成.zip文件
3. 将压缩后的文件后缀名改成.nw 尝试将该文件拖到nw.exe,若可以运行，则进入下一步。
4. 将文件拷贝到nw文件夹，打开命令行工具，输入 `copy /b nw.exe+app.nw app.exe`
   到了这步，我们已经得到了app.exe这个文件，但如果只有app.exe这个文件还是不够的，这个可执行文件的运行还需要几个dll文件的支持。
5. 下载一个Enigma Virtual Box,用该工具生成单独exe















