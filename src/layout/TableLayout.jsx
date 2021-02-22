import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';
import EnhancedTable from '../components/enhancedtable/EnhancedTable';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 72,
    height: `calc(100vh - 72px - 48px)`,
  },
  paper: {
    overflow: 'auto',
    height: `calc(100vh - 72px  - 48px)`,
    minWidth: '50%',
  },
}));

const record = {
  idField: { value: 'myId_1', type: 'String', readOnly: true },

  stringField: { value: 'Hello World', type: 'String' },
  intField: { value: 2, type: 'Int' },
  floatField: { value: 5.6, type: 'Float' },
  datetimeField: { value: '2021-02-18 11:14:51.175', type: 'DateTime' },
  booleanField: { value: true, type: 'Boolean' },

  stringArrayField: { type: '[String]', value: 'a,b,c' },
  intArrayField: { type: '[Int]', value: '1,2,3' },
  floatArrayField: { type: '[Float]', value: '1.2,4.3,5.2' },
  datetimeArrayField: {
    type: '[DateTime]',
    value:
      '2021-02-18 11:14:51.175,2021-02-18 11:14:51.175,2021-02-18 11:14:51.175',
  },
  booleanArrayField: { type: '[Boolean]', value: 'true,false,true' },
};

const datamodel = {
  model: 'no_assoc',
  storageType: 'sql',
  attributes: {
    idField: 'String',
    stringField: 'String',
    intField: 'Int',
    floatField: 'Float',
    datetimeField: 'DateTime',
    booleanField: 'Boolean',

    stringArrayField: '[String]',
    intArrayField: '[Int]',
    floatArrayField: '[Float]',
    datetimeArrayField: '[DateTime]',
    booleanArrayField: '[Boolean]',
  },
  internalId: 'idField',
};

const records = Array(5).fill(record);

export default function TableLayout() {
  const classes = useStyles();
  return (
    // TODO outer overflow?
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTable records={records} attributes={datamodel} />
      </Paper>
    </div>
  );
}
