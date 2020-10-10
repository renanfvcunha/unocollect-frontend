import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAddCat: {
    padding: 8,
    marginLeft: 8,
    marginRight: 16,
  },
  mainForm: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  groupsBox: {
    display: 'flex',
    flexDirection: 'row',
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
    justifyContent: 'center',
  },
  fieldsFormFields: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '40%',
  },
  fieldsFormExtra: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  fieldsFormOptions: {
    margin: theme.spacing(1),
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  fieldsDivider: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 8,
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
