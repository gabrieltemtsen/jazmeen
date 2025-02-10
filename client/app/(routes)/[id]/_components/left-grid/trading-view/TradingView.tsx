'use client';

import React, { useEffect, useRef, memo } from 'react';

export function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      // Check if the script is already appended
      const existingScript = container.current.querySelector('script[src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
          "autosize": true,
          "symbol": "CRYPTOCAP:USDT",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "withdateranges": true,
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": false,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        });
        container.current.appendChild(script);
      }
    }
  }, []);

  return (
    <div
      className="tradingview-widget-container min-h-[60vh] sm:min-h-[60vh] md:h-[100%]"
      ref={container}
    >
      <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
