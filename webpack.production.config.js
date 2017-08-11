const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    name: "browser",
    context: path.resolve(__dirname, 'src'),
    entry:{
        app:'./index',
        vendor: ['react', 'react-dom','jquery'],
    },
    output:{
        path: path.join(__dirname, "build"),
        filename: "[name].bundle.[hash].js"
    },
    module: {//在配置文件里添加 loader
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory=true',
                query: {
                    presets: ['es2015','react','stage-2']
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [{
                    loader: 'css-loader',
                      options: {
                        minimize: true
                      }
                    },'postcss-loader','less-loader']
              })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=20000'
            }
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID,通过这个插件webpack可以分析和优先考虑使用最多的模块,并为它们分配最小的ID 
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'develop')
        }),
        new CleanWebpackPlugin(
            ['build/*.bundle.*.js','build/*.bundle.*.js.map',],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        new webpack.ProvidePlugin({//把jq作为全局变量插入到所有的代码中，不再需要import $ from 'jquery';
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),//提取合并库文件
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [require('autoprefixer')];
                }
            }
        }),
        new webpack.optimize.UglifyJsPlugin({//压缩文件
            sourceMap: true
        }),
        new ExtractTextPlugin({ 
            filename: 'main.[hash].css'
        }),
        new HtmlWebpackPlugin({
            filename:'list.html',
            template: __dirname + "/src/index.html"//new 一个这个插件的实例，并传入相关的参数
        })
    ]
}