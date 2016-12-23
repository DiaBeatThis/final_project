from rest_framework import serializers
from .models import Profile, Nutrition, Meals
from .models import PhysicalActivity, Insulin, BloodSugar, Water
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = "__all__"


class PhysicalActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = PhysicalActivity
        fields = "__all__"


class NutritionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Nutrition
        fields = "__all__"


class MealsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meals
        fields = "__all__"


class InsulinSerializer(serializers.ModelSerializer):

    class Meta:
        model = Insulin
        fields = "__all__"


class BloodSugarSerializer(serializers.ModelSerializer):

    class Meta:
        model = BloodSugar
        fields = "__all__"


class WaterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Water
        fields = "__all__"
