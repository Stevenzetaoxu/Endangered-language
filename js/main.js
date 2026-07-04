/* =============================================
   ECHOES OF A LIVING LANGUAGE — Interactive JS
   Endangered Language Archive
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navigation Scroll Effect ----
  const nav = document.querySelector('.site-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- Active Nav Link Highlighting ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ---- Tab Navigation (Data page) ----
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      // Update button states
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content visibility
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });
    });
  });

  // ---- Audio Playback (Vocabulary) ----
  const playButtons = document.querySelectorAll('.vocab-audio-btn, .sentence-audio-btn');

  playButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();

      // If this button is already playing, stop it
      if (this.classList.contains('playing')) {
        this.classList.remove('playing');
        return;
      }

      // Stop all other playing buttons
      document.querySelectorAll('.playing').forEach(el => {
        el.classList.remove('playing');
      });

      // Visual feedback - start playing
      this.classList.add('playing');

      // Get the word text for simulated playback display
      const card = this.closest('.vocab-card');
      if (card) {
        const wordEl = card.querySelector('.vocab-word');
        if (wordEl) {
          showPlaybackNotification(wordEl.textContent);
        }
      }

      // Simulate playback (since we can't actually play audio files)
      // In production, this would play an actual audio file
      setTimeout(() => {
        this.classList.remove('playing');
      }, 1500);
    });
  });

  // ---- Story Audio Row Play Buttons ----
  const storyPlayBtns = document.querySelectorAll('.story-audio-row .play-btn');

  storyPlayBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const row = this.closest('.story-audio-row');
      const bar = row.querySelector('.story-audio-progress-bar');
      const timeDisplay = row.querySelector('.story-audio-time');

      if (this.classList.contains('playing')) {
        this.classList.remove('playing');
        this.textContent = '►';
        return;
      }

      // Stop all other story play buttons
      document.querySelectorAll('.story-audio-row .play-btn.playing').forEach(el => {
        el.classList.remove('playing');
        el.textContent = '►';
      });

      this.classList.add('playing');
      this.textContent = '■';

      // Animate progress bar
      let progress = 0;
      const duration = 3000; // 3 seconds simulated
      const interval = 30;
      const step = (interval / duration) * 100;

      const timer = setInterval(() => {
        progress += step;
        bar.style.width = Math.min(progress, 100) + '%';

        const elapsed = Math.floor((progress / 100) * (duration / 1000));
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (progress >= 100) {
          clearInterval(timer);
          this.classList.remove('playing');
          this.textContent = '►';
          bar.style.width = '0%';
          timeDisplay.textContent = '0:00';
        }
      }, interval);
    });
  });

  // ---- Playback Notification (Audio toast) ----
  function showPlaybackNotification(word) {
    // Remove existing notification
    const existing = document.querySelector('.audio-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'audio-notification';
    notification.innerHTML = `
      <span class="audio-notification-icon">♪</span>
      <span>Playing: <strong>${word}</strong></span>
    `;

    // Style it
    notification.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: var(--color-bg-dark, #2C2416);
      color: #D4CEC6;
      padding: 12px 24px;
      border-radius: 50px;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 2000;
      opacity: 0;
      transition: all 0.4s ease;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      font-family: var(--font-body, sans-serif);
    `;

    notification.querySelector('.audio-notification-icon').style.cssText = `
      font-size: 1.2rem;
      animation: audio-notif-pulse 0.6s ease-in-out infinite alternate;
    `;

    // Add keyframe animation
    if (!document.getElementById('audio-notif-style')) {
      const style = document.createElement('style');
      style.id = 'audio-notif-style';
      style.textContent = `
        @keyframes audio-notif-pulse {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Remove after delay
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(20px)';
      setTimeout(() => notification.remove(), 400);
    }, 2000);
  }

  // ---- Scroll-triggered fade-in animations ----
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  // ---- Contact Form Handling ----
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate sending
      setTimeout(() => {
        submitBtn.textContent = '✓ Message Sent!';

        // Reset form
        contactForm.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ---- Vocabulary Search ----
  const searchInput = document.querySelector('.search-bar input');
  const vocabGrid = document.querySelector('.vocab-grid');

  if (searchInput && vocabGrid) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = vocabGrid.querySelectorAll('.vocab-card');

      cards.forEach(card => {
        const word = card.querySelector('.vocab-word')?.textContent.toLowerCase() || '';
        const ipa = card.querySelector('.vocab-ipa')?.textContent.toLowerCase() || '';
        const translation = card.querySelector('.vocab-translation')?.textContent.toLowerCase() || '';

        if (word.includes(query) || ipa.includes(query) || translation.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ---- Smooth anchor scrolling for same-page links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ---- Dynamic Copyright Year ----
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
