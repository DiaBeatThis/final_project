# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-13 18:51
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('diabeatthis', '0010_profile_calendar_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calendar_id', models.CharField(blank=True, max_length=80, null=True)),
            ],
        ),
        migrations.RemoveField(
            model_name='profile',
            name='calendar_id',
        ),
        migrations.AddField(
            model_name='calendar',
            name='profile_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diabeatthis.Profile'),
        ),
    ]
