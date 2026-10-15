from django.contrib.auth import get_user_model  
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from drf_yasg.utils import swagger_auto_schema

# 🌟 استدعاء الموديل والسيريالايزر الجديدين
from .models import ContactMessage
from .serializers import ContactMessageSerializer

User = get_user_model()

# 1. سيريالايزر خاص لتحديد شكل حقول التسجيل داخل واجهة السواجر
class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150, help_text="اسم المستخدم الجديد")
    email = serializers.EmailField(required=False, help_text="البريد الإلكتروني (اختياري)")
    password = serializers.CharField(max_length=128, write_only=True, help_text="كلمة المرور")
    confirm_password = serializers.CharField(max_length=128, write_only=True, help_text="تأكيد كلمة المرور")

# 2. دالة تسجيل مستخدم جديد
@swagger_auto_schema(
    method='post',
    request_body=RegisterSerializer,
    responses={
        201: "تم إنشاء الحساب بنجاح!",
        400: "خطأ في البيانات المدخلة"
    }
)
@api_view(['POST'])
@permission_classes([AllowAny]) 
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        email = serializer.validated_data.get('email', '')
        password = serializer.validated_data['password']
        confirm_password = serializer.validated_data['confirm_password']
        
        if password != confirm_password:
            return Response({"error": "كلمات المرور غير متطابقة!"}, status=status.HTTP_400_BAD_REQUEST)
            
        if User.objects.filter(username=username).exists():
            return Response({"error": "اسم المستخدم هذا مأخوذ بالفعل، اختر اسماً آخر."}, status=status.HTTP_400_BAD_REQUEST)
            
        User.objects.create_user(username=username, email=email, password=password)
        return Response({"message": "تم إنشاء الحساب بنجاح! يمكنك الآن الذهاب لدالة Login وتوليد التوكن."}, status=status.HTTP_201_CREATED)
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 🌟 3. دالة استقبال رسائل اتصل بنا وحفظها في قاعدة البيانات
@swagger_auto_schema(
    method='post',
    request_body=ContactMessageSerializer,
    responses={
        201: "تم إرسال الرسالة بنجاح! 🎉",
        400: "خطأ في البيانات المدخلة"
    }
)
@api_view(['POST'])
@permission_classes([AllowAny]) # متاح لجميع زوار الموقع دون الحاجة لتسجيل دخول
def contact_us(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() # حفظ الرسالة تلقائياً في الـ Database
        return Response({"message": "Your message has been sent successfully! 🎉"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)