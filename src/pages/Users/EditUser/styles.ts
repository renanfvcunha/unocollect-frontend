import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#e7e7e7',
  },
  iconBack: {
    marginRight: 8,
  },
  title: {
    fontWeight: 'bold',
    margin: theme.spacing(1),
    color: '#66bb6a',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  formBox: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 12,
    width: '60%',
  },
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    margin: theme.spacing(1),
    width: '40%',
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  margin: {
    margin: theme.spacing(1),
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subButton: {
    margin: theme.spacing(1),
    marginTop: 8,
    width: '40%',
  },
}));

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: '#fff',
      },
    },
  },
  palette: {
    primary: {
      main: green[400],
    },
  },
});
