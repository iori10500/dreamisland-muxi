(function(){
  var interactive = document.querySelectorAll('[data-property]');
  var pins = document.querySelectorAll('.map-pin');
  var cards = document.querySelectorAll('.property-card');

  function activate(name){
    pins.forEach(function(pin){ pin.classList.toggle('is-active', pin.dataset.property === name); });
    cards.forEach(function(card){ card.classList.toggle('is-active', card.dataset.property === name); });
  }

  interactive.forEach(function(element){
    element.addEventListener('mouseenter', function(){ activate(element.dataset.property); });
    element.addEventListener('focus', function(){ activate(element.dataset.property); });
    element.addEventListener('touchstart', function(){ activate(element.dataset.property); }, {passive:true});
  });

  document.addEventListener('click', function(event){
    var link = event.target.closest('[data-property]');
    if(link && typeof window.gtag === 'function'){
      window.gtag('event', 'property_select', {
        property_name: link.dataset.property,
        link_url: link.getAttribute('href') || ''
      });
    }
  });

  try{
    var source = new URLSearchParams(location.search).get('utm_source') || document.referrer || '';
    var ai = String(source).toLowerCase().match(/chatgpt|perplexity|copilot|gemini|claude|you\.com|meta\.ai|doubao|toutiao|bytedance/);
    if(ai && typeof window.gtag === 'function') window.gtag('event','ai_referral_landing',{ai_source:ai[0],non_interaction:true});
  }catch(_){ }
})();
