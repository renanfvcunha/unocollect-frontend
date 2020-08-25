import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#b5b5b5',
  },
  iconBack: {
    marginRight: 8,
  },
  title: {
    fontWeight: 500,
    margin: theme.spacing(1),
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
  addCatForm: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  mainForm: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnAdd: {
    position: 'absolute',
    left: '25%',
  },
  btnRemove: {
    marginLeft: '2.5%',
  },
  fieldsForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldsFormFields: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  fieldsFormField: {
    margin: theme.spacing(1),
    height: 30,
  },
  fieldsDivider: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 8,
  },
  subButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 8,
  },
}));

export const BtnStyle = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: '#fff',
      },
    },
  },
  palette: {
    primary: {
      main: blue[400],
    },
  },
});

export const Tooltips = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: red[800],
    },
  },
});
