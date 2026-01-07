// build-config.js
const fs = require('fs');

console.log('🚀 =================================');
console.log('🔧 بناء AHMEDTECH DZ-IPTV v1.2.2');
console.log('👨‍💻 المطور: Ahmed');
console.log('📧 tech7infopro@gmail.com');
console.log('=================================');

// إنشاء محتوى config.js من Environment Variables
const configContent = `
// =================================
// ⚡ AHMEDTECH DZ-IPTV - ملف الإعدادات
// 🚀 الإصدار: 1.2.2
// 📅 تم الإنشاء: ${new Date().toISOString()}
// =================================

window.CONFIG = {
    // 🔥 إعدادات Firebase
    FIREBASE: {
        apiKey: "${process.env.FIREBASE_API_KEY || 'NOT_SET'}",
        authDomain: "${process.env.FIREBASE_AUTH_DOMAIN || 'ahmedtech-762f2.firebaseapp.com'}",
        projectId: "${process.env.FIREBASE_PROJECT_ID || 'ahmedtech-7'}",
        storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET || 'ahmedtech-7.firebasestorage.app'}",
        messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID || '134918635186'}",
        appId: "${process.env.FIREBASE_APP_ID || '1:134918635186:web:722051507de6360f3e53ab'}",
        measurementId: "${process.env.FIREBASE_MEASUREMENT_ID || 'G-V261X9WWEB'}"
    },
    
    // 🔐 إعدادات التشفير
    ENCRYPTION: {
        baseKey: "${process.env.ENCRYPTION_BASE_KEY || 'AHMEDTECH_PRO_SECURE_KEY_2026_DZ_IPTV_!@#$'}",
        salt: "${process.env.ENCRYPTION_SALT || 'AHMEDTECH_PRO_SALT_2026_UNIQUE_RANDOM_123'}",
        iterations: ${process.env.ENCRYPTION_ITERATIONS || 100000},
        keySize: ${process.env.ENCRYPTION_KEY_SIZE || 512}
    },
    
    // 📞 معلومات الاتصال
    CONTACT: {
        adminEmail: "${process.env.ADMIN_EMAIL || 'tech7infopro@gmail.com'}",
        supportEmail: "${process.env.SUPPORT_EMAIL || 'tech7infopro@gmail.com'}",
        telegram: "${process.env.TELEGRAM_LINK || 'https://t.me/+IvjWx9QcwyQxYmI8'}",
        website: "${process.env.WEBSITE_URL || 'https://ahmedtech.dz'}"
    },
    
    // 👥 المستخدمون الافتراضيون
    DEFAULT_USERS: {
        admin: {
            username: "${process.env.ADMIN_USERNAME || 'PROTECH'}",
            password: "${process.env.ADMIN_PASSWORD || 'ah85ME19!/ou?06D16@'}",
            email: "${process.env.ADMIN_EMAIL || 'tech7infopro@gmail.com'}",
            role: "admin"
        }
    },
    
    // ⚙️ إعدادات النظام
    SYSTEM: {
        appName: "${process.env.APP_NAME || 'AHMEDTECH DZ-IPTV'}",
        version: "${process.env.APP_VERSION || '1.2.2'}",
        releaseDate: "${process.env.RELEASE_DATE || '2025-12-19'}",
        company: "AHMEDTECH",
        author: "Ahmed"
    },
    
    // 🛡️ إعدادات الأمان
    SECURITY: {
        maxLoginAttempts: ${process.env.MAX_LOGIN_ATTEMPTS || 5},
        sessionTimeout: ${process.env.SESSION_TIMEOUT || 30},
        passwordMinLength: ${process.env.PASSWORD_MIN_LENGTH || 8},
        requireStrongPassword: true,
        enableCSRF: true,
        enableXSSProtection: true,
        enableSQLInjectionProtection: true,
        enableHTTPScookies: true
    }
};

// =================================
// 🔍 تسجيل حالة التحميل
// =================================
console.log('%c✅ AHMEDTECH DZ-IPTV v' + window.CONFIG.SYSTEM.version, 
    'color: green; font-weight: bold;');
console.log('%c👨‍💻 ' + window.CONFIG.SYSTEM.author, 
    'color: blue; font-weight: bold;');
console.log('%c🌐 ' + (process.env.NODE_ENV || 'production').toUpperCase() + ' MODE', 
    'color: orange; font-weight: bold;');

// التحقق من الإعدادات
if (window.CONFIG.FIREBASE.apiKey === 'NOT_SET') {
    console.warn('%c⚠️  تحذير: إعدادات Firebase من Vercel مفقودة!', 
        'color: red; font-weight: bold;');
    console.log('%c💡 الحل: أضف الأسرار في Vercel Environment Variables', 
        'color: yellow;');
}
`;

// حفظ الملف
fs.writeFileSync('config.js', configContent);

console.log('✅ تم إنشاء config.js بنجاح');
console.log('📊 حالة البناء:');
console.log('- Firebase Project:', process.env.FIREBASE_PROJECT_ID || 'استخدام القيم الافتراضية');
console.log('- Environment:', process.env.NODE_ENV || 'production');
console.log('=================================');
console.log('🎉 البناء اكتمل! جاهز للنشر على Vercel');
