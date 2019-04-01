### module.js mimic the require function in Nodejs

### module.exports versus exports

For many developers who are not yet familiar with Node.js, a common source of confusion is the difference between using exports and module.exports to expose a public API. The code of our custom require function should again clear any doubt. The variable exports is just a reference to the initial value of module.exports; we have seen that such a value is essentially a simple object literal created before the module is loaded.

This means that we can only attach new properties to the object referenced by the exports variable, as shown in the following code:

```js
   exports.hello = () => {
     console.log('Hello');
   }
```

Reassigning the exports variable doesn't have any effect, because it doesn't change the content of module.exports; it will only reassign the variable itself. The following code is therefore wrong:

```js
   exports = () => {
     console.log('Hello');
   }
```

If we want to export something other than an object literal, such as a function, an instance, or even a string, we have to reassign module.exports as follows:

Polluting the global scope is considered bad practice and nullifies the advantage of having a module system. So, use it only if you really know what you are doing.

```js
module.exports = () => {
  console.log('Hello');
}
```