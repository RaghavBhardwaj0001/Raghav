/* ================================================
   Global Trade Exchange — Main JavaScript
   ================================================ */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Mobile nav ----
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => mobileNav.classList.add('open'));
}
if (mobileNavClose) {
  mobileNavClose.addEventListener('click', () => mobileNav.classList.remove('open'));
}
// Close mobile nav on link click
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ---- Auth Modal ----
function openModal(tab) {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.add('open');
    switchTab(tab || 'login');
  }
}
function closeModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('open');
}
function switchTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const tabs = document.querySelectorAll('.modal-tab');
  if (!loginForm || !registerForm) return;

  tabs.forEach(t => t.classList.remove('active'));
  if (tab === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    tabs[0].classList.add('active');
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    tabs[1].classList.add('active');
  }
}
function handleAuth(e, type) {
  e.preventDefault();
  closeModal();
  showToast(type === 'login' ? 'Welcome back! Redirecting to dashboard...' : 'Account created! Welcome aboard.');
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1800);
}

// Close modal on overlay click
document.addEventListener('click', e => {
  const modal = document.getElementById('authModal');
  if (e.target === modal) closeModal();
});

// ---- Toast ----
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ---- Newsletter ----
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail');
  if (email && email.value.includes('@')) {
    showToast('Thank you for subscribing! 🎉');
    email.value = '';
  } else {
    showToast('Please enter a valid email address.');
  }
}

// ---- Counter animation ----
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    if (isNaN(target) || el.dataset.animated === 'true') return;

    const suffix = el.textContent.replace(/[0-9]/g, '').trim();
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    el.dataset.animated = 'true';
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
  });
}

// ---- Scroll animations (Intersection Observer) ----
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) counterObserver.observe(statsBar);
const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ---- Dummy Listings Data ----
const dummyListings = [
  {
    initials: 'AT', company: 'Apex Textiles', location: 'Mumbai, India',
    badge: 'verified', title: 'Cotton Fabric — Bulk Export',
    desc: 'Premium quality cotton fabric available for bulk export. MOQ 5,000 meters. Competitive pricing for long-term contracts.',
    tags: ['Cotton', 'Textiles', 'Export'], value: '$125,000', type: 'Seller'
  },
  {
    initials: 'GS', company: 'GreenSteel Corp', location: 'Shanghai, China',
    badge: 'premium', title: 'Stainless Steel Sheets — Import Inquiry',
    desc: 'Looking for reliable suppliers of SS304 and SS316 stainless steel sheets. Monthly requirement of 200 tons.',
    tags: ['Steel', 'Metal', 'Import'], value: '$340,000', type: 'Buyer'
  },
  {
    initials: 'MF', company: 'Milano Foods', location: 'Milan, Italy',
    badge: 'verified', title: 'Organic Olive Oil — Wholesale',
    desc: 'Premium extra virgin olive oil from Italian farms. Available for worldwide distribution. FDA certified.',
    tags: ['Food', 'Organic', 'Wholesale'], value: '$78,000', type: 'Seller'
  },
  {
    initials: 'TE', company: 'TechElectron Inc', location: 'Seoul, Korea',
    badge: 'premium', title: 'Electronics Components — Bulk Order',
    desc: 'Seeking semiconductor components and PCB boards for manufacturing. Long-term supply contract preferred.',
    tags: ['Electronics', 'Components', 'Tech'], value: '$520,000', type: 'Buyer'
  },
  {
    initials: 'RS', company: 'Royal Spices Ltd', location: 'Kerala, India',
    badge: 'verified', title: 'Organic Spices — Global Export',
    desc: 'Wide range of certified organic spices including cardamom, pepper, and turmeric. Export-ready packaging.',
    tags: ['Spices', 'Organic', 'Export'], value: '$95,000', type: 'Seller'
  },
  {
    initials: 'BM', company: 'BuildMaster LLC', location: 'Dubai, UAE',
    badge: 'premium', title: 'Construction Materials — Import',
    desc: 'Looking for suppliers of cement, rebar, and building materials for large-scale construction projects in Middle East.',
    tags: ['Construction', 'Materials', 'Import'], value: '$1,200,000', type: 'Buyer'
  }
];

function renderListings() {
  const grid = document.getElementById('listingsGrid');
  if (!grid) return;
  grid.innerHTML = dummyListings.map(l => `
    <div class="listing-card animate-on-scroll">
      <div class="listing-header">
        <div class="listing-company">
          <div class="listing-avatar">${l.initials}</div>
          <div>
            <div class="listing-name">${l.company}</div>
            <div class="listing-location"><i class="fas fa-map-marker-alt"></i> ${l.location}</div>
          </div>
        </div>
        <span class="listing-badge badge-${l.badge}">${l.badge === 'premium' ? '★ Premium' : '✓ Verified'}</span>
      </div>
      <div class="listing-body">
        <h4>${l.title}</h4>
        <p>${l.desc}</p>
        <div class="listing-tags">
          ${l.tags.map(t => `<span class="listing-tag">${t}</span>`).join('')}
        </div>
      </div>
      <div class="listing-footer">
        <span class="listing-value">${l.value}</span>
        <span class="listing-type"><i class="fas fa-${l.type === 'Buyer' ? 'shopping-cart' : 'store'}"></i> ${l.type}</span>
      </div>
    </div>
  `).join('');

  // Re-observe new elements
  grid.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
}

renderListings();

// ---- FAQ Accordion ----
document.addEventListener('click', e => {
  const question = e.target.closest('.faq-question');
  if (!question) return;
  const item = question.parentElement;
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
  item.classList.toggle('active');
});

// ---- Contact form ----
function handleContactSubmit(e) {
  e.preventDefault();
  showToast('Message sent successfully! We will get back to you within 24 hours.');
  e.target.reset();
}

// ---- Dashboard sidebar toggle ----
function toggleSidebar() {
  const sidebar = document.querySelector('.dashboard-sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ---- Active nav link ----
(function highlightNavLink() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === page);
  });
})();
