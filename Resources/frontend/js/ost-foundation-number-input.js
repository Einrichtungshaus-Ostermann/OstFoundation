
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
    $.ostFoundationNumberInput = {

        // callback functions after selection an article or abort
        callbacks: {
            submit:    function( number ) {},
            abort:     function() {},
            validator: function( number ) { return ( number > 0 ); }
        },

        // selectors
        selectors: {
            container:    'div.ost-foundation--number-input',
            clearButton:  'button[data-clear="true"]',
            submitButton: 'button[data-submit="true"]',
            number:       '*[data-number="true"]',
            output:       'button[data-output="true"]'
        },

        // more options...
        options: {},

        // default options
        defaults: {
            castToInteger: true,
            defaultValue:  "",
            submitButton: "Bestätigen",
            clearButton: "Löschen",
            hasDecimals: false,
            noHeader: false
        },

        // ...
        template: '<div class="number-container#additional-class#"><button style="letter-spacing: 6px;" class="is--button is--blue is--bold is--output" data-output="true"></button><button class="is--button" data-number="true" data-input="1">1</button><button class="is--button" data-number="true" data-input="2">2</button><button class="is--button" data-number="true" data-input="3">3</button><button class="is--button" data-number="true" data-input="4">4</button><button class="is--button" data-number="true" data-input="5">5</button><button class="is--button" data-number="true" data-input="6">6</button><button class="is--button" data-number="true" data-input="7">7</button><button class="is--button" data-number="true" data-input="8">8</button><button class="is--button" data-number="true" data-input="9">9</button><button class="is--button is--red is--clear-button" data-clear="true">#clear-button#</button><button class="is--button" data-number="true" data-input="0">0</button><button class="is--button is--decimal-button" data-number="true" data-input=",">,</button><button class="is--button is--green is--submit-button" data-submit="true">#submit-button#</button></div>',

        // our input
        input: "",

        // did we click the action buttons to close the modal?
        actionButtonClicked: false,

        // body
        $body: null,

        // the element container
        $el: null,

        // buttons
        $clearButton:  null,
        $submitButton: null,
        $output:       null,
        $input:        null,

        // ...
        open: function( title, options, callbackSubmit, callbackAbort, callbackValidator )
        {
            // get this
            var me = this;

            // set options
            me.options = $.extend( {}, me.defaults, ( ( typeof options == "undefined" ) ? {} : options ) );

            // reset input
            me.input = me.options.defaultValue;

            // force valid function
            callbackSubmit = ( typeof callbackSubmit == "undefined" ) ? me.callbacks.submit : callbackSubmit;
            callbackAbort = ( typeof callbackAbort == "undefined" ) ? me.callbacks.abort : callbackAbort;
            callbackValidator = ( typeof callbackValidator == "undefined" ) ? me.callbacks.validator : callbackValidator;

            // set up
            me.callbacks.submit    = callbackSubmit;
            me.callbacks.abort     = callbackAbort;
            me.callbacks.validator = callbackValidator;

            // set defaults
            me.actionButtonClicked = false;

            // get the template and replace placeholders
            var template = me.template;
            template = template.replace( "#submit-button#", me.options.submitButton );
            template = template.replace( "#clear-button#", me.options.clearButton );
            template = template.replace( "#additional-class#", ( me.options.hasDecimals == true ) ? " has--decimals" : "" );

            // open a modal with our template
            $.modal.open( template, {
                title:           title,
                sizing:          "fixed",
                width:           "60%",
                height:          "80%",
                animationSpeed:  0,
                keyboardClosing: false,
                additionalClass: "ost-foundation--number-input" + ((me.options.noHeader === true) ? " no--header" : ""),
                onClose:         function() { me._onCloseModal(); }
            });

            // set elements
            me._bindSelectors();

            // bind events
            me._bindEvents();

            // draw the output for the default value
            me.$output.html( me.input );
        },

        // ...
        _bindSelectors: function()
        {
            // get this
            var me = this;

            // set elements
            me.$body = $( "body" );
            me.$el   = me.$body.find( me.selectors.container );

            // set buttons
            me.$clearButton  = me.$el.find( me.selectors.clearButton );
            me.$submitButton = me.$el.find( me.selectors.submitButton );
            me.$output       = me.$el.find( me.selectors.output );
            me.$input        = me.$el.find( me.selectors.number );
        },

        // ...
        _bindEvents: function()
        {
            // get this
            var me = this;

            // clear
            me.$clearButton.on( "click", function() { me._onClearClick(); } );
            me.$submitButton.on( "click", function() { me._onSubmitClick(); } );
            me.$input.on( "click", function() { me._onInputClick( $( this ) ); } );
        },

        // ...
        _onClearClick: function ()
        {
            // get this
            var me = this;

            // clear
            me.input = "";
            me.$output.html( "" );
        },

        // ...
        _onInputClick: function ( button )
        {
            // get this
            var me = this;

            // get the new input
            var input = button.attr( "data-input" );

            // only one decimal char
            if (me.input.indexOf(",") !== -1 && input == ",")
                // nothing to do
                return;

            // always allow every character so we can even start with 0
            me.input = me.input + "" + input;

            // only a decimal without leading zero?
            if ( me.input == "," )
                // add leading zero
                me.input = "0,";

            // and re-draw the output
            me.$output.html( me.input );
        },

        // ...
        _onCloseModal: function()
        {
            // get this
            var me = this;

            // did we click submit?
            if ( me.actionButtonClicked == true )
                // no need to do anything
                return;

            // call the abort callback
            me.callbacks.abort.call( me );
        },

        // ...
        _onSubmitClick: function ()
        {
            // get this
            var me = this;

            // we need at least 1 char
            if ( me.input == "" )
                // stop
                return;

            // make sure we dont call the abort callback
            me.actionButtonClicked = true;

            // close the modal
            $.modal.close();

            // get the input
            var input = ( me.options.castToInteger == true )
                ? parseInt( me.input )
                : me.input;

            // call the validator
            var valid = me.callbacks.validator.call( me, input );

            // ok?
            if ( valid == false )
                // nope
                return;

            // call the callback
            me.callbacks.submit.call( me, input );
        }

    };

})(jQuery);
