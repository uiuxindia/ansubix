/* Ansubix Technologies - script.js (jQuery 3.x) */
(function ($) {
  'use strict';
  var $win = $(window), $doc = $(document);
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  $(function () {
    $('#year').text(new Date().getFullYear());

    /* Hero headline: split into words for a staggered reveal */
    var $h1 = $('#headline');
    if ($h1.length && !reduceMotion) {
      var words = $h1.html().split(/(\s+)/).map(function (part) {
        return /^\s+$/.test(part) ? part : '<span class="w">' + part + '</span>';
      }).join('');
      $h1.html(words);
      $h1.find('.w').each(function (i) {
        var el = this;
        setTimeout(function () { el.classList.add('in'); }, 120 + i * 55);
      });
      setTimeout(function () { $h1.addClass('ready'); }, 120);
    }

    /* Photos: hide broken images so the gradient fallback shows */
    $('img').on('error', function () { $(this).addClass('img-missing'); });
    $('img').each(function () { if (this.complete && this.naturalWidth === 0) $(this).addClass('img-missing'); });

    /* Header state, scroll progress (passive, throttled via rAF) */
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var st = $win.scrollTop();
        var max = $doc.height() - $win.height();
        $('#hdr').toggleClass('scrolled', st > 30);
        $('#progress').css('width', max > 0 ? (st / max * 100) + '%' : '0');
        ticking = false;
      });
    }
    $win.on('scroll', onScroll);
    onScroll();

    /* Mobile menu */
    $('#burger').on('click', function () {
      var open = $('#menu').toggleClass('open').hasClass('open');
      $(this).attr('aria-expanded', open);
    });
    $('#menu a').on('click', function () {
      $('#menu').removeClass('open');
      $('#burger').attr('aria-expanded', 'false');
    });

    /* Smooth scroll to in-page anchors (header offset handled by CSS scroll-padding) */
    $('a[href^="#"]').on('click', function (e) {
      var id = this.getAttribute('href');
      if (id.length > 1 && $(id).length) {
        e.preventDefault();
        var y = $(id).offset().top - 74;
        if (reduceMotion) window.scrollTo(0, y);
        else $('html, body').stop().animate({ scrollTop: y }, 800, 'swing');
        history.replaceState(null, '', id);
      }
    });

    /* Reveal on scroll (IntersectionObserver, no layout thrash) */
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });

      var pio = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { $('#process-line').addClass('in'); pio.disconnect(); }
      }, { threshold: 0.3 });
      var pl = document.getElementById('process-line');
      if (pl) pio.observe(pl);
    } else {
      $('.rv').addClass('in');
      $('#process-line').addClass('in');
    }

    /* Services: accessible tabs, keyboard arrows, auto-advance paused on hover */
    var $tabs = $('.svc-tab'), $items = $('.svc-item'), $art = $('.svc-art svg');
    var cur = 0, timer = null;

    function showSvc(i, focus) {
      cur = (i + $tabs.length) % $tabs.length;
      $tabs.each(function (n) {
        var on = n === cur;
        $(this).attr({ 'aria-selected': on, tabindex: on ? 0 : -1 });
      });
      $items.removeClass('show').eq(cur).addClass('show');
      $art.removeClass('show').eq(cur).addClass('show');
      if (focus) $tabs.eq(cur).trigger('focus');
    }
    function play() {
      if (reduceMotion) return;
      clearInterval(timer);
      timer = setInterval(function () { showSvc(cur + 1); }, 6500);
    }
    $tabs.on('click', function () { showSvc($(this).data('i')); play(); });
    $tabs.on('keydown', function (e) {
      var k = e.key, i = $(this).data('i');
      if (k === 'ArrowDown' || k === 'ArrowRight') { e.preventDefault(); showSvc(i + 1, true); play(); }
      if (k === 'ArrowUp' || k === 'ArrowLeft') { e.preventDefault(); showSvc(i - 1, true); play(); }
    });
    $('#services .svc').on('mouseenter', function () { clearInterval(timer); }).on('mouseleave', play);
    showSvc(0);
    play();

    /* FAQ accordion (keyboard-accessible buttons) */
    $('.faq button').on('click', function () {
      var $faq = $(this).closest('.faq');
      var willOpen = !$faq.is('[data-open]');
      $('.faq').removeAttr('data-open').find('button').attr('aria-expanded', 'false');
      if (willOpen) {
        $faq.attr('data-open', '');
        $(this).attr('aria-expanded', 'true');
      }
    });

    /* Enquiry form: client-side validation (connect a real endpoint before going live) */
    $('#enquiry').on('submit', function (e) {
      e.preventDefault();
      var form = this, ok = true;
      $(form).find('[required]').each(function () {
        var valid = !!this.value && (this.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value));
        $(this).css('border-color', valid ? '' : '#f472b6');
        if (!valid) ok = false;
      });
      if (ok) { $('#sent').fadeIn(400); form.reset(); }
    });
  });
})(jQuery);
