import { useEffect, useState } from 'react';

interface BannerData {
  is_active: boolean;
  text: string;
  type: 'info' | 'warning' | 'success';
  link_url: string;
  link_text: string;
  dismissable: boolean;
}

const STORAGE_KEY = 'banner_dismissed';

export default function AnnouncementBanner() {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch('/api/settings/banner')
      .then((r) => r.json())
      .then((data) => {
        const parsed: BannerData = JSON.parse(data.value);
        setBanner(parsed);
        // Check if this exact message was dismissed this session
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored === parsed.text) setDismissed(true);
      })
      .catch(() => {});
  }, []);

  function dismiss() {
    if (banner) sessionStorage.setItem(STORAGE_KEY, banner.text);
    setDismissed(true);
  }

  if (!banner || !banner.is_active || !banner.text.trim() || dismissed) return null;

  return (
    <div className={`announcement-banner announcement-banner--${banner.type}`} role="alert">
      <div className="announcement-banner__inner">
        <span className="announcement-banner__icon">
          {banner.type === 'warning' && '⚠️'}
          {banner.type === 'success' && '✅'}
          {banner.type === 'info' && 'ℹ️'}
        </span>
        <span className="announcement-banner__text">
          {banner.text}
          {banner.link_url && banner.link_text && (
            <>
              {' '}
              <a
                href={banner.link_url}
                target={banner.link_url.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="announcement-banner__link"
              >
                {banner.link_text} →
              </a>
            </>
          )}
        </span>
        {banner.dismissable && (
          <button
            className="announcement-banner__close"
            onClick={dismiss}
            aria-label="Zamknij komunikat"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
