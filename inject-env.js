// ============================================
// ENVIRONMENT VARIABLES INJECTION - FIXED
// ============================================

(function() {
    'use strict';
    
    console.log('[EnvInject] Starting injection...');
    
    // إنشاء كائن البيئة العالمي
    window.ENV = window.ENV || {};
    window.process = window.process || {};
    window.process.env = window.process.env || {};
    
    // قائمة متغيرات Firebase المطلوبة
    const envVars = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        'NEXT_PUBLIC_FIREBASE_APP_ID',
        'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'
    ];
    
    // القراءة من meta tags
    let loadedCount = 0;
    envVars.forEach(varName => {
        const meta = document.querySelector(`meta[name="${varName}"]`);
        if (meta) {
            const content = meta.getAttribute('content');
            // التحقق من أن القيمة ليست placeholder
            if (content && !content.includes('%') && 
                content !== 'your-api-key' && 
                content !== 'your-project-id' &&
                content.length > 5) {
                
                window.ENV[varName] = content;
                window.process.env[varName] = content;
                loadedCount++;
                console.log(`[EnvInject] Loaded: ${varName}`);
            } else {
                console.warn(`[EnvInject] Invalid value for ${varName}: ${content}`);
            }
        } else {
            console.warn(`[EnvInject] Meta tag not found: ${varName}`);
        }
    });
    
    console.log(`[EnvInject] Loaded ${loadedCount}/${envVars.length} variables`);
    
    // إشارة بأن التهيئة اكتملت
    window.ENV_LOADED = true;
    
    // حدث مخصص لإشعار باقي الكود
    window.dispatchEvent(new CustomEvent('env-loaded', {
        detail: { loaded: loadedCount, total: envVars.length }
    }));
})();


