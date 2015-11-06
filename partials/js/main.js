(function ($, window, document) {
    "use strict";
    window.FRONTEDAPP = window.FRONTEDAPP || {
        $body: null,
        init: function () {
            this.$body = $('body');
            this.userTools();
            this.projectActionForm();
            this.progressBarValue();
            this.headerBehavior();
            this.niceFileInput();
            this.paginationActivePage();
            this.paginationBehavior();
            this.dotDotDot();
        },
        breakpoint: function () {
            return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
        },
        preventFunction: function (element) {
            $(element).on('click', function (e) {
                e.preventDefault();
            });
        },
        userTools: function () {
            var that = this;
            $('.js-trigger-user-box').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).parent('.user-box').toggleClass('active');
            });

            $('body').on('click', function() {
                $('.user-box').removeClass('active');
            });
        },
        projectActionForm: function () {
            var $this,
                $form = $('form'),
                $input = $('form input');
            $('.js-teaser').on('click', function (e) {
                $this = $(this);
                e.stopPropagation();
                $this.addClass('active');
                $this.find($form).addClass('active');
                $this.find($input).focus();

                if ($this.find($input).val().length > 0) {
                    $this.find($form).submit();
                }
            });

            $(document).on('click', function () {
                $('.js-teaser').removeClass('active').find($form).removeClass('active');
            });            
        },
        progressBarValue: function () {
            var $progressBarWrapper = $('.progress-bar-wrapper'),
                $progressBar,
                $progressBarValue,
                $this,
                value;

            $progressBarWrapper.each(function () {
                $this = $(this);
                $progressBar = $this.find('.progress-bar');
                $progressBarValue = $this.find('.progress-bar-value .qty');

                // get the value of progress bar
                value = String($progressBar.val());

                // append value to progress bar value element
                $progressBarValue.text(value);
            });
        },
        headerGetHidden: function ($header) {
            $header.on({
                mouseenter: function(){
                    $header.removeClass('hidden');
                },
                mouseleave: function(){
                    $header.addClass('hidden');
                }
            });               
        },
        headerGetSmall: function ($header) {
            var $window = $(window),
                distance,
                that = this;
            $window.on('scroll', function () {
                distance = $window.scrollTop();

                if (distance >= 25) {
                    $header.addClass('small');
                } else {
                    $header.removeClass('small');
                }

                if (distance > 50 && that.breakpoint() === 'desktop') {
                    $header.addClass('hidden');
                    that.headerGetHidden($header);
                } else {
                    $header.removeClass('hidden');
                }
            });
        },
        headerBehavior: function () {
            var that = this,
                $header = $('.sec--head');

            that.headerGetSmall($header);
        },
        niceFileInput: function () {
            $('.input--file').nicefileinput();
        },
        paginationActivePage: function () {
            var $pageBox = $('.pagination-list__item'),
                $this,
                that = this;

            $pageBox.on('click', function () {
                $this = $(this);
                console.log('page clicked');

                $this.parent('.pagination-list').find($pageBox).removeClass('active');
                $this.addClass('active');
                that.paginationBehavior();
            });
        },
        paginationBehaviorConditions: function ($box, $li, $first, $last, length) {

            if ($li.is('.active') && length <= 1) {
                $box.removeClass('prev-active');
                $box.removeClass('next-active');
                console.log('cond 1');
            } else if ($li.is('.active') && length > 1) {
                console.log('cond 2');
                if ($first.is('.active')) {
                    console.log('cond 2a');
                    $box.removeClass('prev-active');
                    $box.addClass('next-active');
                } else if ($last.is('.active')) {
                    console.log('cond 2b');
                    $box.addClass('prev-active');
                    $box.removeClass('next-active');
                } else {
                    console.log('cond 2c');
                    $box.addClass('prev-active');
                    $box.addClass('next-active');
                }

            } else {
                console.log('cond 3');
                if (length > 1) {
                    console.log('cond 3a');
                    $box.removeClass('prev-active');
                    $box.addClass('next-active');
                } else {
                    console.log('cond 3b');
                    $box.removeClass('prev-active');
                    $box.removeClass('next-active');
                    $li.addClass('active');
                }
                
            }
        },
        paginationBehavior: function () {
            var $list = $('.pagination-list'),
                $box,
                $this,
                $first,
                $last,
                $li,
                $activeLi,
                length,
                that = this;

            $list.each(function () {
                $this = $(this);
                $box = $this.parent('.pagination-box');
                $li = $this.children($('li'));
                $first = $this.find($('li:first'));
                $last = $this.find($('li:last'));
                length = $li.length;

                $first.addClass('first');
                $last.addClass('last');



                that.paginationBehaviorConditions($box, $li, $first, $last, length);                
            });
        },
        dotDotDot: function () {
            $('.teaser .project-title .label').dotdotdot({
                wrap: 'letter',
                height: 60
            });

        }
    };
    $(document).on('ready', function () {
        window.FRONTEDAPP.init();
    });
}(jQuery, window, document));