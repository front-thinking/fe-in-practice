import {createElement, render, renderDom} from './element.js';
import diff from './diff.js';
import patch from './patch.js';

let vertualDom1 = createElement('ul', {class: 'list'}, [
	createElement('li', {class: 'item'}, ['1']),
	createElement('li', {class: 'item'}, ['2'])
]);
let vertualDom2 = createElement('ul', {class: 'list-group'}, [
	createElement('li', {class: 'item'}, ['2']),
	createElement('li', {class: 'item'}, ['1']),
	createElement('div', {class: 'item'}, ['2'])
]);

// 如果平级元素有互换，那会导致重新渲染；
// 如果有新增节点，也不会被更新


// 将虚拟DOM转换为真实DOM，并且渲染到页面上
let el = render(vertualDom1);
renderDom(el, window.root);
let patches = diff(vertualDom1, vertualDom2);

// 给旧元素打补丁
patch(el, patches);


// DOM DIFF 比较的是两个虚拟DOM的区别，根本来讲就是比较两个对象的区别
// DOM DIFF的作用，根据两个虚拟DOM节点，创建出补丁，补丁即是描述改变的内容，将这个补丁用来更新DOM