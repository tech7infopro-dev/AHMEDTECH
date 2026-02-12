// build.js - مع تسجيل مفصل للأخطاء
const fs = require('fs');
const path = require('path');

console.log('=== AHMEDTECH BUILD START ===');

// طباعة جميع Environment Variables المتاحة (للتشخيص)
console.log('Available env vars:', Object.keys(process.env).filter(k => k.includes('NEXT_PUBLIC') || k.includes('FIREBASE')));

// التحقق من وجود public
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// نسخ الملفات
['index.html', 'script.js', 'style.css'].forEach(file => {
    const src = path.join(__dirname, file);
    const dest = path.join(publicDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`✓ Copied ${file}`);
    }
});

// قراءة Environment Variables
const getEnv = (name, defaultValue = null) => {
    const value = process.env[name];
    if (!value || value.includes('your-') || value === 'undefined') {
        console.warn(`⚠️ Missing or invalid: ${name}`);
        return defaultValue;
    }
    return value;
};

// استخراج القيم
const env = {
    firebaseApiKey: getEnv('NEXT_PUBLIC_FIREBASE_API_KEY'),
    firebaseAuthDomain: getEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
    firebaseProjectId: getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
    firebaseStorageBucket: getEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
    firebaseMessagingSenderId: getEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
    firebaseAppId: getEnv('NEXT_PUBLIC_FIREBASE_APP_ID'),
    firebaseMeasurementId: getEnv('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'),
    ownerUsername: getEnv('NEXT_PUBLIC_DEFAULT_OWNER_USERNAME', 'TECHPRO'),
    ownerPassword: getEnv('NEXT_PUBLIC_DEFAULT_OWNER_PASSWORD'),
    ownerName: getEnv('NEXT_PUBLIC_DEFAULT_OWNER_NAME', 'AHMEDTECH'),
    passwordSalt: getEnv('NEXT_PUBLIC_PASSWORD_SALT', 'AHMEDTECH_SALT_2026')
};

// التحقق من المتغيرات المطلوبة
if (!env.firebaseApiKey) {
    console.error('❌ CRITICAL: NEXT_PUBLIC_FIREBASE_API_KEY is missing!');
    console.error('Please add it to Vercel Environment Variables');
    process.exit(1);
}

console.log('✓ Firebase API Key:', env.firebaseApiKey.substring(0, 10) + '...');
console.log('✓ Owner:', env.ownerUsername);

// إنشاء config.js
const configContent = `/* AHMEDTECH CONFIG - Auto Generated */
const CONFIG = {
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
    SECURITY: {
        PBKDF2: {
            ITERATIONS: 310000,
            KEY_LENGTH: 256,
            HASH: 'SHA-256',
            SALT_LENGTH: 32,
            SALT: ${JSON.stringify(env.passwordSalt)}
        },
        SESSION: {
            SECRET: 'AHMEDTECH_SESSION_2026',
            TIMEOUT: 3600000
        }
    },
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
    DEFAULT_PASSWORDS: {
        [${JSON.stringify(env.ownerUsername)}]: ${JSON.stringify(env.ownerPassword)}
    },
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
    SYSTEM: {
        CHECK_EXPIRY_INTERVAL: 3600000,
        MIN_PASSWORD_LENGTH: 8,
        DEFAULT_ROLE: 'user',
        DATE_FORMAT: 'en-US',
        MAX_LOGIN_ATTEMPTS: 5,
        LOCKOUT_DURATION: 1800000,
        PASSWORD_EXPIRY_WARNING_DAYS: 7,
        SESSION_WARNING_BEFORE_TIMEOUT: 300000,
        AUTO_LOGOUT_ON_CLOSE: false,
        SECURE_CONTEXT_REQUIRED: true,
        DEBUG_MODE: false,
        APP_NAME: 'AHMEDTECH DZ IPTV',
        APP_URL: 'https://ahmedtech.vercel.app',
        SUPPORT_EMAIL: 'support@ahmedtech.dz',
        ENABLE_REGISTRATION: true,
        ENABLE_PASSWORD_RESET: true,
        ENABLE_FIREBASE_SYNC: true
    }
};

Object.freeze(CONFIG);
`;

fs.writeFileSync(path.join(publicDir, 'config.js'), configContent);
console.log('✓ config.js created successfully');
console.log('=== BUILD COMPLETE ===');


