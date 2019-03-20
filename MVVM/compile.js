class Compile {

    constructor(el, vm) {

        this.el = this.isElementNode(el) ? el: document.querySelector(el);
        this.vm = vm;

        if (this.el) {
            // 如果这个元素能获取到则开始编译
            // 1、先把这些真实的DOM移入到内存当中去，使用fragment
            let fragment = this.node2frament(this.el);
            // 2、编译，提取想要的元素节点，v-model和文本节点{{}}
            this.compile(fragment);

            // 3、把编译好的fragment插入回页面当中去
            this.el.appendChild(fragment);
        }

    }

    /* 专门写一些辅助方法 */
    isElementNode (node) {
        return node.nodeType === 1;
    }
    // 判断是否是指令
    isDirective(name) {
        return name.includes('v-');
    }

    /* 核心方法 */
    compileElement (node) {
        // 编译带有v-model的
        let attrs = node.attributes; // 取出当前节点的属性
        Array.from(attrs).forEach(attr => {
            // 判断属性名字是否包含v-
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                // 取到对应的值放到节点的值上
                let expr = attr.value;
                let [, type] = attrName.split('-');
                // node vm.$data expr
                CompileUtil[type](node, this.vm, expr);

            }
        })
    }
    compileText (node) {
        // 编译带有{{}}的文本
        let expr = node.textContent; // 取出文本中的内容
        let reg = /\{\{[^}]+\}\}/g;
        if (reg.test(expr)) {
            // node this.vm.$data expr
            CompileUtil['text'](node, this.vm, expr);
        }
    }
    compile(fragment) {
        // 需要递归
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach(node => {
            if (this.isElementNode(node)) {
                // 是元素节点, 还需要继续深入编译子节点
                // 这里需要编译元素
                this.compileElement(node);
                this.compile(node);
            } else {
                // 文本节点
                // 这里需要编译文本
                this.compileText(node);
            }
        });
    }


    node2frament (el) { // 需要将el中的内容全部放到内存当中
        // 文档碎片
        let fragment = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild) {
            fragment.appendChild(firstChild);
        }
        return fragment; // 内存中的节点
    }



}

CompileUtil = {
    getVal (vm, expr) { // 获取实例身上对应的数据
        expr = expr.split('.'); //  a.b.c.d.e.f => [a, b, c, d, e, f]
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },
    getTextVal (vm, expr) { // 获取编译文本后的结果
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) =>{
            return this.getVal(vm, arguments[1]);
        });
    },
    text(node, vm, expr) { // 文本处理
        let updaterFn = this.updater['textUpdater'];
        // {{message.a}}
        let value = this.getTextVal(vm, expr);
        updaterFn && updaterFn(node, value);
    },
    model(node, vm, expr) { // 输入框处理
        let updaterFn = this.updater['modelUpdater'];
        updaterFn && updaterFn(node, this.getVal(vm, expr));
    },
    updater: {
        textUpdater (node, value) {
            node.textContent = value;
        },
        modelUpdater (node, value) {
            node.value = value;
        }
    }
};