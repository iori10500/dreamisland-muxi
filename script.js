/* ===== DREAM ISLAND · interactions ===== */
(function(){
  'use strict';

  /* ---------- smooth scroll for [data-scroll] ---------- */
  function bindScroll(){
    document.querySelectorAll('[data-scroll]').forEach(function(el){
      el.addEventListener('click', function(){
        var t = document.querySelector(el.getAttribute('data-scroll'));
        if(t){ window.scrollTo({top: t.getBoundingClientRect().top + window.pageYOffset - 6, behavior:'smooth'}); }
        closeMenu();
      });
    });
  }

  /* ---------- nav solid on scroll ---------- */
  var nav = document.getElementById('nav');
  var hero = document.getElementById('top');
  function onScroll(){
    var h = hero ? hero.offsetHeight - 90 : 500;
    if(window.pageYOffset > h){ nav.classList.add('solid'); }
    else{ nav.classList.remove('solid'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  /* ---------- mobile menu ---------- */
  var toggle = document.getElementById('navToggle');
  var mmenu = document.getElementById('mmenu');
  function closeMenu(){ if(mmenu){mmenu.classList.remove('open');} document.body.style.overflow=''; }
  if(toggle){
    toggle.addEventListener('click', function(){
      mmenu.classList.toggle('open');
      document.body.style.overflow = mmenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  /* ---------- hero parallax ---------- */
  var heroImg = document.getElementById('heroImg');
  if(heroImg && !matchMedia('(prefers-reduced-motion:reduce)').matches){
    window.addEventListener('scroll', function(){
      var y = window.pageYOffset;
      if(y < window.innerHeight){ heroImg.style.transform = 'scale(1.06) translateY(' + (y*0.18) + 'px)'; }
    }, {passive:true});
  }

  /* ---------- reveal on scroll (robust to proxied-scroll previews) ---------- */
  function revealAll(){
    document.querySelectorAll('.reveal, .img-reveal').forEach(function(el){ el.classList.add('shown'); });
  }
  function scrollWorks(){
    var se = document.scrollingElement || document.documentElement;
    if(se.scrollHeight <= se.clientHeight + 4) return true;   // nothing to scroll
    var prev = se.scrollTop;
    se.scrollTop = prev + 2;
    var moved = se.scrollTop !== prev;
    se.scrollTop = prev;
    return moved;
  }
  function initReveal(){
    if(!('IntersectionObserver' in window) || !scrollWorks()){
      // proxied / non-scrolling context — just show everything
      revealAll();
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal, .img-reveal').forEach(function(el){ io.observe(el); });
    // failsafe: never leave content invisible
    var safety = setTimeout(revealAll, 6000);
    window.addEventListener('beforeunload', function(){ clearTimeout(safety); });
  }

  /* ---------- STAYS data ---------- */
  var STAYS = [
    {
      cn:'Luozhe Collection', en:'Panoramic Mountain &amp; Sea', stars:5, img:'images/r_luozhe.jpg',
      title:'Luozhe Collection', enName:'The Luozhe',
      desc:'Set on the cliff edge with a 180° view of Cangshan and Erhai, Luozhe is our most expansive and unhurried way to live above the landscape.',
      types:[
        ['180° Mountain &amp; Sea Flagship King','Panoramic Flagship Room'],
        ['Balcony Mountain &amp; Sea King','Balcony View Room'],
        ['Private Terrace Mountain &amp; Sea King','Private Terrace Room']
      ]
    },
    {
      cn:'Biyuan Collection', en:'Waterscape &amp; Starlight', stars:5, img:'images/r_biyuan.jpg',
      title:'Biyuan Collection', enName:'The Biyuan',
      desc:'A waterscape terrace and starlit tea room where light moves between the surface and the sky. A private stillness with the mountain and lake as your backdrop.',
      types:[
        ['Waterscape Terrace Mountain &amp; Sea Suite','Waterscape Terrace Suite'],
        ['Terrace Mountain &amp; Sea Starlight Tea Suite','Starlight Tea Suite']
      ]
    },
    {
      cn:'Shuichang Collection', en:'Terrace Living', stars:4.5, img:'images/r_shuichang.jpg',
      title:'Shuichang Collection', enName:'The Shuichang',
      desc:'Generous private terraces extend the living space. Mountain and lake views shift with the seasons, turning every daily ritual into a scene.',
      types:[
        ['Lawn Terrace Mountain &amp; Sea King','Lawn Terrace Room'],
        ['Garden Terrace Mountain &amp; Sea King','Garden Terrace Room'],
        ['180° Mountain &amp; Sea View King','Panoramic View Room']
      ]
    },
    {
      cn:'Baicao Collection', en:'Forest &amp; Garden', stars:4, img:'images/r_baicao.jpg',
      title:'Baicao Collection', enName:'The Baicao',
      desc:'Private terraces open to the forest and let the scent of plants drift indoors. Simple, warm and close to the essential nature of dwelling.',
      types:[
        ['Private Terrace Mountain &amp; Sea King','Private Terrace Room'],
        ['Terrace Mountain &amp; Sea King','Terrace View Room'],
        ['Terrace Courtyard King','Courtyard Room']
      ]
    },
    {
      cn:'Cunhe Collection', en:'Quiet Courtyards', stars:3.5, img:'images/r_cunhe.jpg',
      title:'Cunhe Collection', enName:'The Cunhe',
      desc:'Quietly set deep in the courtyards, Cunhe looks inward. A calm place to be alone, away from the noise of the world.',
      types:[
        ['Courtyard View King','Courtyard Room'],
        ['Courtyard View Twin','Courtyard Twin'],
        ['Tranquil Courtyard Twin','Quiet Courtyard Twin']
      ]
    },
    {
      cn:'Fensong Collection', en:'Pine &amp; Light', stars:3, img:'images/r_fensong.jpg',
      title:'Fensong Collection', enName:'The Fensong',
      desc:'Pine shadows divide the windows as light falls through the gaps. Restrained and precise, Fensong gives the room back to rest.',
      types:[
        ['Tranquil Courtyard King','Quiet Courtyard Room']
      ]
    },
    {
      cn:'Tonglin Courtyard Villa', en:'A private home in the trees', stars:3, img:'images/r_tonglin.jpg',
      title:'Tonglin Courtyard Villa', enName:'Garden Courtyard Villa',
      desc:'A detached three-bedroom villa with its own courtyard and living room. A mountain home made for family and close friends.',
      types:[
        ['Detached Courtyard Villa · 3 Bedrooms','Private Villa']
      ]
    }
  ];

  function starHTML(n){
    var full = Math.floor(n), half = (n - full) >= 0.5;
    var s = '';
    for(var i=0;i<full;i++){ s += '★'; }
    if(half){ s += '<span class="off">★</span>'.replace('★','✦'); }
    for(var j=full+(half?1:0); j<5; j++){ s += '<span class="off">★</span>'; }
    return s;
  }

  function buildStays(){
    var tabs = document.getElementById('stayTabs');
    var panel = document.getElementById('stayPanel');
    if(!tabs || !panel) return;

    STAYS.forEach(function(s, i){
      var b = document.createElement('button');
      b.className = 'stay-tab' + (i===0?' active':'');
      b.innerHTML = '<span class="idx">0'+(i+1)+'</span><span class="cn">'+s.cn+'</span><span class="en">'+s.en+'</span>';
      b.addEventListener('click', function(){ select(i); });
      tabs.appendChild(b);
    });

    function render(i){
      var s = STAYS[i];
      var typesHTML = s.types.map(function(t){
        return '<li><span>'+t[0]+'</span><span class="en">'+t[1]+'</span></li>';
      }).join('');
      panel.innerHTML =
        '<div class="stay-figure"><img src="'+s.img+'" alt="'+s.cn+'"></div>'+
        '<div class="stay-body">'+
          '<div class="stars">'+starHTML(s.stars)+'</div>'+
          '<h3>'+s.title+'</h3>'+
          '<div class="en-name">'+s.enName+'</div>'+
          '<p class="body" style="color:rgba(241,233,221,.72);max-width:440px">'+s.desc+'</p>'+
          '<ul class="stay-types">'+typesHTML+'</ul>'+
        '</div>';
    }

    function select(i){
      var btns = tabs.querySelectorAll('.stay-tab');
      btns.forEach(function(b,bi){ b.classList.toggle('active', bi===i); });
      var img = panel.querySelector('.stay-figure img');
      if(img){ img.style.opacity = 0; }
      setTimeout(function(){ render(i); }, 180);
    }

    render(0);
  }

  /* ---------- enquiry form ---------- */
  function bindEnquiry(){
    document.querySelectorAll('[data-enquiry-form]').forEach(function(form){
      var started = form.elements.started_at;
      var status = form.querySelector('[data-enquiry-status]');
      var submit = form.querySelector('button[type="submit"]');
      if(started) started.value = String(Date.now());
      if(!status || !submit) return;
      form.addEventListener('submit', async function(e){
        e.preventDefault();
        status.className = 'form-status enquiry-status';
        status.textContent = '';
        if(!form.reportValidity()) return;
        var data = new FormData(form);
        var payload = Object.fromEntries(data.entries());
        payload.interests = data.getAll('interests').join(', ');
        var turnstileInput = form.querySelector('[name="cf-turnstile-response"]');
        payload.turnstile_token = turnstileInput ? turnstileInput.value : '';
        submit.disabled = true;
        var label = submit.querySelector('span');
        var original = label ? label.textContent : 'Send Enquiry';
        if(label) label.textContent = 'Sending…';
        try{
          var response = await fetch('/api/enquiries', {
            method:'POST',
            headers:{'Content-Type':'application/json', 'Accept':'application/json'},
            body:JSON.stringify(payload)
          });
          var result = await response.json().catch(function(){ return {}; });
          if(!response.ok || !result.ok) throw new Error(result.error || 'failed');
          status.className = 'form-status enquiry-status is-success';
          status.textContent = 'Received. Your advisor will reply within 24 hours.' + (result.id ? ' · ' + result.id : '');
          form.reset();
          if(started) started.value = String(Date.now());
          if(window.turnstile) window.turnstile.reset(form.querySelector('.cf-turnstile'));
          if(typeof window.gtag === 'function'){
            window.gtag('event', 'generate_lead', {
              currency:'CNY', value:0, enquiry_variant:payload.variant,
              journey_route:payload.route || 'muxidali', lead_source:payload.source || 'muxidali-home'
            });
          }
        }catch(error){
          status.className = 'form-status enquiry-status is-error';
          if(error.message === 'rate_limited') status.textContent = 'Too many attempts. Please try again shortly.';
          else if(error.message === 'privacy_consent' || error.message === 'required_fields' || error.message === 'invalid_email' || error.message === 'invalid_timing') status.textContent = 'Please complete the required fields and privacy consent.';
          else if(error.message === 'verification_failed') status.textContent = 'Please complete the security check and submit again.';
          else if(error.message === 'delivery_unavailable') status.textContent = 'The notification channel is unavailable. Please email enquiry@muxidali.com.';
          else status.textContent = 'We could not submit this right now. Please try again or email enquiry@muxidali.com.';
          if(window.turnstile) window.turnstile.reset(form.querySelector('.cf-turnstile'));
        }finally{
          submit.disabled = false;
          if(label) label.textContent = original;
        }
      });
    });
  }

  /* ---------- analytics interactions ---------- */
  function bindAnalytics(){
    document.addEventListener('click', function(event){
      if(typeof window.gtag !== 'function') return;
      var target = event.target.closest('a,button');
      if(!target) return;
      var href = target.getAttribute('href') || '';
      var scrollTarget = target.getAttribute('data-scroll') || '';
      var inlineAction = target.getAttribute('onclick') || '';
      if(scrollTarget === '#reserve'){
        window.gtag('event', 'reserve_section_open', {link_text:(target.textContent || '').trim()});
      }
      if(href.indexOf('mailto:') === 0){
        window.gtag('event', 'contact_click', {contact_method:'email'});
      }else if(href.indexOf('tel:') === 0 || inlineAction.indexOf('tel:') !== -1){
        window.gtag('event', 'contact_click', {contact_method:'phone'});
      }
    });
  }

  /* ---------- init ---------- */
  function init(){
    bindScroll();
    onScroll();
    initReveal();
    buildStays();
    bindEnquiry();
    bindAnalytics();
    try{
      var source = new URLSearchParams(location.search).get('utm_source') || document.referrer || '';
      var ai = String(source).toLowerCase().match(/chatgpt|perplexity|copilot|gemini|claude|you\.com|meta\.ai|doubao|toutiao|bytedance/);
      if(ai && typeof window.gtag === 'function') window.gtag('event', 'ai_referral_landing', {ai_source:ai[0], non_interaction:true});
    }catch(_){ }
    // capture helper: ?sec=<id> brings a section to the top (works around proxied-scroll previews)
    var capSec = new URLSearchParams(location.search).get('sec');
    if(capSec){
      var t = document.getElementById(capSec);
      if(t){ revealAll(); document.body.style.marginTop = (-t.offsetTop) + 'px'; }
    }
  }
  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', init); }
  else{ init(); }
})();
