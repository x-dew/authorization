import React from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './modalUser.css'
import BackspaceIcon from '@mui/icons-material/Backspace';
import EditOffIcon from '@mui/icons-material/EditOff';
import UserAdd from "../userAdd/userAdd";
import UserChange from "../userChange/userChange";

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




const ModalUser = ({restartList, setOpen, open, setRestartList, addUser, userChangeId}) => {
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
                    {addUser === 'addUser' ? <Box className='modal' sx={style}>
                        <div className='modalWindows'>
                            <h3>Добавление пользователя</h3>
                            <BackspaceIcon onClick={handleClose}/>
                        </div>
                        <div className='modalInput'>
                            <UserAdd
                                restartList={restartList}
                                setRestartList={setRestartList}
                                handleClose={handleClose}/>
                        </div>
                    </Box> : <Box className={'modal'} sx={style}>
                        <div className='modalWindows'>
                            <h3>Изменение данных пользователя</h3>
                            <EditOffIcon onClick={handleClose}/>
                        </div>
                        <div className='modalInput'>
                            <UserChange
                                restartList={restartList}
                                userChangeId={userChangeId}
                                setRestartList={setRestartList}
                                handleClose={handleClose}/>
                        </div>
                    </Box>
                    }
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalUser