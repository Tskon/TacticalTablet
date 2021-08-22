import {v4 as uuid} from 'uuid'
import Tablet from '../dbModels/Tablet.js'

export default {
  async create(req, res) {
    const {title, aspectRatio} = req.body

    if (!title || !aspectRatio) {
      return res.status(500).send({status: 'error', message: 'INCORRECT_DATA'})
    }

    const tabletData = await Tablet.create({
      editId: `edit-${uuid()}`,
      viewId: `view-${uuid()}`,
      title,
      aspectRatio
    })

    const {editId} = tabletData._doc

    res.send({editId, status: 'ok'})
  },

  async get(req, res) {
    const {id} = req.query
    if (!id) {
      return res.status(400).send({message: 'id required'})
    }

    const isEditId = /^edit-/.test(id)
    const filter = isEditId ? {editId: id} : {viewId: id}
    const selectFields = {
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    }
    if (!isEditId) {
      selectFields.editId = 0
    }
    const findedTablet = await Tablet.findOne(filter).select(selectFields)

    if (!findedTablet) {
      return res.status(400).send({message: 'incorrect id'})
    }

    res.send(findedTablet)
  }
}
