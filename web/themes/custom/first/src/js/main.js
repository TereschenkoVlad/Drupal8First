(function ($) {
    let toggleItemMenu = $('.menu .menu-item--expanded .menu')
    toggleItemMenu.addClass('non-active')

    $('.menu .menu-item--expanded').click(function () {
        toggleItemMenu.toggleClass('non-active')
    })
})(jQuery)


