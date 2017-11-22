defineLazyProperty(impl, "KeyboardEvent", function() {
    function KeyboardEvent() {
        // Just use the superclass constructor to initialize
        impl.UIEvent.call(this);

        this.key = "\0";
        this.keyCode = 0;
    }
    KeyboardEvent.prototype = O.create(impl.UIEvent.prototype, {
        _idlName: constant("KeyboardEvent"),
        initKeyboardEvent: constant(function(type, key, bubbles, cancelable,
                                          view, detail) {
            this.initEvent(type, bubbles, cancelable, view, detail);
            this.key = key;
            this.keyCode = key;
        }),

    });

    return KeyboardEvent;
});
