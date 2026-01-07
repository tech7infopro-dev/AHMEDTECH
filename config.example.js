// 🔐 ملف التكوين الآمن - AHMEDTECH DZ-IPTV
// ⚠️ هذا الملف مثال - استبدل القيم قبل الاستخدام

window.CONFIG = {
    FIREBASE: {
        apiKey: "YOUR_FIREBASE_API_KEY_HERE",
        authDomain: "YOUR_PROJECT.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
        measurementId: "YOUR_MEASUREMENT_ID"
    },
    ENCRYPTION: {
        baseKey: "YOUR_STRONG_ENCRYPTION_KEY_HERE",
        salt: "YOUR_UNIQUE_SALT_HERE",
        iterations: 100000,
        keySize: 512
    },
    CONTACT: {
        adminEmail: "your_email@example.com",
        supportEmail: "support@example.com",
        telegram: "https://t.me/your_channel",
        website: "https://yourwebsite.com"
    },
    DEFAULT_USERS: {
        admin: {
            username: "Admin",
            password: "ChangeThisPassword123!",
            email: "admin@example.com",
            role: "admin"
        }
    },
    SYSTEM: {
        appName: "AHMEDTECH DZ-IPTV",
        version: "1.2.2",
        releaseDate: "2025-12-19",
        company: "AHMEDTECH",
        author: "TEST"
    },
    SECURITY: {
        maxLoginAttempts: 5,
        sessionTimeout: 30,
        passwordMinLength: 8,
        requireStrongPassword: true,
        enableCSRF: true,
        enableXSSProtection: true,
        enableSQLInjectionProtection: true,
        enableHTTPScookies: true
    }
};

console.log('⚠️ إعدادات تجريبية - استبدل القيم قبل النشر');

