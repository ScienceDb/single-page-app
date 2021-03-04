import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  IconButton,
  Tooltip,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    padding: '2rem',
  },
  count: {
    height: '2rem',
    paddingBottom: '1.2rem',
    marginLeft: '1rem',
    marginRight: '55rem',
  },
  paginationLimit: {
    minWidth: '5rem',
    marginLeft: '2rem',
  },
}));

export default function RecordsTablePagination(props) {
  const classes = useStyles();
  const handleOnPagination = (action) => () => {
    if (props.onPagination) {
      props.onPagination(action);
    }
  };
  const handlePaginationLimitChange = (event) => {
    if (props.onPaginationLimitChange) {
      props.onPaginationLimitChange(event);
    }
  };
  return (
    <Toolbar className={classes.root}>
      {/* Row Selector */}
      <div className={classes.paginationLimit}>
        <InputLabel>Rows</InputLabel>
        <Select
          value={props.paginationLimit}
          onChange={handlePaginationLimitChange}
        >
          {props.options.map((rowValue, index) => (
            <MenuItem value={rowValue} key={index}>
              {rowValue}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={classes.count}>
        <InputLabel shrink>Count</InputLabel>
        <InputBase value={props.count} disabled={true} />
      </div>
      <Tooltip title="First page">
        <span>
          <IconButton
            onClick={handleOnPagination('first')}
            disabled={!props.hasFirstPage}
          >
            <FirstPage />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Previous page">
        <span>
          <IconButton
            onClick={handleOnPagination('backward')}
            disabled={!props.hasPreviousPage}
          >
            <KeyboardArrowLeft />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Next page">
        <span>
          <IconButton
            onClick={handleOnPagination('forward')}
            disabled={!props.hasNextPage}
          >
            <KeyboardArrowRight />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Last page">
        <span>
          <IconButton
            onClick={handleOnPagination('last')}
            disabled={!props.hasLastPage}
          >
            <LastPage />
          </IconButton>
        </span>
      </Tooltip>
    </Toolbar>
  );
}
