// build-config.js - آمن 100%
const fs = require('fs');

console.log('🚀 بناء AHMEDTECH DZ-IPTV - النسخة الآمنة');

// 🔒 كل القيم تأتي من Environment Variables فقط!
const configContent = `
window.CONFIG = {
    FIREBASE: {
        apiKey: "${process.env.FIREBASE_API_KEY || 'NOT_SET'}",
        authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || 'NOT_SET'}",
        projectId: "${process.env.FIREBASE_PROJECT_ID || 'NOT_SET'}",
        storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || 'NOT_SET'}",
        messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || 'NOT_SET'}",
        appId: "${process.env.FIREBASE_APP_ID || 'NOT_SET'}",
        measurementId: "${process.env.FIREBASE_MEASUREMENT_ID || 'NOT_SET'}"
    },
    ENCRYPTION: {
        baseKey: "${process.env.ENCRYPTION_BASE_KEY || 'NOT_SET'}",
        salt: "${process.env.ENCRYPTION_SALT || 'NOT_SET'}",
        iterations: "${process.env.ENCRYPTION_ITERATIONS || '100000'}",
        keySize: "${process.env.ENCRYPTION_KEY_SIZE || '512'}"
    },
    CONTACT: {
        adminEmail: "${process.env.ADMIN_EMAIL || ''}",
        supportEmail: "${process.env.SUPPORT_EMAIL || ''}",
        telegram: "${process.env.TELEGRAM_LINK || ''}",
        website: "${process.env.WEBSITE_URL || ''}"
    },
    DEFAULT_USERS: {
        admin: {
            username: "${process.env.ADMIN_USERNAME || ''}",
            password: "${process.env.ADMIN_PASSWORD || 'NOT_SET'}",
            email: "${process.env.ADMIN_EMAIL || ''}",
            role: "admin"
        }
    },
    SYSTEM: {
        appName: "${process.env.APP_NAME || ''}",
        version: "${process.env.APP_VERSION || ''}",
        releaseDate: "${process.env.RELEASE_DATE || ''}",
        company: "AHMEDTECH",
        author: "Ahmed"
    },
    SECURITY: {
        maxLoginAttempts: "${process.env.MAX_LOGIN_ATTEMPTS || '5'}",
        sessionTimeout: "${process.env.SESSION_TIMEOUT || '30'}",
        passwordMinLength: "${process.env.PASSWORD_MIN_LENGTH || '8'}"
    }
};
`;

fs.writeFileSync('config.js', configContent);
console.log('✅ تم إنشاء config.js آمن');
console.log('🔒 ملاحظة: جميع الأسرار مخزنة في Vercel Environment Variables');
