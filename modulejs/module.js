const fs = require('fs');

function loadModule(filename, module, myRequire) {
    const wrappedSrc=`(function(module, exports, myRequire) {
         ${fs.readFileSync(filename, 'utf8')}
       })(module, module.exports, myRequire);`;
    eval(wrappedSrc);
}

const myRequire = (moduleName) => {
    console.log(`Require invoked for module: ${moduleName}`);
    const id = myRequire.resolve(moduleName);
    if(myRequire.cache[id]) {
        return myRequire.cache[id].exports;
    }
    //module metadata
    const module = {
        exports: {},
        id: id };
    //Update the cache
    myRequire.cache[id] = module;
    //load the module
    loadModule(id, module, myRequire);
    //return exported variables
    return module.exports;
};
myRequire.cache = {};
myRequire.resolve = (moduleName) => {
    return moduleName;
};

let str = myRequire('./test.js');
console.log(str);