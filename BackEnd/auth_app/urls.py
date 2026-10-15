from django.urls import path
from .views import register_user, contact_us # 🌟 استدعاء الدالة الجديدة هنا
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # رابط التسجيل
    path('register/', register_user, name='register'),
    
    # روابط تسجيل الدخول وتوليد التوكن عبر JWT
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # 🌟 رابط استقبال رسائل اتصل بنا (contact/)
    path('contact/', contact_us, name='contact'),
]