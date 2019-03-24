function diff(oldTree, newTree) {
	let patches = {};
	let index = 0;

	// 比较后的结果放到补丁包里
	walk(oldTree, newTree, index, patches);	
	return patches;
}

function diffAttr (oldAttrs, newAttrs) {
	// body...
	let patch = {};

	// 判断老的属性与新的属性的关系
	for(let key in oldAttrs) {
		if (oldAttrs[key] !== newAttrs[key]) {
			patch[key] = newAttrs[key]; // 有可能是undefined
		}
	}

	// 老的节点没有的新节点的属性
	for(let key in newAttrs) {
		if (!oldAttrs.hasOwnProperty(key)) {
			patch[key] = newAttrs[key]
		}
	}

	return patch;
}

const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const REPLACE = 'REPLACE';
let Index = 0;
function diffChildren (oldChildren, newChildren, index, patches) {
	// 比较老的第一个和新的第一个
	oldChildren.forEach((child, idx) => {
		// 索引不该是index了
		// 每次index传递给walk时， index是递增的，所有的节点都基于同一个index来实现
		walk(child, newChildren[idx], ++Index, patches);
	});
}

function isString (node) {
	return Object.prototype.toString.call(node) === '[object String]';
}

function walk (oldNode, newNode, index, patches) {
	let currentPatch = [];
	if (!newNode) {
		currentPatch.push({type: REMOVE, index: index});
	} else if(isString(oldNode) && isString(newNode)) { // 判断文本是否变化了
		if (oldNode !== newNode) {
			currentPatch.push({
				type: TEXT,
				text: newNode
			});
		}
	} else if(oldNode.type === newNode.type) {
		// 比较属性是否有更改
		let attrs = diffAttr(oldNode.props, newNode.props);
		if (Object.keys(attrs).length > 0) {
			currentPatch.push({type: ATTRS, attrs: attrs});
		}

		// 如果有儿子节点，继续递归遍历儿子节点
		diffChildren(oldNode.children, newNode.children, index, patches);
	} else {
		currentPatch.push({type: REPLACE, newNode: newNode});
	}

	// 当前元素确实有补丁，则将其放入最大的补丁包当中
	if (currentPatch.length>0) {
		patches[index] = currentPatch;
		console.log(patches);
	}
}


export default diff;

/*
规则：
1、当节点类型相同时，去看一下属性是否相同，产生一个属性的补丁包，{type: 'ATTRS', attrs: {class: 'list-group'}}
2、新的dom节点不存在的情况，{type: 'REMOVE', index: xxx}
3、节点类型不相同，直接采用替换模式，{type； 'REPLACE', newNode: newNode}
4、文本的变化，{type: 'TEXT', text: 1}
*/