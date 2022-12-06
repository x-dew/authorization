import React from "react";
import '../../assets/styles/loading.css'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";


const Loading = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (
        loading && <div className='loading'>
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        </div>
    )
}

export default Loading