import React from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './styles';

const ShowForm: React.FC = () => {
  const { id } = useParams();

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <h1>ID: {id}</h1>
    </main>
  );
};

export default ShowForm;
