import mongoose from 'mongoose'

const { Schema } = mongoose

const TabletSchema = new Schema({
  editId: String,
  viewId: String,
})

TabletSchema.set('timestamps', true)

export default mongoose.model('Tablet', TabletSchema)