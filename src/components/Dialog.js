import React, {useContext} from 'react';
import { Dialog, Button, DialogActions, DialogTitle } from '@material-ui/core';
import DialogContext from '../DialogContext';

const DialogComponent = () => {
    const dialogFunctions = useContext(DialogContext);
    return (
    <div>
        <Dialog open={dialogFunctions.open} onClose={dialogFunctions.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Your action is completed!"}</DialogTitle>
        <DialogActions>
          <Button onClick={dialogFunctions.handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
};

export default DialogComponent;