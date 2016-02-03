// Верхняя менюха и её выпадули
$(function() {
    $('.menu__item').each(function(argument) {
        var $menu = $(this).find('.menu__sub-list');

        if (!$menu.length) {
            return;
        }

        $menu.show().detach();
        $(this).find('.menu__item-link').qtip({
            position: {
                my: 'top left',
                at: 'bottom left',
                adjust: {
                    x: 70,
                    y: 0
                }
            },
            // show: {
            //     event: 'click'
            // },
            hide: {
                // event: 'click'
                fixed: true,
                delay: 200
            },
            style: {
                classes: '_cost-change',
                // width: 400,
                tip: {
                    width: 15,
                    height: 7,
                    corner: 'right top',
                    // mimic: 'right center'
                    mimic: 'top center',
                    corner: 'top left',
                    offset: 70
                }
            },
            content: $menu
        });
    });
});

// Главный слайдер
$(function() {
    var setPageActive = function(index) {
        $('.slider__pagination-item').removeClass('_active')
            .eq(index).addClass('_active');

        var $item = $('.slider__item').eq(index);
        var data = {
            title: $item.data('title'),
            description: $item.data('description'),
            link: $item.data('link')
        };

        var $form = $('.slider-form');

        if (data.title) {
            $('.slider-form__info-head').text(data.title);
            $('.slider-form__info-text').html(data.description);

            if (data.link) {
                $('.slider-form__info-more').show().attr('href', data.link);
            } else {
                $('.slider-form__info-more').hide();
            }
            $form.fadeIn(300);
        } else {
            $form.fadeOut(300);
        }
    }

    var $mainSlider = $('.slider__carousel');
    $mainSlider
        .jcarousel({
            wrap: 'both',
            animation: 500
        })
        .on('jcarousel:scrollend', function(event, carousel, target, animate) {
            setPageActive(carousel.target().index());
        });

    var interval = $mainSlider.data('interval');
    if (interval != 0) {
        $mainSlider.jcarouselAutoscroll({
            interval: $mainSlider.data('interval'),
            target: '+=1',
            autostart: true
        });
    }


    $('.slider__controls-prev').on('click', function() {
        $mainSlider.jcarousel('scroll', '-=1');
    });

    $('.slider__controls-next').on('click', function() {
        $mainSlider.jcarousel('scroll', '+=1');
    });


    var mainSliderPageTpl = $('.slider__pagination').html();
    $('.slider__pagination')
        .empty()
        .jcarouselPagination({
            'carousel': $mainSlider,
            'item': function(page, carouselItems) {
                return mainSliderPageTpl;
            }
        });

    setPageActive(0);

    $(window).resize(function (argument) {
        setTimeout(function function_name(argument) {
            var index = $mainSlider.data('jcarousel').target().index();
            setPageActive(index);
        }, 100)
    });
});


// Слайдер новостей
$(function() {
    var setPageActive = function(index) {
        var $item = $('.events__slider-item');

        var prevIndex = index - 1;
        var nextIndex = index + 1;

        var $prev = $('.events__slider-controls-item._prev');
        var $prevText = $prev.find('.events__slider-controls-text');
        var $prevImg = $prev.find('.events__slider-controls-pic');

        var $next = $('.events__slider-controls-item._next');
        var $nextText = $next.find('.events__slider-controls-text');
        var $nextImg = $next.find('.events__slider-controls-pic');

        if (prevIndex >= 0) {
            $prev.show();
            $item.eq(prevIndex).data('img');
            $prevText.html($item.eq(prevIndex).data('title'));
            $prevImg.attr('src', $item.eq(prevIndex).data('img'));
        } else {
            $prev.hide();
        }

        if (nextIndex < $item.length) {
            $next.show();
            $item.eq(nextIndex).data('img');
            $nextText.html($item.eq(nextIndex).data('title'));
            $nextImg.attr('src', $item.eq(nextIndex).data('img'));
        } else {
            $next.hide();
        }

    }

    var $slider = $('.events__slider');
    $slider
        .jcarousel({
            animation: 500
        })
        .on('jcarousel:scrollend', function(event, carousel, target, animate) {
            setPageActive(carousel.target().index());
        });


    $('.events__slider-controls-item._prev .events__slider-controls-arr').on('click', function() {
        $slider.jcarousel('scroll', '-=1');
    });

    $('.events__slider-controls-item._next .events__slider-controls-arr').on('click', function() {
        $slider.jcarousel('scroll', '+=1');
    });

    setPageActive(0);
});
