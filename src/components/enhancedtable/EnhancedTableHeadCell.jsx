import React from 'react';
import {
  TableSortLabel,
  TableCell,
  Typography,
  Tooltip,
} from '@material-ui/core';

export default function EnhancedTableHeadCell({
  label,
  icon: Icon,
  disableSort,
  tooltip,
  ...props
}) {
  const { active } = props;
  console.log(disableSort, active);
  return (
    <TableCell
      sortDirection={true}
      {...props}
      // sortDirection={orderBy === label ? order : false}
    >
      <TableSortLabel
        active={false}
        disabled={disableSort}
        // active={orderBy === label}
        // direction={order}
        direction="asc"
        // onClick={(event) => {
        //   onRequestSort(event, 'idField');
        // }}
      >
        {Icon && tooltip && (
          <Tooltip title={tooltip}>
            <Icon fontSize="small" color="disabled" />
          </Tooltip>
        )}
        <Typography
          color="inherit"
          variant="caption"
          display="inline"
          noWrap={true}
        >
          {label}
        </Typography>
      </TableSortLabel>
    </TableCell>
  );
}
