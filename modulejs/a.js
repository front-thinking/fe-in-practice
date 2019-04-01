exports.loaded = false;
const b = myRequire('./b.js');
module.exports = {
    bWasLoaded: b.loaded,
    loaded: true
};