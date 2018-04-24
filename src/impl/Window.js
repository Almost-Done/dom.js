// This is a simple constructor for a simple Window implementation
// We'll set things up (in src/main.js for now) so that it unwraps
// to the global object
function Window() {
    this.document = new impl.DOMImplementation().createHTMLDocument("");
    this.document._scripting_enabled = true;
    this.document.defaultView = this;

    // These numbers must match native code
    this.input = { 
        "resize": 0,  "mouse" : 1, "keyboard" : 2, 
        "spatialinput" : 3, "spatialmapping" : 4, "vsync": 5,
        "voice" : 6, "devicecontext" : 7
    };

    this.callbackFromNative = function (type) {
        if (type === this.input.vsync) {
            var capturedCallback = holographic.drawCallback;
            holographic.drawCallback = null;
            if (capturedCallback) {
                capturedCallback();
            }
        } else if (type === this.input.resize) {
            var resizeEvent = this.document.createEvent("Event");
            resizeEvent.initEvent("resize", true, true);
            this.dispatchEvent(resizeEvent);
        } else if (type === this.input.spatialmapping) {
            if (this.onSpatialMapping) {
                this.onSpatialMapping(arguments[1]);
            }
        } else if (type === this.input.mouse) {
            var mouseEvent = holographic.canvas.dispatchMouseFromWindow(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            holographic.canvas.ownerDocument.dispatchMouseFromWindow(mouseEvent);
        } else if (type === this.input.keyboard) {
            let keyEvent = holographic.canvas.dispatchKeyboardFromWindow(arguments[1], arguments[2]);
            this.dispatchEvent(keyEvent);
        } else if (type === this.input.spatialinput) {
            holographic.canvas.dispatchSpatialInputFromWindow(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
        } else if (type === this.input.voice) {
            let voiceEvent = holographic.canvas.dispatchVoiceFromWindow(arguments[1], arguments[2], arguments[3]);
            this.dispatchEvent(voiceEvent);
        } else if (type === this.input.devicecontext) {
            let contextEvent = holographic.canvas.dispatchContextEventFromWindow(arguments[1]);
            this.dispatchEvent(contextEvent);
        }
    };

    holographic.nativeInterface.window.setCallback(this.callbackFromNative.bind(this));

    this.addEventListenerXXX = this.addEventListener;
    this.removeEventListenerXXX = this.removeEventListener;

    this.addEventListener = function (type, listener, capture) {
        if (type === "spatialmapping") {
            holographic.nativeInterface.window.requestSpatialMappingData(
                this._spatialMappingOptions.scanExtentMeters.x,
                this._spatialMappingOptions.scanExtentMeters.y,
                this._spatialMappingOptions.scanExtentMeters.z,
                this._spatialMappingOptions.trianglesPerCubicMeter);
            this.onSpatialMapping = listener;
        } else if (type === "voicecommand" || type === "keyup" || type === "keydown") {
            holographic.nativeInterface.input.addEventListener(type);
            this.addEventListenerXXX(type, listener, capture);
        } else {
            this.addEventListenerXXX(type, listener, capture);
        }
    };

    this.removeEventListener = function (type, listener, capture) {
        if (type === "spatialmapping") {
            delete this.onSpatialMapping;
        } else if (type === "voicecommand") {
            holographic.nativeInterface.input.removeEventListener(type);
            this.removeEventListenerXXX(type, listener, capture);
        } else {
            this.removeEventListenerXXX(type, listener, capture);
        }
    };

    this._spatialMappingOptions = { scanExtentMeters: { x: 5, y: 5, z: 3 }, trianglesPerCubicMeter: 100 };
    this._voiceCommands = [];
}

Window.prototype = O.create(impl.EventTarget.prototype, {
    _idlName: constant("Window"),

    history: constant({
        back: nyi,
        forward: nyi,
        go: nyi,
        _idlName: "History"
    }),

    navigator: constant({
        appName: "dom.js",
        appVersion: "0.1",
        platform: "JavaScript!",
        userAgent: "Servo",
        _idlName: "Navigator"
    }),

    // Self-referential properties
    window: attribute(function() { return this; }),
    self: attribute(function() { return this; }),
    frames: attribute(function() { return this; }),

    // Self-referential properties for a top-level window
    parent: attribute(function() { return this; }),
    top: attribute(function() { return this; }),

    // We don't support any other windows for now
    length: constant(0),           // no frames
    frameElement: constant(null),  // not part of a frame
    opener: constant(null),        // not opened by another window

    // The onload event handler.
    // XXX: need to support a bunch of other event types, too,
    // and have them interoperate with document.body.

    onload: attribute(
        function() {
            return this._getEventHandler("load");
        },
        function(v) {
            this._setEventHandler("load", v);
        }
    ),

    spatialMappingOptions: attribute(
        function () {
            return this._spatialMappingOptions;
        },
        function (v) {
            this._spatialMappingOptions = v;
        }
    ),

    voiceCommands: attribute(
        function () {
            return this._voiceCommands;
        },
        function (v) {
            holographic.nativeInterface.input.setVoiceCommands(v);
            this._voiceCommands = v;
        }
    ),
});
