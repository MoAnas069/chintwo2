import { CHINTWO_STUDIO } from '../data/portfolio.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initAccordions();
  initArtworkModal();
  initWorksFilter();
  initContactForm();
  initScrollAnimations();
  initMobileWorksSlider();
  initHeroParallax();
});

/* 1. Header Scroll Behavior */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* 2. Mobile Menu Toggle */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (!toggle || !overlay) return;

  toggle.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Toggle navigation menu');
    overlay.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggle.innerHTML = isOpen 
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8h16M4 16h16"/></svg>';
  });

  // Close when clicking link
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Toggle navigation menu');
      document.body.style.overflow = '';
      toggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8h16M4 16h16"/></svg>';
    });
  });
}

/* 3. Accordions */
function initAccordions() {
  const items = document.querySelectorAll('.accordion-item, .accordion-item-bone');
  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger, .accordion-trigger-bone');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => {
        i.classList.remove('active');
        const trig = i.querySelector('.accordion-trigger, .accordion-trigger-bone');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* 4. Artwork Lightbox Modal */
function initArtworkModal() {
  const modal = document.querySelector('#artwork-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const modalImg = modal.querySelector('#modal-img');
  const modalTitle = modal.querySelector('#modal-title');
  const modalCategory = modal.querySelector('#modal-category');
  const modalMedium = modal.querySelector('#modal-medium');
  const modalDimensions = modal.querySelector('#modal-dimensions');
  const modalYear = modal.querySelector('#modal-year');
  const modalLocation = modal.querySelector('#modal-location');
  const modalDesc = modal.querySelector('#modal-desc');
  const modalIndex = modal.querySelector('#modal-index');
  const modalInquire = modal.querySelector('#modal-inquire-link');
  let lastFocusedElement = null;

  function openArtwork(art, sourceEl) {
    if (!art) return;
    lastFocusedElement = sourceEl || document.activeElement;
    modalImg.src = art.image;
    modalImg.alt = art.title;
    modalTitle.textContent = art.title;
    if (modalCategory) modalCategory.textContent = art.category;
    if (modalMedium) modalMedium.textContent = art.medium;
    if (modalDimensions) modalDimensions.textContent = art.dimensions;
    if (modalYear) modalYear.textContent = art.year;
    if (modalLocation) modalLocation.textContent = art.location;
    if (modalDesc) modalDesc.textContent = art.description;
    if (modalIndex) modalIndex.textContent = `${art.index} / ${art.total || '06'}`;
    if (modalInquire) {
      modalInquire.href = `/contact.html?inquiry=${encodeURIComponent(art.title)}`;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Attach to work cards
  document.querySelectorAll('[data-artwork-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const id = card.getAttribute('data-artwork-id');
      const art = CHINTWO_STUDIO.artworks.find(a => a.id === id);
      if (art) openArtwork(art, card);
    });
  });
}

/* 5. Works Filter Tabs */
function initWorksFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workCards = document.querySelectorAll('.work-card');
  if (!filterBtns.length || !workCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.getAttribute('data-filter');
      workCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* 6. Contact Form Submission */
function initContactForm() {
  const form = document.querySelector('#studio-contact-form');
  const feedback = document.querySelector('#form-feedback');
  if (!form) return;

  // Check URL params for prefilled inquiry
  const urlParams = new URLSearchParams(window.location.search);
  const inquiry = urlParams.get('inquiry');
  const messageInput = form.querySelector('textarea[name="message"]');
  if (inquiry && messageInput) {
    messageInput.value = `Regarding acquisition / inquiry for "${inquiry}":\n\n`;
    messageInput.focus();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Transmitting to Atelier...';

    // Simulate authentic studio dispatch
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      if (feedback) {
        feedback.style.display = 'block';
        feedback.innerHTML = `
          <div style="padding: 1.25rem; background: rgba(85, 255, 153, 0.08); border: 1px solid rgba(85, 255, 153, 0.3); border-radius: 8px; color: #55ff99; font-size: 0.9rem; line-height: 1.5;">
            <strong>Inquiry Transmitted to Chintwo Studio.</strong><br>
            Your dispatch has been registered. An atelier representative will reply within 24–48 hours.
          </div>
        `;
      }
    }, 900);
  });
}

