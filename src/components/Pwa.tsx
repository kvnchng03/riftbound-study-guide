import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { IconInstall } from './Icons';

interface BeforeInstallPromptEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }

const isStandalone = () => window.matchMedia?.('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent);

/** "Install app" button: native prompt where supported, Add-to-Home-Screen hint on iOS. */
export function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);
  const [installed, setInstalled] = useState(isStandalone);
  useEffect(() => {
    const onPrompt = (e: Event) => { e.preventDefault(); setDeferred(e as BeforeInstallPromptEvent); };
    const onInstalled = () => { setInstalled(true); setDeferred(null); };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled); };
  }, []);
  if (installed || (!deferred && !isIos())) return null;
  return (
    <>
      <button type="button" className="icon-btn" onClick={async () => {
        if (deferred) { await deferred.prompt(); await deferred.userChoice; setDeferred(null); } else setIosHint(true);
      }}><IconInstall /><span className="lbl">Install</span></button>
      {iosHint && (
        <div className="toast" role="dialog" aria-label="Install on iPhone">
          <span>Tap the Share button, then <b>Add to Home Screen</b>.</span>
          <button type="button" className="btn ghost" onClick={() => setIosHint(false)}>Got it</button>
        </div>
      )}
    </>
  );
}

/** Tells the user when a new version is ready, and when the app can work offline. */
export function UpdateToast() {
  const { needRefresh: [needRefresh, setNeedRefresh], offlineReady: [offlineReady, setOfflineReady], updateServiceWorker } = useRegisterSW();
  if (needRefresh) {
    return (
      <div className="toast" role="status">
        <span>A new version of the guide is ready.</span>
        <button type="button" className="btn" onClick={() => updateServiceWorker(true)}>Reload</button>
        <button type="button" className="btn ghost" onClick={() => setNeedRefresh(false)}>Later</button>
      </div>
    );
  }
  if (offlineReady) {
    return (
      <div className="toast" role="status">
        <span>Saved for offline use. The guide now works without internet.</span>
        <button type="button" className="btn ghost" onClick={() => setOfflineReady(false)}>OK</button>
      </div>
    );
  }
  return null;
}
