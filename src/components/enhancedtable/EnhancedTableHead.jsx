import React from 'react';
import { TableHead, TableRow } from '@material-ui/core';
import KeyIcon from '@material-ui/icons/VpnKey';
import EnhancedTableHeadCell from './EnhancedTableHeadCell';

export default function EnhancedTableHead({ attributes }) {
  return (
    <TableHead style={{ height: '2rem' }}>
      <TableRow>
        {/* Details view 
            TODO associations? */}
        {/* <TableCell padding="checkbox" /> */}
        {/* Edit | Delete Actions */}
        <EnhancedTableHeadCell
          label="Actions"
          disableSort={true}
          active={false}
          padding="checkbox"
          align="center"
          size="small"
          colSpan={3} // TODO dependent on permissions
          width="6%"
        />
        {Object.keys(attributes).map((attribute, index) => (
          <EnhancedTableHeadCell
            label={attribute}
            icon={attributes[attribute].readOnly ? KeyIcon : null}
            tooltip={
              attributes[attribute].readOnly ? 'Unique Identifier' : null
            }
            align={
              attributes[attribute].type === 'Int' ||
              attributes[attribute].type === 'Float'
                ? 'right'
                : 'left'
            }
            disableSort={false}
            key={`EnhancedTableHeadCell-${attribute}-${index}`}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}
