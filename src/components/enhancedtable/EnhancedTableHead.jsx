import { React, useState } from 'react';
import { TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import KeyIcon from '@material-ui/icons/VpnKey';
import EnhancedTableHeadCell from './EnhancedTableHeadCell';

export default function EnhancedTableHead({ attributes }) {
  const [activeOrderCol, setActiveOrderCol] = useState(
    attributes[Object.keys(attributes)[0]]
  );
  const [activeOrder, setActiveOrder] = useState('asc');

  const handleTableHeadCellClick = (event, field) => {
    const isAsc = activeOrderCol === field && activeOrder === 'asc';
    setActiveOrder(isAsc ? 'desc' : 'asc');
    setActiveOrderCol(field);
  };

  return (
    // TODO colspan depending on permissions
    <TableHead style={{ height: '2rem' }}>
      <TableRow>
        <TableCell colSpan={3} align="center" padding="checkbox">
          <Typography
            color="inherit"
            variant="caption"
            display="inline"
            noWrap={true}
          >
            Actions
          </Typography>
        </TableCell>
        {Object.keys(attributes).map((attribute, index) => (
          <EnhancedTableHeadCell
            label={attribute}
            icon={attributes[attribute].readOnly ? KeyIcon : null}
            tooltip={
              attributes[attribute].readOnly ? 'Unique Identifier' : null
            }
            align={
              attributes[attribute].type.includes('Int') ||
              attributes[attribute].type.includes('Float')
                ? 'right'
                : 'left'
            }
            disableSort={false}
            activeOrder={activeOrderCol === attribute}
            orderDirection={activeOrderCol === attribute ? activeOrder : 'asc'}
            sortDirection={activeOrderCol === attribute ? activeOrder : false}
            onClick={handleTableHeadCellClick}
            key={`EnhancedTableHeadCell-${attribute}-${index}`}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}
