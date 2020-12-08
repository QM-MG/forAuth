/**
 * @file mock服务
 * @author yangtianjiao@baidu.com
 */

let fs = require('fs');
module.exports = function proxyServer(req, res, next) {
    let path = req.path;
    if (req.headers.isajax === 'true') {
        console.log(`request: ${path} mock to ${'./mock' + path}`);
        path = './mock' + path;
        res.writeHead(200, {'Content-Type': 'text/html;charset:UTF-8'});
        if (fs.existsSync(path + '/index.json')) {
            res.end(fs.readFileSync(path + '/index.json', 'utf8'));
        } else {
            res.end(JSON.stringify(require(path)(req.body)));
            delete require.cache[require.resolve(path)];
        }
        return true;
    }
    return next();
};