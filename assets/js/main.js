'use strict';
(() => {
  document.documentElement.classList.add('js-enabled');
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  const updateHeader = () => { if (header) header.classList.toggle('scrolled', window.scrollY > 24); };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  function closeMenu() {
    if (menuButton) { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); }
    if (navigation) navigation.classList.remove('open');
  }
  if (menuButton && navigation) menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    navigation.classList.toggle('open', !isOpen);
  });
  navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (navigation && menuButton && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 981px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -35px 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('in-view'));
  }

  document.querySelectorAll('#year').forEach(y => { y.textContent = String(new Date().getFullYear()); });

  const form = document.getElementById('project-form');
  const message = document.getElementById('form-note');
  const CONTACT_EMAIL = ''; // Set a verified ANSUBIX email to enable composing in the visitor's mail client.
  if (form && message) form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const enquiry = [
      'ANSUBIX TECHNOLOGIES — PROJECT ENQUIRY',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Service: ${data.get('service')}`,
      '',
      'Project brief:',
      String(data.get('brief')),
    ].join('\n');
    message.classList.remove('success', 'error');
    if (CONTACT_EMAIL) {
      const subject = encodeURIComponent(`New project enquiry — ${data.get('service')}`);
      window.location.href = `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${subject}&body=${encodeURIComponent(enquiry)}`;
      message.textContent = 'Your email application should open with the prepared enquiry. Please press Send there.';
      message.classList.add('success');
      return;
    }
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard not available');
      await navigator.clipboard.writeText(enquiry);
      message.textContent = 'Your project brief was copied. This is a demo; no message was sent.';
      message.classList.add('success');
    } catch (_) {
      // Clipboard may be blocked on file:// pages or by browser permissions.
      const temp = document.createElement('textarea');
      temp.value = enquiry;
      temp.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.appendChild(temp);
      temp.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch (_) { /* fallback */ }
      temp.remove();
      message.textContent = copied ? 'Your project brief was copied. This is a demo; no message was sent.' : 'Contact form preview only — connect an email address or endpoint before launch.';
      message.classList.add(copied ? 'success' : 'error');
    }
  });
})();
