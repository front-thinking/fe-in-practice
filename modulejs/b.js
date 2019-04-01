exports.loaded = false;
const a = myRequire('./a.js');
module.exports = {
    aWasLoaded: a.loaded,
    loaded: true
};