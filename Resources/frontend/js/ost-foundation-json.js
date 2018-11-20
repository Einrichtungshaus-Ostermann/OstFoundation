
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
    $.ostFoundationJson = {

        // callback functions
        callbacks: {
            success: function( response ) {}
        },

        // ...
        defaults: {
            url:              "",
            params:           {},
            method:           "get",
            loadingMessage:   null,
            loadingIndicator: true
        },

        // ...
        options: {},

        // ...
        get: function( options, callbackSuccess )
        {
            // get this
            var me = this;

            // set options
            me.options = $.extend( {}, me.defaults, ( ( typeof options == "undefined" ) ? {} : options ) );

            // force valid functions
            callbackSuccess = ( typeof callbackSuccess == "undefined" ) ? me.callbacks.success : callbackSuccess;

            // set up
            me.callbacks.success = callbackSuccess;

            // open loading indicator
            if ( me.options.loadingIndicator == true )
                // open it
                $.ostFoundationLoadingIndicator.open( { message: me.options.loadingMessage } );

            // make call by method
            if ( me.options.method.toLowerCase() == "get" )
                // make get request
                return $.getJSON(
                    me.options.url,
                    me.options.params,
                    function( response ) { me._afterAjaxCall( response ); }
                );

            // make post request
            $.post(
                me.options.url,
                me.options.params,
                function( response ) { me._afterAjaxCall( response ); },
                "json"
            );
        },

        // ...
        _afterAjaxCall: function( response )
        {
            // get this
            var me = this;

            // loading indicator active?
            if ( me.options.loadingIndicator == true )
                // close loading
                $.ostFoundationLoadingIndicator.close();

            // ...
            me.callbacks.success.call( me, response );
        }
    };

})(jQuery);
