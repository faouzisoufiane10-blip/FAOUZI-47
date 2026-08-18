# FAOUZI-47 — Technical Book / الوثيقة التقنية

## Table of Contents / فهرس المحتويات

1. Chapter 1: Introduction to FAOUZI-47 & SOC Architecture / مقدمة في منصة FAOUZI-47 وهندسة مركز العمليات السيبرانية
2. Chapter 2: Real-time Threat Intelligence & Map Engine / محرك استخبارات التهديدات الخريطة التفاعلية
3. Chapter 3: Big Data Integration (ClickHouse, Qdrant Vector DB, PostgreSQL) / معالجة البيانات الضخمة
4. Chapter 4: Multi-Key API Rotation Engine & Security / نظام تدوير مفاتيح API والأمان
5. Chapter 5: Deployment & Operations Guide (Netlify, Docker, Vercel) / دليل النشر والتشغيل

---

# Chapter 1: Introduction to FAOUZI-47 & SOC Architecture

## English

FAOUZI-47 is a modular cyber security operations platform designed to provide real-time situational awareness, threat intelligence fusion, and an interactive map-driven dashboard for Security Operations Centers (SOC). The platform combines high-throughput telemetry ingestion, vector search for semantic threat matching, and a flexible API key rotation engine to support integrations with commercial and open-source security feeds.

Key goals:
- Real-time visualization of threats and incidents on a geographic and network topology map.
- High-performance storage and query for time-series and event data (ClickHouse).
- Semantic similarity search for indicators of compromise using vector DB (Qdrant).
- Robust access control, secrets rotation, and auditing for API consumers.
- Easy deployment to modern hosting (Netlify/Vercel) and containerized runtimes (Docker, Kubernetes).

Core components overview:
- Ingest Pipeline: collectors, parsers, and normalizers that transform raw telemetry into normalized events.
- Storage Layer: ClickHouse for events, PostgreSQL for relational metadata and users, Qdrant for vector embeddings.
- Map & UI: A front-end that visualizes incidents with layers (heatmap, choropleth, topology) and supports drill-down analysis.
- API Layer: A multi-key API gateway with rotation and rate-limit enforcement.
- Orchestration & Ops: Docker-based services, deployment manifests, and monitoring integrations (Prometheus, Grafana).

Security & compliance considerations:
- Principle of least privilege: services run with minimized permissions.
- Secrets handling: encrypted at rest (KMS) and rotated regularly.
- Logging & audit trails: immutable logs retained according to policy.

## العربية

منصة FAOUZI-47 هي منصة تشغيل أمني (SOC) مرنة ومندرجة تصميمياً لتوفير تصور آني للوضع الأمني، ودمج استخبارات التهديدات، ولوحة تحكم تفاعلية تعتمد على خريطة. تجمع المنصة بين استقبال قياسي عالي الأداء للبيانات، وبحث متجهات للتماثل الدلالي للتهديدات، ومحرك تدوير مفاتيح API مرن لدعم التكامل مع مصادر الاستخبارات المدفوعة والمفتوحة.

الأهداف الرئيسية:
- تصور آني للحوادث والتهديدات على خريطة جغرافية وشبكية.
- تخزين واستعلام عالي الأداء للبيانات الزمنية والحدثية (ClickHouse).
- بحث تشابه دلالي لمؤشرات الاختراق باستخدام قاعدة متجهات (Qdrant).
- تحكم وصول قوي، وتدوير أسرار، وتدقيق للمستهلكين API.
- نشر سهل على استضافات حديثة (Netlify/Vercel) وبيئات حاويات (Docker، Kubernetes).

مكونات أساسية:
- خط الاستقبال (Ingest): مجمّعات، ومحللات، وموحّدات تحول القياسات الخام إلى أحداث قياسية.
- طبقة التخزين: ClickHouse للأحداث، PostgreSQL للبيانات الوصفية والمستخدمين، Qdrant لتضمينات المتجهات.
- الخريطة والواجهة: واجهة أمامية تعرض الحوادث كطبقات (خرائط حرارية، خرائط انتشار، طوبولوجيا) وتسمح بتفصيل التحليل.
- طبقة API: بوابة API متعددة المفاتيح مع تدوير وتطبيق حدود المعدل.
- الأوركسترا والتشغيل: خدمات مبنية على Docker، وملفات نشر، وتكامل للرصد (Prometheus، Grafana).

الاعتبارات الأمنية والامتثال:
- مبدأ أقل الامتيازات: تشغيل الخدمات بأدنى صلاحيات ممكنة.
- التعامل مع الأسرار: تشفير عند التخزين (KMS) وعمليات تدوير دورية.
- السجلات ومسارات التدقيق: سجلات غير قابلة للتعديل محفوظة حسب سياسة الاحتفاظ.

