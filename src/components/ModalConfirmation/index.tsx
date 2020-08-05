import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
} from '@material-ui/core';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Draggable from 'react-draggable';
import PropTypes from 'prop-types';

interface IModal {
  open: boolean;
  close(): void;
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

const Red = createMuiTheme({
  palette: {
    secondary: {
      main: red[800],
    },
  },
});

const ModalConfirmation: React.FC<IModal> = ({
  open,
  close,
  name,
  cancel,
  del,
}) => {
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
            Deseja remover permanentemente{' '}
            <span style={{ fontWeight: 'bold' }}>{name}</span>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={close} color="primary">
            {cancel}
          </Button>
          <ThemeProvider theme={Red}>
            <Button onClick={close} color="secondary">
              {del}
            </Button>
          </ThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ModalConfirmation.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  name: PropTypes.string,
  cancel: PropTypes.string.isRequired,
  del: PropTypes.string.isRequired,
};

ModalConfirmation.defaultProps = {
  name: '',
};

export default ModalConfirmation;
