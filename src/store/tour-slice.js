import {createSlice} from '@reduxjs/toolkit'

const tourSlice = createSlice({
    name:'tour slice',
    initialState:{
        tours:[],
        isLoading:false,
        error:null
    },
    reducers:{
        createTour(state,action){
          state.tours.push(action.payload)
        },
        populateTours(state, action){
            state.tours = [...action.payload]
        },
        setIsLoading(state, action){
            state.isLoading  = action.payload
        },
        setHasError(state,action){
              state.error = action.payload
        }
    }
})

const tourSliceReducer = tourSlice.reducer
export const tourSliceActions = tourSlice.actions

export default tourSliceReducer