---

# Chapter 2: Real-time Threat Intelligence & Map Engine

## English

This chapter details the design of a real-time Threat Intelligence (TI) ingestion and map-rendering engine.

Architecture:
- Feed Connectors: modular connectors for STIX/TAXII, MISP, commercial feeds (CEF, JSON), and custom webhooks.
- Normalization Layer: map incoming feed schemas to a canonical event model (timestamp, actor, indicator, severity, geo, tags, raw_payload).
- Enrichment: geo-IP, ASN lookup, WHOIS, and threat context enrichment via ML-based tagging.
- Deduplication & Scoring: merge similar indicators, compute confidence and risk scores using a weighted scoring engine.
- Vectorization: generate embeddings for text fields (indicator descriptions, CVE details) using an embedding model (e.g., OpenAI embeddings or local model) and store in Qdrant.
- Real-time Map Engine: WebSocket or Server-Sent Events to push updates to front-end; client renders layers and supports timeline playback.

Visualization features:
- Layered maps: points (incidents), clusters, heatmaps, network edges.
- Temporal slider: play back events over a selectable time window.
- Incident drill-down: timeline + raw logs + related indicators + attribution links.
- Alerting & Notifications: configurable alerts (threshold, anomaly detection) that integrate with Slack, email, and SOAR playbooks.

Operational notes:
- Backpressure handling: if downstream storage is slow, buffer in a persistent queue (Kafka/RabbitMQ) with TTL.
- Privacy: mask PII in visualizations and logs when necessary.

## العربية

يفصّل هذا الفصل تصميم محرك استقبال استخبارات التهديدات في الوقت الحقيقي ومحرك عرض الخريطة.

البنية:
- موصلات التغذية: موصلات معيارية لـ STIX/TAXII، MISP، مصادر تجارية (CEF، JSON)، وويب هوكس مخصصة.
- طبقة التوحيد: تحويل مخططات التغذية الواردة إلى نموذج حدث موحد (الطابع الزمني، الفاعل، المؤشر، الشدة، الجغرافيا، الوسوم، الحمولة الخام).
- الإثراء: geo-IP، بحث ASN، WHOIS، وسياق تهديدات معزّز بتعليم آلي للوسم.
- إلغاء التكرار والتقييم: دمج المؤشرات المماثلة، وحساب درجات الثقة والمخاطر باستخدام محرك تقييم موزون.
- تحويل إلى متجهات: إنشاء تضمينات للحقل النصي (وصف المؤشر، تفاصيل CVE) باستخدام نموذج تضمين (مثل OpenAI أو نموذج محلي) وتخزينها في Qdrant.
- محرك الخريطة في الوقت الحقيقي: WebSocket أو Server-Sent Events لدفع التحديثات إلى الواجهة؛ يقوم العميل بعرض الطبقات ويدعم تشغيل الإطار الزمني.

ميزات التصوير:
- خرائط طبقية: نقاط (حوادث)، مجموعات، خرائط حرارية، حواف شبكية.
- شريط زمني: تشغيل الأحداث خلال نافذة زمنية قابلة للاختيار.
- تفصيل الحوادث: شريط زمني + سجلات خام + مؤشرات ذات صلة + روابط النسبة.
- التنبيهات والإشعارات: تنبيهات قابلة للتكوين (عتبة، اكتشاف شذوذ) تتكامل مع Slack وemail وSOAR playbooks.

ملاحظات تشغيلية:
- التعامل مع الضغط العكسي: إذا كان التخزين الخلفي بطيئًا، استخدم وسيط طابور دائم (Kafka/RabbitMQ) مع TTL.
- الخصوصية: إخفاء بيانات التعريف الشخصية في التصوير والسجلات عند الحاجة.

---

# Chapter 3: Big Data Integration (ClickHouse, Qdrant Vector DB, PostgreSQL)

## English

This chapter explains how to integrate and model data across ClickHouse, Qdrant, and PostgreSQL.

Data model guidance:
- ClickHouse: event table optimized for inserts and time-range queries. Use MergeTree or ReplicatedMergeTree with partitioning by month or day depending on volume.
  - Recommended schema fields: event_id, ts, source, type, severity, geo_point, raw_payload, normalized_fields (JSON), embedding_id
- PostgreSQL: relational store for users, roles, audit logs metadata, configuration, and long-form case notes.
  - Normalize sensitive metadata; use row-level security (RLS) for multi-tenant setups.
- Qdrant: store vector embeddings for semantic search; index metadata fields to allow hybrid search (vector + filter).

