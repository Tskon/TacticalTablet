import mongoose from 'mongoose'

const {Schema} = mongoose

const TabletSchema = new Schema({
  editId: String,
  viewId: String,
  title: String,
  aspectRatio: Number,
  icons: [{
    _id: false,
    id: String,
    img: String,
    color: String,
    size: Number,
    x: Number,
    y: Number
  }],
})

TabletSchema.set('timestamps', true)

export default mongoose.model('Tablet', TabletSchema)
