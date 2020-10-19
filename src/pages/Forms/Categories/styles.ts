import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { pink, blue, red, orange } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#e7e7e7',
  },
  margin: {
    margin: theme.spacing(1),
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  groupBox: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: 12,
    width: '50%',
  },
  title: {
    fontWeight: 500,
    margin: theme.spacing(1),
  },
  addGroupBtn: {
    marginLeft: 8,
  },
  groups: {
    margin: theme.spacing(1),
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupNameWithActions: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
  },
  groupName: {
    fontSize: 20,
    fontWeight: 500,
    backgroundColor: pink[400],
    boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(1),
    color: '#fff',
    borderRadius: 12,
    cursor: 'default',
  },
  addGroup: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(1),
  },
}));

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[400],
    },
  },
});

export const btnActions = createMuiTheme({
  palette: {
    primary: {
      main: orange[800],
    },
    secondary: {
      main: red[800],
    },
  },
});

export const btnAction = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: red[800],
    },
  },
});
