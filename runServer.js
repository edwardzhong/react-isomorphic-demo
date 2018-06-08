// 必须引入babel-register,才能识别es6/7和jsx, 同时该加载入口不能有es6/7和jsx相关的内容，意味着react相关的启动代码必须放在其他页面(eg:app.js)
require('babel-register');
const app=require('./app');
// const webpack=require('webpack');
// const webpackConfig=require('./webpack.config');
// const webpackDevMiddleware = require('koa-webpack-dev-middleware');
// const webpackHotMiddleware = require('koa-webpack-hot-middleware');


// 使用 middleware 於 webpack 去進行 hot module reloading
// if(process.env.NODE_ENV=='develop'){
// 	const compiler = webpack(webpackConfig);
// 	app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
// 	app.use(webpackHotMiddleware(compiler));
// }

if (!module.parent) {
    let port = process.env.PORT || 3004;
    app.listen(port);
    console.log('Running site at: http://localhost:%d', port);
}
