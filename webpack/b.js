let fs = require('fs');
function req(moduleName) {
    let content = fs.readFileSync(moduleName, 'utf-8');
    let fn = new Function('exports', 'module', 'require', '__dirname',
        '__filename', content + '\n console.log(__dirname); \n console.log(__filename); return module.exports');
    let module = {
        exports: {}
    };
    return fn(module.exports, module, req, __dirname, __filename);
}
let str = req('./a.js');
console.log(str);

