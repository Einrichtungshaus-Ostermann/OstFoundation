
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
    $.ostFoundationCalculator = {

        // selectors
        selectors: {
            container:        'div.ost-foundation--calculator',
            clearButton:      'button[data-clear="true"]',
            clearEntryButton: 'button[data-clear-entry="true"]',
            submitButton:     'button[data-submit="true"]',
            number:           '*[data-number="true"]',
            operator:         '*[data-operator="true"]',
            operatorDecimal:  '*[data-decimal="true"]',
            operatorPercent:  '*[data-percent="true"]',
            operatorNegative: '*[data-negative="true"]',
            output:           'button[data-output="true"]',
            summary:          'button[data-summary="true"]'
        },

        // more options...
        options: {
        },

        // default options
        defaults: {
        },

        // ...
        template: '<div class="calculator-container"><button class="is--button is--blue is--bold is--summary" data-summary="true"></button><button class="is--button is--blue is--bold is--output" data-output="true"></button><button class="is--button" data-number="true" data-input="7">7</button><button class="is--button" data-number="true" data-input="8">8</button><button class="is--button" data-number="true" data-input="9">9</button><button class="is--button" data-negative="true">+/-</button><button class="is--button" data-percent="true">%</button><button class="is--button" data-number="true" data-input="4">4</button><button class="is--button" data-number="true" data-input="5">5</button><button class="is--button" data-number="true" data-input="6">6</button><button class="is--button" data-operator="true" data-input="+">+</button><button class="is--button" data-operator="true" data-input="-">-</button><button class="is--button" data-number="true" data-input="1">1</button><button class="is--button" data-number="true" data-input="2">2</button><button class="is--button" data-number="true" data-input="3">3</button><button class="is--button" data-operator="true" data-input="*">*</button><button class="is--button" data-operator="true" data-input="/">/</button><button class="is--button" data-number="true" data-input="0">0</button><button class="is--button" data-decimal="true">,</button><button class="is--button is--green" data-operator="true" data-input="=">=</button><button class="is--button is--red" data-clear="true">C</button><button class="is--button is--red" data-clear-entry="true">CE</button></div>',

        // our input
        input: "",

        // body
        $body: null,

        // the element container
        $el: null,

        // buttons
        $clearButton:  null,
        $clearEntryButton:  null,
        $submitButton: null,
        $output: null,
        $summary: null,
        $input: null,
        $operator: null,
        $operatorDecimal: null,
        $operatorPercent: null,
        $operatorNegative: null,

        // ...
        accum: 0,
        flagNewNum: false,
        pendingOp: "",
        resetSummary: false,

        // ...
        open: function( title, options )
        {
            // get this
            var me = this;

            // set options
            me.options = $.extend( {}, me.defaults, ( ( typeof options == "undefined" ) ? {} : options ) );

            // reset input
            me.input = "";

            // set defaults
            me.accum = 0;
            me.flagNewNum = false;
            me.pendingOp = "";
            me.resetSummary = false;

            // open a modal with our template
            $.modal.open( me.template, {
                title:           title,
                sizing:          "fixed",
                width:           "60%",
                height:          "80%",
                animationSpeed:  0,
                keyboardClosing: false,
                additionalClass: "ost-foundation--calculator",
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
            me.$clearButton = me.$el.find( me.selectors.clearButton );
            me.$clearEntryButton = me.$el.find( me.selectors.clearEntryButton );
            me.$submitButton = me.$el.find( me.selectors.submitButton );
            me.$output = me.$el.find( me.selectors.output );
            me.$summary = me.$el.find( me.selectors.summary );
            me.$input = me.$el.find( me.selectors.number );
            me.$operator = me.$el.find( me.selectors.operator );
            me.$operatorDecimal = me.$el.find( me.selectors.operatorDecimal );
            me.$operatorPercent = me.$el.find( me.selectors.operatorPercent );
            me.$operatorNegative = me.$el.find( me.selectors.operatorNegative );
        },

        // ...
        _bindEvents: function()
        {
            // get this
            var me = this;

            // listeners
            me.$clearButton.on( "click", function() { me._onClearClick(); } );
            me.$clearEntryButton.on( "click", function() { me._onClearEntryClick(); } );
            me.$submitButton.on( "click", function() { me._onSubmitClick(); } );
            me.$input.on( "click", function() { me._onInputClick( $( this ) ); } );
            me.$operator.on( "click", function() { me._onOperatorClick( $( this ) ); } );
            me.$operatorDecimal.on( "click", function() { me._onOperatorDecimalClick( $( this ) ); } );
            me.$operatorPercent.on( "click", function() { me._onOperatorPercentClick( $( this ) ); } );
            me.$operatorNegative.on( "click", function() { me._onOperatorNegativeClick( $( this ) ); } );
        },

        // ...
        _onInputClick: function ( button ) {
            // get this
            var me = this;

            // get the new input
            var input = button.attr("data-input");

            if ( me.resetSummary == true )
            {
                me.resetSummary = false;
                me.$summary.html( "" );
            }

            // new input?
            if (me.flagNewNum)
            {
                // do it
                me.input = input;
                me.flagNewNum = false;
                me.$summary.html( me.$summary.html() + input );
            }
            else
            {
                // ...
                if ( me.input == "0" )
                {
                    if ( me.input != "0" )
                        me.$summary.html( me.$summary.html() + input );
                }
                else
                    me.$summary.html( me.$summary.html() + input );
                
                // special case for 0 as current input
                me.input = ( me.input == "0" )
                    ? input
                    : me.input + input;
            }

            // output
            me.$output.html( me.input );
        },

        // ...
        _onOperatorClick: function ( button )
        {
            // get this
            var me = this;

            // get the new input
            var input = button.attr( "data-input" );

            if ( me.flagNewNum && me.pendingOp != "=" )
            {
            }
            else
            {
                // do we want to reset the summary?
                if ( me.resetSummary == true && input != "=" )
                {
                    // reset it
                    me.resetSummary = false;
                    me.$summary.html( me.$output.html() );
                }

                // not new
                me.flagNewNum = true;

                // do mathematical stuff
                if ('+' == me.pendingOp)
                    me.accum += parseFloat(me.input);
                else if ('-' == me.pendingOp)
                    me.accum -= parseFloat(me.input);
                else if ('/' == me.pendingOp)
                    me.accum /= parseFloat(me.input);
                else if ('*' == me.pendingOp)
                    me.accum *= parseFloat(me.input);
                else
                    me.accum = parseFloat(me.input);

                // when we want the calculated result
                if ( input == "=" )
                    // round it
                    me.accum = Math.round( parseFloat(me.accum) * 100 ) / 100;

                // summary always for not =
                if ( input != "=" )
                {
                    me.$summary.html( me.$summary.html() + input );
                }
                else
                {
                    // reset summary on next input
                    me.resetSummary = true;

                    // do we already have the "=" as last char?
                    if ( me.$summary.html().slice(-1) != "=" )
                        // add it if not
                        me.$summary.html( me.$summary.html() + input );
                }

                // set output
                me.input = me.accum;
                me.$output.html( me.input );

                // set pending
                me.pendingOp = input;
            }
        },

        // ...
        _onOperatorDecimalClick: function ( button )
        {
            // get this
            var me = this;

            // get current temp input
            var curReadOut = me.input;

            // new input
            if (me.flagNewNum) {
                curReadOut = "0.";
                me.flagNewNum = false;
                me.$summary.html( me.$summary.html() + "0." );
            } else {
                if (curReadOut.indexOf(".") == -1)
                {
                    curReadOut += ".";
                    me.$summary.html( me.$summary.html() + "." );
                }
            }

            // set output
            me.input = curReadOut;
            me.$output.html( me.input );
        },

        // ...
        _onOperatorPercentClick: function ( button )
        {
            // get this
            var me = this;

            // ...
            var percent = (parseFloat(me.input) / 100) * parseFloat(me.accum);

            // round it
            percent = Math.round( percent * 100 ) / 100;

            // update summary
            me.$summary.html( me.$summary.html() + "%" );

            // calculate and output
            me.input = percent;
            me.$output.html( me.input );
        },

        // ...
        _onOperatorNegativeClick: function ( button )
        {
            // get this
            var me = this;

            // calculate and output
            me.input = parseFloat(me.input) * -1;
            me.$output.html( me.input );
        },

        // ...
        _onClearClick: function ()
        {
            // get this
            var me = this;

            // clear
            me.accum = 0;
            me.pendingOp = "";
            me._onClearEntryClick();
        },

        // ...
        _onClearEntryClick: function ()
        {
            // get this
            var me = this;

            // clear
            me.input = "";
            me.$summary.html( "" );
            me.$output.html( "" );
            me.flagNewNum = true;
            me.resetSummary = false;
        },

        // ...
        _onCloseModal: function()
        {
        }

    };

})(jQuery);
