(function () {
  'use strict';
  // Store only a published path and a fixed source label, never query strings,
  // customer details or an arbitrary referrer URL.
  var pages = {
    '/': 'muxi_brand', '/zh/': 'muxi_brand_zh',
    '/huoshan/': 'muxi_huoshan', '/zh/huoshan/': 'muxi_huoshan_zh',
    '/erhai/': 'muxi_erhai', '/zh/erhai/': 'muxi_erhai_zh',
    '/journeys/beyond-dali/': 'muxi_journeys'
  };
  var sources = ['chatgpt', 'perplexity', 'gemini', 'copilot', 'claude',
    'doubao', 'deepseek', 'kimi', 'qwen', 'grok', 'google', 'bing', 'baidu',
    'referral_unclassified', 'direct_or_unknown'];
  var domains = {
    'chatgpt.com': 'chatgpt', 'openai.com': 'chatgpt',
    'perplexity.ai': 'perplexity', 'gemini.google.com': 'gemini',
    'copilot.microsoft.com': 'copilot', 'claude.ai': 'claude',
    'doubao.com': 'doubao', 'toutiao.com': 'doubao', 'bytedance.com': 'doubao',
    'deepseek.com': 'deepseek', 'kimi.com': 'kimi', 'kimi.ai': 'kimi',
    'moonshot.cn': 'kimi', 'moonshot.ai': 'kimi', 'qwen.ai': 'qwen', 'tongyi.aliyun.com': 'qwen',
    'grok.com': 'grok', 'google.com': 'google', 'google.com.hk': 'google',
    'bing.com': 'bing', 'baidu.com': 'baidu'
  };
  function recognised(value) {
    value = String(value || '').toLowerCase();
    var aliases = { openai: 'chatgpt', toutiao: 'doubao', bytedance: 'doubao', moonshot: 'kimi', tongyi: 'qwen' };
    if (Object.prototype.hasOwnProperty.call(aliases, value)) return aliases[value];
    if (sources.indexOf(value) !== -1) return value;
    var matched = Object.keys(domains).find(function (domain) {
      return value === domain || value.endsWith('.' + domain);
    });
    return matched ? domains[matched] : '';
  }
  var path = location.pathname.replace(/index\.html$/, '');
  if (!path.endsWith('/')) path += '/';
  if (!Object.prototype.hasOwnProperty.call(pages, path)) return;
  var source = recognised(new URLSearchParams(location.search).get('utm_source'));
  var internal = false;
  if (document.referrer) {
    try {
      var referrer = new URL(document.referrer);
      internal = referrer.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, '');
      if (!source && !internal) source = recognised(referrer.hostname) || 'referral_unclassified';
    } catch (_) { }
  }
  var now = Date.now();
  var entry = { path: path, source: source || 'direct_or_unknown', touched: now };
  try {
    var cached = JSON.parse(sessionStorage.getItem('muxi_enquiry_entry') || 'null');
    if (cached && (!source || (internal && source === cached.source))
        && Object.prototype.hasOwnProperty.call(pages, cached.path)
        && sources.indexOf(cached.source) !== -1
        && Number.isFinite(cached.touched) && now >= cached.touched
        && now - cached.touched < 30 * 60 * 1000) {
      entry.path = cached.path;
      entry.source = cached.source;
    }
    sessionStorage.setItem('muxi_enquiry_entry', JSON.stringify(entry));
  } catch (_) { }
  window.MUXIEnquiryContext = function () {
    return {
      landing_path: entry.path,
      content_group: pages[path],
      entry_source: entry.source,
      page_language: path.indexOf('/zh/') === 0 ? 'zh' : 'en'
    };
  };
})();
