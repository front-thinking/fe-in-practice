// define 声明模块，通过require使用模块
let factories = {};
// 模块， 依赖， 工厂函数
function define(moduleName, dependencies, factory) {
    factory.dependencies = dependencies; // 将依赖记到factory
    factories[moduleName] = factory;
}

function require(mods, callback){
    let result = mods.map(function (mod) { // name, age
        let factory = factories[mod];
        let dependencies = factory.dependencies; //['name']
        let exports;
        require(dependencies, function () {
           exports = factory.apply(null, arguments);
        });
        return exports;
    });
    callback.apply(null, result);
};


define('name', [], function () {
    return 'HHHH';
});

define('age', ['name'], function (name) {
    return name + 9;
});

require(['age'], function (age) {
    console.log(age);
});