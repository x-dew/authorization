import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
const ModalGroup = ({open, setOpen, selectId, buttonClick, setList, list}) => {
    const handleClose = () => setOpen(false);
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
                <Box sx={style}>{buttonClick === 'add' ?
                    <Add
                        setOpen={setOpen}
                        setList={setList}
                        list={list}
                        handleClose={handleClose}/> :
                    <Change
                        setOpen={setOpen}
                        setList={setList}
                        list={list}
                        handleClose={handleClose}
                        selectId={selectId}/>}
                </Box>
            </Modal>
        </div>
    )
}
export default ModalGroup