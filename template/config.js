/*
 * template/config.js
 * FAOUZI-47 Template Configuration
 *
 * This file provides a commented, customizable configuration for developers who
 * fork FAOUZI-47. It includes placeholder API keys, rotation options, UI theme
 * settings, and prompt customization for embedded AI enrichment.
 *
 * ملف التهيئة هذا يحتوي على شروحات بالعربية والإنجليزية لتسهيل التخصيص.
 */

const CONFIG = {
  // GENERAL / عام
  appName: "FAOUZI-47 Template", // Application name shown in UI
  // اسم التطبيق الظاهر في الواجهة

  // BRANDING / العلامة التجارية
  branding: {
    // Put your logo path or URL here / ضع مسار أو رابط الشعار هنا
    logo: "/assets/logo.svg",
    // Theme options: light, dark, auto / خيارات السمة: light, dark, auto
    theme: "auto",
    // Primary color hex / اللون الأساسي
    primaryColor: "#0066CC",
  },

  // API KEYS POOL / مجموعة مفاتيح API
  // Provide placeholders for provider API keys. The rotation engine will select from this pool.
  // ضع مصفوفة مفاتيح كمثال - استبدلها بمفاتيح حقيقية أو ربط مخزن أسرار
  apiKeys: [
    {
      keyId: "key-1",
      provider: "example-provider",
      // WARNING: store real keys in Vault/Secrets Manager, not in source control!
      // تحذير: لا تحفظ المفاتيح الحقيقية في المتحكم بالمصدر. استخدم Vault أو مدير أسرار.
      secret: "PLACEHOLDER_KEY_1",
      scopes: ["threat:read", "threat:search"],
      status: "active"
    },
    {
      keyId: "key-2",
      provider: "example-provider",
      secret: "PLACEHOLDER_KEY_2",
      scopes: ["threat:read"],
      status: "active"
    }
  ],

  // ROTATION / التدوير
  rotation: {
    enabled: true,
    // rotation interval in hours / فترة التدوير بالساعات
    intervalHours: 24,
    // overlap window (seconds) to allow old key to drain / فترة التداخل بالثواني
    overlapSeconds: 300,
    // failure threshold before blacklisting a key
    failureThreshold: 5
  },

  // RATE LIMITS / حدود المعدل
  rateLimits: {
    // global per-minute limit / الحد العالمي لكل دقيقة
    globalPerMinute: 10000,
    // per-key per-minute limit / الحد لكل مفتاح
    perKeyPerMinute: 3000
  },

  // PROMPT / تهيئة النصوص لنماذج الإثراء
  // Customize enrichment prompts used for generating embeddings or summarization
  promptTemplates: {
    // Use descriptive English prompts; replace or localize as needed
    summarizeIndicator: "Summarize the threat indicator in 1-2 sentences, include likely tactics and mitigations.",
    arabicSummarizeIndicator: "لخص مؤشر التهديد في جملة أو جملتين واذكر التكتيكات المحتملة والتدابير الوقائية."
  },

  // UI WIDGETS / عناصر الواجهة
  widgets: {
    showMap: true,
    showTimeline: true,
    showTopIndicators: true,
    // Customize default categories visible in the UI
    categories: ["malware", "phishing", "ransomware", "exposure"]
  },

  // DEPLOYMENT / النشر
  deployment: {
    // runtime type: static | server / نوع وقت التشغيل: ثابت أو خادم
    runtime: "static",
    // If 'server', set the API base URL / إذا كان "server" عيّن عنوان API الأساسي
    apiBaseUrl: "https://api.example.com"
  }
};

// Export for UI to import. In production, prefer fetching a signed runtime config.
export default CONFIG;
