# Generated by Django 4.2.7 on 2024-08-01 14:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cart',
            old_name='cart_id',
            new_name='id',
        ),
        migrations.AlterField(
            model_name='cartitems',
            name='cart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.cart'),
        ),
        migrations.AlterField(
            model_name='cartitems',
            name='quantity',
            field=models.PositiveIntegerField(),
        ),
    ]
