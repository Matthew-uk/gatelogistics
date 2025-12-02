'use client';

import { useEffect, useState } from 'react';

type LangOption = { value: string; label: string };

export default function GoogleTranslate() {
  const [langs, setLangs] = useState<LangOption[]>([]);
  const [selected, setSelected] = useState<string>('original');
  const [loaded, setLoaded] = useState(false);

  // Load Google Translate script and init
  useEffect(() => {
    // avoid duplicate script
    if (!(window as any).googleTranslateScriptLoaded) {
      (window as any).googleTranslateScriptLoaded = true;

      (window as any).googleTranslateElementInit =
        function googleTranslateElementInit() {
          try {
            new (window as any).google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                autoDisplay: false,
              },
              'google_translate_element',
            );
          } catch (e) {
            // ignore
            console.warn('translate init failed', e);
          }
        };

      const s = document.createElement('script');
      s.src =
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      document.head.appendChild(s);
    } else {
      // If already loaded earlier, trigger init again (safe)
      if ((window as any).google && (window as any).google.translate) {
        try {
          (window as any).googleTranslateElementInit?.();
        } catch (e) {}
      }
    }

    // wait for the widget to attach the .goog-te-combo select
    let tries = 0;
    const interval = setInterval(() => {
      tries++;
      const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (combo) {
        // build languages from the real google widget options
        const opts = Array.from(combo.options).map((o) => ({
          value: o.value,
          label: o.text,
        }));
        // Some widgets include a first "Select Language" option with empty value — filter duplicates
        const filtered = opts.filter((o) => !!o.value);
        setLangs(filtered);
        setLoaded(true);

        // keep the original google select hidden but present in DOM (we will use it programmatically)
        combo.style.display = 'none';
        clearInterval(interval);
      } else if (tries > 80) {
        // give up after ~8s
        clearInterval(interval);
        setLoaded(true);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handler that triggers Google Translate by changing the real (hidden) select and dispatching change event
  const applyLanguage = (langValue: string) => {
    setSelected(langValue);

    // If user chooses "original", set value to empty to reset (widget varies across regions)
    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (!combo) {
      console.warn('Google Translate element not ready');
      return;
    }

    // some widgets expect '' or 'en' to reset. We'll try to set the widget's first option when 'original' chosen.
    if (langValue === 'original') {
      // try to pick the first option (usually original language)
      combo.selectedIndex = 0;
    } else {
      // pick an option that matches the value
      const optToSelect = Array.from(combo.options).find(
        (o) => o.value === langValue,
      );
      if (optToSelect) {
        combo.value = optToSelect.value;
      } else {
        // fallback: pick exact value if exists
        combo.value = langValue;
      }
    }

    // dispatch change event so the translate widget does its job
    const ev = document.createEvent('HTMLEvents');
    ev.initEvent('change', true, true);
    combo.dispatchEvent(ev);
  };

  return (
    <div className="translate-widget inline-block fixed bottom-2 left-4 z-50">
      {/* <label htmlFor="custom-google-translate" className="sr-only">
        Translate page
      </label> */}

      <div className="flex items-center gap-3 rounded-md bg-black">
        <div className="relative">
          <select
            id="custom-google-translate"
            value={selected}
            onChange={(e) => applyLanguage(e.target.value)}
            className="appearance-none min-w-[220px] sm:min-w-[280px] bg-primary text-white text-sm py-2 pl-3 pr-8 rounded-lg shadow-sm backdrop-blur-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition font-urbanist"
            aria-label="Translate page"
          >
            <option className="font-urbanist" value="en">
              Original (English)
            </option>

            {/* show loading state while waiting for full language list */}
            {!loaded && (
              <option className="font-urbanist" value="loading" disabled>
                Loading languages…
              </option>
            )}

            {/* Render languages once available */}
            {langs.map((l) => (
              <option className="font-urbanist" key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}

            {/* If widget failed to load or is blocked, provide a sensible fallback list */}
            {loaded && langs.length === 0 && (
              <>
                <option className="font-urbanist" value="en">
                  English
                </option>
                <option className="font-urbanist" value="es">
                  Spanish
                </option>
                <option className="font-urbanist" value="fr">
                  French
                </option>
                <option className="font-urbanist" value="de">
                  German
                </option>
                <option className="font-urbanist" value="zh-CN">
                  Chinese (Simplified)
                </option>
                <option className="font-urbanist" value="zh-TW">
                  Chinese (Traditional)
                </option>
                <option className="font-urbanist" value="ar">
                  Arabic
                </option>
                <option className="font-urbanist" value="hi">
                  Hindi
                </option>
                <option className="font-urbanist" value="pt">
                  Portuguese
                </option>
                <option className="font-urbanist" value="ru">
                  Russian
                </option>
                <option className="font-urbanist" value="ja">
                  Japanese
                </option>
                <option className="font-urbanist" value="ko">
                  Korean
                </option>
                <option className="font-urbanist" value="it">
                  Italian
                </option>
                <option className="font-urbanist" value="nl">
                  Dutch
                </option>
                <option className="font-urbanist" value="sv">
                  Swedish
                </option>
                <option className="font-urbanist" value="no">
                  Norwegian
                </option>
                <option className="font-urbanist" value="da">
                  Danish
                </option>
                <option className="font-urbanist" value="fi">
                  Finnish
                </option>
                <option className="font-urbanist" value="pl">
                  Polish
                </option>
                <option className="font-urbanist" value="tr">
                  Turkish
                </option>
                <option className="font-urbanist" value="el">
                  Greek
                </option>
                <option className="font-urbanist" value="cs">
                  Czech
                </option>
                <option className="font-urbanist" value="sk">
                  Slovak
                </option>
                <option className="font-urbanist" value="hu">
                  Hungarian
                </option>
                <option className="font-urbanist" value="ro">
                  Romanian
                </option>
                <option className="font-urbanist" value="bg">
                  Bulgarian
                </option>
                <option className="font-urbanist" value="uk">
                  Ukrainian
                </option>
                <option className="font-urbanist" value="he">
                  Hebrew
                </option>
                <option className="font-urbanist" value="th">
                  Thai
                </option>
                <option className="font-urbanist" value="vi">
                  Vietnamese
                </option>
                <option className="font-urbanist" value="id">
                  Indonesian
                </option>
                <option className="font-urbanist" value="ms">
                  Malay
                </option>
                <option className="font-urbanist" value="fa">
                  Persian (Farsi)
                </option>
                <option className="font-urbanist" value="bn">
                  Bengali
                </option>
                <option className="font-urbanist" value="ta">
                  Tamil
                </option>
                <option className="font-urbanist" value="te">
                  Telugu
                </option>
                <option className="font-urbanist" value="mr">
                  Marathi
                </option>
                <option className="font-urbanist" value="gu">
                  Gujarati
                </option>
                <option className="font-urbanist" value="ur">
                  Urdu
                </option>
                <option className="font-urbanist" value="sw">
                  Swahili
                </option>
                <option className="font-urbanist" value="am">
                  Amharic
                </option>
                <option className="font-urbanist" value="zu">
                  Zulu
                </option>
                <option className="font-urbanist" value="xh">
                  Xhosa
                </option>
                <option className="font-urbanist" value="yo">
                  Yoruba
                </option>
                <option className="font-urbanist" value="ig">
                  Igbo
                </option>
                <option className="font-urbanist" value="ha">
                  Hausa
                </option>
                <option className="font-urbanist" value="km">
                  Khmer
                </option>
                <option className="font-urbanist" value="lo">
                  Lao
                </option>
                <option className="font-urbanist" value="my">
                  Burmese
                </option>
                <option className="font-urbanist" value="si">
                  Sinhala
                </option>
                <option className="font-urbanist" value="ka">
                  Georgian
                </option>
                <option className="font-urbanist" value="kk">
                  Kazakh
                </option>
                <option className="font-urbanist" value="mn">
                  Mongolian
                </option>
                <option className="font-urbanist" value="et">
                  Estonian
                </option>
                <option className="font-urbanist" value="lv">
                  Latvian
                </option>
                <option className="font-urbanist" value="lt">
                  Lithuanian
                </option>
              </>
            )}
          </select>

          {/* caret icon */}
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
            <svg
              className="w-4 h-4 text-white/80"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* small reset button */}
        {/* <button
          type="button"
          onClick={() => applyLanguage("original")}
          className="text-xs font-medium px-3 py-2 rounded-md bg-white/6 border border-white/8 text-white/90 hover:bg-white/8 transition"
          title="Reset to original"
        >
          Reset
        </button> */}
      </div>

      {/* Hidden real Google translate element (widget will populate the internal select inside this container) */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      {/* Global styles to remove default ugly widget UI and top banner while keeping essential attribution */}
      <style jsx global>{`
        /* Hide the default ugly combo - we read it programmatically */
        .goog-te-combo {
          display: none !important;
        }

        /* Hide the floating banner that sometimes appears at the top after translate */
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0px !important;
        }

        /* hide the small widget icon that Google injects (we use our own UI) */
        .goog-te-gadget-icon {
          display: none !important;
        }

        /* Remove default font-size / spacing the widget injects so it doesn't affect layout */
        .goog-te-gadget {
          font-size: 0 !important;
        }

        /* Keep the "Powered by Google" link visible inside the google iframe if it exists.
           We don't forcibly remove attribution here — that's important for compliance. */
        .goog-logo-link {
          display: inline-block !important;
          opacity: 0.6 !important;
        }

        /* Mobile adjustments for our custom select */
        @media (max-width: 640px) {
          #custom-google-translate {
            min-width: 160px;
          }
        }
      `}</style>
    </div>
  );
}
