const RECAPTCHA_SCRIPT_ID = "google-recaptcha-v3";
const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LfFn1stAAAAAAZ3E5Au5axm_qhUo7DmZH2LahSQ";

type RecaptchaApi = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

function loadRecaptcha(siteKey: string) {
  if (window.grecaptcha) {
    return Promise.resolve(window.grecaptcha);
  }

  return new Promise<RecaptchaApi>((resolve, reject) => {
    const existingScript = document.getElementById(RECAPTCHA_SCRIPT_ID) as HTMLScriptElement | null;
    const script = existingScript ?? document.createElement("script");

    const handleLoad = () => {
      if (window.grecaptcha) {
        resolve(window.grecaptcha);
      } else {
        reject(new Error("reCAPTCHA failed to initialize"));
      }
    };

    const handleError = () => reject(new Error("reCAPTCHA failed to load"));

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (!existingScript) {
      script.id = RECAPTCHA_SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
}

export async function getRecaptchaToken(action: "contact_submit" | "intake_submit") {
  const recaptcha = await loadRecaptcha(RECAPTCHA_SITE_KEY);

  await new Promise<void>((resolve) => recaptcha.ready(resolve));

  return recaptcha.execute(RECAPTCHA_SITE_KEY, { action });
}
