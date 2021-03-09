import {configureStore} from '@reduxjs/toolkit'
import createIcon from '~/store/createIconSlice';

const store = configureStore({
  reducer: {
    createIcon
  }
})

export default store
