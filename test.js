/*
* balancePars 字符串括号平衡
* */
var balancePars = function (str) {

    if (typeof str !== 'string') {
        throw  new Error('input is not a string');
    }

    var str = str || '';
    var l = str.length;
    var lch = '(', rch = ')', lc = 0, rc = 0, index;
    var cmap = {};

    if (l === 0) {
        return true;
    }

    for (var i = 0; i < l; i++) {
        if (str[i] === lch) {
            lc++;
            cmap[lc] = i;
        } else if (str[i] === rch){
            rc++;
        }
        if (rc - lc > 0) {
            index = i; // unblance index
            return index;
        }
    }

    if (lc !== rc) {
        return cmap[rc+1];
    }

    return true;

};

// test case

// 0. 非字符串
balancePars(123);

// 1. 空值或者不传
var str1 = '';
console.log(balancePars(str1)); // true

// 2.不带括号
var str2 = 'abacdsd';
console.log(balancePars(str2)); // true

// 3.不平衡的情况
var str3 = 'ab(daddsd';
console.log(balancePars(str3) === 2); // true

var str4 = 'abd)dsdas';
console.log(balancePars(str4) === 3); // true

var str5 = 'basd(dads(dasd)das(dd)))dd';
console.log(balancePars(str5) === 23); // false;

var str6 = 'badssd)dsdd(';
console.log(balancePars(str6) === 6); // false


// 4. 平衡

var str7 = 'add(add)dd(dd)';
console.log(balancePars(str7)); // true