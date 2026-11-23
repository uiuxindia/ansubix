(() => {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-navigation');
  const subButton = document.querySelector('.submenu-trigger');
  const submenuRoot = document.querySelector('.has-submenu');
  const setMenu = (open) => {
    if (!menuButton || !mobileNav) return;
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  if (menuButton) menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  if (subButton && submenuRoot) {
    subButton.addEventListener('click', () => {
      const open = !submenuRoot.classList.contains('open');
      submenuRoot.classList.toggle('open',open);
      subButton.setAttribute('aria-expanded',String(open));
    });
  }
  document.addEventListener('click', (e) => {
    if (submenuRoot && !submenuRoot.contains(e.target)) {
      submenuRoot.classList.remove('open');
      subButton?.setAttribute('aria-expanded','false');
    }
    if (mobileNav && menuButton && !mobileNav.hidden && !mobileNav.contains(e.target) && !menuButton.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown',(e) => {
    if (e.key === 'Escape') {
      setMenu(false);
      if (submenuRoot?.classList.contains('open')) {
        submenuRoot.classList.remove('open');
        subButton?.setAttribute('aria-expanded','false');
        subButton?.focus();
      }
    }
  });
  window.addEventListener('resize',()=>{if(window.innerWidth>1050) setMenu(false)});
  const form = document.querySelector('#enquiry-form');
  if(form){
    const status = document.querySelector('#form-status');
    const copyFallback = (text)=>{
      const temp=document.createElement('textarea');temp.value=text;temp.style.position='fixed';temp.style.opacity='0';document.body.appendChild(temp);temp.select();
      const result=document.execCommand('copy');temp.remove();if(!result) throw new Error('Copy failed');
    };
    form.addEventListener('submit',async(e)=>{
      e.preventDefault();
      if(!form.reportValidity())return;
      const data=new FormData(form);
      const message=`ANSUBIX Technologies — Project Enquiry\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\nProject details:\n${data.get('message')}`;
      status.textContent='';status.className='form-status';
      try {
        if(navigator.clipboard?.writeText) await navigator.clipboard.writeText(message);
        else copyFallback(message);
        status.textContent='Enquiry details copied. This website does not transmit your message yet; paste the details into your preferred email or messaging app.';
        status.classList.add('success');
      }catch(error){
        status.textContent='Automatic copy was blocked by your browser. Select and copy your completed form details manually; no message has been sent.';
        status.classList.add('error');
      }
    });
  }
})();

;(() => {
  'use strict';
  const buttons = [...document.querySelectorAll('.v7-filters [data-filter]')];
  const cards = [...document.querySelectorAll('.v7-portfolio-grid [data-category]')];
  if (!buttons.length || !cards.length) return;
  const setFilter = (filter) => {
    buttons.forEach(button => { const active = button.dataset.filter === filter; button.classList.toggle('is-active', active); button.setAttribute('aria-pressed', String(active)); });
    cards.forEach(card => { card.hidden = filter !== 'All' && card.dataset.category !== filter; });
  };
  buttons.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));
})();
