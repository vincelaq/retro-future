import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DETAILS_REVIEW_REQUEST, 
    PRODUCT_DETAILS_REVIEW_SUCCESS, 
    PRODUCT_DETAILS_REVIEW_FAIL,
    
    PRODUCT_CREATE_REVIEW_REQUEST, 
    PRODUCT_CREATE_REVIEW_SUCCESS, 
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_UPDATE_REVIEW_REQUEST,
    PRODUCT_UPDATE_REVIEW_SUCCESS,
    PRODUCT_UPDATE_REVIEW_FAIL,
    PRODUCT_UPDATE_REVIEW_RESET,

    PRODUCT_DELETE_REVIEW_REQUEST,
    PRODUCT_DELETE_REVIEW_SUCCESS,
    PRODUCT_DELETE_REVIEW_FAIL,

} from '../constants/productConstants'

export const productListReducer = (state = { products:[] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products:[] }
        
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false, 
                products: action.payload.products,
                categories: action.payload.categories
                // products: action.payload.products,  
                // page: action.payload.page, 
                // pages: action.payload.pages,
            }

        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload }

        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, ...state }
        
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload }

        default:
            return state
    }
}
export const productReviewDetailsReducer = (state = { review: { } }, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REVIEW_REQUEST:
            return {loading: true, ...state }
        
        case PRODUCT_DETAILS_REVIEW_SUCCESS:
            return {loading: false, review: action.payload }

        case PRODUCT_DETAILS_REVIEW_FAIL:
            return {loading: false, error: action.payload }

        default:
            return state
    }
}

export const productReviewCreateReducer = (state = { }, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        
        case PRODUCT_CREATE_REVIEW_RESET:
            return { }

        default:
            return state
    }
}

export const productReviewUpdateReducer = (state = { review: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_UPDATE_REVIEW_SUCCESS:
            return { loading: false, success: true, review: action.payload }

        case PRODUCT_UPDATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_UPDATE_REVIEW_RESET:
            return { review: {} }

        default:
            return state
    }
}

export const productReviewDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_DELETE_REVIEW_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_DELETE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}