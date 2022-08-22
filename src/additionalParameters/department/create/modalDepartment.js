import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from "@mui/material/Backdrop";
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalDepartment = ({
                             selectName,
                             setSelectName,
                             open,
                             creat,
                             newDepartment,
                             setOpen,
                             addDepartment,
                             setNewDepartment,
                             deleteDepartment,
                             upData,
                             errorValidate
                         }) => {
    const handleClose = () => setOpen(false);

    return (
        <div className='departmentModal'>
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
                <Box sx={style}>
                    {addDepartment === 'add' ?
                        <div>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                className='inputFlex'
                            >
                                <p className='modalText'>Департамент</p>
                                <ClearIcon style={{cursor: 'pointer'}} onClick={() => handleClose()}/>
                            </Typography>
                            <div className='modalAdd'>
                                <TextField
                                    error={!!errorValidate.username}
                                    helperText={errorValidate.username}
                                    className='modalAddInput'
                                    onChange={(e) => setNewDepartment(e.target.value)}
                                    id="modal-modal-description"
                                    sx={{mt: 2}}>
                                </TextField>
                                <Stack className='addDep' direction="row" spacing={2}>
                                    <Button onClick={() => {
                                        creat()
                                    }}
                                            variant="contained"
                                            color="success"
                                            disabled={!newDepartment}>
                                        Добавить
                                    </Button>
                                </Stack>
                            </div>
                        </div> : <div>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="p"
                                className='inputFlex'>
                                <p className='modalText'>Редактирование Департаментов</p>
                                <ClearIcon
                                    style={{cursor: 'pointer'}}
                                    onClick={() => handleClose()}
                                />
                            </Typography>
                            <div className='modalAdd'>
                                <TextField
                                    error={!!errorValidate.username}
                                    helperText={errorValidate.username}
                                    className='modalAddInput'
                                    onChange={(e) => setSelectName(e.target.value)}
                                    id="modal-modal-description"
                                    value={selectName}
                                    sx={{mt: 2}}>
                                </TextField>
                                <Stack className='addDep' direction="row" spacing={2}>
                                    <Button onClick={() => {
                                        if (selectName !== '') {
                                            upData()
                                        }
                                    }}
                                            variant="contained"
                                            color="success"
                                            disabled={!selectName}
                                    >
                                        Изменить
                                    </Button>
                                    <Grid
                                        onClick={() => deleteDepartment()}
                                        style={{cursor: 'pointer'}}
                                        item xs={8}>
                                        <DeleteSharpIcon/>
                                    </Grid>
                                </Stack>
                            </div>
                        </div>
                    }
                </Box>
            </Modal>
        </div>
    )
}
export default ModalDepartment