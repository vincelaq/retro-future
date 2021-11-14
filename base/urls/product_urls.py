from django.urls import path
from base.views import product_views as views


urlpatterns = [
    # Product routes
    path('', views.getProducts, name="products"),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('<str:pk>/', views.getProduct, name="product"),
    
    path('detail/reviews/<str:pk>/', views.getProductReview, name='review'),
    path('update/reviews/<str:pk>/', views.updateProductReview, name='edit-review'),
    path('delete/reviews/<str:pk>/', views.deleteProductReview, name='delete-review'),
]