import mongoose from 'mongoose'

const { Schema } = mongoose

const TabletSchema = new Schema({
  editId: String,
  viewId: String,
})

const Tablet = mongoose.model('Tablet', TabletSchema)