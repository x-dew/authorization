
import {http} from "../index";


const signin = (data) => {
    return http('post','auth/signin',data,false)
}
export default {
    signin
}