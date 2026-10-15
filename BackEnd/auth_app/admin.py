from django.contrib import admin
from django.contrib.auth.admin import UserAdmin 
from .models import User, ContactMessage # 🌟 قمنا باستدعاء الموديلين معاً هنا

# 1️⃣ تسجيل موديل المستخدمين (User) الخاص بكِ
admin.site.register(User, UserAdmin)


# 2️⃣ تسجيل موديل رسائل اتصل بنا (ContactMessage) المحدث مع التنسيقات الفاخرة
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    # الحقول التي ستظهر في جدول الرسائل الرئيسي
    list_display = ('name', 'email', 'phone', 'created_at')
    
    # إضافة شريط بحث للبحث باسم المرسل أو إيميله أو نص الرسالة
    search_fields = ('name', 'email', 'message')
    
    # إضافة فلتر جانبي لتصفية الرسائل حسب تاريخ الإرسال
    list_filter = ('created_at',)
    
    # جعل تاريخ الإنشاء للقراءة فقط داخل تفاصيل الرسالة لمنع التعديل عليه
    readonly_fields = ('created_at',)
    
    # ترتيب الرسائل بحيث تظهر الأحدث في الأعلى دائماً
    ordering = ('-created_at',)