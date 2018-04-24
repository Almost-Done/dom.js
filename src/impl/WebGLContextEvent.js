defineLazyProperty(impl, "WebGLContextEvent", function() {
    function WebGLContextEvent() {
        // Just use the superclass constructor to initialize
        impl.UIEvent.call(this);
    }
    WebGLContextEvent.prototype = O.create(impl.UIEvent.prototype, {
        _idlName: constant("WebGLContextEvent"),
        initWebGLContextEvent: constant(function(type, e, bubbles, cancelable,
                                          view, detail) {
            this.initEvent(type, bubbles, cancelable, view, detail);
            this.e = e;
        }),

    });

    return WebGLContextEvent;
});
