import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#e7e7e7',
  },
  lastForms: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastFormsBox: {
    width: '30%',
  },
  lastFormsBtn: {
    textTransform: 'none',
    width: '100%',
  },
}));

export default useStyles;
