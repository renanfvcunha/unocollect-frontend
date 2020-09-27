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
  cardRoot: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginLeft: '10%',
  },
  card: {
    width: '20%',
    margin: 8,
  },
  btnCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 'auto',
  },
}));

export default useStyles;
