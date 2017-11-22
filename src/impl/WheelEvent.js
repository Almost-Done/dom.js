defineLazyProperty(impl, "WheelEvent", function() {
    function WheelEvent() {
        // Just use the superclass constructor to initialize
        impl.MouseEvent.call(this);

        this.screenX = this.screenY = this.clientX = this.clientY = 0;
        this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = false;
        this.deltaX = this.deltaY = this.deltaZ = 0;
        this.button = 0;
        this.buttons = 1;
        this.relatedTarget = null;
    }
    WheelEvent.prototype = O.create(impl.MouseEvent.prototype, {
        _idlName: constant("WheelEvent"),
        initWheelEvent: constant(function(type, bubbles, cancelable,
                                          view, detail,
                                          screenX, screenY, clientX, clientY, deltaX, deltaY, deltaZ,
                                          ctrlKey, altKey, shiftKey, metaKey,
                                          button, relatedTarget) {
            
            this.initMouseEvent(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY,
                ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget);
            
            this.deltaX = deltaX;
            this.deltaY = deltaY;
            this.deltaZ = deltaZ;
        }),
    });

    return WheelEvent;
});
