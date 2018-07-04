var website ={
  publicPath:"http://192.168.41.107:8888/"
};
const webpack = require('webpack');
const path = require("path");
//js 压缩
const uglify = require('uglifyjs-webpack-plugin');
//html 打包
const htmlPlugin = require("html-webpack-plugin");
//css 分离
// const extractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 基于入口的CSS提取
function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  mode:'development',
  //入口文件的配置项
  entry:{
    base:path.resolve(__dirname,'../src/css/base.css'),
    //里面的main是可以随便写的
    main:'./src/js/main.js',
    main2:'./src/js/main2.js',
    jquery:'jquery',
  },
  //出口文件的配置项
  output:{
    //打包的路径
    path:path.resolve(__dirname,'../dist'),
    //打包的文件名称
    filename:'js/[name].js',
    publicPath:website.publicPath  //publicPath：主要作用就是处理静态文件路径的。
  },
  //插件，用于生产模板和各项功能
  plugins:[
    new uglify(),
    new htmlPlugin({
      filename : 'index.html',//输出的html路径
      template : './src/index.html', //html模板路径
      //inject : 'head',  //js文件在head中，若为body则在body中
      inject : 'body',
      // title : 'this is first',
      author : 'xk',
      //excludeChunks: ['main'],//打包时不打包main.js文件
      chunks : ['jquery','main'], //打包时只打包main.js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
      date : new Date(),
      minify:{ //是对html文件进行压缩
        removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
      }
    }),
    new htmlPlugin({
      filename : 'detail.html',//输出的html路径
      template : './src/detail.html', //html模板路径
      //inject : 'head',  //js文件在head中，若为body则在body中
      inject : 'body',
      // title : 'this is detail',
      author : 'xk',
      //excludeChunks: ['main'],//打包时不打包main.js文件
      chunks : ['jquery','main2'], //打包时只打包main2.js文件，见entry，注意使用chunks时模板index.html文件里面不允许有script标签，即使注释掉也会报错
      date : new Date(),
      minify:{ //是对html文件进行压缩
        removeAttributeQuotes:true  //removeAttrubuteQuotes是却掉属性的双引号。
      }
    }),

    // new extractTextPlugin({
    //   filename:"css/[name].css",//这里的/css/index.css 是分离后的路径
    //   allChunks:true
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].css",
      chunkFilename:"css/base.css"
    }),

    new webpack.ProvidePlugin({
      $:'jquery', //加载Jquery
      jQuery: 'jquery'
    })
  ],
  //模块：例如解读CSS,图片如何转换，压缩
  module:{
    rules:[
      //css loader
      // {
      //   test:/\.css$/,
      //   use: extractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use:[{loader:"css-loader"}, {loader:"postcss-loader"}]
      //   })
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      // 字体图标的配置
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [{
                loader: 'url-loader',
                options: { limit: 8192, name: 'resource/[name].[ext]' }
              }]
      },

      //图片 loader
      {
        test:/\.(png|jpg|gif|jpeg)/,  //是匹配图片文件后缀名称
        use:[
          {
            loader:'url-loader', //是指定使用的loader和loader的配置参数
            options:{
              limit:500  ,//是把小于500B的文件打成Base64的格式，写入JS
              outputPath:'images/',//打包后的图片放到images文件夹下
            }
          }
        ]
      },
      {
        test: /\.(htm|html)$/i,
        use:[ 'html-withimg-loader']
      },
      //babel 配置
      {
        test:/\.(jsx|js)$/,
        use:{
          loader:'babel-loader',
          options:{
            "presets":["react","env"]
          }
        },
        exclude:/node_modules/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // styles:{ //css 都打包到一个文件内
        //   name:'styles',
        //   test:/\.css$/,
        //   chunks:'all',
        //   enforce:true
        // },
        baseStyle:{//
          name:'base',
          test: (m,c,entry = 'base') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true
        },
        jqueryJs: { // // 单独提取JS文件引入html键值可以自定义
          test: /\.js$/,
          chunks:'all',
          filename:'js/jquery.js',
          name: 'jquery', // 入口的entry的key
          enforce: true   // 强制
        }
      }
    }
  },
  //配置webpack开发服务功能
  devServer:{
    //设置基本目录结构
    contentBase:path.resolve(__dirname,'../dist'),
    //服务器的IP地址，科室使用IP也可以使用localhost
    host:'192.168.41.107',
    //服务端压缩是否开启
    compress:true,
    //配置服务端口号
    port:8888
  }
};