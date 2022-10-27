
import {http} from "../index";


const signin = (data) => {
    return http('post','auth/signin',data)
}
export default {
    signin
}