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
  iconAdd: {
    marginRight: 8,
  },
  table: {
    width: '100%',
    marginTop: 24,
    marginBottom: 36,
  },
}));

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: '#fff',
      },
    },
    MuiTableSortLabel: {
      root: {
        '&:hover': {
          color: 'rgba(255, 255, 255, 0.75)',
        },
      },
    },
    MuiTableRow: {
      root: {
        '&:hover': {
          backgroundColor: '#f0f0f0 !important',
          cursor: 'default',
        },
      },
    },
  },
  palette: {
    primary: {
      main: green[400],
    },
  },
});
