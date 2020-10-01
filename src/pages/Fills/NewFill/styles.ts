import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

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
  subtitle: {
    fontSize: 15,
    fontWeight: 400,
    margin: '0 15%',
  },
  margin: {
    margin: theme.spacing(1),
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
    width: '75%',
  },
  subButton: {
    width: '50%',
    margin: theme.spacing(1),
    marginLeft: '25%',
    marginTop: 8,
  },
}));

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffb855',
    },
  },
});
