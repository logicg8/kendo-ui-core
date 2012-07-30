(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Shim = ui.Shim,
        Widget = ui.Widget,
        OPEN = "open",
        WRAP = '<div class="km-modalview-wrapper" />';

    var ModalView = ui.View.extend({
        init: function(element, options) {
            var that = this, width, height;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            width = parseFloat(element.css("width"));
            height = parseFloat(element.css("height"));

            element.addClass("km-modalview").wrap(WRAP);

            that.wrapper = element.parent().css({
                width: options.width || width || 300,
                height: options.height || height || 300
            });
            element.css({ width: "", height: "" });

            that.shim = new Shim(that.wrapper, {
                modal: options.modal,
                position: "center center",
                align: "center center",
                effect: "fade:in"
            });

            that._layout();
            that._scroller();
            that._model();
        },

        events: [
            OPEN
        ],

        options: {
            name: "ModalView",
            modal: true,
            width: null,
            height: null
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.shim.destroy();
        },

        open: function(target) {
            var that = this;
            that.trigger(OPEN);
            that.target = $(target);
            that.shim.show();
        },

        openFor: function(target) {
            var that = this;
            that.target = target;
            that.trigger(OPEN, { target: that.target });
            that.shim.show();
        },

        close: function() {
            this.shim.hide();
        }
    });

    ui.plugin(ModalView);
})(jQuery);
