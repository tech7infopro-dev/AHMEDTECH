/* ============================================
   AHMEDTECH DZ IPTV - Sync Solution v10
   الحل النهائي للمزامنة بين المتصفحات
   ============================================ */

class UltimateSyncManager {
    constructor() {
        this.channel = null;
        this.isMaster = false;
        this.tabId = Math.random().toString(36).substr(2, 9);
        this.lastSync = 0;
        this.syncInterval = null;
        this.db = null;
        this.isOnline = navigator.onLine;

        this.init();
    }

    async init() {
        console.log('[UltimateSync] Initializing tab:', this.tabId);

        // 1. إعداد BroadcastChannel للمزامنة الفورية بين التبويبات
        this.setupBroadcastChannel();

        // 2. إعداد Firebase (بدون Auth)
        await this.setupFirebase();

        // 3. إعداد المستمعين
        this.setupListeners();

        // 4. بدء المزامنة الدورية
        this.startSync();

        console.log('[UltimateSync] Initialized successfully');
    }

    // ==========================================
    // BroadcastChannel - للمزامنة الفورية بين التبويبات
    // ==========================================
    setupBroadcastChannel() {
        try {
            this.channel = new BroadcastChannel('ahmedtech_sync');

            this.channel.onmessage = (event) => {
                const { type, data, sourceTab, timestamp } = event.data;

                if (sourceTab === this.tabId) return; // تجاهل الرسائل من نفس التبويب

                console.log('[UltimateSync] Received from another tab:', type);

                switch(type) {
                    case 'DATA_CHANGED':
                        this.handleRemoteChange(data);
                        break;
                    case 'REQUEST_SYNC':
                        this.broadcastData();
                        break;
                    case 'FULL_DATA':
                        this.mergeRemoteData(data);
                        break;
                }
            };

            console.log('[UltimateSync] BroadcastChannel ready');
        } catch (e) {
            console.warn('[UltimateSync] BroadcastChannel not supported:', e);
        }
    }

    broadcastChange(dataType, item) {
        if (!this.channel) return;

        this.channel.postMessage({
            type: 'DATA_CHANGED',
            data: { type: dataType, item: item },
            sourceTab: this.tabId,
            timestamp: Date.now()
        });
    }

    broadcastData() {
        if (!this.channel) return;

        const fullData = {
            users: userManager?.users || [],
            macs: macManager?.macs || [],
            xtreams: xtreamManager?.xtreams || [],
            tickets: ticketManager?.tickets || [],
            apps: iptvAppsManager?.apps || [],
            telegram: telegramManager?.links || {}
        };

        this.channel.postMessage({
            type: 'FULL_DATA',
            data: fullData,
            sourceTab: this.tabId,
            timestamp: Date.now()
        });
    }

    // ==========================================
    // Firebase - للمزامنة بين الأجهزة
    // ==========================================
    async setupFirebase() {
        try {
            if (typeof firebase === 'undefined' || !firebase.apps.length) {
                console.warn('[UltimateSync] Firebase not available');
                return;
            }

            this.db = firebase.firestore();

            // محاولة تفعيل persistence
            try {
                await this.db.enablePersistence({ synchronizeTabs: true });
            } catch (e) {
                console.log('[UltimateSync] Persistence note:', e.message);
            }

            console.log('[UltimateSync] Firebase ready');
        } catch (e) {
            console.error('[UltimateSync] Firebase error:', e);
        }
    }

