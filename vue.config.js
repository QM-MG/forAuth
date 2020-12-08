let webpack = require('webpack');
const path = require('path');
const bodyParser = require('body-parser');
const mockMiddleware = require('./mock.config');
function resolve(dir) {
    return path.join(__dirname, dir);
}
if(process.env.VUE_APP_CURRENTMODE == 'development'){
}
else if(process.env.VUE_APP_CURRENTMODE =='test'){
}
else if(process.env.VUE_APP_CURRENTMODE =='production'){
}
module.exports = {
    assetsDir: './static',
    productionSourceMap: false, // 将map文件去掉
    chainWebpack(config) {
        // 删除prefetch
        config.plugins.delete('prefetch');
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'));
    },
    configureWebpack: {
        // devtool: false,
        plugins: [
            new webpack.IgnorePlugin({resourceRegExp: /^\.\/views2$/})
        ],
        resolve: {
            alias: {
              // 别名
              vue$: "vue/dist/vue.esm.js", //加上这一句
            }
          }
    },
    devServer: {
        before(app) {
            app.use(bodyParser.json());
            app.use(mockMiddleware); // 是否启用mock数据
        }
    }
};