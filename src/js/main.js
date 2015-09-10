/*globals jQuery, window, document */
(function ($, window, document) {
    'use strict';
    window.FAPP = window.FAPP || {
        $body: null,
        init: function () {
            this.$body = $('body');
            this.liveReload();
            this.addNewProjectInput();
            this.addProgressBar();
            this.uploadProgress();
            this.addTopBars();
            this.addUploadFile();
            this.addMenuHandler();
            this.resizeActions();
            this.textOverflow();
            this.paginationSwap();
            this.dragTemplates();
        },
        liveReload: function () {
            if (window.location.hostname === 'localhost') {
                this.$body.append('<script src="//localhost:9000/livereload.js"></script>');
            }
        },

        addNewProjectInput: function () {
            $('.project--add').on('click', function () {
                var $this = $(this);
                $this.addClass('project--add--hovered').find('.project--add__details__new').focus();
            });

            $(document).on('click', function (e) {
                if ($(e.target).closest('.project--add').length === 0) {
                    $('.project--add').removeClass('project--add--hovered');
                }
            });
        },

        addProgressBar: function () {
            $('.progress-bar__value').each(function () {
                var $progressBar = $(this),
                    $progressBarWrap = $progressBar.parent(),
                    progressBarValue = $progressBar.data('progress-value'),
                    $text = $progressBar.parent().find('.progress-bar__text');

                $progressBar.css('width', progressBarValue + '%');

                if (progressBarValue === 100) {
                    $progressBarWrap.addClass('complete');
                    $text.text('COMPLETE');
                } else if (progressBarValue > 97) {
                    $text.css('margin-left', '97%').text(progressBarValue + '%');
                } else if (progressBarValue < 3) {
                    $text.css('margin-left', '0%').text(progressBarValue + '%');
                } else {
                    $text.css('margin-left', progressBarValue - 1 + '%').text(progressBarValue + '%');
                }

                if (progressBarValue < 100 && $progressBar.hasClass('complete')) {
                    $progressBarWrap.removeClass('complete');
                }
            });
        },
        uploadProgress: function () {
            $(document).ready(function () {
                var progressValue = $('.project-upload__box__details__progress__value').data('progress-value');
                $('.file-info__progress-value').text(progressValue + '%');
            });
        },
        addTopBars: function () {
            $(document).ready(function () {
                $('.forms').easyTabs({
                    nav: '.forms__tabs',
                    content: '.forms__content',
                    navActive: 'active',
                    tabActive: 'form-active'
                });
            });
        },
        addUploadFile: function () {
            $('.project-upload__box').not('.template').on('click', function () {
                $('body').toggleClass('uploading');
            });
        },
        addMenuHandler: function () {
            function openMenu() {
                $('.head__userpanel').addClass('active');
                $('.menu').addClass('opened');
            }

            function closeMenu() {
                $('.menu').removeClass('opened');
                $('.head__userpanel').removeClass('active');
            }
            $('.head__userpanel').on('click', function (e) {
                e.preventDefault();
                if ($('.menu').hasClass('opened')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            $('.menu__close').on('click', function (e) {
                e.preventDefault();
                closeMenu();
            });

            $(document).on('click', function (e) {
                if ($(e.target).closest('.menu__list').length === 0 && $(e.target).closest('.head__userpanel').length === 0) {
                    $('.menu').removeClass('opened');
                    $('.head__userpanel').removeClass('active');
                }
            });
        },
        resizeActions: function () {
            var $menu = $('.menu'),
                $userpanel = $('.head__userpanel__text'),
                $filesButton = $('.project-details__files__button'),
                $templatesButton = $('.project-details__templates__button'),
                $tableCells = $('.project-details-table--size, .project-files-table--size'),
                username = $userpanel.text(),
                fileName = $filesButton.text(),
                templateName = $templatesButton.text(),
                regex = /[^\d.\-]/g;
            $(document).ready(function () {
                if (window.matchMedia('(max-width: 640px').matches) {
                    $userpanel.text('');
                    $filesButton.text('Download all');
                    $templatesButton.text('Download all');
                    $tableCells.each(function () {
                        var sizeCell = $(this);
                        sizeCell.text(sizeCell.text().replace(regex, ''));
                    });
                }
            });
            $(window).on('resize', function () {
                if (window.matchMedia('(max-width: 640px').matches) {
                    $userpanel.text('');
                    $filesButton.text('Download all');
                    $templatesButton.text('Download all');
                    $tableCells.each(function () {
                        var sizeCell = $(this);
                        sizeCell.text(sizeCell.text().replace(regex, ''));
                    });
                } else {
                    $userpanel.text(username);
                    $filesButton.text(fileName);
                    $templatesButton.text(templateName);
                    $tableCells.each(function () {
                        var sizeCell = $(this);
                        if (!sizeCell.text().match('MB')) {
                            sizeCell.text(sizeCell.text() + 'MB');
                        }
                    });
                }
            });
            $(window).on('scroll touchmove', function () {
                if (window.matchMedia('(max-width: 640px)').matches && $menu.hasClass('opened')) {
                    $menu.height(window.innerHeight);
                }
            });
        },
        textOverflow: function () {
            $(document).ready(function () {
                $('.template__details__title__wrapper').dotdotdot({
                    ellipsis: '... ',
                    wrap: 'word',
                    after: null,
                    height: 70
                });
                $('.project__details__name').dotdotdot({
                    ellipsis: '... ',
                    wrap: 'word',
                    after: null,
                    height: 50
                });
            });
        },
        paginationSwap: function () {
            $('.all-projects__pagination__item').on('click', function (e) {
                e.preventDefault();
                var $allItems = $('.all-projects__pagination__item'),
                    $paginationItem = $(this),
                    index = $allItems.index($('.all-projects__pagination__item.active')),
                    classNext = 'all-projects__pagination__item--next',
                    classPrev = 'all-projects__pagination__item--prev',
                    amount = $allItems.length;

                $allItems.removeClass('active');
                if (!$paginationItem.hasClass(classNext) && !$paginationItem.hasClass(classPrev)) {
                    $paginationItem.addClass('active');
                } else if ($paginationItem.hasClass(classPrev)) {
                    if (index === 1) {
                        index = amount - 1;
                    }
                    $allItems.eq(index - 1).addClass('active');
                } else if ($paginationItem.hasClass(classNext)) {
                    if (index === (amount - 2)) {
                        index = 0;
                    }
                    $allItems.eq(index + 1).addClass('active');
                }
            });
        },
        dragTemplates: function () {
            $('.project-details__templates__list').sortable({
                appendTo: 'project-details__templates__list',
                placeholder: 'template-placeholder',
                cancel: '.project-upload__box',
                handle: '.template__handle',
                cursor: 'move',
                opacity: 0.8,
                tolerance: 'pointer'
            });
        }
    };
    $(document).on('ready', function () {
        window.FAPP.init();
    });
}(jQuery, window, document));
