from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
# from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review
from base.serializers import ProductSerializer, ReviewSerializer

from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    
    if query == None:
        query = ''

    products = Product.objects.filter(name__icontains=query)

    categories = []

    for product in products:
        if product.category not in categories:
            categories.append(product.category)

    
    # page = request.query_params.get('page')
    # paginator = Paginator(products, 6) 

    # try:
    #     products = paginator.page(page)
    # except PageNotAnInteger:
    #     products = paginator.page(1) 
    # except EmptyPage:
    #     products = paginator.page(paginator.num_pages)

    # if page == None:
    #     page = 1

    # page = int(page)

    serializer = ProductSerializer(products, many=True)
    # return Response({ 'products':serializer.data, 'page': page, 'pages': paginator.num_pages })
    return Response({'products': serializer.data, 'categories': categories})

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProductReview(request, pk):
    review = Review.objects.get(_id=pk)
    print(review.product._id)
    serializer = ReviewSerializer(review, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0

        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProductReview(request, pk):
    data = request.data
    review = Review.objects.get(_id=pk)

    review.rating = data['rating']
    review.comment = data['comment']

    review.save()

    product = Product.objects.get(_id=review.product._id)
    reviews = product.review_set.all()

    if product.numReviews == 0:
        product.rating = 0
    else:
        total = 0

        for i in reviews:
            total += i.rating
        
        product.rating = total / len(reviews)
    
    product.save()

    serializer = ReviewSerializer(review, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProductReview(request, pk):
    review = Review.objects.get(_id=pk)
    product = Product.objects.get(_id=review.product._id)
    reviews = product.review_set.all()

    review.delete()

    product.numReviews -= 1

    if product.numReviews == 0:
        product.rating = 0
    else:
        total = 0

        for i in reviews:
            total += i.rating
        
        product.rating = total / len(reviews)
    
    product.save()
    
    return Response('Review Deleted')