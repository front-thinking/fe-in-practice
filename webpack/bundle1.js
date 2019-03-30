 (function(modules) { 
     	function require(moduleId) {
     	        var module = {
     	            exports: {}
                };
         		modules[moduleId].call(module.exports, module, module.exports, require);
         		return module.exports;
         	}
     	return require("./src/index.js");
     })
 ({

     "./src/index.js":
     (function(module, exports) {
        eval("console.log('Hi， I love you!');\n\n//# sourceURL=webpack:///./src/index.js?");
         })

     });