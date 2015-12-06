var media_xs = window.matchMedia("(max-width: 768px)");
var media_sm = window.matchMedia("(max-width: 992px)");
var media_md = window.matchMedia("(min-width: 992px) and (max-width: 1200px)");
var media_lg = window.matchMedia("(min-width: 1200px)");

$(document).ready(function() {
    var doc = $(document);
    $('li.dropdown-click').on('click', '', function() {
        $(this).find('.dropdown-div').toggle();
    });
    $('li.dropdown-hover').on('click', '', function() {
        $(this).find('.dropdown-div').toggle();
    });
    $('#search-offers-wrapper button.btn').on('click', '', function() {
        var par = $(this).closest('#search-offers-wrapper');
        if (par.hasClass('open')) {
            alert('Submit the search form');
        } else {
            par.addClass('open');
            par.find('input').addClass('open');
        }
    });
    $('#budget-sort').on('click', '', function() {
        var $this = $(this);

        if ($this.hasClass('active')) {
            if ($this.hasClass('low_high')) {

                $this.find('.fa-angle-up').css({
                    'transform': 'rotate(180deg)'
                });
                $('#budget-sort').removeClass('low_high');
                $('#budget-sort').addClass('high_low');
            } else if ($this.hasClass('high_low')) {
                $this.find('.fa-angle-up').css({
                    'transform': 'rotate(0deg)'
                });
                $this.removeClass('high_low');
                $this.addClass('low_high');
            }

        } else {
            $this.addClass('active low_high');
        }
    });


    var handler = function(event) {
        // if the target is a descendent of container do nothing
        if ($(event.target).is("#search-offers-wrapper, #search-offers-wrapper *")) return;
        $('#search-offers-wrapper').removeClass('open');
        $('#search-offers-wrapper input').removeClass('open');
    }
    $('.collapse-trigger').on('click', '', function() {
        var $this = $(this);
        var div = $this.closest('.filters-outer-wrap').find('.level-1-collapsible');
        if (div.is(':visible')) {
            div.slideUp();
            $this.removeClass('fa-minus-circle');
            $this.addClass('fa-plus-circle');
        } else {
            div.slideDown();
            $this.removeClass('fa-plus-circle');
            $this.addClass('fa-minus-circle');
        }
    });

    $(document).on("click", handler);

    // $('.offer-card').on('mouseenter','',function(){
    //  $(this).find('.offer-card-overlay').slideDown(300);
    // });
    // $('.offer-card').on('mouseleave','',function(){
    //  $(this).find('.offer-card-overlay').slideUp(300);
    // });

    if (media_xs.matches) {
        $('.filters-outer-wrap').find('.level-1-collapsible').slideUp();
        $('.collapse-trigger').removeClass('fa-minus-circle').addClass('fa-plus-circle');
        bool_xs = true;
    } else {
        bool_xs = false;
    }

    $(window).resize(function() {
        if (media_xs.matches) {
            if (!bool_xs) {
                $('.filters-outer-wrap').find('.level-1-collapsible').slideUp();
                $('.collapse-trigger').removeClass('fa-minus-circle').addClass('fa-plus-circle');
            }
            bool_xs = true;
        } else {
            if (bool_xs) {
                $('.filters-outer-wrap').find('.level-1-collapsible').slideDown();
                $('.collapse-trigger').removeClass('fa-plus-circle').addClass('fa-minus-circle');
            }
            bool_xs = false;
        }
    });
    $(document).scroll(function() {
        var curent_pos = $(this).scrollTop();
        var break_point = 342
        if (curent_pos > break_point) {
            $('.mobile-filters').addClass('open');
        } else {
            $('.mobile-filters').removeClass('open');
        }
    });


});

// .rady function ends here

$('.special-select').each(function() {
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');



    $styledSelect.click(function(e) {
        if ($('.select-options').is(':visible')) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));

            $list.hide();
            if ($('.backdrop').is(':visible')) {
                $('.backdrop').fadeOut(200);
            }
            //console.log($this.val());   

        } else {
            e.stopPropagation();
            $('.backdrop').fadeIn(200);
            $('div.select-styled.active').each(function() {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        } //end if
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        $('.backdrop').fadeOut(200);
        //console.log($this.val());
    });

    $(document).on('click', '', function(event) {
        $styledSelect.removeClass('active');
        $list.hide();
        $('.backdrop').fadeOut(200);
        // if($('.dropdown-div').is(':visible')){
        //     $('.dropdown-div').hide();
        // }
        // $($(event.target).is('.dropdown-click'))
        // {
        //     $('.dropdown-div').hide();
        // } 
    });

});