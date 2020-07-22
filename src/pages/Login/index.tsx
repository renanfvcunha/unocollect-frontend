import React from 'react';
import useStyles from './styles';

export default function Login() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <div className={classes.toolbar} />
      <h1>Loginnn</h1>
    </div>
  );
}
