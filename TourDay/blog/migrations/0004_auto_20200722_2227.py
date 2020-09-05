# Generated by Django 2.2 on 2020-07-22 16:27

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20200721_1423'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='blogpost',
            name='description',
            field=ckeditor_uploader.fields.RichTextUploadingField(),
        ),
    ]