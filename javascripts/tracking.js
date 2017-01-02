$(document).ready( ()=> {
  let tracker = {
    pageView (){
      mixpanel.track('PageView', {
        'Title': pageTitle
      })
    },
    onClick (link, title){
      mixpanel.track("Click a link", {
        "Domain": link || '',
        "title": title
      })
    },
    addtoCart (title, price) {
      mixpanel.track("AddToCart", {
        "title": title,
        "price": price
      })
      fbq('track', 'AddToCart', {
        value: price,
        currency: 'TWD'
      })
    },
    scroll(item){
      mixpanel.track("Scroll", {
        'value': item.value,
        'position': item.dom.offset().top
      })
      fbq('track', 'ViewContent')
    }
  }

  // Event
  let pageTitle = $('title').text();
  tracker.pageView()

  $('.mp-click').on('click', function(event) {
    let link = $(this).attr('href')
    let title = $(this).attr('title')
    tracker.onClick(title, link)
  })

  $('.add-to-cart').on('click', function(event) {
    let title = $(this).attr('title');
    let price = $(this).attr('data-price');
    tracker.addtoCart(title, price)
  })

  // scroll
  let scrollArray = [];
  $.each($('.mp-scroll'), function(key, item){
    scrollArray.push({
      'value': $(this).attr('data-mp-text'),
      'position': $(this).offset().top,
      'dom': $(this),
      'sent': true
    });
  });
  $( window ).scroll((e)=> {
    $.each(scrollArray, (key, item)=>{
      let winTop = $('body').scrollTop();
      if (winTop >= item.position && item.dom.offset().top && item.sent) {
        item.sent = false;
        tracker.scroll(item)
      }
    });
  });
});
