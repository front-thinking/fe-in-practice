class MVVM {
    constructor (options) {

        // 第一步先把有用的信息挂载在实例上
        this.$el = options.el;
        this.$data = options.data;

        // 有传进$el则进行编译
        if (this.$el) {
            new Compile(this.$el, this);
        }

    }
}