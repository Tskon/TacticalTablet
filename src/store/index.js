import {configureStore} from '@reduxjs/toolkit'
import createIconSlice from '~/store/createIconSlice';


const store = configureStore({
  reducer: createIconSlice.reducer
})

export default store
