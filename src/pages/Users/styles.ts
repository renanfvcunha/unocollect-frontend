import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#e7e7e7',
  },
  iconAdd: {
    marginRight: 8,
  },
  table: {
    width: '100%',
    marginTop: 24,
    marginBottom: 36,
  },
  iconEdit: {
    color: '#f9a825',
  },
  iconDelete: {
    color: '#c62828',
  },
}));

export const Blue = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
    },
  },
});