    // ==========================================
    // المستمعون
    // ==========================================
    setupListeners() {
        // الاتصال بالإنترنت
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('[UltimateSync] Online');
            this.syncFromFirebase();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('[UltimateSync] Offline');
        });

        // تغيير التبويب
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                console.log('[UltimateSync] Tab visible');
                this.requestSyncFromOtherTabs();
            }
        });

        // قبل إغلاق الصفحة
        window.addEventListener('beforeunload', () => {
            if (this.channel) {
                this.channel.close();
            }
        });
    }

    // ==========================================
    // المزامنة الدورية
    // ==========================================
    startSync() {
        // مزامنة فورية عند التحميل
        setTimeout(() => {
            this.requestSyncFromOtherTabs();
            this.syncFromFirebase();
        }, 500);

        // مزامنة دورية كل 2 ثانية
        this.syncInterval = setInterval(() => {
            this.syncToFirebase();
        }, 2000);
    }

    requestSyncFromOtherTabs() {
        if (!this.channel) return;

        this.channel.postMessage({
            type: 'REQUEST_SYNC',
            sourceTab: this.tabId
        });
    }

    // ==========================================
    // مزامنة Firebase
    // ==========================================
    async syncFromFirebase() {
        if (!this.db || !this.isOnline) return;

        try {
            console.log('[UltimateSync] Syncing from Firebase...');

            const collections = [
                { name: 'users', key: 'users', manager: userManager },
                { name: 'free_macs', key: 'macs', manager: macManager },
                { name: 'free_xtreams', key: 'xtreams', manager: xtreamManager },
                { name: 'tickets', key: 'tickets', manager: ticketManager },
                { name: 'iptv_apps', key: 'apps', manager: iptvAppsManager }
            ];

            for (const col of collections) {
                try {
                    const snapshot = await this.db.collection(col.name).get();
                    if (!snapshot.empty) {
                        const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
                        this.updateLocalData(col.key, items, col.manager);
                    }
                } catch (e) {
                    console.warn(`[UltimateSync] Error loading ${col.name}:`, e.message);
                }
            }

        } catch (e) {
            console.error('[UltimateSync] Firebase sync error:', e);
        }
    }

    async syncToFirebase() {
        if (!this.db || !this.isOnline) return;

        try {
            const dataToSync = [
                { name: 'users', data: userManager?.users || [] },
                { name: 'free_macs', data: macManager?.macs || [] },
                { name: 'free_xtreams', data: xtreamManager?.xtreams || [] },
                { name: 'tickets', data: ticketManager?.tickets || [] },
                { name: 'iptv_apps', data: iptvAppsManager?.apps || [] }
            ];

            for (const { name, data } of dataToSync) {
                if (data.length === 0) continue;

                for (const item of data) {
                    try {
                        const cleanItem = { ...item };
                        delete cleanItem.password;
                        delete cleanItem.passwordHash;
                        delete cleanItem.salt;

                        await this.db.collection(name).doc(item.id.toString()).set({
                            ...cleanItem,
                            _lastSync: Date.now(),
                            _tabId: this.tabId
                        }, { merge: true });
                    } catch (e) {
                        // تجاهل أخطاء الكتابة (قد تكون بسبب القواعد)
                    }
                }
            }
        } catch (e) {
            // تجاهل الأخطاء العامة
        }
    }

    // ==========================================
    // معالجة التغييرات
    // ==========================================
    handleRemoteChange({ type, item }) {
        console.log('[UltimateSync] Remote change:', type, item.id);

        const managers = {
            'users': userManager,
            'macs': macManager,
            'xtreams': xtreamManager,
            'tickets': ticketManager,
            'apps': iptvAppsManager
        };

        const manager = managers[type];
        if (!manager) return;

        // تحديث البيانات المحلية
        const dataKey = type === 'users' ? 'users' : 
                       type === 'macs' ? 'macs' : 
                       type === 'xtreams' ? 'xtreams' : 
                       type === 'tickets' ? 'tickets' : 'apps';

        const existingIndex = manager[dataKey].findIndex(i => i.id == item.id);

        if (existingIndex >= 0) {
            manager[dataKey][existingIndex] = item;
        } else {
            manager[dataKey].push(item);
        }

        // حفظ في localStorage
        if (securityManager) {
            securityManager.secureStore(CONFIG.STORAGE_KEYS[dataKey.toUpperCase()] || dataKey, manager[dataKey]);
        }

        // تحديث الواجهة
        this.updateUI(type);
    }

    mergeRemoteData(data) {
        console.log('[UltimateSync] Merging remote data');

        if (data.users && userManager) {
            this.updateLocalData('users', data.users, userManager);
        }
        if (data.macs && macManager) {
            this.updateLocalData('macs', data.macs, macManager);
        }
        if (data.xtreams && xtreamManager) {
            this.updateLocalData('xtreams', data.xtreams, xtreamManager);
        }
        if (data.tickets && ticketManager) {
            this.updateLocalData('tickets', data.tickets, ticketManager);
        }
        if (data.apps && iptvAppsManager) {
            this.updateLocalData('apps', data.apps, iptvAppsManager);
        }
        if (data.telegram && telegramManager) {
            telegramManager.links = data.telegram;
        }
    }

    updateLocalData(key, data, manager) {
        if (!manager) return;

        if (key === 'users') {
            // دمج مع الحفاظ على كلمات المرور
            const local = manager[key] || [];
            manager[key] = data.map(item => {
                const existing = local.find(l => l.id == item.id);
                return {
                    ...item,
                    passwordHash: existing?.passwordHash || item.passwordHash,
                    salt: existing?.salt || item.salt
                };
            });
        } else {
            manager[key] = data;
        }

        // حفظ
        if (securityManager) {
            securityManager.secureStore(CONFIG.STORAGE_KEYS[key.toUpperCase()] || key, manager[key]);
        }

        this.updateUI(key);
    }

    updateUI(type) {
        const updaters = {
            'users': 'updateUsersTable',
            'macs': 'updateFreeMACCards',
            'xtreams': 'updateFreeXtreamCards',
            'tickets': 'updateTicketsList',
            'apps': 'updateIPTVAppsCards'
        };

        const fn = updaters[type];
        if (fn && typeof window[fn] === 'function') {
            window[fn]();
        }
    }

    // ==========================================
    // API عام
    // ==========================================
    notifyChange(type, item) {
        // إعلام التبويبات الأخرى
        this.broadcastChange(type, item);

        // مزامنة مع Firebase
        this.syncToFirebase();
    }
}