Example ingestion flow:
1. Collector receives feed -> Normalizer produces canonical event.
2. Enricher adds geo, asn, threat context.
3. Emit event to ClickHouse for fast analytics.
4. If event contains textual fields, compute embedding and upsert into Qdrant, store embedding_id in ClickHouse row.
5. Store user-facing metadata and case relationships in PostgreSQL.

Scaling & performance:
- ClickHouse: use batched inserts, compression (LZ4), and appropriate TTL/partition retention.
- Qdrant: configure replicas and shard count; tune vector index type (HNSW) parameters ef_construct and M for trade-off between speed and memory.
- PostgreSQL: use connection pooling (PgBouncer) and read replicas for heavy read loads.

Backup & disaster recovery:
- ClickHouse: backup metadata and periodic snapshots of parts or use replicated clusters with redundancy.
- Qdrant: snapshotting of collections and export/import flows for cold storage.
- PostgreSQL: logical backups (pg_dump/pg_basebackup) and PITR with WAL archiving.

Security:
- Encrypt in transit (TLS) between services. Use mutual TLS for critical internal service-to-service communications.
- Restrict network access with VPCs, security groups, and private subnets.

## العربية

يشرح هذا الفصل كيفية التكامل ونمذجة البيانات عبر ClickHouse وQdrant وPostgreSQL.

إرشادات نموذج البيانات:
- ClickHouse: جدول أحداث مصمم لإدخالات عالية وأستعلامات نطاق زمني. استخدم MergeTree أو ReplicatedMergeTree مع تقسيم حسب الشهر أو اليوم اعتمادًا على الحجم.
  - الحقول المقترحة: event_id، ts، source، type، severity، geo_point، raw_payload، normalized_fields (JSON)، embedding_id
- PostgreSQL: مخزن علائقي للمستخدمين، الأدوار، سجلات التدقيق الوصفية، التكوين، وملاحظات الحالات الطويلة.
  - قم بتطبيع البيانات الوصفية الحساسة؛ وا��تخدم أمان مستوى الصف (RLS) لإعدادات متعددة المست��جرين.
- Qdrant: تخزين تضمينات المتجه للبحث الدلالي؛ فهرس الحقول الوصفية للسماح بالبحث الهجين (متجه + فلتر).

تدفق الاستيعاب النموذجي:
1. يستقبل المجمع التغذية -> يقوم الموحد بإنتاج حدث موحد.
2. يقوم المعزز بإضافة الجغرافيا، ASN، وسياق التهديد.
3. إرسال الحدث إلى ClickHouse للتحليلات السريعة.
4. إذا احتوى الحدث حقولًا نصية، احسب التضمين وأدرجه في Qdrant، وخزن embedding_id في صف ClickHouse.
5. خزن البيانات الوصفية للمستخدم وعلاقات الحالة في PostgreSQL.

التدرج والأداء:
- ClickHouse: استخدم إدخالات مجمعة، ضغط (LZ4)، وفترات احتفاظ/TTL مناسبة للأقسام.
- Qdrant: قم بتكوين النسخ وعدد الشظايا؛ واضبط نوع فهرس المتجه (HNSW) ومعاملاته ef_construct و M لموازنة السرعة والذاكرة.
- PostgreSQL: استخدم تجميع اتصالات (PgBouncer) ونسخ قراءة للحمل القرائي العالي.

النسخ الاحتياطي والتعافي من الكوارث:
- ClickHouse: نسخ بيانات التعريف ولقطات دورية للأجزاء أو استخدم عناقيد مكررة مع تكرار.
- Qdrant: لقطة المجموعات وتدفقات التصدير/الاستيراد للتخزين البارد.
- PostgreSQL: نسخ منطقية (pg_dump/pg_basebackup) وPITR مع أرشفة WAL.

الأمن:
- تشفير أثناء النقل (TLS) بين الخدمات. استخدم mTLS للاتصالات الداخلية الحرجة بين الخدمات.
- تقيد الوصول عبر الشبكة باستخدام VPCs ومجموعات الأمان والشبكات الفرعية الخاصة.

---

# Chapter 4: Multi-Key API Rotation Engine & Security

## English

A central design goal is to avoid single API key exhaustion or compromise by supporting multiple API keys with automated rotation and per-key rate and quota management.

