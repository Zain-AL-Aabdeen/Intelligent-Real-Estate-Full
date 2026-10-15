from rest_framework import serializers
from .models import User, ContactMessage # 🌟 قمنا باستدعاء الموديل الجديد هنا
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    email = serializers.EmailField(required=True, validators=[validate_email])
    
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        read_only_fields = ["id"]

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

# 🌟 السيريالايزر الجديد الخاص باستقبال رسائل اتصل بنا
class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'message', 'created_at']
        read_only_fields = ["id", "created_at"]