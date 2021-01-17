import api from '~/common/js/api'

export default () => {
  api.post('/tablet')
    .then(response => {
      console.log(response)
    })
}