Design elements:
- Key Store: encrypted store (e.g., Vault, AWS Secrets Manager) holding multiple keys and metadata (key_id, provider, scopes, created_at, ttl, status).
- Rotation Scheduler: background job that rotates keys on a schedule and supports on-demand rotation.
- Active Key Selection: a small in-memory pool with health checks to prefer healthy keys and distribute requests.
- Sticky Sessions: optional affinity modes (by session, client, or region) to reduce cross-provider variability.
- Fallback & Blacklisting: if a key begins to fail, mark degraded, attempt retries, move traffic to healthy keys; blacklist keys after threshold failures and notify operators.

Security controls:
- Audit logs for key usage: every API call records key_id, caller, endpoint, response code, latency.
- Least privilege: keys scoped narrowly to required endpoints.
- Rate-limits: per-key and global rate-limits enforced at gateway level.
- Secret rotation policy: keys rotate before expiry, with overlap window to allow rolling changes (grace period).
- Compromise detection: anomaly detection on usage patterns (sudden spike, geographic mismatch) and automatic revocation.

Implementation details:
- Gateway: lightweight API proxy (e.g., NGINX + Lua, Envoy, or a Node.js proxy) that implements key selection, rate limiting, and logging.
- Health checks: periodic test calls to provider endpoints to verify key validity and quota status.
- Storage: metadata in PostgreSQL; key material in Vault. Use short-lived tokens for providers that support them.

## العربية

هدف التصميم المركزي هو تجنب استنزاف أو اختراق مفتاح API واحد عبر دعم مفاتيح متعددة مع تدوير آلي وإدارة معدل وحصص لكل مفتاح.

عناصر التصميم:
- مخزن المفاتيح: مخزن مشفر (مثل Vault أو AWS Secrets Manager) يحوي مفاتيح متعددة وبيانات وصفية (key_id، provider، scopes، created_at، ttl، status).
- مجدول التدوير: عملية خلفية تدور المفاتيح بحسب جدول وتدعم التدوير عند الطلب.
- اختيار المفتاح النشط: مجموعة ذاكرة صغيرة مع فحوصات الصحة لتفضيل المفاتيح السليمة وتوزيع الطلبات.
- الجلسات اللاصقة: أوضاع تفضيلية (حسب الجلسة، العميل، أو المنطقة) لتقليل تفاوت المزود.
- التبديل والقائمة السوداء: إذا بدأ المفتاح بالفشل، تعليم حالة تدهور، محاولة إعادة المحاولة، تحويل المرور لمفاتيح سليمة؛ وضع المفتاح في القائمة السوداء بعد عتبة الفشل وإشعار المشغلين.

ضوابط الأمان:
- سجلات تدقيق لاستخدام المفاتيح: كل مكالمة API تسجل key_id، المتصل، endpoint، رمز الاستجابة، الزمن.
- أقل الامتيازات: المفاتيح محددة الصلاحيات لنقاط النهاية المطلوبة فقط.
- حدود المعدل: حدود لكل مفتاح وعالمية مفروضة على مستوى البوابة.
- سياسة تدوير الأسرار: تدوير قبل انتهاء الصلاحية، مع نافذة تداخل للسماح بالتغييرات الدورانية (فترة سماح).
- كشف الاختراق: كشف شذوذ في أنماط الاستخدام (قفزة مفاجئة، عدم تطابق جغرافي) وإبطال تلقائي.

تفاصيل التنفيذ:
- البوابة: بروكسي API خفيف (مثل NGINX + Lua، Envoy، أو Node.js proxy) ينفّذ اختيار المفتاح، تحديد المعدل، والتسجيل.
- فحوصات الصحة: مكالمات اختبار دورية لنقاط نهاية المزود للتحقق من صلاحية المفتاح وحالة الحصة.
- التخزين: البيانات الوصفية في PostgreSQL؛ مادة المفاتيح في Vault. استخدم رموز مؤقتة قصيرة العمر عندما يدعمها المزود.

---

# Chapter 5: Deployment & Operations Guide (Netlify, Docker, Vercel)

## English

This chapter covers deployment patterns for FAOUZI-47: static front-end hosting (Netlify/Vercel/GitHub Pages) and containerized back-end services (Docker, Kubernetes).

Front-end (Dashboard):
- Build pipeline: CI builds front-end assets (Webpack/Vite), runs tests, then publishes static assets to Netlify or Vercel.
- Environment variables: inject runtime configuration via Netlify ENV, Vercel env or a runtime config loader that fetches a signed config JSON from an API endpoint.
- CDN & caching: use CDN with cache-control and cache-busting strategies for assets.

Back-end services (Docker):
- Containerization: each microservice (ingest, enrich, api-gateway, worker) has a Dockerfile and follows 12-factor app guidelines.
- Compose for dev: provide docker-compose.yml for local orchestration (ClickHouse, PostgreSQL, Qdrant, Redis, Kafka, platform services).
- Production: use orchestrator (Kubernetes) with Helm charts or Docker Swarm. Provide liveness/readiness probes and resource limits.

