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
    $.ostFoundationAjax = {

        // callback functions
        callback: function( response ) {},

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
        get: function( options, callback )
        {
            // get this
            var me = this;

            // set options
            me.options = $.extend( {}, me.defaults, ( ( typeof options == "undefined" ) ? {} : options ) );

            // force valud functions
            callback = ( typeof callback == "undefined" ) ? me.callbacks : callback;

            // set up
            me.callback = callback;



            // open loading indicator
            if ( me.options.loadingIndicator == true )
                // open it
                $.ostFoundationLoadingIndicator.open( { message: me.options.loadingMessage } );



            // ...
            $.ajax(
                {
                    url:  me.options.url,
                    type: me.options.method.toUpperCase(),
                    data: me.options.params
                }
            ).done( function( response )
                {

                    // loading indicator active?
                    if ( me.options.loadingIndicator == true )
                        // close loading
                        $.ostFoundationLoadingIndicator.close();

                    // ...
                    me.callback.call( me, response );
                }
            );

        }

    };

})(jQuery);
