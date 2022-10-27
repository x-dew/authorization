
import {http} from "../index";


const list = (data) => {
    return http('post','admin/groups/list',data)
}

const amount = () => {
    return http('post','admin/groups/amount')
}

const create = (data) => {
    return http('post','admin/groups/create',data)
}

const view = (id) => {
    return http('post',`admin/groups/${id}`)
}

const update = (data,id) => {
    return http('put',`admin/groups/${id}`,data)
}

const destroy = (id) => {
    return http('delete',`admin/groups/${id}`)
}

export default {
    list,
    amount,
    update,
    create,
    view,
    destroy
}
