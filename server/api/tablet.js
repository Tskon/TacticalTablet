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
      return res.status(400).send({message: 'ID_REQUIRED'})
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
  },

  async getList(req, res) {
    const {ids} = req.query
    if (!ids) {
      return res.status(400).send({message: 'ID_LIST_REQUIRED'})
    }

    const editList = []
    const viewList = []

    ids.forEach(id => {
      if (/^edit-/.test(id)) {
        return editList.push(id)
      }
      viewList.push(id)
    })

    const selectFieldsForEditList = {
      _id: 0,
      title: 1,
      viewId: 1,
      editId: 1,
    }
    const selectFieldsForViewList = {
      _id: 0,
      title: 1,
      viewId: 1,
    }

    const findedEditTablets = await Tablet.find({editId: {$in: editList}}).select(selectFieldsForEditList)
    const findedViewTablets = await Tablet.find({viewId: {$in: viewList}}).select(selectFieldsForViewList)

    res.send({
      editList: findedEditTablets,
      viewList: findedViewTablets,
    })
  }
}
