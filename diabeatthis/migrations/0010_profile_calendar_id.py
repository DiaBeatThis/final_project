
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diabeatthis', '0009_auto_20170109_1721'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='calendar_id',
            field=models.CharField(blank=True, max_length=80, null=True),
        ),
    ]
