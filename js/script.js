/* ============================================================
   BARALA HOSPITAL — script.js v3
   Clean, minimal, zero-dependency
   [7] Appointment modal: 5 fields only
   ============================================================ */

const WA_APPT    = '918233276903';  // appointment booking only
const WA_GENERAL = '918875004330'; // general contact

/* ── Navbar scroll behaviour ─────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const update = () => {
    if (window.scrollY > 50) {
      nav.classList.replace('top', 'scrolled');
    } else {
      nav.classList.replace('scrolled', 'top');
    }
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

/* ── Hamburger toggle ────────────────────────────────────── */
(function () {
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobile-nav');
  if (!ham || !mob) return;
  ham.addEventListener('click', () => mob.classList.toggle('open'));
  mob.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mob.classList.remove('open'))
  );
})();

/* ── Active nav link ─────────────────────────────────────── */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    if ((link.getAttribute('href') || '') === page) link.classList.add('active');
  });
})();

/* ── Modal open / close ──────────────────────────────────── */
function openModal() {
  const m = document.getElementById('appt-modal');
  if (!m) return;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Set min date to today every time modal opens
  const d = document.getElementById('f-date');
  if (d) d.min = new Date().toISOString().split('T')[0];
}

function closeModal() {
  const m = document.getElementById('appt-modal');
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── DOM ready ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* Wire all appointment triggers */
  document.querySelectorAll('[data-modal="appointment"]').forEach(el =>
    el.addEventListener('click', e => { e.preventDefault(); openModal(); })
  );

  /* Close on overlay click */
  const overlay = document.getElementById('appt-modal');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
  }

  /* ESC to close */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ── [7] Appointment form — 5 fields only ─────────────── */
  const apptForm = document.getElementById('appt-form');
  if (apptForm) {
    apptForm.addEventListener('submit', e => {
      e.preventDefault();
      const name   = v('f-name');
      const age    = v('f-age');
      const gender = v('f-gender');
      const phone  = v('f-phone');
      const date   = v('f-date');

      if (!name || !age || !gender || !phone || !date) {
        return showErr(apptForm, 'Please fill in all required fields.');
      }
      if (!/^[6-9]\d{9}$/.test(phone)) {
        return showErr(apptForm, 'Enter a valid 10-digit Indian mobile number.');
      }

      const msg =
        `*New Appointment — Barala Hospital, Chomu*\n\n` +
        `*Patient Name:* ${name}\n` +
        `*Age:* ${age}\n` +
        `*Gender:* ${gender}\n` +
        `*Phone:* ${phone}\n` +
        `*Preferred Date:* ${date}\n\n` +
        `_Sent via baralahospital website_`;

      window.open(`https://wa.me/${WA_APPT}?text=${encodeURIComponent(msg)}`, '_blank');
      closeModal();
      apptForm.reset();
    });
  }

  /* ── Contact form (contact.html) ─────────────────────── */
  const cForm = document.getElementById('contact-form');
  if (cForm) {
    cForm.addEventListener('submit', e => {
      e.preventDefault();
      const name    = v('c-name');
      const phone   = v('c-phone');
      const email   = v('c-email');
      const subject = v('c-subject');
      const message = v('c-message');

      if (!name || !phone || !subject || !message) {
        return alert('Please fill in all required fields.');
      }

      const msg =
        `*Message — Barala Hospital Website*\n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        (email ? `*Email:* ${email}\n` : '') +
        `*Subject:* ${subject}\n\n` +
        `*Message:*\n${message}\n\n` +
        `_Sent via Contact Form_`;

      window.open(`https://wa.me/${WA_GENERAL}?text=${encodeURIComponent(msg)}`, '_blank');
      cForm.reset();
    });
  }

  /* ── Appointment page form (appointment.html) ─────────── */
  const pForm = document.getElementById('appt-page-form');
  if (pForm) {
    pForm.addEventListener('submit', e => {
      e.preventDefault();
      const name   = pv(pForm, '#p-name');
      const age    = pv(pForm, '#p-age');
      const gender = pv(pForm, '#p-gender');
      const phone  = pv(pForm, '#p-phone');
      const date   = pv(pForm, '#p-date');

      if (!name || !age || !gender || !phone || !date) {
        return alert('Please fill in all required fields.');
      }
      if (!/^[6-9]\d{9}$/.test(phone)) {
        return alert('Enter a valid 10-digit mobile number.');
      }

      const msg =
        `*New Appointment — Barala Hospital, Chomu*\n\n` +
        `*Patient Name:* ${name}\n` +
        `*Age:* ${age}\n` +
        `*Gender:* ${gender}\n` +
        `*Phone:* ${phone}\n` +
        `*Preferred Date:* ${date}\n\n` +
        `_Sent via baralahospital website_`;

      window.open(`https://wa.me/${WA_APPT}?text=${encodeURIComponent(msg)}`, '_blank');
      pForm.reset();
    });

    // Set today as min date
    const pd = pForm.querySelector('#p-date');
    if (pd) pd.min = new Date().toISOString().split('T')[0];
  }

  /* ── Scroll Reveal ────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ── Counter animation (hero stats) ──────────────────── */
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    let n = 0;
    const step = Math.ceil(target / 50);
    const timer = setInterval(() => {
      n = Math.min(n + step, target);
      el.textContent = n.toLocaleString() + suffix;
      if (n >= target) clearInterval(timer);
    }, 25);
  });

}); // DOMContentLoaded

/* ── Helpers ─────────────────────────────────────────────── */
function v(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}
function pv(form, sel) {
  const el = form.querySelector(sel);
  return el ? el.value.trim() : '';
}
function showErr(form, msg) {
  let err = form.querySelector('.f-err');
  if (!err) {
    err = document.createElement('p');
    err.className = 'f-err';
    err.style.cssText = 'color:#DC2626;font-size:.82rem;font-weight:600;margin-bottom:10px;';
    form.prepend(err);
  }
  err.textContent = msg;
  clearTimeout(err._t);
  err._t = setTimeout(() => err.remove(), 4000);
}
