/* ===== DREAM ISLAND · interactions ===== */
(function(){
  'use strict';
  var isZh = document.documentElement.lang.toLowerCase().indexOf('zh') === 0;

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
  // Room names supplied by Iori; shared Chinese/English quotation registry (16 types).
  var ROOM_COLLECTIONS = [
  {
    "zh": "罗者系列",
    "en": "Luozhe Collection",
    "img": "images/r_luozhe.jpg",
    "subtitleZh": "全景山海",
    "subtitleEn": "Panoramic Mountain & Sea",
    "stars": 5,
    "descZh": "位于崖边，以180°视角展开苍山与洱海。罗者是住在风景之上最舒展、最从容的一种方式。",
    "descEn": "Set on the cliff edge with a 180° view of Cangshan and Erhai, Luozhe is our most expansive and unhurried way to live above the landscape.",
    "rooms": [
      [
        "罗者·1-6 独立露台山海观景大床房",
        "Luozhe 1-6 King, Private Terrace, Mountain & Sea View"
      ],
      [
        "罗者·3-2 180度山海观景旗舰大床房",
        "Luozhe 3-2 Flagship King, 180° Mountain & Sea View"
      ]
    ]
  },
  {
    "zh": "碧沅系列",
    "en": "Biyuan Collection",
    "img": "images/r_biyuan.jpg",
    "subtitleZh": "水景与星光",
    "subtitleEn": "Waterscape & Starlight",
    "stars": 5,
    "descZh": "水景露台与星空茶室，让光线在水面与天空之间流动。山与湖成为私人安静时刻的背景。",
    "descEn": "A waterscape terrace and starlit tea room where light moves between the surface and the sky. A private stillness with the mountain and lake as your backdrop.",
    "rooms": [
      [
        "碧沅·2-2 水景露台山海观景套房",
        "Biyuan 2-2 Suite, Water-feature Terrace, Mountain & Sea View"
      ],
      [
        "碧沅·2-9 露台山海观景星空茶室套房",
        "Biyuan 2-9 Suite, Starry Sky Tea Room, Mountain & Sea View"
      ]
    ]
  },
  {
    "zh": "水常系列",
    "en": "Shuichang Collection",
    "img": "images/r_shuichang.jpg",
    "subtitleZh": "露台生活",
    "subtitleEn": "Terrace Living",
    "stars": 4.5,
    "descZh": "宽阔的私人露台延伸了起居空间。山湖景色随季节变化，让每天的日常都成为一幕风景。",
    "descEn": "Generous private terraces extend the living space. Mountain and lake views shift with the seasons, turning every daily ritual into a scene.",
    "rooms": [
      [
        "水常·1-4 独立大露台山海观景大床房",
        "Shuichang 1-4 King, Grand Private Terrace, Mountain & Sea View"
      ],
      [
        "水常·2-1 露台山海观景大床房",
        "Shuichang 2-1 King, Terrace, Mountain & Sea View"
      ],
      [
        "水常·2-7 花园露台山海观景大床房",
        "Shuichang 2-7 King, Garden Terrace, Mountain & Sea View"
      ],
      [
        "水常·3-1 露台庭院观景大床房",
        "Shuichang 3-1 King, Terrace, Courtyard View"
      ],
      [
        "水常·落日山海观景大床房",
        "Shuichang King, Sunset Mountain & Sea View"
      ]
    ]
  },
  {
    "zh": "百草系列",
    "en": "Baicao Collection",
    "img": "images/r_baicao.jpg",
    "subtitleZh": "森林与花园",
    "subtitleEn": "Forest & Garden",
    "stars": 4,
    "descZh": "私人露台向森林打开，植物的气息进入室内。简单、温暖，靠近居住最本质的样子。",
    "descEn": "Private terraces open to the forest and let the scent of plants drift indoors. Simple, warm and close to the essential nature of dwelling.",
    "rooms": [
      [
        "百草·1-1 独立露台山海观景大床房",
        "Baicao 1-1 King, Private Terrace, Mountain & Sea View"
      ],
      [
        "百草·露台山海观景大床房",
        "Baicao King, Terrace, Mountain & Sea View"
      ],
      [
        "百草·3-7 露台庭院景观大床房",
        "Baicao 3-7 King, Terrace, Courtyard View"
      ]
    ]
  },
  {
    "zh": "寸箐系列",
    "en": "Cunjing Collection",
    "img": "images/r_cunhe.jpg",
    "subtitleZh": "安静庭院",
    "subtitleEn": "Quiet Courtyards",
    "stars": 3.5,
    "descZh": "藏在庭院深处，寸箐的视线向内。它远离喧闹，留下一处适合独处的安静空间。",
    "descEn": "Quietly set deep in the courtyards, Cunjing looks inward. A calm place to be alone, away from the noise of the world.",
    "rooms": [
      [
        "寸箐·庭院景观大床房",
        "Cunjing King, Courtyard View"
      ],
      [
        "寸箐·静谧庭院双床房",
        "Cunjing Twin, Quiet Courtyard"
      ]
    ]
  },
  {
    "zh": "分松系列",
    "en": "Fensong Collection",
    "img": "images/r_fensong.jpg",
    "subtitleZh": "松影与光",
    "subtitleEn": "Pine & Light",
    "stars": 3,
    "descZh": "松影切分窗面，光从缝隙间落下。克制而准确，分松把房间重新还给休息。",
    "descEn": "Pine shadows divide the windows as light falls through the gaps. Restrained and precise, Fensong gives the room back to rest.",
    "rooms": [
      [
        "分松·1-5 静谧庭院大床房",
        "Fensong 1-5 King, Quiet Courtyard"
      ]
    ]
  },
  {
    "zh": "园林庭院别墅",
    "en": "Garden Courtyard Villa",
    "img": "images/r_tonglin.jpg",
    "subtitleZh": "林间的私人之家",
    "subtitleEn": "A private home in the trees",
    "stars": 3,
    "descZh": "拥有独立庭院与起居室的三卧别墅，是为家人和亲密朋友准备的一座山中之家。",
    "descEn": "A detached three-bedroom villa with its own courtyard and living room. A mountain home made for family and close friends.",
    "rooms": [
      [
        "园林庭院景观独栋别墅（三室一厅）",
        "Standalone Villa with Garden Courtyard (3BR / 1LR)"
      ]
    ]
  }
];
  var STAYS = ROOM_COLLECTIONS.map(function(s){
    return {
      cn:isZh ? s.zh : s.en, en:isZh ? s.subtitleZh : s.subtitleEn,
      title:isZh ? s.zh : s.en, enName:s.en, stars:s.stars, img:s.img,
      desc:isZh ? s.descZh : s.descEn,
      types:s.rooms.map(function(room){ return [isZh ? room[0] : room[1]]; })
    };
  });

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
        return '<li><span>'+t[0]+'</span></li>';
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
  function applyPropertyFromUrl(form){
    var requested = new URLSearchParams(window.location.search).get('property');
    if(!['huoshan','erhai','flexible'].includes(requested)) return;
    var option = form.querySelector('input[name="property"][value="'+requested+'"]');
    if(option) option.checked = true;
  }

  function bindEnquiry(){
    document.querySelectorAll('[data-enquiry-form]').forEach(function(form){
      var started = form.elements.started_at;
      var status = form.querySelector('[data-enquiry-status]');
      var submit = form.querySelector('button[type="submit"]');
      applyPropertyFromUrl(form);
      if(started) started.value = String(Date.now());
      if(!status || !submit) return;
      var formStarted = false;
      form.addEventListener('focusin', function(){
        if(formStarted || typeof window.gtag !== 'function') return;
        formStarted = true;
        window.gtag('event', 'enquiry_form_start', Object.assign({
          journey_route: form.elements.route ? form.elements.route.value : 'muxidali',
          lead_source: form.elements.source ? form.elements.source.value : 'muxidali-home'
        }, window.MUXIEnquiryContext ? window.MUXIEnquiryContext() : {}));
      });
      form.addEventListener('submit', async function(e){
        e.preventDefault();
        status.className = 'form-status enquiry-status';
        status.textContent = '';
        if(!form.reportValidity()) return;
        var data = new FormData(form);
        var payload = Object.fromEntries(data.entries());
        var context = window.MUXIEnquiryContext ? window.MUXIEnquiryContext() : {};
        Object.assign(payload, context);
        if(!payload.discovery && context.entry_source) payload.discovery = context.entry_source;
        payload.interests = data.getAll('interests').join(', ');
        var turnstileInput = form.querySelector('[name="cf-turnstile-response"]');
        payload.turnstile_token = turnstileInput ? turnstileInput.value : '';
        submit.disabled = true;
        var label = submit.querySelector('span');
        var original = label ? label.textContent : (isZh ? '发送咨询' : 'Send Enquiry');
        if(label) label.textContent = isZh ? '发送中…' : 'Sending…';
        try{
          var response = await fetch('/api/enquiries', {
            method:'POST',
            headers:{'Content-Type':'application/json', 'Accept':'application/json'},
            body:JSON.stringify(payload)
          });
          var result = await response.json().catch(function(){ return {}; });
          if(!response.ok || !result.ok) throw new Error(result.error || 'failed');
          status.className = 'form-status enquiry-status is-success';
          status.textContent = (isZh ? '已收到。顾问将在24小时内回复。' : 'Received. Your advisor will reply within 24 hours.') + (result.id ? ' · ' + result.id : '');
          form.reset();
          applyPropertyFromUrl(form);
          if(started) started.value = String(Date.now());
          if(window.turnstile) window.turnstile.reset(form.querySelector('.cf-turnstile'));
          if(typeof window.gtag === 'function'){
            window.gtag('event', 'generate_lead', Object.assign({
              currency:'CNY', value:0, enquiry_variant:payload.variant,
              journey_route:payload.route || 'muxidali', lead_source:payload.source || 'muxidali-home',
              property_name:payload.property || 'unspecified'
            }, context));
          }
        }catch(error){
          status.className = 'form-status enquiry-status is-error';
          if(error.message === 'rate_limited') status.textContent = isZh ? '尝试次数过多，请稍后再试。' : 'Too many attempts. Please try again shortly.';
          else if(error.message === 'privacy_consent' || error.message === 'required_fields' || error.message === 'invalid_email' || error.message === 'invalid_timing') status.textContent = isZh ? '请完成必填字段并同意隐私条款。' : 'Please complete the required fields and privacy consent.';
          else if(error.message === 'verification_failed') status.textContent = isZh ? '请完成安全验证后重新提交。' : 'Please complete the security check and submit again.';
          else if(error.message === 'delivery_unavailable') status.textContent = isZh ? '通知通道暂不可用，请发送邮件至 enquiry@muxidali.com。' : 'The notification channel is unavailable. Please email enquiry@muxidali.com.';
          else status.textContent = isZh ? '目前无法提交，请重试或发送邮件至 enquiry@muxidali.com。' : 'We could not submit this right now. Please try again or email enquiry@muxidali.com.';
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
