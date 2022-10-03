import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Backdrop from "@mui/material/Backdrop";
import Add from "./addChangeGroup/add";
import Change from "./addChangeGroup/change";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ModalGroup = ({id, open, onChange}) => {

    const handleClose = () => {
        onChange('close');
    };

    return (
        <div className='modalParameters'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Box sx={style}>{id === null ?
                    <Add
                        onChange={onChange}
                        handleClose={handleClose}/> :
                    <Change
                        id={id}
                        onChange={onChange}
                        handleClose={handleClose}
                        />}
                </Box>
            </Modal>
        </div>
    )
}
export default ModalGroup