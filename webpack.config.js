/*
 * @Author: HZH 
 * @Date: 2017-08-27 17:24:02 
 * @Last Modified by: HZH
 * @Last Modified time: 2017-08-28 14:44:30
 */
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
var getHtmlConfig = function(name){
    return{
        template : './src/view/'+ name +'.html',
        filename : 'view/'+ name +'.html',
        inject   : true,
        hash     : true,
        chunks   : ['common',name]
    }
}
var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],        
        'login'  : ['./src/page/login/index.js'],
        'index'  : ['./src/page/index/index.js']
    },

    output: {
        path: './dist',
        publicPath:'/dist', 
        filename: 'js/[name].js'
        
    },
    externals : {
        "jquery" : "window.jQuery"
    },
    module : {
        loaders : [
            { test : /\.css$/, loader : ExtractTextPlugin.extract("style-loader","css-loader")},
            { test : /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader : ("url-loader?limit=100&name=resource/[name].[ext]")}
        ]
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
};
if ('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;