# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-23 16:14
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BloodSugar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mg_dL', models.DecimalField(decimal_places=2, max_digits=3)),
                ('time_stamp', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Insulin',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mcU_ml', models.DecimalField(decimal_places=2, max_digits=3)),
                ('time_stamp', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Meals',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('food_name', models.CharField(max_length=50)),
                ('food_portion', models.IntegerField(default=0)),
                ('time_eaten', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Nutrition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calories', models.DecimalField(decimal_places=2, max_digits=3)),
                ('carbs', models.DecimalField(decimal_places=2, max_digits=3)),
                ('fat', models.DecimalField(decimal_places=2, max_digits=3)),
                ('protein', models.DecimalField(decimal_places=2, max_digits=3)),
                ('sugar', models.DecimalField(decimal_places=2, max_digits=3)),
                ('sodium', models.DecimalField(decimal_places=2, max_digits=3)),
            ],
        ),
        migrations.CreateModel(
            name='PhysicalActivity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activity_name', models.CharField(max_length=20)),
                ('calories_burned', models.DecimalField(decimal_places=2, max_digits=4)),
                ('duration', models.TimeField()),
                ('date', models.DateTimeField()),
                ('distance', models.DecimalField(decimal_places=2, max_digits=6)),
                ('notes', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('height', models.IntegerField(default=0)),
                ('weight', models.IntegerField(default=0)),
                ('sex', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=1)),
                ('dob', models.DateField(max_length=8)),
                ('race', models.CharField(choices=[('AI', 'American Indian'), ('A', 'Asian'), ('AA', 'African American'), ('NH', 'Native Hawaiian'), ('W', 'White')], max_length=2)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Water',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ounces', models.IntegerField(default=0)),
                ('time_stamp', models.DateTimeField()),
                ('profile_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diabeatthis.Profile')),
            ],
        ),
        migrations.AddField(
            model_name='physicalactivity',
            name='profile_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diabeatthis.Profile'),
        ),
        migrations.AddField(
            model_name='meals',
            name='nutritional_facts',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diabeatthis.Nutrition'),
        ),
        migrations.AddField(
            model_name='meals',
            name='profile_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diabeatthis.Profile'),
        ),
        migrations.AddField(
            model_name='insulin',
            name='profile_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diabeatthis.Profile'),
        ),
        migrations.AddField(
            model_name='bloodsugar',
            name='profile_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diabeatthis.Profile'),
        ),
    ]
