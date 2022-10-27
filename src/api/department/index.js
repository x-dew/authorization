import {http} from "../index";


const list = (data) => {
    return http('post','admin/departments/list',data)
}

const amount = () => {
    return http('post','admin/departments/amount')
}

const create = (data) => {
    return http('post','admin/departments/create',data)
}

const view = (id) => {
    return http('post',`admin/departments/${id}`)
}

const update = (data,id) => {
    return http('put',`admin/departments/${id}`,data)
}

const destroy = (id) => {
    return http('delete',`admin/departments/${id}`)
}

export default {
    list,
    amount,
    create,
    view,
    update,
    destroy
}
