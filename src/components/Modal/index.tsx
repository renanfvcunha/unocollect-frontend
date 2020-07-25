import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

interface IModal {
  open: boolean;
  close: () => void;
  name?: string;
  cancel: string;
  del: string;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Modal: React.FC<IModal> = ({ open, close, name, cancel, del }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={close}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Alerta de Exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deseja remover permanentemente {name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close} color="primary">
            {cancel}
          </Button>
          <Button onClick={close} color="primary">
            {del}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
