defineLazyProperty(impl, "VoiceEvent", function() {
    function VoiceEvent() {
        // Just use the superclass constructor to initialize
        impl.UIEvent.call(this);

        this.command = "";
    }
    VoiceEvent.prototype = O.create(impl.UIEvent.prototype, {
        _idlName: constant("VoiceEvent"),
        initVoiceEvent: constant(function(type, command, bubbles, cancelable,
                                          view, detail) {
            this.initEvent(type, bubbles, cancelable, view, detail);
            this.command = key;
        }),

    });

    return VoiceEvent;
});
