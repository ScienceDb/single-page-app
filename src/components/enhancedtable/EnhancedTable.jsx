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

export default function EnhancedTable({ records, attributes }) {
  // ? To accomodate associations will need to recive the operation as well
  const classes = useStyles();

  return (
    // TODO attribute props
    // ? since the TableHead is static it can directly recieve the attributes.
    // ? Be aware that depending on the datamodel id needs to be added
    <div className={classes.tableWrapper}>
      <Table stickyHeader size="small">
        <EnhancedTableHead attributes={records[0]} />
        <TableBody>
          {records.map((record, index) => (
            // TODO key should use primaryKey
            <EnhancedTableRow record={record} key={`${record[0]}-${index}`} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
