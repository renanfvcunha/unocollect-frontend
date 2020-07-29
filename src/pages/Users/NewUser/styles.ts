import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue, green } from '@material-ui/core/colors';

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
    fontWeight: 500,
    margin: theme.spacing(1),
  },
  formBox: {
    marginTop: 36,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 12,
    width: '50%',
    marginLeft: '25%',
  },
  formRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  subButton: {
    marginTop: 8,
  },
}));

export const Colors = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: green[800],
    },
  },
});
