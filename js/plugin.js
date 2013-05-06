;(function ( $, window, document, undefined ) {

    var pluginName = "shapeShift",
        defaults = {
            shapes: ["square", "circle", "triangle", "oval"],
            shapeClass: ".shape"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {

            //Store the shape reference
            this.shapeRef = 0;

            $(this.element).find(this.options.shapeClass).addClass(this.options.shapes[this.shapeRef]);

            //Create button
            $(this.element).append('<button>Change Shape</button>');

            //Add change shape button functionality using event delegation
            $(this.element).on('click','button',this.changeShape);
        },

        changeShape: function(e) {
            var plugin = $(e.delegateTarget).data("plugin_" + pluginName);

            $(plugin.element).find(plugin.options.shapeClass).removeClass(plugin.options.shapes[plugin.shapeRef]);

            if((plugin.shapeRef) === (plugin.options.shapes.length -1)){
                plugin.shapeRef = 0;
            }
            else{
                plugin.shapeRef = plugin.shapeRef+1;
            }
            $(plugin.element).find(plugin.options.shapeClass).addClass(plugin.options.shapes[plugin.shapeRef]);


        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );