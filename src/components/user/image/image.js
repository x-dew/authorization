import React, {useState} from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import '../../../assets/styles/image.css'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Image = ({file, onChange}) => {

    const [imageError, setImageError] = useState('')

    const photoVerification = (e) => {
        if (e.target.files.length === 0) {
            setImageError('Выберите фото')
            return;
        }
        const file = e.target.files[0]

        if (file.size > 52428800) {
            setImageError('Максимальный объём файла 50 Mb')
            return
        }
        if (['image/jpeg', 'image/jpg', 'image/png'].some(i => i === file.type)) {
            convertFileToBase64(e)
            setImageError('')
        } else {
            setImageError('Неверный формат')
        }
    }

    const convertFileToBase64 = e => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            onChange(reader.result)
            e.target.value = null
        }
    };

    return (
        <div
            className='image'
        >
            <div className='imageButton'>
                <div className='fileInput'>
                    <p>Добавить фото</p>
                    <Box className='inputBlockImg'>
                        <TextField
                            onChange={photoVerification}
                            name='image'
                            accept="image/png, image/jpeg"
                            type='file'
                            variant="outlined"/>
                    </Box>
                </div>
                <p className={imageError !== '' ? 'imageError' : ''}>
                    {imageError === '' ? 'только.jpg или .png файлы' : imageError}
                </p>
            </div>
            <div className='imgBlock'>
                <Stack className='imgBlock_data' direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src={imageError === '' ? file : ''}/>
                    <DeleteForeverRoundedIcon onClick={() => onChange('')}/>
                </Stack>
            </div>
        </div>
    )
}

export default Image