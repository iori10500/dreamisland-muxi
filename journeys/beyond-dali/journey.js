(function(){
  'use strict';
  var nav = document.getElementById('journeyNav');
  function setNav(){ if(nav) nav.classList.toggle('is-solid', window.scrollY > 80); }
  setNav();
  window.addEventListener('scroll', setNav, {passive:true});

  document.addEventListener('click', function(event){
    var link = event.target.closest('[data-wr-link]');
    if(!link || typeof window.gtag !== 'function') return;
    window.gtag('event', 'partner_outbound_click', {
      partner_name:'WR Travel',
      link_id:link.getAttribute('data-wr-link'),
      link_url:link.href,
      page_location:location.href
    });
  });
})();
