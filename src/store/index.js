import {configureStore} from '@reduxjs/toolkit'
import createIcon from '~/store/createIconSlice'
import tabletData from '~/store/tabletDataSlice'

const store = configureStore({
  reducer: {
    createIcon,
    tabletData,
  }
})

export default store
