import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import EnhancedTable from '../components/enhancedtable/EnhancedTable';

const attributes = ['idField', 'stringField', 'intField', 'floatField'];

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 72,
    height: `calc(100vh - 72px - 48px)`,
  },
  paper: {
    overflow: 'auto',
    height: `calc(100vh - 72px  - 48px)`,
    minWidth: 570,
  },
}));

export default function TableLayout() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTable attributes={attributes} />
      </Paper>
    </div>
  );
}
