# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-06 18:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diabeatthis', '0004_auto_20170106_1811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
    ]
