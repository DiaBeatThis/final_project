# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-17 18:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diabeatthis', '0012_auto_20170113_1408'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='physicalactivity',
            name='date',
        ),
        migrations.AddField(
            model_name='physicalactivity',
            name='time_stamp',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
