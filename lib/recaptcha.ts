type RecaptchaVerificationResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  hostname?: string;
};

const MINIMUM_SCORE = 0.5;

function getAllowedHostnames() {
  const hostnames = new Set(["rewirehypnosis.ca", "www.rewirehypnosis.ca"]);

  for (const value of [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ]) {
    if (value) {
      hostnames.add(value.replace(/^https?:\/\//, "").split("/")[0].split(":")[0]);
    }
  }

  if (process.env.NODE_ENV !== "production") {
    hostnames.add("localhost");
    hostnames.add("127.0.0.1");
  }

  return hostnames;
}

export async function verifyRecaptcha(token: unknown, expectedAction: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey || typeof token !== "string" || !token.trim()) {
    return false;
  }

  try {
    const body = new URLSearchParams({ secret: secretKey, response: token });
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as RecaptchaVerificationResponse;

    return Boolean(
      result.success &&
        result.action === expectedAction &&
        typeof result.score === "number" &&
        result.score >= MINIMUM_SCORE &&
        result.hostname &&
        getAllowedHostnames().has(result.hostname)
    );
  } catch {
    console.error("reCAPTCHA verification failed");
    return false;
  }
}
