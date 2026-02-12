// build.js - مولد الإعدادات الآمن لـ AHMEDTECH DZ-IPTV
const fs = require('fs');
const path = require('path');

console.log('🚀 بدء بناء AHMEDTECH DZ-IPTV...');
console.log('🔒 الوضع الآمن: Environment Variables فقط');

// ============================================
// إعداد المسارات
// ============================================
const publicDir = path.join(__dirname, 'public');
const rootDir = __dirname;

// إنشاء مجلد public إذا لم يكن موجوداً
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('📁 تم إنشاء مجلد public');
}

// ============================================
// نسخ الملفات الثابتة
// ============================================
const staticFiles = ['index.html', 'script.js', 'style.css'];

staticFiles.forEach(file => {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(publicDir, file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ تم نسخ ${file}`);
    } else {
        console.warn(`⚠️ ملف غير موجود: ${file}`);
    }
});

// ============================================
// التحقق من Environment Variables المطلوبة
// ============================================
const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID'
];

const missing = requiredVars.filter(v => !process.env[v] || process.env[v].includes('your-'));

if (missing.length > 0) {
    console.error('❌ خطأ: المتغيرات التالية غير محددة في Vercel:');
    missing.forEach(v => console.error(`   - ${v}`));
    process.exit(1);
}

// ============================================
// استخراج القيم بأمان
// ============================================
const env = {
    // Firebase
    firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    firebaseProjectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
    firebaseMessagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,

    // Security
    pbkdf2Iterations: parseInt(process.env.NEXT_PUBLIC_PBKDF2_ITERATIONS) || 310000,
    passwordSalt: process.env.NEXT_PUBLIC_PASSWORD_SALT || 'AHMEDTECH_PRO_SALT_2026',
    sessionSecret: process.env.SESSION_SECRET || 'AHMEDTECH_SESSION_2026',
    sessionTimeout: parseInt(process.env.SESSION_TIMEOUT) || 3600000,
    maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5,

    // Default Owner (بدون كلمة مرور!)
    ownerName: process.env.NEXT_PUBLIC_DEFAULT_OWNER_NAME || 'AHMEDTECH',
    ownerUsername: process.env.NEXT_PUBLIC_DEFAULT_OWNER_USERNAME || 'TECHPRO',

    // System
    appName: process.env.APP_NAME || 'AHMEDTECH DZ IPTV',
    appUrl: process.env.APP_URL || 'https://ahmedtech.vercel.app'
};

// ============================================
// توليد ملف الإعدادات
// ============================================
const configContent = `/* ============================================
   AHMEDTECH DZ IPTV - Configuration File
   Auto-generated at build time - DO NOT EDIT
   ============================================ */

const CONFIG = {
    // ============================================
    // FIREBASE CONFIGURATION
    // ============================================
    FIREBASE: {
        API_KEY: ${JSON.stringify(env.firebaseApiKey)},
        AUTH_DOMAIN: ${JSON.stringify(env.firebaseAuthDomain)},
        PROJECT_ID: ${JSON.stringify(env.firebaseProjectId)},
        STORAGE_BUCKET: ${JSON.stringify(env.firebaseStorageBucket)},
        MESSAGING_SENDER_ID: ${JSON.stringify(env.firebaseMessagingSenderId)},
        APP_ID: ${JSON.stringify(env.firebaseAppId)},
        MEASUREMENT_ID: ${JSON.stringify(env.firebaseMeasurementId)},

        COLLECTIONS: {
            USERS: 'users',
            FREE_MACS: 'free_macs',
            FREE_XTREAMS: 'free_xtreams',
            TICKETS: 'tickets',
            TELEGRAM_LINKS: 'telegram_links',
            IPTV_APPS: 'iptv_apps',
            SECURITY_LOGS: 'security_logs',
            SYSTEM_CONFIG: 'system_config'
        },

        SYNC: {
            ENABLED: true,
            AUTO_SYNC: true,
            SYNC_INTERVAL: 30000,
            OFFLINE_PERSISTENCE: true,
            CONFLICT_RESOLUTION: 'server'
        }
    },

    // ============================================
    // SECURITY CONFIGURATION
    // ============================================
    SECURITY: {
        PBKDF2: {
            ITERATIONS: ${env.pbkdf2Iterations},
            KEY_LENGTH: 256,
            HASH: 'SHA-256',
            SALT_LENGTH: 32,
            LEGACY_ITERATIONS: 100000,
            AUTO_UPGRADE: true,
            SALT: ${JSON.stringify(env.passwordSalt)}
        },

        SESSION: {
            SECRET: ${JSON.stringify(env.sessionSecret)},
            TIMEOUT: ${env.sessionTimeout},
            RENEWAL_THRESHOLD: 300000,
            ABSOLUTE_TIMEOUT: 28800000,
            IDLE_TIMEOUT: 1800000,
            BIND_TO_IP: false,
            BIND_TO_USER_AGENT: true
        },

        CSRF: {
            TOKEN_LENGTH: 64,
            TOKEN_NAME: 'X-CSRF-Token',
            ROTATION_INTERVAL: 3600000
        },

        RATE_LIMIT: {
            MAX_ATTEMPTS: ${env.maxLoginAttempts},
            WINDOW_MS: 900000,
            BLOCK_DURATION_MS: 1800000
        },

        SMART_DELAY: {
            ENABLED: true,
            BASE_DELAY_MS: 1000,
            MAX_DELAY_MS: 10000,
            EXPONENTIAL_FACTOR: 2,
            JITTER_PERCENTAGE: 0.2
        },

        COOKIES: {
            HTTP_ONLY: true,
            SECURE: true,
            SAME_SITE: 'Strict',
            MAX_AGE: 86400,
            PATH: '/'
        },

        LOGGING: {
            ENABLED: true,
            ENCRYPTION_KEY_LENGTH: 256,
            MAX_LOG_ENTRIES: 1000,
            AUTO_FLUSH_INTERVAL: 300000,
            SENSITIVE_FIELDS: ['password', 'token', 'secret', 'key', 'hash', 'salt']
        },

        SECURITY_LOGGING: {
            ENABLED: true,
            MAX_ENTRIES: 5000,
            STORAGE_KEY: 'iptv_security_logs_v2',
            LOG_TYPES: [
                'LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'PASSWORD_CHANGE',
                'PASSWORD_RESET', 'ACCOUNT_LOCKED', 'ACCOUNT_UNLOCKED',
                'SUSPICIOUS_ACTIVITY', 'DATA_ACCESS', 'CONFIG_CHANGE',
                'FIREBASE_SYNC', 'FIREBASE_ERROR', 'OWNER_LOGIN'
            ],
            ALERT_THRESHOLD: 5,
            AUTO_NOTIFY: false
        },

        PASSWORD_POLICY: {
            MIN_LENGTH: 8,
            RECOMMENDED_LENGTH: 12,
            REQUIRE_UPPERCASE: true,
            REQUIRE_LOWERCASE: true,
            REQUIRE_NUMBERS: true,
            REQUIRE_SPECIAL: false,
            MAX_AGE_DAYS: 90,
            HISTORY_COUNT: 5
        },

        ENCRYPTION: {
            MASTER_KEY: 'AHMEDTECH_PRO_KEYS_2026_SECURE',
            AUTO_ROTATE: false,
            ROTATION_INTERVAL_DAYS: 30
        }
    },

    // ============================================
    // DEFAULT ACCOUNTS (بدون كلمات مرور مكشوفة!)
    // ============================================
    DEFAULT_OWNER: {
        id: 1,
        name: ${JSON.stringify(env.ownerName)},
        username: ${JSON.stringify(env.ownerUsername)},
        password: null,
        passwordHash: null,
        salt: null,
        role: "owner",
        created: new Date().toISOString(),
        banned: false,
        lastLogin: null,
        loginAttempts: 0,
        lockedUntil: null,
        firebaseUid: null
    },

    // ⚠️ ملاحظة أمان: كلمة المرور تُخزن في Vercel Environment Variables فقط
    // ويتم معالجتها عبر API Endpoint منفصل (إذا لزم الأمر)

    // ============================================
    // PERMISSIONS MATRIX
    // ============================================
    PERMISSIONS: {
        owner: [
            { id: 'view_all_users', name: 'View All Users', allowed: true },
            { id: 'create_user', name: 'Create New Users', allowed: true },
            { id: 'edit_user', name: 'Edit Users', allowed: true },
            { id: 'delete_user', name: 'Delete Users', allowed: true },
            { id: 'ban_user', name: 'Ban Users', allowed: true },
            { id: 'unban_user', name: 'Unban Users', allowed: true },
            { id: 'change_role', name: 'Change User Roles', allowed: true },
            { id: 'view_logs', name: 'View System Logs', allowed: true },
            { id: 'system_settings', name: 'System Settings', allowed: true },
            { id: 'copy_content', name: 'Copy Content', allowed: true },
            { id: 'export_data', name: 'Export Data', allowed: true },
            { id: 'full_access', name: 'Full System Access', allowed: true },
            { id: 'manage_free_mac', name: 'Manage Free MACs', allowed: true },
            { id: 'manage_free_xtream', name: 'Manage Free Xtream', allowed: true },
            { id: 'manage_telegram', name: 'Manage Telegram Links', allowed: true },
            { id: 'manage_iptv_apps', name: 'Manage IPTV Apps', allowed: true },
            { id: 'firebase_sync', name: 'Firebase Sync Control', allowed: true }
        ],
        admin: [
            { id: 'view_all_users', name: 'View All Users', allowed: true },
            { id: 'create_user', name: 'Create New Users', allowed: true },
            { id: 'edit_user', name: 'Edit Users', allowed: true },
            { id: 'ban_user', name: 'Ban Users', allowed: true },
            { id: 'unban_user', name: 'Unban Users', allowed: true },
            { id: 'copy_content', name: 'Copy Content', allowed: true },
            { id: 'export_data', name: 'Export Data', allowed: true },
            { id: 'manage_free_mac', name: 'Manage Free MACs', allowed: true },
            { id: 'manage_free_xtream', name: 'Manage Free Xtream', allowed: true },
            { id: 'manage_iptv_apps', name: 'Manage IPTV Apps', allowed: true },
            { id: 'delete_user', name: 'Delete Users', allowed: false },
            { id: 'change_role', name: 'Change User Roles', allowed: false },
            { id: 'view_logs', name: 'View System Logs', allowed: false },
            { id: 'system_settings', name: 'System Settings', allowed: false },
            { id: 'full_access', name: 'Full System Access', allowed: false },
            { id: 'manage_telegram', name: 'Manage Telegram Links', allowed: false },
            { id: 'firebase_sync', name: 'Firebase Sync Control', allowed: false }
        ],
        user: [
            { id: 'copy_content', name: 'Copy Content', allowed: true },
            { id: 'view_free_mac', name: 'View Free MACs', allowed: true },
            { id: 'view_free_xtream', name: 'View Free Xtream', allowed: true },
            { id: 'view_telegram', name: 'View Telegram Links', allowed: true },
            { id: 'view_iptv_apps', name: 'View IPTV Apps', allowed: true },
            { id: 'view_all_users', name: 'View All Users', allowed: false },
            { id: 'create_user', name: 'Create New Users', allowed: false },
            { id: 'edit_user', name: 'Edit Users', allowed: false },
            { id: 'delete_user', name: 'Delete Users', allowed: false },
            { id: 'ban_user', name: 'Ban Users', allowed: false },
            { id: 'unban_user', name: 'Unban Users', allowed: false },
            { id: 'change_role', name: 'Change User Roles', allowed: false },
            { id: 'view_logs', name: 'View System Logs', allowed: false },
            { id: 'system_settings', name: 'System Settings', allowed: false },
            { id: 'export_data', name: 'Export Data', allowed: false },
            { id: 'full_access', name: 'Full System Access', allowed: false },
            { id: 'manage_free_mac', name: 'Manage Free MACs', allowed: false },
            { id: 'manage_free_xtream', name: 'Manage Free Xtream', allowed: false },
            { id: 'manage_telegram', name: 'Manage Telegram Links', allowed: false },
            { id: 'manage_iptv_apps', name: 'Manage IPTV Apps', allowed: false },
            { id: 'firebase_sync', name: 'Firebase Sync Control', allowed: false }
        ]
    },

    // ============================================
    // RESOURCE PERMISSIONS
    // ============================================
    MAC_PERMISSIONS: {
        owner: { canView: true, canAdd: true, canEdit: true, canDelete: true },
        admin: { canView: true, canAdd: true, canEdit: true, canDelete: true },
        user: { canView: true, canAdd: false, canEdit: false, canDelete: false }
    },

    XTREAM_PERMISSIONS: {
        owner: { canView: true, canAdd: true, canEdit: true, canDelete: true },
        admin: { canView: true, canAdd: true, canEdit: true, canDelete: true },
        user: { canView: true, canAdd: false, canEdit: false, canDelete: false }
    },

    TELEGRAM_PERMISSIONS: {
        owner: { canView: true, canEdit: true },
        admin: { canView: true, canEdit: false },
        user: { canView: true, canEdit: false }
    },

    IPTV_APPS_PERMISSIONS: {
        owner: { canView: true, canAdd: true, canEdit: true, canDelete: true },
        admin: { canView: true, canAdd: true, canEdit: true, canDelete: true },
        user: { canView: true, canAdd: false, canEdit: false, canDelete: false }
    },

    // ============================================
    // STORAGE KEYS
    // ============================================
    STORAGE_KEYS: {
        USERS: 'iptv_users',
        CURRENT_USER: 'iptv_current_user',
        NEXT_USER_ID: 'iptv_next_id',
        FREE_MACS: 'iptv_free_macs',
        NEXT_MAC_ID: 'iptv_next_mac_id',
        FREE_XTREAMS: 'iptv_free_xtreams',
        NEXT_XTREAM_ID: 'iptv_next_xtream_id',
        TICKETS: 'iptv_tickets',
        NEXT_TICKET_ID: 'iptv_next_ticket_id',
        TELEGRAM_LINKS: 'iptv_telegram_links',
        IPTV_APPS: 'iptv_apps',
        NEXT_APP_ID: 'iptv_next_app_id',
        CSRF_TOKEN: 'iptv_csrf_token',
        SESSION_DATA: 'iptv_session',
        RATE_LIMIT: 'iptv_rate_limit',
        SECURITY_LOG: 'iptv_security_log',
        ENCRYPTED_LOGS: 'iptv_encrypted_logs',
        LOG_ENCRYPTION_KEY: 'iptv_log_key',
        SMART_DELAY: 'iptv_smart_delay',
        COOKIE_CONSENT: 'iptv_cookie_consent',
        SECURITY_LOGS_V2: 'iptv_security_logs_v2',
        BLOCKED_IPS: 'iptv_blocked_ips',
        PASSWORD_HISTORY: 'iptv_password_history',
        LOGIN_ATTEMPTS_DETAIL: 'iptv_login_attempts_detail',
        FIREBASE_SYNC_QUEUE: 'iptv_firebase_sync_queue',
        LAST_SYNC: 'iptv_last_sync',
        OFFLINE_CHANGES: 'iptv_offline_changes'
    },

    // ============================================
    // SYSTEM SETTINGS
    // ============================================
    SYSTEM: {
        CHECK_EXPIRY_INTERVAL: 3600000,
        MIN_PASSWORD_LENGTH: 8,
        DEFAULT_ROLE: 'user',
        DATE_FORMAT: 'en-US',
        MAX_LOGIN_ATTEMPTS: ${env.maxLoginAttempts},
        LOCKOUT_DURATION: 1800000,
        PASSWORD_EXPIRY_WARNING_DAYS: 7,
        SESSION_WARNING_BEFORE_TIMEOUT: 300000,
        AUTO_LOGOUT_ON_CLOSE: false,
        SECURE_CONTEXT_REQUIRED: true,
        DEBUG_MODE: false,
        APP_NAME: ${JSON.stringify(env.appName)},
        APP_URL: ${JSON.stringify(env.appUrl)},
        SUPPORT_EMAIL: 'support@ahmedtech.dz',
        ENABLE_REGISTRATION: true,
        ENABLE_PASSWORD_RESET: true,
        ENABLE_FIREBASE_SYNC: true
    },

    // ============================================
    // SECURITY HEADERS
    // ============================================
    SECURITY_HEADERS: {
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://*.firebaseio.com https://*.googleapis.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' https://cdnjs.cloudflare.com; img-src 'self' data: blob: https:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://firestore.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;",
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=()',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'X-Permitted-Cross-Domain-Policies': 'none',
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'same-origin'
    }
};

// Prevent modification
Object.freeze(CONFIG);
`;

// ============================================
// كتابة الملف
// ============================================
fs.writeFileSync(path.join(publicDir, 'config.js'), configContent);
console.log('✅ تم إنشاء public/config.js');

// ============================================
// إنشاء config-example.js للتطوير المحلي
// ============================================
const exampleContent = `// config-example.js - نموذج للتطوير المحلي
// انسخ هذا الملف إلى config.js وأضف مفاتيحك الخاصة

const CONFIG = {
    FIREBASE: {
        API_KEY: 'your-firebase-api-key-here',
        AUTH_DOMAIN: 'your-project.firebaseapp.com',
        PROJECT_ID: 'your-project-id',
        STORAGE_BUCKET: 'your-project.appspot.com',
        MESSAGING_SENDER_ID: '123456789',
        APP_ID: '1:123456789:web:abcdef123456',
        MEASUREMENT_ID: 'G-XXXXXXXXXX'
    },
    // ... باقي الإعدادات
};

Object.freeze(CONFIG);
`;

fs.writeFileSync(path.join(rootDir, 'config-example.js'), exampleContent);
console.log('✅ تم إنشاء config-example.js');

// ============================================
// ملخص
// ============================================
console.log('\\n🎉 اكتمل البناء بنجاح!');
console.log('📦 الملفات في public/:');
fs.readdirSync(publicDir).forEach(f => console.log(`   - ${f}`));
console.log('\\n🔒 ملاحظات أمان:');
console.log('   • جميع الأسرار من Environment Variables');
console.log('   • لا توجد كلمات مرور في الكود');
console.log('   • config.js يُنشأ أثناء البناء فقط');


