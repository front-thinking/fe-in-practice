class Observer {

    constructor (data) {
        this.observer(data);
    }

    observer (data) {
        // 对这个data数据将原有的属性改成getter和setter的方法
        if (!data || typeof data !== 'object') {
            return;
        }

        // 将数据一一劫持，首先拿到data的key和value
        Object.keys(data).forEach(key => {
            // 开始劫持
            this.defineReactive(data, key, data[key]);
            this.observer(data[key]); // 深度劫持
        });

    }

    // 定义响应式，即数据劫持
    defineReactive (obj, key, value) {
        let that = this;
        let dep = new Dep(); // 每个变化的数据都会对应一个数组，这个数组存放所有更新的操作
        Object.defineProperty(obj, key, {
           enumerable: true,
           configurable: true,
           get () {
               // todo ....
               Dep.target && dep.addSub(Dep.target);
               return value;
           },
           set (newValue) {
               if(newValue != value) {
                   // todo...
                   that.observer(newValue); // 如果赋值是对象，则继续深度劫持
                   value = newValue;
                   dep.notify();
               }
           }
        });
    }

}

class Dep {
    constructor () {
        // 订阅的数组
        this.subs = [];
    }

    addSub(watcher) {
        this.subs.push(watcher);
    }

    notify() {
        this.subs.forEach(watcher => watcher.update());
    }
}
