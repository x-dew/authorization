import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import './addUser.css'
import BackspaceIcon from '@mui/icons-material/Backspace';
import AddUserInput from "../addUserInput/addUserInput";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


const AddUser = ({handleOpen, setOpen, open,setRestartList}) => {
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <Box className='modal' sx={style}>
                        <div className='modalWindows'>
                            <h3>Добавление пользователя</h3>
                            <BackspaceIcon onClick={handleClose}/>
                        </div>
                        <div className='modalInput'>
                            <AddUserInput
                                setRestartList={setRestartList}
                                handleClose={handleClose}/>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default AddUser