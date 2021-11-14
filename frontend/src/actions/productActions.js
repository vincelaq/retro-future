import axios from 'axios'
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
    // PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_UPDATE_REVIEW_REQUEST,
    PRODUCT_UPDATE_REVIEW_SUCCESS,
    PRODUCT_UPDATE_REVIEW_FAIL,

    PRODUCT_DELETE_REVIEW_REQUEST,
    PRODUCT_DELETE_REVIEW_SUCCESS,
    PRODUCT_DELETE_REVIEW_FAIL,

} from '../constants/productConstants'

export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/products${keyword}`)

        dispatch({ 
            type: PRODUCT_LIST_SUCCESS, 
            payload: data 
        })

    } catch (error) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL, 
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail 
                : error.message, 
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: data 
        })

    } catch (error) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail 
                : error.message, 
        })
    }
}

export const listProductReviewDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REVIEW_REQUEST })

        const { data } = await axios.get(`/api/products/detail/reviews/${id}`)

        dispatch({ 
            type: PRODUCT_DETAILS_REVIEW_SUCCESS, 
            payload: data 
        })

    } catch (error) {
        dispatch({ 
            type: PRODUCT_DETAILS_REVIEW_FAIL, 
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail 
                : error.message, 
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })
        
        
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail 
                : error.message, 
        })
    }
}

export const updateProductReview = (review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/products/update/reviews/${review._id}/`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteProductReview = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/reviews/${id}/`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_REVIEW_SUCCESS,
            data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}