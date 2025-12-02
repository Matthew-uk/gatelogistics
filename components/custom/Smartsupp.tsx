'use client';

import Script from 'next/script';

declare global {
  interface Window {
    smartsupp: any;
    _smartsupp: any;
  }
}

const SmartsuppChat = () => {
  return (
    <>
      <Script id="smartsupp-script" strategy="afterInteractive">
        {`
          var _smartsupp = _smartsupp || {};
          _smartsupp.key = 'a10caef4dd070e4af0cd94d991c5bede7495e588';
          window.smartsupp || (function(d) {
            var s, c, o = smartsupp = function(){ o._.push(arguments) }; o._ = [];
            s = d.getElementsByTagName('script')[0];
            c = d.createElement('script');
            c.type = 'text/javascript';
            c.charset = 'utf-8';
            c.async = true;
            c.src = 'https://www.smartsuppchat.com/loader.js?';
            s.parentNode.insertBefore(c, s);
          })(document);
        `}
      </Script>

      <noscript>
        Powered by{' '}
        <a
          href="https://www.smartsupp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Smartsupp
        </a>
      </noscript>
    </>
  );
};

export default SmartsuppChat;
