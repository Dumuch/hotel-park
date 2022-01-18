//функция скрытия блока по клику вне границ блока
const menuMobile = (...arg) => {
  const [
    classForMenuButton,
    classForSiteNav,
    classmobileMenuButton,
    classwrapperSiteNav
  ] = arg;

  const mobileMenuButton = $(classForMenuButton);
  const wrapperSiteNav = $(classForSiteNav);

  const eventClickOffsetMobileMenu = (evt) => {
    if (!wrapperSiteNav.is(evt.target) && wrapperSiteNav.has(evt.target).length === 0) {
      mobileMenuButton.removeClass(classmobileMenuButton);
      wrapperSiteNav.removeClass(classwrapperSiteNav);
      $(document).off('click', eventClickOffsetMobileMenu);
    }
  }

  $(document).on('click', classForMenuButton, () => {
    if (!wrapperSiteNav.hasClass(classwrapperSiteNav)) {
      mobileMenuButton.addClass(classmobileMenuButton);
      wrapperSiteNav.addClass(classwrapperSiteNav);
      $(document).on('click', eventClickOffsetMobileMenu);
    } else {
      mobileMenuButton.removeClass(classmobileMenuButton);
      wrapperSiteNav.removeClass(classwrapperSiteNav);
    }
  });
}

$(document).ready(function() {
  // открываем меню при клике по кнопке, закрываем при клике вне окна
  menuMobile('._main-header__nav--menu-button', '._wrapper__main-header__nav__list', 'main-header__nav--menu-button--open', 'wrapper__main-header__nav__list--open');

  $.datepicker.regional['ru'] = {
    closeText: 'Закрыть',
    prevText: 'Предыдущий',
    nextText: 'Следующий',
    currentText: 'Сегодня',
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekHeader: 'Не',
    dateFormat: 'dd.mm.yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };
  $.datepicker.setDefaults($.datepicker.regional['ru']);

  $("._datepicker").datepicker();

})