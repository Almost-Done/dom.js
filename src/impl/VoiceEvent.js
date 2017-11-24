defineLazyProperty(impl, "VoiceEvent", function() {
    function VoiceEvent() {
        // Just use the superclass constructor to initialize
        impl.UIEvent.call(this);

        this.command = "";
        this.type = "";
        this.confidence = 0;
    }
    VoiceEvent.prototype = O.create(impl.UIEvent.prototype, {
        _idlName: constant("VoiceEvent"),
        initVoiceEvent: constant(function(type, command, confidence, bubbles, cancelable,
                                          view, detail) {
            this.initEvent(type, bubbles, cancelable, view, detail);
            this.command = command;
            this.confidence = confidence;
            this.type = type;
        }),

    });

    return VoiceEvent;
});
