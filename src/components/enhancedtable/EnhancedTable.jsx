import { React } from 'react';
import { Table, TableBody, makeStyles } from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableRow from './EnhancedTableRow';

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    height: `calc(100vh - 72px - 48px - 128px - 80px)`,
    minWidth: 570,
    overflow: 'auto',
    position: 'relative',
  },
}));

const record = {
  idField: { value: 'myId_1', type: 'String', readOnly: true },

  stringField: { value: 'Hello World', type: 'String' },
  intField: { value: 2, type: 'Int' },
  floatField: { value: 5.6, type: 'Float' },

  asd: { value: 'asddd', type: 'String' },
  asdd: { value: 'asddd', type: 'String' },
  asddd: { value: 'asddd', type: 'String' },
  asdddd: { value: 'asddd', type: 'String' },
  asddddd: { value: 'asddd', type: 'String' },
  asdddddd: { value: 'asddd', type: 'String' },
  // asddddddd: { value: 'asddd', type: 'String' },
  // asdddddddd: { value: 'asddd', type: 'String' },
  // bsddddddd: { value: 'asddd', type: 'String' },
  // ssddddddd: { value: 'asddd', type: 'String' },
  // csddddddd: { value: 'asddd', type: 'String' },
  // fsdddddddd: { value: 'asddd', type: 'String' },
  // gsdddddddd: { value: 'asddd', type: 'String' },
  // hsdddddddd: { value: 'asddd', type: 'String' },
};

const records = Array(5).fill(record);

export default function ModelTable({ attributes }) {
  const classes = useStyles();

  return (
    <div className={classes.tableWrapper}>
      <Table stickyHeader size="small">
        <EnhancedTableHead attributes={record} />
        <TableBody>
          {records.map((record) => (
            <EnhancedTableRow record={record} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
