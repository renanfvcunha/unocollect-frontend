import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: '#e7e7e7',
    height: '100vh',
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

export default useStyles;
