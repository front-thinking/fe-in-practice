class MVVM {
    constructor (options) {

        // 第一步先把有用的信息挂载在实例上
        this.$el = options.el;
        this.$data = options.data;

        // 有传进$el则进行编译
        if (this.$el) {
            // 数据劫持  把所有对象的属性改成get和set方法
            new Observer(this.$data);
            this.proxyData(this.$data);

            // 用数据和元素进行编译
            new Compile(this.$el, this);
        }

    }
    proxyData (data) {
        Object.keys(data).forEach(key=> {
            Object.defineProperty(this, key, {
                get () {
                    return data[key];
                },
                set (newValue) {
                    data[key] = newValue;
                }
            })
        })
    }
}
