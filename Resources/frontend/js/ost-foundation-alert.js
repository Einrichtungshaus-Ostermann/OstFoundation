
/**
 * Einrichtungshaus Ostermann GmbH & Co. KG - Foundation
 *
 * @package   OstFoundation
 *
 * @author    Eike Brandt-Warneke <e.brandt-warneke@ostermann.de>
 * @copyright 2018 Einrichtungshaus Ostermann GmbH & Co. KG
 * @license   proprietary
 */

;(function ($) {

    // use strict mode
    "use strict";

    // ...
    $.ostFoundationAlert = {

        // defaults
        defaults: {
            title:             "Hinweis",
            submitValue:       "Ok",
            additionalClass:   "",
            callback:          function() {},
            valign:            true,
            afterOpenCallback: function() {},
            width:             "60%",
            height:            "80%",
            sizing:            "fixed"
        },

        // options
        options: {},

        // the template
        template: '<div class="message--outer" style=""><div class="message" style=""></div></div><button class="is--button" style="">Ok</button>',

        // selectors
        selectors: {
            container:    'div.ost-foundation--alert',
            message:      '.message',
            submitButton: 'button'
        },

        // components
        $body: null,
        $el: null,
        $message: null,
        $submitButton: null,

        //
        open: function( message, options )
        {
            // get this
            var me = this;

            // set options
            me.options = $.extend( {}, me.defaults, options );

            // open a modal
            $.modal.open( me.template, {
                title:           me.options.title,
                sizing:          me.options.sizing,
                width:           me.options.width,
                height:          me.options.height,
                animationSpeed:  0,
                keyboardClosing: false,
                additionalClass: "ost-foundation--alert" + ( ( me.options.additionalClass == "" ) ? "" : " " + me.options.additionalClass ),
                onClose:         function() { me._onCloseModal() }
            });

            // set elements
            me._bindSelectors();

            // set message
            me.$message.html( message );
            me.$el.find( "button" ).html( me.options.submitValue );

            // do we want to valign?
            if ( me.options.valign == true )
                // add class
                me.$message.addClass( "is--vertical-centered" );

            // bind events
            me._bindEvents();

            // call callback
            me.options.afterOpenCallback.call( me );
        },

        // ...
        _bindSelectors: function()
        {
            // get this
            var me = this;

            // set elements
            me.$body         = $( "body" );
            me.$el           = me.$body.find( me.selectors.container );
            me.$message      = me.$el.find( me.selectors.message );
            me.$submitButton = me.$el.find( me.selectors.submitButton );
        },

        // ...
        _bindEvents: function()
        {
            // get this
            var me = this;

            // clear
            me.$submitButton.on( "click", function() { me._onSubmitClick(); } );
        },

        // ...
        _onSubmitClick: function ()
        {
            // close the modal
            $.modal.close();
        },

        // ...
        _onCloseModal: function ()
        {
            // call the callback
            this.options.callback.call(
                this
            );
        }
    };

})(jQuery);
