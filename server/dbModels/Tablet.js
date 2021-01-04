import mongoose from 'mongoose'

const { Schema } = mongoose

const TabletSchema = new Schema({
  editId: String,
  viewId: String,
})

export default mongoose.model('Tablet', TabletSchema)