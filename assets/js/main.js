(function () {
  var root = document.querySelector('.site') || document;

  // Mobile navigation
  var toggle = root.querySelector('.nav-toggle');
  var nav = root.querySelector('.site-nav');
  if (toggle && nav) {
    var labels = { open: toggle.getAttribute('data-open') || 'MENU', close: toggle.getAttribute('data-close') || 'CLOSE' };
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? labels.close : labels.open;
    });
  }

  // Team photos: hide the <img> when the file is missing so the initials show
  var photos = root.querySelectorAll('.photo img, .profile-photo img');
  Array.prototype.forEach.call(photos, function (img) {
    var markMissing = function () { img.classList.add('missing'); };
    img.addEventListener('error', markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  // Graphical abstract: show the image file when it exists, otherwise the inline SVG
  var gaFigures = root.querySelectorAll('[data-ga]');
  Array.prototype.forEach.call(gaFigures, function (fig) {
    var img = fig.querySelector('.ga-img');
    if (!img) return;
    var useImage = function () { if (img.naturalWidth > 0) fig.classList.add('has-image'); };
    img.addEventListener('load', useImage);
    if (img.complete) useImage();
  });

  // Copyright year
  var years = root.querySelectorAll('[data-current-year]');
  Array.prototype.forEach.call(years, function (node) { node.textContent = String(new Date().getFullYear()); });

  // "Last updated" in the footer: window.SITE_UPDATED (assets/data/news.js) overrides the built-in date
  if (typeof window.SITE_UPDATED === 'string' && /^\d{4}(-\d{2}){0,2}$/.test(window.SITE_UPDATED)) {
    var stamps = root.querySelectorAll('[data-site-updated]');
    Array.prototype.forEach.call(stamps, function (node) {
      node.setAttribute('datetime', window.SITE_UPDATED);
      node.textContent = window.SITE_UPDATED.split('-').join('.');
    });
  }

  // Copy e-mail address
  var copyButtons = root.querySelectorAll('.copy-btn');
  Array.prototype.forEach.call(copyButtons, function (btn) {
    var target = root.querySelector(btn.getAttribute('data-copy-target') || '.email');
    var idle = btn.textContent;
    var done = btn.getAttribute('data-done') || 'COPIED';
    if (!target) return;
    btn.addEventListener('click', function () {
      var text = target.textContent.trim();
      var finish = function () {
        btn.textContent = done;
        btn.classList.add('done');
        setTimeout(function () { btn.textContent = idle; btn.classList.remove('done'); }, 1800);
      };
      var fallback = function () {
        try {
          var range = document.createRange();
          range.selectNodeContents(target);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          btn.textContent = btn.getAttribute('data-selected') || 'SELECTED';
          setTimeout(function () { btn.textContent = idle; }, 1800);
        } catch (e) { /* selection unavailable */ }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(finish, fallback);
      } else {
        fallback();
      }
    });
  });

  // News: render from window.SITE_NEWS (assets/data/news.js)
  var CATS = {
    publication: { ja: '論文', en: 'Publication' },
    award: { ja: '受賞', en: 'Award' },
    grant: { ja: '研究費', en: 'Grant' },
    talk: { ja: '学会発表', en: 'Talk' },
    member: { ja: 'メンバー', en: 'Members' },
    event: { ja: 'イベント', en: 'Event' },
    media: { ja: 'メディア', en: 'Media' },
    news: { ja: 'お知らせ', en: 'News' }
  };
  var newsItems = Array.isArray(window.SITE_NEWS) ? window.SITE_NEWS.slice() : [];
  var dateKey = function (d) {
    var parts = String(d || '').split('-');
    while (parts.length < 3) parts.push('00');
    return parts.map(function (x) { return ('00' + x).slice(-2 - (x.length > 2 ? x.length - 2 : 0)); }).join('-');
  };
  newsItems.sort(function (a, b) { return dateKey(b.date) < dateKey(a.date) ? -1 : dateKey(b.date) > dateKey(a.date) ? 1 : 0; });
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  };
  var fmtDate = function (d) { return String(d || '').split('-').join('.'); };
  var textOf = function (item, lang) {
    var t = item[lang] || item[lang === 'ja' ? 'en' : 'ja'] || {};
    return { title: t.title || '', body: t.body || '' };
  };
  var catLabel = function (cat, lang) { var c = CATS[cat] || CATS.news; return c[lang] || c.en; };
  var renderItem = function (item, lang, compact) {
    var t = textOf(item, lang);
    var cat = CATS[item.category] ? item.category : 'news';
    var title = item.link && item.link.url
      ? '<a href="' + esc(item.link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(t.title) + '</a>'
      : esc(t.title);
    var html = '<li class="news-item" data-category="' + cat + '">' +
      '<time class="news-date" datetime="' + esc(item.date) + '">' + esc(fmtDate(item.date)) + '</time>' +
      '<div class="news-body"><span class="news-cat">' + esc(catLabel(cat, lang)) + '</span>' +
      '<strong class="news-title">' + title + '</strong>';
    if (t.body) html += '<p class="news-text">' + esc(t.body) + '</p>';
    if (!compact && item.link && item.link.url) {
      html += '<a class="study-link" href="' + esc(item.link.url) + '" target="_blank" rel="noopener noreferrer">' + esc(item.link.label || item.link.url) + ' \u2197</a>';
    }
    return html + '</div></li>';
  };

  var lists = root.querySelectorAll('[data-news-list]');
  Array.prototype.forEach.call(lists, function (list) {
    var lang = list.getAttribute('data-lang') || 'ja';
    var limit = parseInt(list.getAttribute('data-limit') || '0', 10);
    var items = limit > 0 ? newsItems.slice(0, limit) : newsItems;
    if (!items.length) {
      list.outerHTML = '<p class="news-empty">' + esc(list.getAttribute('data-empty') || '') + '</p>';
      return;
    }
    var compact = list.hasAttribute('data-compact');
    list.innerHTML = items.map(function (it) { return renderItem(it, lang, compact); }).join('');
  });

  var archive = root.querySelector('[data-news-archive]');
  if (archive) {
    var lang = archive.getAttribute('data-lang') || 'ja';
    var filters = root.querySelector('[data-news-filters]');
    var current = 'all';
    var draw = function () {
      var items = newsItems.filter(function (it) { return current === 'all' || (CATS[it.category] ? it.category : 'news') === current; });
      if (!items.length) {
        archive.innerHTML = '<p class="news-empty">' + esc(archive.getAttribute('data-empty') || '') + '</p>';
        return;
      }
      var years = [];
      var byYear = {};
      items.forEach(function (it) {
        var y = String(it.date || '').slice(0, 4) || '—';
        if (!byYear[y]) { byYear[y] = []; years.push(y); }
        byYear[y].push(it);
      });
      archive.innerHTML = years.map(function (y) {
        return '<section class="news-year-group"><h2 class="news-year">' + esc(y) + '</h2><ol class="news-list">' +
          byYear[y].map(function (it) { return renderItem(it, lang); }).join('') + '</ol></section>';
      }).join('');
    };
    if (filters) {
      var present = [];
      newsItems.forEach(function (it) { var c = CATS[it.category] ? it.category : 'news'; if (present.indexOf(c) < 0) present.push(c); });
      var allLabel = filters.getAttribute('data-all') || (lang === 'ja' ? 'すべて' : 'All');
      var buttons = [{ key: 'all', label: allLabel }].concat(present.map(function (c) { return { key: c, label: catLabel(c, lang) }; }));
      filters.innerHTML = buttons.map(function (b) {
        return '<button type="button" class="chip' + (b.key === 'all' ? ' active' : '') + '" data-filter="' + b.key + '" aria-pressed="' + (b.key === 'all') + '">' + esc(b.label) + '</button>';
      }).join('');
      filters.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-filter]');
        if (!btn) return;
        current = btn.getAttribute('data-filter');
        Array.prototype.forEach.call(filters.querySelectorAll('[data-filter]'), function (b) {
          var on = b === btn;
          b.classList.toggle('active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        draw();
      });
      if (newsItems.length === 0) filters.hidden = true;
    }
    draw();
  }

  // Research page: highlight the section in view
  var toc = root.querySelector('.toc');
  if (toc && 'IntersectionObserver' in window) {
    var links = toc.querySelectorAll('a[href^="#"]');
    var map = {};
    Array.prototype.forEach.call(links, function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var sections = root.querySelectorAll('.research-item[id]');
    var current = null;
    var setActive = function (id) {
      if (current === id) return;
      current = id;
      Array.prototype.forEach.call(links, function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
    };
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      if (visible.length) setActive(visible[0].target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
    Array.prototype.forEach.call(sections, function (s) { observer.observe(s); });
    if (sections.length) setActive(sections[0].id);
  }
})();
