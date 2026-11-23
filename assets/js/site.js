(() => {
  const toggle=document.querySelector('.mobile-toggle');
  const menu=document.getElementById('mobile-menu');
  if(toggle&&menu){
    toggle.addEventListener('click',()=>{ const next=toggle.getAttribute('aria-expanded')!=='true'; toggle.setAttribute('aria-expanded',String(next)); toggle.setAttribute('aria-label',next?'Close menu':'Open menu'); menu.hidden=!next; document.body.classList.toggle('menu-open',next); });
    window.addEventListener('resize',()=>{if(window.innerWidth>980){menu.hidden=true;toggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');}});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();document.body.classList.remove('menu-open');}});
  }
  const dropdown=document.querySelector('.nav-dropdown');
  const trigger=document.querySelector('.nav-dropdown-trigger');
  if(trigger&&dropdown){
    trigger.addEventListener('click',()=>{const open=dropdown.classList.toggle('open');trigger.setAttribute('aria-expanded',String(open));});
    document.addEventListener('click',e=>{if(!dropdown.contains(e.target)){dropdown.classList.remove('open');trigger.setAttribute('aria-expanded','false');}});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){dropdown.classList.remove('open');trigger.setAttribute('aria-expanded','false');}});
  }
  const form=document.getElementById('project-form');
  if(form){form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const note=document.getElementById('form-note');const message=`ANSUBIX Project Enquiry\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\nProject brief:\n${data.get('brief')}`;try{await navigator.clipboard.writeText(message);note.textContent='Project brief copied. Paste it into your preferred email or message. No enquiry was sent.';note.classList.add('ok');}catch(err){const output=document.createElement('textarea');output.value=message;output.className='copy-fallback';output.setAttribute('aria-label','Copy your prepared enquiry');note.insertAdjacentElement('afterend',output);output.select();note.textContent='Clipboard access is unavailable. Select and copy the enquiry shown below. No enquiry was sent.';}});}
})();