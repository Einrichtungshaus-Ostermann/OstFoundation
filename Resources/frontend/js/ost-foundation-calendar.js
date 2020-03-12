
/**
 * Einrichtungshaus Ostermann GmbH & Co. KG - Foundation
 *
 * @package   OstFoundation
 *
 * @author    Eike Brandt-Warneke <e.brandt-warneke@ostermann.de>
 * @copyright 2018 Einrichtungshaus Ostermann GmbH & Co. KG
 * @license   proprietary
 */

// week number calculator
Date.prototype.getWeekNumber = function(){
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};



;(function ($) {

    // use strict mode
    "use strict";

    // ...
    $.ostFoundationCalendar = {

        // selectors
        selectors: {
            container: 'div.ost-foundation--calendar',
            previousMonthButton: 'button[data-previous-month="true"]',
            nextMonthButton: 'button[data-next-month="true"]',
            selectableDay: 'button.is--current-month.is--day',
            selectableWeek: 'button.is--calendar-week'
        },

        // more options...
        options: {
        },

        // default options
        defaults: {
            selectable: false,
            selectableWeek: false,
            callback: function(year, month, day) {},
            callbackWeek: function(year, week) {}
        },

        // body
        $body: null,

        // the element container
        $el: null,

        // buttons
        $previousMonthButton: null,
        $nextMonthButton: null,
        $selectableDay: null,
        $selectableWeek: null,

        // current data
        month: null,
        year: null,

        // ...
        open: function(title, options)
        {
            // get this
            var me = this;

            // set options
            me.options = $.extend( {}, me.defaults, ( ( typeof options == "undefined" ) ? {} : options ) );

            // set defaults
            var date = new Date();

            // getmonth is 0 for january to 11 for december but we need 1 to 12
            me.month = date.getMonth() + 1;
            me.year = date.getFullYear();

            // ...
            var template = me.getTemplate();

            // open a modal with our template
            $.modal.open( template, {
                title:           title,
                sizing:          "fixed",
                width:           "60%",
                height:          "80%",
                animationSpeed:  0,
                keyboardClosing: false,
                additionalClass: "ost-foundation--calendar",
                onClose:         function() { me._onCloseModal(); }
            });

            // set elements
            me._bindSelectors();

            // bind events
            me._bindEvents();
        },

        // ...
        _bindSelectors: function()
        {
            // get this
            var me = this;

            // set elements
            me.$body = $( "body" );
            me.$el   = me.$body.find( me.selectors.container );
            me.$previousMonthButton = me.$el.find( me.selectors.previousMonthButton );
            me.$nextMonthButton = me.$el.find( me.selectors.nextMonthButton );
            me.$selectableDay = me.$el.find( me.selectors.selectableDay );
            me.$selectableWeek = me.$el.find( me.selectors.selectableWeek );
        },

        // ...
        _bindEvents: function()
        {
            // get this
            var me = this;

            // set listeners
            me.$previousMonthButton.on( "click", function() { me._onPreviousMonthClick( $( this ) ); } );
            me.$nextMonthButton.on( "click", function() { me._onNextMonthClick( $( this ) ); } );
            me.$selectableDay.on( "click", function() { me._onSelectableDayClick( $( this ) ); } );
            me.$selectableWeek.on( "click", function() { me._onSelectableWeekClick( $( this ) ); } );
        },

        // ...
        getTemplate: function()
        {
            // get this
            var me = this;

            // set calendar
            var calendar = "";

            // outer container
            calendar += '<div class="calendar-container">';

            // valid german names
            var months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
            var weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

            // header with previous, next and name of month
            calendar += '<button class="is--button is--month-navigation" data-previous-month="true">&lt;</button>';
            calendar += '<button class="is--button is--month">' + months[me.month - 1] + ' ' + me.year + '</button>';
            calendar += '<button class="is--button is--month-navigation" data-next-month="true">&gt;</button>';

            // second line with kw header
            calendar += '<button class="is--button is--calendar-week-header">KW</button>';

            // followed by week days
            for ( var w in weekdays )
                calendar += '<button class="is--button is--week-day-header">' + weekdays[w] + '</button>';

            // first weekday of the 1st of this month (e.g. 1 -> monday, 7 -> sunday)
            var weekday = new Date(me.year + "-" + me.month + "-01").getDay();
            weekday = (weekday===0) ? 7 : weekday;

            // last day of THIS month
            var today = new Date(me.year + "-" + me.month + "-01");
            var lastDayOfThisMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

            // last day of LAST month
            var today = new Date(me.year + "-" + me.month + "-01");
            today.setHours(-1);
            var lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();

            // get first week number
            var calendarWeek = new Date(me.year + "-" + me.month + "-01").getWeekNumber();

            // first calendar week
            calendar += '<button data-week="' + calendarWeek + '" class="is--button is--calendar-week">' + calendarWeek + '</button>';

            // first row with days from last month
            for ( var j = 1; j <= weekday - 1; j++ )
            {
                // calculate the day
                var day = lastDayOfLastMonth - ( weekday - 1 ) + j;

                // show it
                calendar += '<button class="is--button is--last-month-day">' + day + '</button>';
            }

            // for today calculations
            var today = new Date();

            // every day of this month
            for ( var i = 1; i <= lastDayOfThisMonth; i++ )
            {
                // current day = today?
                var isToday = ( today.getFullYear() == me.year && today.getMonth() + 1 == me.month && today.getDate() == i );

                // show current day
                calendar += '<button data-day="' + i + '" class="is--button is--current-month is--day' + ( ( isToday == true ) ? ' is--today' : '' ) + '">' + i + '</button>';

                // calculate weekday
                var weekday = new Date(me.year + "-" + me.month + "-" + i).getDay();
                weekday = (weekday===0) ? 7 : weekday;

                // are we sunday?
                if ( weekday == 7 )
                {
                    // next row
                    calendarWeek++;

                    // week number of next row
                    calendar += '<button data-week="' + calendarWeek + '" class="is--button is--calendar-week">' + calendarWeek + '</button>';
                }

            }

            // weekday and more calculations
            var weekday = new Date(me.year + "-" + me.month + "-01").getDay();
            weekday = (weekday===0) ? 7 : weekday;
            var daysCount = ( weekday - 1 ) + lastDayOfThisMonth;
            var nextMonthDay = 1;

            // do we need to finish this line with days of next month
            if ( daysCount < 35 )
            {
                // every missing day
                for ( var k = daysCount; k <= 35 - 1; k++ )
                    // next month
                    calendar += '<button class="is--button is--next-month-day">' + nextMonthDay++ + '</button>';

                // finish with calendar week
                calendar += '<button data-week="' + calendarWeek + '" class="is--button is--calendar-week">' + ( calendarWeek + 1 ) + '</button>';

            }

            // number of entries for last row
            var lastRow = ( daysCount > 35 ) ? 0 : daysCount - 35;

            // loop for last row
            for ( var l = 1; l <= 7 - lastRow; l++ )
                // show day of next month
                calendar += '<button class="is--button is--next-month-day">' + nextMonthDay++ + '</button>';

            // outer container
            calendar += '</div>';

            // return html calendar
            return calendar;
        },


        // ...
        _onPreviousMonthClick: function ( button )
        {
            // get this
            var me = this;

            // step one year back
            if ( me.month == 1 )
            {
                // reduce year
                me.year = me.year - 1;
                me.month = 12;

            }
            else
            {
                // reduce month
                me.month = me.month - 1;
            }

            // redraw calendar
            $.modal.setContent( me.getTemplate());
            me._bindSelectors();
            me._bindEvents();
        },

        // ...
        _onNextMonthClick: function ( button )
        {
            // get this
            var me = this;

            // one year forth
            if ( me.month == 12 )
            {
                // add year
                me.year = me.year + 1;
                me.month = 1;
            }
            else
            {
                // next month
                me.month = me.month + 1;
            }

            // redraw calendar
            $.modal.setContent( me.getTemplate());
            me._bindSelectors();
            me._bindEvents();
        },

        // ...
        _onSelectableDayClick: function ( button )
        {
            // get this
            var me = this;

            // selectable?
            if (me.options.selectable === false) {
                // do nothing
                return;
            }

            // close modal
            $.modal.close();

            // call the callback
            me.options.callback.call(me, me.year, me.month, button.data('day'));
        },

        // ...
        _onSelectableWeekClick: function ( button )
        {
            // get this
            var me = this;

            // selectable?
            if (me.options.selectableWeek === false) {
                // do nothing
                return;
            }

            // close modal
            $.modal.close();

            // call the callback
            me.options.callbackWeek.call(me, me.year, button.data('week'));
        },

        // ...
        _onCloseModal: function()
        {
        }
    };



    // our plugin
    $.plugin( "ostFoundationCalendarDateSelection", {

        // on initialization
        init: function ()
        {
            // get this
            var me = this;

            // admin delete
            me._on( me.$el, 'click', $.proxy( me.onOpenCalendar, me ) );
        },

        // ...
        onOpenCalendar: function ( event )
        {
            // get this
            var me = this;

            // open calendar
            $.ostFoundationCalendar.open(
                'Kalender',
                {
                    selectable: true,
                    callback: function(year, month, day)
                    {
                        me.$el.html(day.toString() + '.' + month.toString() + '.' + year.toString());
                    }
                }
            );
        },

        // on destroy
        destroy: function()
        {
            // get this
            var me = this;

            // call the parent
            me._destroy();
        }

    });



    // call our plugin
    $('*[data-ost-foundation-calendar-date-selection="true"]').ostFoundationCalendarDateSelection();

})(jQuery);