/* 7. Scroll Entrance Reveals */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* 8. Mobile Casual Works Slider ("Simply, the work.") */
function initMobileWorksSlider() {
  const section = document.querySelector('#selected-works');
  if (!section) return;

  const track = section.querySelector('.works-grid');
  const cards = section.querySelectorAll('.work-card');
  const indicatorContainer = section.querySelector('.works-slider-indicators');
  if (!track || !cards.length) return;

  // Build dots for mobile carousel
  if (indicatorContainer && !indicatorContainer.children.length) {
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `works-slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to work ${idx + 1} of ${cards.length}`);
      dot.addEventListener('click', () => {
        scrollToCard(idx);
        resetAutoSlide();
      });
      indicatorContainer.appendChild(dot);
    });
  }

  const dots = indicatorContainer ? indicatorContainer.querySelectorAll('.works-slider-dot') : [];

  function updateActiveDot(activeIndex) {
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });
  }

  function getActiveIndex() {
    const scrollLeft = track.scrollLeft;
    let closestIdx = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const diff = Math.abs(card.offsetLeft - track.offsetLeft - scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    return closestIdx;
  }

  function scrollToCard(index) {
    if (index < 0 || index >= cards.length) return;
    const targetCard = cards[index];
    const targetLeft = targetCard.offsetLeft - track.offsetLeft - (track.clientWidth - targetCard.clientWidth) / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth'
    });
    updateActiveDot(index);
  }

  // Update dots on scroll
  let scrollTicking = false;
  track.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateActiveDot(getActiveIndex());
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Casual Auto-Slide: gently and casually advances slides when idle and in view
  let autoSlideTimer = null;
  let isInteracting = false;
  let resumeTimer = null;

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function startAutoSlide() {
    if (window.innerWidth > 768) return;
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      if (isInteracting) return;
      const current = getActiveIndex();
      const next = (current + 1) % cards.length;
      scrollToCard(next);
    }, 4000);
  }

  function resetAutoSlide() {
    isInteracting = true;
    stopAutoSlide();
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      isInteracting = false;
      startAutoSlide();
    }, 5000);
  }

  // Pause on user touch interaction
  track.addEventListener('touchstart', () => {
    isInteracting = true;
    stopAutoSlide();
  }, { passive: true });

  track.addEventListener('touchend', () => {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      isInteracting = false;
      startAutoSlide();
    }, 4500);
  }, { passive: true });

  // Avoid opening artwork modal on touch swipe gestures
  let startX = 0;
  let isDragging = false;
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = false;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (Math.abs(e.touches[0].clientX - startX) > 12) {
      isDragging = true;
    }
  }, { passive: true });

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (isDragging) {
        e.stopImmediatePropagation();
        e.preventDefault();
        isDragging = false;
      }
    }, true);
  });

  // Observe visibility
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startAutoSlide();
        } else {
          stopAutoSlide();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(section);
  } else {
    startAutoSlide();
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      startAutoSlide();
    } else {
      stopAutoSlide();
    }
  });
}

/* 9. Hero Stage Subtle Layered Parallax */
function initHeroParallax() {
  const stage = document.querySelector('#hero-stage');
  if (!stage) return;
  const secondary = stage.querySelector('.hero-layer-secondary');
  if (!secondary) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  stage.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 900) return;
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        secondary.style.transform = `translate3d(${x * 14}px, calc(2.8rem + ${y * 10}px), 0)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  stage.addEventListener('mouseleave', () => {
    if (window.innerWidth <= 900) return;
    secondary.style.transform = 'translate3d(0, 2.8rem, 0)';
  });
}
