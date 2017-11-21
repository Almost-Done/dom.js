defineLazyProperty(impl, "SpatialInputEvent", function() {
    function SpatialInputEvent() {
        // Just use the superclass constructor to initialize
        impl.UIEvent.call(this);

        this.isPressed = false;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.sourceKind = 0;
    }
    SpatialInputEvent.prototype = O.create(impl.UIEvent.prototype, {
        _idlName: constant("SpatialInputEvent"),
        initSpatialInputEvent: constant(function(type, isPressedArg, xArg,  yArg, zArg, sourceKindArg, bubbles, cancelable,
                                          view, detail) {
            this.initEvent(type, bubbles, cancelable, view, detail);
            this.isPressed = isPressedArg;
            this.x = xArg;
            this.y = yArg;
            this.z = zArg;
            this.sourceKind = sourceKindArg;
        }),

    });

    return SpatialInputEvent;
});
