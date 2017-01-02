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
