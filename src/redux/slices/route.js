import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchRoutes = createAsyncThunk('/routes/fetchRoutes', async()=>{
    const {data} = await axios.get('/')
    return data
})

export const fetchRemoveRoute = createAsyncThunk('/routes/fetchRemoveRoutes', async(id)=>{
    axios.delete(`/route/${id}`)
})

const initialState = {
    routes: {
        items: [],
        status: 'loading'
    }
}

const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {},
    extraReducers: {
        // опросы
        [fetchRoutes.pending]: (state)=>{
            state.routes.items = []
            state.routes.status = 'loading';
        },
        [fetchRoutes.fulfilled]: (state, action)=>{
            state.routes.items = action.payload;
            state.routes.status = 'loaded';
        },
        [fetchRoutes.rejected]: (state)=>{
            state.routes.items = []
            state.routes.status = 'error';
        },
        // удаление
        [fetchRemoveRoute.pending]: (state, action)=>{
            state.routes.items = state.routes.items.filter((obj) => obj._id !== action.meta.arg)
        }
    }
})

export const routesReducer = routesSlice.reducer