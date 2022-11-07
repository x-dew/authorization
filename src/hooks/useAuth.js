import {useDispatch} from "react-redux";
import {setAuthFromStorage} from "../store/auth";
import {useEffect} from "react";

const useAuth = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setAuthFromStorage())
    },[])

}

export default useAuth