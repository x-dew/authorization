import {http} from "../index";


const list = (data,id) => {
  return http('post','admin/users/list',data)
}

const amount = () => {
  return http('post','admin/users/amount')
}

const create = (data) => {
  return http('post','admin/users/create',data)
}

const view = (id) => {
  return http('post',`admin/users/${id}`)
}

const update = (data,id) => {
  return http('put',`admin/users/${id}`,data)
}

const destroy = (id) => {
  return http('delete',`admin/users/${id}`)
}

export default {
  list,
  amount,
  update,
  create,
  destroy,
  view
}
