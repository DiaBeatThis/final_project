from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    SEX_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    RACE_CHOICES = (
        ('AI', 'American Indian'),
        ('A', 'Asian'),
        ('AA', 'African American'),
        ('L', 'Latino'),
        ('ME', 'Middle Eastern'),
        ('SA', 'South Asian/Indian'),
        ('NH', 'Native Hawaiian'),
        ('W', 'White'),
    )

    user = models.OneToOneField(User)
    height = models.IntegerField(default=0)
    weight = models.IntegerField(default=0)
    sex = models.CharField(max_length=1, choices=SEX_CHOICES)
    dob = models.DateField(max_length=8)
    race = models.CharField(max_length=2, choices=RACE_CHOICES, blank=True, null=True)
    avatar = models.ImageField(upload_to='images', blank=True, null=True,
                                default='images/placeholder.png')
    steps_goal = models.IntegerField(default=0)
    water_goal = models.IntegerField(default=0)
    calendar_id = models.CharField(max_length=80, blank=True, null=True)

    def __str__(self):
        return self.user.username


class Nutrition(models.Model):
    calories = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    carbs = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    fat = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    protein = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    sugar = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    sodium = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)


class Meals(models.Model):
    food_name = models.CharField(max_length=50)
    food_portion = models.IntegerField(default=0)
    nutritional_facts = models.ForeignKey(Nutrition)
    time_eaten = models.DateTimeField(auto_now_add=False)
    profile_id = models.ForeignKey(Profile)


class PhysicalActivity(models.Model):
    activity_name = models.CharField(max_length=20, blank=True, null=True)
    calories_burned = models.DecimalField(max_digits=4, decimal_places=2,
                                            blank=True, null=True)
    duration = models.TimeField(auto_now=False, blank=True, null=True)
    date = models.DateField(auto_now_add=False, blank=True, null=True)
    distance = models.DecimalField(max_digits=6, decimal_places=2,
                                blank=True, null=True)
    notes = models.CharField(max_length=255, blank=True, null=True)
    profile_id = models.ForeignKey(Profile)


class Insulin(models.Model):
    mcU_ml = models.DecimalField(max_digits=8, decimal_places=2)
    time_stamp = models.DateTimeField(auto_now_add=False)
    profile_id = models.ForeignKey(Profile)


class BloodSugar(models.Model):
    mg_dL = models.DecimalField(max_digits=8, decimal_places=2)
    time_stamp = models.DateTimeField(auto_now_add=False)
    profile_id = models.ForeignKey(Profile)


class Water(models.Model):
    ounces = models.IntegerField(default=0)
    time_stamp = models.DateTimeField(auto_now_add=False)
    profile_id = models.ForeignKey(Profile)


class Food(models.Model):
    name = models.CharField(max_length=200)
    unit = models.CharField(max_length=20, blank=True, null=True)
