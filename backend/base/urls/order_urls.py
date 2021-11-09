from django.urls import path
from base.views import order_views as views


urlpatterns = [
    # Order routes
    path('add/', views.addOrderItems, name='orders-add'),
]