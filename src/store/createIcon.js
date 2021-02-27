import {createSlice, configureStore} from '@reduxjs/toolkit'

const createIconSlice = createSlice({
  name: 'createIcon',
  initialState: {
    icon: null,
    color: '#ccff99',
    size: 30,
  },
  reducers: {
    setIcon: (state, payload) => {
      state.icon = payload
    }
  }
})

const store = configureStore({
  reducer: createIconSlice.reducer
})

export const {setIcon} = createIconSlice.actions
export default store
