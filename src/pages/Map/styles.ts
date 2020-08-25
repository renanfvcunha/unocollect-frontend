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
  centeredSelect: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 16,
  },
  centeredMap: {
    display: 'flex',
    justifyContent: 'center',
  },
  map: {
    width: '75%',
    height: 400,
  },
}));

export default useStyles;
