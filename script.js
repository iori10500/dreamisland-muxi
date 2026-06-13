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
      cn:'罗者系列', en:'Luozhe', stars:5, img:'images/r_luozhe.jpg',
      title:'罗者系列', enName:'The Luozhe',
      desc:'临崖而立，180° 将苍山与洱海尽收眼底。旗舰级的开阔与从容，是山海之上最辽远的栖居。',
      types:[
        ['180° 山海揽胜旗舰大床房','Panoramic Mtn. &amp; Sea Flagship King'],
        ['阳台山海揽景大床房','Balcony Mtn. &amp; Sea View King'],
        ['院立露台山海观景大床房','Private Terrace Mtn. &amp; Sea King']
      ]
    },
    {
      cn:'碧沅系列', en:'Biyuan', stars:5, img:'images/r_biyuan.jpg',
      title:'碧沅系列', enName:'The Biyuan',
      desc:'水景露台与星空茶室，光影在水面与天际之间往返。一处可独享的静谧，让山海成为日常的背景。',
      types:[
        ['水景露台山海观景套房','Waterscape Terrace Mtn. &amp; Sea Suite'],
        ['露台山海观景星空茶室套房','Terrace Sea-View Starlight Tea Suite']
      ]
    },
    {
      cn:'水常系列', en:'Shuichang', stars:4.5, img:'images/r_shuichang.jpg',
      title:'水常系列', enName:'The Shuichang',
      desc:'院立大露台延展出生活的余地，山海景致随四季流转，于起居之间皆是风景。',
      types:[
        ['院立大露台山海景大床房','Lawn Private Terrace Sea-View King'],
        ['花园露台山海观景大床房','Garden Terrace Mtn. &amp; Sea King'],
        ['180° 山海观景大床房','180° Mountain &amp; Sea View King']
      ]
    },
    {
      cn:'百草系列', en:'Baicao', stars:4, img:'images/r_baicao.jpg',
      title:'百草系列', enName:'The Baicao',
      desc:'独立露台向山林敞开，草木的气息漫入室内。质朴而温润，是栖居最本真的样子。',
      types:[
        ['独立露台山海揽景大床房','Private Terrace Sea-View King'],
        ['露台山海观景大床房','Terrace Mountain &amp; Sea King'],
        ['露台庭院大床房','Terrace Courtyard King']
      ]
    },
    {
      cn:'寸荷系列', en:'Cunhe', stars:3.5, img:'images/r_cunhe.jpg',
      title:'寸荷系列', enName:'The Cunhe',
      desc:'静卧于庭院深处，以院落为景。是繁华之外，一处可以安然独处的栖身之所。',
      types:[
        ['院落观景大床房','Courtyard View King'],
        ['庭院观景双床房','Courtyard View Twin'],
        ['静谧庭院双床房','Tranquil Courtyard Twin']
      ]
    },
    {
      cn:'分松系列', en:'Fensong', stars:3, img:'images/r_fensong.jpg',
      title:'分松系列', enName:'The Fensong',
      desc:'松影分窗，光自缝隙落入。简练而克制，把空间还给最纯粹的休憩。',
      types:[
        ['静谧院落大床房','Tranquil Courtyard King']
      ]
    },
    {
      cn:'同林庭院', en:'Tonglin Villa', stars:3, img:'images/r_tonglin.jpg',
      title:'同林庭院别墅', enName:'Garden Courtyard Villa',
      desc:'庭院晨观独栋别墅，三室一厅，自成一方天地。独立的院落与起居，是属于家人与挚友的山中居所。',
      types:[
        ['庭院晨观独栋别墅 · 三室一厅','Detached Villa · 3 Bedrooms']
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

  /* ---------- init ---------- */
  function init(){
    bindScroll();
    onScroll();
    initReveal();
    buildStays();
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
