import React from 'react';

import {
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import {
  DeleteOutline as DeleteIcon,
  Edit as EditIcon,
  VisibilityTwoTone as DetailIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  iconDetail: {
    '&:hover': {
      color: '#3f51b5',
    },
  },
  iconEdit: {
    '&:hover': {
      color: '#3f51b5',
    },
  },
  iconDelete: {
    '&:hover': {
      color: '#f50057',
    },
  },
}));

function EnhancedTableRowIcon({ label, ...props }) {
  return (
    <TableCell padding="checkbox" align="center">
      <Tooltip title={label}>
        <IconButton
          // id={'NoAssocEnhancedTable-row-iconButton-edit-' + item.idField}
          color="default"
          // onClick={(event) => {
          //   event.stopPropagation();
          //   handleUpdateClicked(event, item);
          // }}
        >
          {/* <Edit fontSize="small" className={classes.iconEdit} /> */}
          {props.children}
        </IconButton>
      </Tooltip>
    </TableCell>
  );
}

export default function EnhancedTableRow({ record }) {
  const classes = useStyles();

  return (
    <TableRow
      // id={'NoAssocEnhancedTable-row-' + item.idField}
      hover
      // onClick={(event) => handleClickOnRow(event, item)}
      role="checkbox"
      tabIndex={-1}
      // key={item.idField}
    >
      {/* ACTIONS 
      TODO permissions*/}
      <EnhancedTableRowIcon label="detail">
        <DetailIcon fontSize="small" className={classes.iconDetail} />
      </EnhancedTableRowIcon>
      <EnhancedTableRowIcon label="edit">
        <EditIcon fontSize="small" className={classes.iconEdit} />
      </EnhancedTableRowIcon>
      <EnhancedTableRowIcon label="delete">
        <DeleteIcon fontSize="small" className={classes.iconDelete} />
      </EnhancedTableRowIcon>
      {/* ATTRIBUTES 
      TODO alignment depending on type (int, float => right)*/}
      {Object.keys(record).map((attribute) => (
        <TableCell
          key={attribute}
          align={
            record[attribute].type === 'Int' ||
            record[attribute].type === 'Float'
              ? 'right'
              : 'left'
          }
          padding="default"
        >
          {String(
            record[attribute].value !== null ? record[attribute].value : ''
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}
