# Generated by Django 4.2.10 on 2024-02-14 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Todo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("body", models.CharField(max_length=300)),
                ("completed", models.BooleanField(default=False)),
                ("updated", models.DateTimeField(auto_now=True)),
                ("created", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]