// ============================================
// بدء المزامنة
// ============================================
let ultimateSync = null;

window.addEventListener('load', () => {
    // انتظار تهيئة المدراء
    const checkAndInit = () => {
        if (typeof userManager !== 'undefined') {
            ultimateSync = new UltimateSyncManager();
            window.ultimateSync = ultimateSync;
        } else {
            setTimeout(checkAndInit, 100);
        }
    };

    setTimeout(checkAndInit, 500);
});

// ============================================
// تعديل دوال الحفظ لإعلام المزامنة
// ============================================

// تعديل UserManagement.saveToStorage
const originalUserSave = UserManagement.prototype.saveToStorage;
UserManagement.prototype.saveToStorage = async function() {
    await originalUserSave.call(this);
    if (ultimateSync) {
        ultimateSync.notifyChange('users', this.users);
    }
};

// تعديل FreeMACManager.saveToStorage
const originalMacSave = FreeMACManager.prototype.saveToStorage;
FreeMACManager.prototype.saveToStorage = async function() {
    await originalMacSave.call(this);
    if (ultimateSync) {
        ultimateSync.notifyChange('macs', this.macs);
    }
};

// تعديل FreeXtreamManager.saveToStorage
const originalXtreamSave = FreeXtreamManager.prototype.saveToStorage;
FreeXtreamManager.prototype.saveToStorage = async function() {
    await originalXtreamSave.call(this);
    if (ultimateSync) {
        ultimateSync.notifyChange('xtreams', this.xtreams);
    }
};

// تعديل TicketManager.saveToStorage
const originalTicketSave = TicketManager.prototype.saveToStorage;
TicketManager.prototype.saveToStorage = async function() {
    await originalTicketSave.call(this);
    if (ultimateSync) {
        ultimateSync.notifyChange('tickets', this.tickets);
    }
};

// تعديل IPTVAppsManager.saveToStorage
const originalAppSave = IPTVAppsManager.prototype.saveToStorage;
IPTVAppsManager.prototype.saveToStorage = async function() {
    await originalAppSave.call(this);
    if (ultimateSync) {
        ultimateSync.notifyChange('apps', this.apps);
    }
};

console.log('[UltimateSync] Module loaded');
