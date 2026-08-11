import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: '0000',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  
  const [scrolled, setScrolled] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const LAUNCH_DATE = new Date('2030-07-07T00:00:00').getTime();
    
    const padNumber = (num, length) => String(num).padStart(length, '0');

    const updateCountdown = () => {
      const now = Date.now();
      const diff = LAUNCH_DATE - now;

      if (diff <= 0) {
        setTimeLeft({ days: '0000', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: padNumber(days, 4),
        hours: padNumber(hours, 2),
        minutes: padNumber(minutes, 2),
        seconds: padNumber(seconds, 2),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 80);
      setScrollY(currentScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFooter = () => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getHeroContentStyle = () => {
    if (scrollY < window.innerHeight) {
      const opacity = Math.max(1 - (scrollY / window.innerHeight) * 0.8, 0);
      const translate = scrollY * 0.3;
      return {
        opacity,
        transform: `translateY(${translate}px)`
      };
    }
    return {};
  };

  return (
    <>
      <div 
        className="video-bg" 
        style={videoError ? {
          background: 'linear-gradient(135deg, #000 0%, #111 25%, #0a0a0a 50%, #111 75%, #000 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite'
        } : {}}
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          onError={() => setVideoError(true)}
        >
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <header className="header" style={{
        background: scrolled ? 'rgba(0, 0, 0, 0.85)' : 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 100%)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none'
      }}>
        <a href="/" className="logo" aria-label="Floritech Inc. Home">
          <svg className="logo-icon" viewBox="0 0 120 120" fill="white" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(60,55)">
              <path d="M-2,20 C-2,20 -8,18 -12,14 C-16,10 -20,6 -22,0 C-24,-6 -24,-12 -22,-16 C-20,-20 -16,-24 -12,-26 C-8,-28 -4,-28 -2,-26 C-2,-26 -6,-22 -8,-18 C-10,-14 -10,-8 -8,-4 C-6,0 -2,4 -2,4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M-2,-10 C-2,-10 -8,-8 -12,-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M-2,4 C-2,4 -10,2 -14,6 C-18,10 -16,16 -12,14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2,20 C2,20 8,18 12,14 C16,10 20,6 22,0 C24,-6 24,-12 22,-16 C20,-20 16,-24 12,-26 C8,-28 4,-28 2,-26 C2,-26 6,-22 8,-18 C10,-14 10,-8 8,-4 C6,0 2,4 2,4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M2,-10 C2,-10 8,-8 12,-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2,4 C2,4 10,2 14,6 C18,10 16,16 12,14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <line x1="0" y1="-26" x2="0" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M-3,20 C-3,22 -2,24 0,24 C2,24 3,22 3,20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </g>
            <circle cx="28" cy="22" r="3" fill="white" opacity="0.9"/>
            <circle cx="92" cy="22" r="3" fill="white" opacity="0.9"/>
            <circle cx="18" cy="50" r="2.5" fill="white" opacity="0.8"/>
            <circle cx="102" cy="50" r="2.5" fill="white" opacity="0.8"/>
            <circle cx="22" cy="78" r="2" fill="white" opacity="0.7"/>
            <circle cx="98" cy="78" r="2" fill="white" opacity="0.7"/>
            <circle cx="40" cy="14" r="2" fill="white" opacity="0.7"/>
            <circle cx="80" cy="14" r="2" fill="white" opacity="0.7"/>
            <circle cx="35" cy="92" r="2.5" fill="white" opacity="0.6"/>
            <circle cx="85" cy="92" r="2.5" fill="white" opacity="0.6"/>
            <circle cx="60" cy="10" r="2" fill="white" opacity="0.6"/>
            <circle cx="14" cy="65" r="1.5" fill="white" opacity="0.5"/>
            <circle cx="106" cy="65" r="1.5" fill="white" opacity="0.5"/>
            <line x1="28" y1="22" x2="42" y2="32" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="92" y1="22" x2="78" y2="32" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="18" y1="50" x2="38" y2="50" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="102" y1="50" x2="82" y2="50" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="22" y1="78" x2="48" y2="72" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="98" y1="78" x2="72" y2="72" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="40" y1="14" x2="50" y2="28" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="80" y1="14" x2="70" y2="28" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            <line x1="60" y1="10" x2="60" y2="28" stroke="white" strokeWidth="0.8" opacity="0.3"/>
          </svg>
          <span className="logo-text">FLORITECH <span className="logo-text-small">INC.</span></span>
        </a>

        <nav className="social-nav" aria-label="Social media links">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/>
            </svg>
          </a>
        </nav>
      </header>

      <main className="hero" id="hero">
        <div className="hero-content" style={getHeroContentStyle()}>
          <div className="hero-logo">
            <svg viewBox="0 0 120 120" fill="white" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(60,55)">
                <path d="M-2,20 C-2,20 -8,18 -12,14 C-16,10 -20,6 -22,0 C-24,-6 -24,-12 -22,-16 C-20,-20 -16,-24 -12,-26 C-8,-28 -4,-28 -2,-26 C-2,-26 -6,-22 -8,-18 C-10,-14 -10,-8 -8,-4 C-6,0 -2,4 -2,4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M-2,-10 C-2,-10 -8,-8 -12,-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M-2,4 C-2,4 -10,2 -14,6 C-18,10 -16,16 -12,14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2,20 C2,20 8,18 12,14 C16,10 20,6 22,0 C24,-6 24,-12 22,-16 C20,-20 16,-24 12,-26 C8,-28 4,-28 2,-26 C2,-26 6,-22 8,-18 C10,-14 10,-8 8,-4 C6,0 2,4 2,4" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M2,-10 C2,-10 8,-8 12,-4" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2,4 C2,4 10,2 14,6 C18,10 16,16 12,14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="0" y1="-26" x2="0" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M-3,20 C-3,22 -2,24 0,24 C2,24 3,22 3,20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </g>
              <circle cx="28" cy="22" r="3" fill="white" opacity="0.9"/>
              <circle cx="92" cy="22" r="3" fill="white" opacity="0.9"/>
              <circle cx="18" cy="50" r="2.5" fill="white" opacity="0.8"/>
              <circle cx="102" cy="50" r="2.5" fill="white" opacity="0.8"/>
              <circle cx="22" cy="78" r="2" fill="white" opacity="0.7"/>
              <circle cx="98" cy="78" r="2" fill="white" opacity="0.7"/>
              <circle cx="40" cy="14" r="2" fill="white" opacity="0.7"/>
              <circle cx="80" cy="14" r="2" fill="white" opacity="0.7"/>
              <circle cx="35" cy="92" r="2.5" fill="white" opacity="0.6"/>
              <circle cx="85" cy="92" r="2.5" fill="white" opacity="0.6"/>
              <circle cx="60" cy="10" r="2" fill="white" opacity="0.6"/>
              <circle cx="14" cy="65" r="1.5" fill="white" opacity="0.5"/>
              <circle cx="106" cy="65" r="1.5" fill="white" opacity="0.5"/>
              <line x1="28" y1="22" x2="42" y2="32" stroke="white" strokeWidth="0.8" opacity="0.3"/>
              <line x1="92" y1="22" x2="78" y2="32" stroke="white" strokeWidth="0.8" opacity="0.3"/>
              <line x1="18" y1="50" x2="38" y2="50" stroke="white" strokeWidth="0.8" opacity="0.3"/>
              <line x1="102" y1="50" x2="82" y2="50" stroke="white" strokeWidth="0.8" opacity="0.3"/>
              <line x1="22" y1="78" x2="48" y2="72" stroke="white" strokeWidth="0.8" opacity="0.3"/>
              <line x1="98" y1="78" x2="72" y2="72" stroke="white" strokeWidth="0.8" opacity="0.3"/>
              <line x1="40" y1="14" x2="50" y2="28" stroke="white" strokeWidth="0.8" opacity="0.3"/>
              <line x1="80" y1="14" x2="70" y2="28" stroke="white" strokeWidth="0.8" opacity="0.3"/>
              <line x1="60" y1="10" x2="60" y2="28" stroke="white" strokeWidth="0.8" opacity="0.3"/>
            </svg>
          </div>

          <h1 className="hero-title">
            We promote the<br />best of technology <span className="highlight">innovation.</span>
          </h1>

          <p className="hero-subtitle">
            Building a better tomorrow through innovation, sustainability,<br />
            and human-centered technology.
          </p>

          <div className="launch-section">
            <p className="launch-label">LAUNCHING ON</p>
            <p className="launch-date">07 / 07 / 2030</p>
          </div>

          <div className="countdown">
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.days}</span>
              <span className="countdown-label">DAYS</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.hours}</span>
              <span className="countdown-label">HOURS</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.minutes}</span>
              <span className="countdown-label">MINUTES</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.seconds}</span>
              <span className="countdown-label">SECONDS</span>
            </div>
          </div>

          <button className="scroll-down" onClick={scrollToFooter} aria-label="Scroll down">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
      </main>

      <footer className="footer" id="footer">
        <p className="footer-copyright">&copy; 2025 Floritech Inc. All rights reserved.</p>
        <p className="footer-tagline">Shaping a smarter, greener and more human future.</p>
        <p className="footer-contact">
          <a href="mailto:info@floritech-inc.com">info@floritech-inc.com</a>
        </p>
      </footer>
    </>
  );
}

export default App;
