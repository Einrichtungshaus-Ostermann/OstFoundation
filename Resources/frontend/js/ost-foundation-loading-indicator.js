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
    $.ostFoundationLoadingIndicator = {

        // default options
        defaults: {
            delay:          0,
            animationSpeed: 0,
            closeOnClick:   false,
            openOverlay:    true,
            message:        null
        },

        // current options
        options: {},

        // timer configuration
        timerDelay: 350,
        timerMaxSteps: 5,

        // timer stuff
        timerResource: null,
        timerStep: -1,
        timerActive: false,



        // ...
        open: function( indicatorOptions )
        {
            // get this
            var me = this;

            // reset timer rescource
            me.timerResource = null;
            me.timerStep     = -1;
            me.timerActive   = false;

            // save options
            me.options = $.extend( {}, me.defaults, indicatorOptions );

            // open loading indicator
            $.loadingIndicator.open( me.options );

            // do we have a message?
            if ( me.options.message !== null )
            // create message timer
                me._createMessage();
        },



        // ...
        _createMessage: function()
        {
            // get this
            var me = this;

            // append our default message
            $( "body" ).find( "div.js--loading-indicator" ).append(
                '<div class="message">' + me.options.message + '<span style="opacity: 0;">.</span>'.repeat( ( me.timerMaxSteps ) ) + '</div>'
            );

            // set timer as active
            me.timerActive = true;

            // set timer
            me.timerResource = setInterval(
                function() { me._nextMessageTimer( me ); },
                me.timerDelay
            );

            // call first run immediatly
            me._nextMessageTimer( me );
        },



        // ...
        _nextMessageTimer: function( me )
        {
            // add next step
            me.timerStep++;

            // begin at the start again?!
            if ( me.timerStep > me.timerMaxSteps )
            // oki
                me.timerStep = 0;

            // reset the message
            $( "body" ).find( "div.js--loading-indicator div.message" ).html(
                me.options.message + ".".repeat( me.timerStep ) + '<span style="opacity: 0;">.</span>'.repeat( ( me.timerMaxSteps - me.timerStep ) )
            );
        },



        // ...
        _clearTimer: function()
        {
            // get this
            var me = this;

            // even active?
            if ( me.timerActive == false )
            // stop
                return;

            // clear interval
            clearInterval( me.timerResource );

            // reset vars
            me.timerActive   = false;
            me.timerResource = null;
        },



        // ...
        close: function()
        {
            // remove message
            $( "body" ).find( "div.js--loading-indicator div.message" ).remove();

            // stop and clear timer
            this._clearTimer();

            // close loading indicator
            $.loadingIndicator.close();
        }

    };

})(jQuery);
