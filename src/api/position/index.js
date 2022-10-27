
import {http} from "../index";


const list = (data) => {
    return http('post','admin/positions/list',data)
}

const amount = () => {
    return http('post','admin/positions/amount')
}

const create = (data) => {
    return http('post','admin/positions/create',data)
}

const view = (id) => {
    return http('post',`admin/positions/${id}`)
}

const update = (data,id) => {
    return http('put',`admin/positions/${id}`,data)
}

const destroy = (id) => {
    return http('delete',`admin/positions/${id}`)
}

export default {
    list,
    amount,
    create,
    update,
    view,
    destroy
}