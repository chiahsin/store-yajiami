'use strict';

$(document).ready(function () {
  var d = void 0,
      timer = void 0;
  if ($('#footer-clock').length) {
    timer = $('#footer-clock').val();
    timer = new Date(timer);
    d = new Date();
    if (d < timer) {
      $('.clock').countdown(timer, function (event) {
        return $('.clock').html(event.strftime('優惠僅剩 %D天 %H時 %M分 %S秒'));
      });
      $('.if-clock').show();
      $('.fab-fixed-wrap').addClass('with-navbar-bottom');
    }
  }
});
'use strict';

$(function () {
    $('img.lazy').lazy({
        placeholder: '/images/loading_fade.gif'
    });
});
// $(document).ready(()=> {
//   let today = new Date()
//   let today_hours = today.getHours()
//   let today_week = today.getDay()
//   const displayContact = {
//     tel: '週一至週五 09:00 ~ 17:00 <br>\
//     <div class="h5 mb-0">洽詢 <span class="fa fa-phone"></span>：07-2691598</div>',
//     phone: '<div class="h5 mb-0">歡迎洽詢 <span class="fa fa-phone"></span>：0955717458</div>'
//   }
//
//   let contact = ''
//   if (today_week !== 0 && today_hours >= 9 && today_hours <= 17) {
//     contact = displayContact.tel
//   } else {
//     contact = displayContact.phone
//   }
//
//   $('contact').html(contact)
//   console.log(contact);
// });
"use strict";
'use strict';

$(document).ready(function () {
  var tracker = {
    pageView: function pageView() {
      mixpanel.track('PageView', {
        'Title': pageTitle
      });
    },
    onClick: function onClick(link, title) {
      mixpanel.track("Click a link", {
        "Domain": link || '',
        "title": title
      });
    },
    addtoCart: function addtoCart(title, price) {
      mixpanel.track("AddToCart", {
        "title": title,
        "price": price
      });
      fbq('track', 'AddToCart', {
        value: price,
        currency: 'TWD'
      });
    },
    scroll: function scroll(item) {
      mixpanel.track("Scroll", {
        'value': item.value,
        'position': item.dom.offset().top
      });
      fbq('track', 'ViewContent');
    }
  };

  // Event
  var pageTitle = $('title').text();
  tracker.pageView();

  $('.mp-click').on('click', function (event) {
    var link = $(this).attr('href');
    var title = $(this).attr('title');
    tracker.onClick(title, link);
  });

  $('.add-to-cart').on('click', function (event) {
    var title = $(this).attr('title');
    var price = $(this).attr('data-price');
    tracker.addtoCart(title, price);
  });

  // scroll
  var scrollArray = [];
  $.each($('.mp-scroll'), function (key, item) {
    scrollArray.push({
      'value': $(this).attr('data-mp-text'),
      'position': $(this).offset().top,
      'dom': $(this),
      'sent': true
    });
  });
  $(window).scroll(function (e) {
    $.each(scrollArray, function (key, item) {
      var winTop = $('body').scrollTop();
      if (winTop >= item.position && item.dom.offset().top && item.sent) {
        item.sent = false;
        tracker.scroll(item);
      }
    });
  });
});