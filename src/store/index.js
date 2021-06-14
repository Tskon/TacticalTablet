import {configureStore} from '@reduxjs/toolkit'
import wsData from '~/store/wsDataSlice'
import createIcon from '~/store/createIconSlice'
import tabletData from '~/store/tabletDataSlice'
import tabletList from '~/store/TabletListSlice'

const store = configureStore({
  reducer: {
    wsData,
    createIcon,
    tabletData,
    tabletList,
  }
})

if (window) {
  window.$store = store
}

export default store
