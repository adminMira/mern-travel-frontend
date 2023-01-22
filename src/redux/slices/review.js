import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchReviews = createAsyncThunk('/reviews/fetchReviews', async()=>{
    const {data} = await axios.get('/reviews')
    return data
})

export const fetchRemoveReview = createAsyncThunk('/reviews/fetchRemoveReviews', async(id)=>{
    axios.delete(`/reviews/${id}`)
})

const initialState = {
    reviews: {
        items: [],
        status: 'loading'
    }
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: {
        
        [fetchReviews.pending]: (state)=>{
            state.reviews.items = []
            state.reviews.status = 'loading';
        },
        [fetchReviews.fulfilled]: (state, action)=>{
            state.reviews.items = action.payload;
            state.reviews.status = 'loaded';
        },
        [fetchReviews.rejected]: (state)=>{
            state.reviews.items = []
            state.reviews.status = 'error';
        },
      
        [fetchRemoveReview.pending]: (state, action)=>{
            state.reviews.items = state.reviews.items.filter((obj) => obj._id !== action.meta.arg)
        }
    }
})

export const reviewReducer = reviewsSlice.reducer