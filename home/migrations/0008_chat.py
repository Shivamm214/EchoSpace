# Generated by Django 5.0.6 on 2024-08-13 13:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_customuser_isguest'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_name', models.CharField(max_length=255)),
            ],
        ),
    ]
