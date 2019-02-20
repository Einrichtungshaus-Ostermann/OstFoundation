
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
            success: function( response ) {},
            failure: function( xhr, status ) {}
        },

        // ...
        defaults: {
            url:              "",
            params:           {},
            method:           "get",
            loadingMessage:   null,
            loadingIndicator: true,
            timeout:          5000
        },

        // ...
        options: {},

        // ...
        get: function( options, callbackSuccess, callbackFailure )
        {
            // get this
            var me = this;

            // set options
            me.options = $.extend( {}, me.defaults, ( ( typeof options == "undefined" ) ? {} : options ) );

            // force valid functions
            callbackSuccess = ( typeof callbackSuccess == "undefined" ) ? me.callbacks.success : callbackSuccess;
            callbackFailure = ( typeof callbackFailure == "undefined" ) ? me.callbacks.failure : callbackFailure;

            // set up
            me.callbacks.success = callbackSuccess;
            me.callbacks.failure = callbackFailure;

            // open loading indicator
            if ( me.options.loadingIndicator == true )
                // open it
                $.ostFoundationLoadingIndicator.open( { message: me.options.loadingMessage } );

            // make call by method
            if ( me.options.method.toLowerCase() == "get" ) {
                // make a defaul ajax request with json type
                return $.ajax({
                    dataType: "json",
                    url: me.options.url,
                    data: me.options.params,
                    success: function( response ) { me._onSuccess( response ); },
                    timeout: me.options.timeout
                }).fail( function( xhr, status ) { me._onFailure( xhr, status ); } );
            }

            // make post request
            $.post(
                me.options.url,
                me.options.params,
                function( response ) { me._onSuccess( response ); },
                "json"
            );
        },

        // ...
        _onSuccess: function( response )
        {
            // get this
            var me = this;

            // loading indicator active?
            if ( me.options.loadingIndicator == true )
                // close loading
                $.ostFoundationLoadingIndicator.close();

            // ...
            me.callbacks.success.call( me, response );
        },

        // ...
        _onFailure: function( xhr, status )
        {
            // get this
            var me = this;

            // loading indicator active?
            if ( me.options.loadingIndicator == true )
                // close loading
                $.ostFoundationLoadingIndicator.close();

            // ...
            me.callbacks.failure.call( me, xhr, status );
        }
    };

})(jQuery);
