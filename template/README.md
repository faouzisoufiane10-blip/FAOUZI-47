# FAOUZI-47 Template — Quick Start / دليل البدء السريع

This README is bilingual: English followed by Arabic sections for each topic.

---

## Live demo / معاينة مباشرة

You can view the live demo of the template here:
https://faouzi-47.netlify.app

يمكنك معاينة القالب مباشرة هنا:
https://faouzi-47.netlify.app

---

## English — Quick Start

Welcome to the FAOUZI-47 customizable template. Use this repo to fork and build your own SOC dashboard with API rotation support, vector search, and a map-driven interface.

Prerequisites:
- Node.js >= 14 (for local dev) or any static host
- Docker (optional) for local services
- An account on Netlify or Vercel for static hosting

Steps to get started locally:
1. Clone the repo:
   git clone https://github.com/faouzisoufiane10-blip/FAOUZI-47.git
2. Open the template folder:
   cd FAOUZI-47/template
3. Serve index.html locally (simple option):
   - Use a static server like `npx serve` or VSCode Live Server
4. Edit template/config.js to customize branding, API keys placeholders, and widgets.
   - Important: NEVER commit real API secrets. Use Vault, AWS Secrets Manager, or environment variables.
5. Integrate a map provider:
   - Replace the map placeholder with Leaflet, MapLibre GL, or Mapbox. Use environment variables for keys.
6. For production, deploy to Netlify or Vercel. See the Deployment section below.

Customizing the UI and categories:
- template/config.js exposes `branding`, `widgets.categories`, and `promptTemplates`.
- Edit `branding.logo`, `branding.primaryColor`, and `widgets.categories` to reflect your organization.

Changing threat categories and indicators:
- Categories are free-form strings (e.g., "malware", "phishing") and drive UI filtering.
- For large deployments, back categories with a PostgreSQL table and expose a categories API.

Deploying to Netlify / Vercel / GitHub Pages:
- Netlify: Create a new site from GitHub, set build command (if using a static build) or point to `template/` as publish directory.
- Vercel: Import project, configure the output directory, and set env vars as needed.
- GitHub Pages: publish the `template/` directory as a static site using actions or the Pages settings.

Extending for back-end integration:
- Add an API gateway or proxy to implement key rotation and rate-limit enforcement. Use the config.js `apiBaseUrl` to point the front-end to the gateway.
- Suggested components: NGINX/Envoy proxy, Node.js gateway with Redis for rate-limits, workers for enrichment.

Security reminders:
- Do not expose API keys in client-side JS.
- Use short-lived tokens and rotate them frequently.

Support and contribution:
- Fork the repository, create a feature branch, and open a pull request.

---

## العربية — دليل البدء السريع

مرحبًا بك في قالب FAOUZI-47 القابل للتخصيص. استخدم هذا المستودع للتفرع وبناء لوحة تشغيل أمني خاصة بك تدعم تدوير مفاتيح API، وبحث المتجهات، وواجهة مدفوعة بالخريطة.

المتطلبات الأساسية:
- Node.js >= 14 (للتطوير المحلي) أو أي مستضيف ثابت
- Docker (اختياري) للخدمات المحلية
- حساب Netlify أو Vercel لاستضافة الملفات الثابتة

خطوات البدء محليًا:
1. انسخ المستودع:
   git clone https://github.com/faouzisoufiane10-blip/FAOUZI-47.git
2. افتح مجلد القالب:
   cd FAOUZI-47/template
3. شغّل index.html محليًا (خيار بسيط):
   - استخدم خادم ثابت مثل `npx serve` أو Live Server في VSCode
4. عدِّل ملف template/config.js لتخصيص العلامة التجارية، ومكان مفاتيح API، وعناصر الواجهة.
   - مهم: لا تُدرِج أسرار API الحقيقية في التحكم بالمصدر. استخدم Vault أو AWS Secrets Manager أو المتغيرات البيئية.
5. أدمج مزود خريطة:
   - استبدل العنصر النائب للخريطة بـ Leaflet أو MapLibre GL أو Mapbox. استخدم المتغيرات البيئية للمفاتيح.
6. للنشر، استخدم Netlify أو Vercel. راجع قسم النشر أدناه.

تخصيص الواجهة والفئات:
- يكشف template/config.js عن `branding` و `widgets.categories` و `promptTemplates`.
- عدِّل `branding.logo` و `branding.primaryColor` و `widgets.categories` لتعكس مؤسستك.

تغيير فئات التهديد والمؤشرات:
- الفئات هي سلاسل نصية حرة (مثل "malware"، "phishing") وتتحكم في فلترة الواجهة.
- في نشرات كبيرة، ادعم الفئات بجدول في PostgreSQL وعرّض API للفئات.

النشر على Netlify / Vercel / GitHub Pages:
- Netlify: أنشئ موقعًا جديدًا من GitHub، عين أمر البناء (إذا كانت هناك خطوة بناء) أو قم بتوجيه مجلد النشر إلى `template/`.
- Vercel: استورد المشروع، عيّن مجلد الإخراج، وعيّن المتغيرات البيئية اللازمة.
- GitHub Pages: انشر مجلد `template/` كموقع ثابت باستخدام Actions أو إعدادات Pages.

التمديد للتكامل الخلفي:
- أضف بوابة API أو بروكسي لتنفيذ تدوير المفاتيح وفرض حدود المعدل. استخدم `apiBaseUrl` في config.js لربط الواجهة بالبُوَّابة.
- مكونات مقترحة: NGINX/Envoy proxy، بوابة Node.js مع Redis لحدود المعدل، وعمال (workers) للإثراء.

تذكيرات أمنية:
- لا تكشف مفاتيح API في جافاسكربت الجانب العميل.
- استخدم رموزًا قصيرة العمر ودوّرها بشكل متكرر.

الدعم والمساهمة:
- قم بتفريع المستودع، أنشئ فرع ميزة، وافتح طلب سحب (PR).