CI/CD recommendations:
- Use GitHub Actions for CI pipelines: lint -> test -> build -> push images -> deploy manifests.
- Use image tags with digest pinning for reproducible deployments.

Observability & Monitoring:
- Export metrics (Prometheus) and traces (OpenTelemetry) from services.
- Dashboards: Grafana dashboards for throughput, error rates, latency, and key health indicators.
- Alerting: PagerDuty/Slack integration for high-severity incidents.

Security & Hardening:
- Use private registries and sign images.
- Scan images for vulnerabilities (Trivy/Clair) in CI.
- Apply network policies and least privilege RBAC in Kubernetes.

Operational runbook (short):
- On degraded performance: check ClickHouse partitions, Qdrant indexing, and worker queue lengths.
- On data loss: restore from last known good snapshot; replay queues if available.
- On key compromise: rotate keys immediately, revoke leaked tokens, and audit recent usage.

## العربية

يغطي هذا الفصل أنماط النشر لمنصة FAOUZI-47: استضافة واجهة ثابتة (Netlify/Vercel/GitHub Pages) وخدمات خلفية محاوَية (Docker، Kubernetes).

الواجهة الأمامية (لوحة التحكم):
- خط البناء: CI يبني أصول الواجهة (Webpack/Vite)، يشغّل الاختبارات، ثم ينشر الأصول الثابتة إلى Netlify أو Vercel.
- متغيرات البيئة: حقن التهيئة في وقت التشغيل عبر متغيرات Netlify أو Vercel أو آلية تحميل تهيئة تستدعي JSON موقع من نقطة نهاية API.
- CDN والتخزين المؤقت: استخدم CDN مع سياسات cache-control واستراتيجيات كسر التخزين المؤقت للأصول.

الخدمات الخلفية (Docker):
- الحاويات: كل خدمة دقيقة (ingest، enrich، api-gateway، worker) لها Dockerfile وتتبع إرشادات تطبيق 12-factor.
- Compose للتطوير: وفر docker-compose.yml للتنسيق المحلي (ClickHouse، PostgreSQL، Qdrant، Redis، Kafka، خدمات المنصة).
- الإنتاج: استخدم منسق (Kubernetes) مع Helm charts أو Docker Swarm. وفر فحوصات liveness/readiness وحدود الموارد.

توصيات CI/CD:
- استخدم GitHub Actions لخطوط CI: lint -> test -> build -> push images -> deploy manifests.
- استخدم وسمات صور مع تثبيت بالـ digest لنشر قابل لإعادة الإنتاج.

الرصانة والرصد:
- صدّر المقاييس (Prometheus) والتتبعات (OpenTelemetry) من الخدمات.
- لوحات عرض: لوحات Grafana لمعدل المرور، معدلات الأخطاء، الكمون، ومؤشرات صحة رئيسية.
- التنبيهات: تكامل PagerDuty/Slack للحوادث عالية الشدة.

التأمين والتقوية:
- استخدم سجلات خاصة ووقّع الصور.
- ا��حص الصور عن ثغرات (Trivy/Clair) في CI.
- طبق سياسات الشبكة وأدنى امتيازات RBAC في Kubernetes.

دليل تشغيل مختصر:
- عند تدهور الأداء: تحقق من أجزاء ClickHouse، فهرسة Qdrant، وأطوال قوائم انتظار العمال.
- عند فقدان البيانات: استعد من آخر لقطة جيدة؛ أعد تشغيل القوائم إذا كانت متاحة.
- عند اختراق مفتاح: دوّر المفاتيح فورًا، أبطل الرموز المسرّبة، وراجع استخدامها مؤخرًا.

---

# Appendix: Reference Config & Example Flows / ملحق: إعداد مرجعي وتدفقات أمثلة

- Example ClickHouse table creation (recommended):

CREATE TABLE events (
  event_id String,
  ts DateTime64(3),
  source String,
  type String,
  severity UInt8,
  geo_point String,
  raw_payload String,
  normalized_fields JSON,
  embedding_id String
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(ts)
ORDER BY (ts, event_id)
TTL ts + INTERVAL 90 DAY;

- Example Qdrant upsert flow: compute embedding -> upsert point with payload {event_id, type, ts} -> store embedding_id in ClickHouse.

- Example API rotation: keys = [k1,k2,k3]; pool picks k1, health ok -> use; if 5xx observed switch to k2 and schedule rotation for k1.


For questions about implementation details, sample manifests (Helm/Compose), or CI templates, I will add modular files on request.
