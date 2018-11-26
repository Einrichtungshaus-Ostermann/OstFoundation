
/**
 * Einrichtungshaus Ostermann GmbH & Co. KG - Foundation
 *
 * @package   OstFoundation
 *
 * @author    Eike Brandt-Warneke <e.brandt-warneke@ostermann.de>
 * @copyright 2018 Einrichtungshaus Ostermann GmbH & Co. KG
 * @license   proprietary
 */





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
            container:        'div.ost-foundation--calendar',
            previousMonthButton:      'button[data-previous-month="true"]',
            nextMonthButton: 'button[data-next-month="true"]',
        },

        // more options...
        options: {
        },

        // default options
        defaults: {
        },

        // body
        $body: null,

        // the element container
        $el: null,

        // buttons
        $previousMonthButton: null,
        $nextMonthButton: null,



        // current data
        month: null,
        year: null,


        // ...
        open: function( title, options )
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


        },

        // ...
        _bindEvents: function()
        {
            // get this
            var me = this;

            me.$previousMonthButton.on( "click", function() { me._onPreviousMonthClick( $( this ) ); } );
            me.$nextMonthButton.on( "click", function() { me._onNextMonthClick( $( this ) ); } );

        },




        // ...
        getTemplate: function()
        {
            // get this
            var me = this;

            var calendar = "";

            calendar += '<div class="calendar-container">';



            var months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];




            calendar += '<button class="is--button" data-previous-month="true">&lt;</button>';
            calendar += '<button class="is--button is--month">' + months[me.month - 1] + ' ' + me.year + '</button>';
            calendar += '<button class="is--button" data-next-month="true">&gt;</button>';


            var weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];


            calendar += '<button class="is--button is--calendar-week-header">&nbsp;</button>';

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

            calendar += '<button class="is--button is--calendar-week">' + calendarWeek + '</button>';





            for ( var j = 1; j <= weekday - 1; j++ )
            {

                var day = lastDayOfLastMonth - ( weekday - 1 ) + j;



                calendar += '<button class="is--button is--last-month-day">' + day + '</button>';
            }






            for ( var i = 1; i <= lastDayOfThisMonth; i++ )
            {
                var today = new Date();

                var isToday = ( today.getFullYear() == me.year && today.getMonth() + 1 == me.month && today.getDate() == i );





                calendar += '<button class="is--button is--day' + ( ( isToday == true ) ? ' is--today' : '' ) + '">' + i + '</button>';




                var weekday = new Date(me.year + "-" + me.month + "-" + i).getDay();
                weekday = (weekday===0) ? 7 : weekday;


                if ( weekday == 7 )
                {
                    calendarWeek++;
                    calendar += '<button class="is--button is--calendar-week">' + calendarWeek + '</button>';
                }

            }



            var weekday = new Date(me.year + "-" + me.month + "-01").getDay();
            weekday = (weekday===0) ? 7 : weekday;

            var daysCount = ( weekday - 1 ) + lastDayOfThisMonth;



            var nextMonthDay = 1;



            if ( daysCount < 35 )
            {

                for ( var k = daysCount; k <= 35 - 1; k++ )
                {



                    calendar += '<button class="is--button is--next-month-day">' + nextMonthDay++ + '</button>';
                }



                calendar += '<button class="is--button is--calendar-week">' + ( calendarWeek + 1 ) + '</button>';

            }





            var lastRow = ( daysCount > 35 ) ? 0 : daysCount - 35;


            for ( var l = 1; l <= 7 - lastRow; l++ )
            {
                calendar += '<button class="is--button is--next-month-day">' + nextMonthDay++ + '</button>';
            }




            calendar += '</div>';


            return calendar;
        },




        // ...
        _onPreviousMonthClick: function ( button )
        {
            // get this
            var me = this;





            if ( me.month == 1 )
            {
                me.year = me.year - 1;
                me.month = 12;

            }
            else

            {

                me.month = me.month - 1;

            }




            $.modal.setContent( me.getTemplate());


            // set elements
            me._bindSelectors();

            // bind events
            me._bindEvents();




        },



        // ...
        _onNextMonthClick: function ( button )
        {
            // get this
            var me = this;




            if ( me.month == 12 )
            {
                me.year = me.year + 1;
                me.month = 1;

            }
            else
            {

                me.month = me.month + 1;

            }




            $.modal.setContent( me.getTemplate());



            // set elements
            me._bindSelectors();

            // bind events
            me._bindEvents();


        },




        // ...
        _onCloseModal: function()
        {
        }

    };

})(jQuery);
