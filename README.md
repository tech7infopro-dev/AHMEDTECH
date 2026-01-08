# 📺 نظام AHMEDTECH DZ-IPTV

نظام إدارة IPTV متكامل ومتقدم مع مزامنة Firebase وحماية أمنية شاملة.

## 🚀 نظرة عامة

نظام AHMEDTECH DZ-IPTV هو نظام متكامل لإدارة خدمات IPTV يتضمن:
- إدارة المستخدمين والأدوار
- تخزين ومزامنة البيانات مع Firebase
- حماية أمنية متقدمة
- واجهة مستخدم بديهية

## ✨ المميزات

### 🔒 نظام الأمان المتقدم
- **حماية من هجمات SQL/NoSQL Injection**
- **حماية من هجمات XSS**
- **نظام CSRF مع الكوكيز**
- **تشفير PBKDF2 لكلمات المرور**
- **جلسات آمنة مع HTTPS Cookies**

### ☁️ المزامنة السحابية
- **مزامنة تلقائية مع Firebase**
- **نسخ احتياطي واستعادة**
- **عمل في وضع عدم الاتصال**
- **مزامنة دورية كل 10 دقائق**

### 👥 إدارة المستخدمين
- **ثلاثة مستويات (مسؤول، مشرف، مستخدم)**
- **إضافة/تعديل/حذف المستخدمين**
- **نظام CAPTCHA متقدم**
- **تتبع محاولات تسجيل الدخول**

### 📦 إدارة محتوى IPTV
- **إدارة باقات Free MACs**
- **إدارة خوادم Xtream Codes**
- **فيديوهات تعليمية**
- **نسخ البيانات إلى الحافظة**

## 🛠️ متطلبات التشغيل

### متطلبات الخادم
- **متصفح ويب حديث** (Chrome 80+, Firefox 75+, Edge 80+)
- **اتصال بالإنترنت** (للمزامنة مع Firebase)
- **تفعيل JavaScript**

### متطلبات Firebase
- **حساب Google Firebase**
- **مشروع Firebase جديد**
- **تمكين خدمة Firestore**

## ⚡ التنصيب السريع

### الخطوة 1: إعداد Firebase
1. انتقل إلى [console.firebase.google.com](https://console.firebase.google.com)
2. أنشئ مشروع جديد
3. أضف تطبيق ويب (Web App)
4. انسخ معلومات التهيئة:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "project.firebaseapp.com",
  projectId: "project-id",
  storageBucket: "project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
  measurementId: "G-ABCDEF123"
};

🔄 التحديثات

التحديث من نسخة قديمة

1. النظام يتعرف تلقائياً على التحديثات
2. عند تغيير الإصدار، يتم مسح البيانات المحلية
3. يتم استعادة البيانات من Firebase إذا كانت متاحة

الإصدار الحالي: v1.2.2

· إضافة نظام HTTPS Cookies المتقدم
· تحسين نظام CSRF مع الكوكيز
· تحديث نظام حماية الحقن
· تحسين أداء تسجيل الدخول

🤝 الدعم والمساندة

قنوات الدعم

· البريد الإلكتروني: tech7infopro@gmail.com

الإبلاغ عن مشاكل

عند الإبلاغ عن مشكلة، يرجى توفير:

1. إصدار النظام
2. نوع المتصفح وإصداره
3. خطوات تكرار المشكلة
4. لقطة شاشة للخطأ (إن أمكن)

📄 الرخصة

هذا النظام مقدم للاستخدام الشخصي. يمنع:

· التوزيع التجاري بدون إذن
· التعديل وإعادة النشر بدون نسب المصدر
· الاستخدام في أنشطة غير قانونية

🌟 الاعتمادات

· المطور: Ahmed
· الشركة: AHMEDTECH
· الإصدار: 1.2.2
· تاريخ الإصدار: 2025-12-19

---

✨ صنع بـ ❤️ بواسطة AHMEDTECH DZ

=====================================
#AHMEDTECH DZ-IPTV System
 Integrated and advanced IPTV management system with Firebase sync and comprehensive security protection. 
 ## Overview 
 AHMEDTECH DZ-IPTV is an integrated IPTV service management system that includes: 
 - User and role management - Data storage and synchronization 
 with Firebase 
 - Advanced security protection 
 - Intuitive user interface 
 ## Features 
 ### Advanced security system 
 - **Protection from SQL/NoSQL Injection attacks** 
 - **Protection from XSS attacks** 
 - **CSRF system with cookies** 
 - **PBKDF2 encryption for passwords** 
 - **Secure sessions with HTTPS Cookies** 
 
 ### Cloud synchronization 
 - **Automatic sync with Firebase** 
 - **Backup and Restore** 
 - **Work offline** 
 - **Periodic sync every 10 minutes** 
 ### User management 
 - **Three levels (admin, admin, user)** 
 - **Add/edit/delete users** 
 - **Advanced CAPTCHA system** 
 - **Track login attempts** 
 ### IPTV content management 
 - **Manage Free MACs packages** 
 - **Manage Xtream Codes servers** 
 - **Tutorials** 
 - **Copy data to clipboard** 
 ## Operating Requirements 
 ### Server Requirements 
 - **Modern web browser** (Chrome 80+, Firefox 75+, Edge 80+) 
 - **Internet connection** (to sync with Firebase) 
 - **JavaScript enabled** 
 ### Firebase Requirements 
 - **Google Firebase Account** 
 - **New Firebase Project** 
 - **Enable Firestore service** 
 ## Quick installation 
 ### Step 1: Set up Firebase
 1. Go to [console.firebase.google.com](https://console.firebase.google.com) 
 2. Create a new project 
 3. Add Web App 
 4. Copy the configuration information: ```javascript const firebaseConfig = { apiKey: "AIzaSy...", authDomain: "project.firebaseapp.com", projectId: "project-id", storageBucket: "project.appspot.com", messagingSenderId: "123456789", appId: "1:123456789:web:abc123def456", measurementId: "G-ABCDEF123" };   
 
 Updates 
 Updating from an old version 
 1. The system automatically recognizes updates 
 2. When the version changes, local data is erased 
 3. Data is restored from Firebase if available Current version: v1.2.2 
 · Added advanced HTTPS Cookies system 
 · Improved CSRF system with cookies 
 · Updated injection protection system 
 · Improved login performance Support and assistance Support channels 
 · Email: tech7infopro@gmail.com 
 Reporting problems 
 When reporting a problem, please provide: 
 1. System version 
 2. Browser type and version 
 3. Steps to reproduce the problem 
 4. Screenshot of the error (if applicable) 
 License This system is provided for personal use. 
 Prohibited: 
 · Commercial distribution without permission 
 · Modification and republication without attribution 
 · Use in illegal activities Credits 
 · Developer: Ahmed 
 · Company: AHMEDTECH 
 · Version: 1.2.2 
 · Release date: 2025-12-19
  --- Made with by AHMEDTECH DZ
