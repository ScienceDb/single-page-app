import React, { useMemo, useReducer, ReactElement } from 'react';
import { useRouter } from 'next/router';
import {
  Table,
  TableBody,
  makeStyles,
  Paper,
  TableContainer,
  Typography,
  Box,
  CircularProgress,
  Fade,
} from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableRow, { ActionHandler } from './EnhancedTableRow';
import TableToolBar from '@/components/tableToolBar/tableToolBar';
import useSWR from 'swr';
import { readMany, readOne } from '@/utils/requests';
import useAuth from '@/hooks/useAuth';
import { ParsedAttribute } from '@/types/models';
import {
  ComposedQuery,
  QueryModelTableRecordsVariables,
  QueryVariableOrder,
  QueryVariablePagination,
  QueryVariableSearch,
  RawQuery,
} from '@/types/queries';

interface EnhancedTableProps {
  modelName: string;
  attributes: ParsedAttribute[];
  requests: {
    read: RawQuery;
    delete: RawQuery;
  };
}

type VariableAction =
  | { type: 'SET_SEARCH'; value: QueryVariableSearch }
  | { type: 'SET_ORDER'; value: QueryVariableOrder }
  | { type: 'SET_PAGINATION'; value: QueryVariablePagination };

const initialVariables: QueryModelTableRecordsVariables = {
  search: undefined,
  order: undefined,
  pagination: { first: 10 },
};

const variablesReducer = (
  variables: QueryModelTableRecordsVariables,
  action: VariableAction
): QueryModelTableRecordsVariables => {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...variables,
        search: action.value,
      };
    case 'SET_ORDER':
      return {
        ...variables,
        order: action.value,
      };
    case 'SET_PAGINATION':
      return {
        ...variables,
        pagination: action.value,
      };
  }
};

export default function EnhancedTable({
  modelName,
  attributes,
  requests,
}: EnhancedTableProps): ReactElement {
  // ? To accomodate associations will need to recive the operation as well
  const classes = useStyles();
  const router = useRouter();

  const [variables, dispatch] = useReducer(variablesReducer, initialVariables);

  const handleSetOrder = (value: QueryVariableOrder): void => {
    console.log(value);
    dispatch({ type: 'SET_ORDER', value });
  };

  const handleSetSearch = (value: string): void => {
    let search = {
      field: attributes[0].name,
      value: value,
      operator: 'eq',
    } as QueryVariableSearch;
    if (value === '')
      search = {
        field: undefined,
        value: undefined,
        operator: undefined,
      };
    dispatch({ type: 'SET_SEARCH', value: search });
  };

  const handleActionClick: ActionHandler = async (action, primaryKey) => {
    const route = `/${modelName}/item?${action}=${primaryKey}`;
    switch (action) {
      case 'read':
      case 'update':
        router.push(route);
        break;
      case 'create':
        router.push(`/${modelName}/item`);
        break;
      case 'delete': {
        const { query, resolver } = requests.delete;
        const request: ComposedQuery = {
          resolver,
          query,
          variables: { id: primaryKey },
        };
        // TODO handle Errors
        // ? possibly mutate local data and run the refetch in background?
        if (auth.user?.token) {
          await readOne(auth.user?.token, request);
          mutate();
        }
        break;
      }
    }
  };

  const { auth } = useAuth();

  const request = useMemo(() => {
    return {
      query: requests.read.query,
      resolver: requests.read.resolver,
      variables: variables,
    } as ComposedQuery<QueryModelTableRecordsVariables>;
  }, [variables, requests.read]);

  const { data, mutate, isValidating } = useSWR(
    auth?.user?.token ? [auth.user.token, request] : null,
    readMany,
    {
      // TODO error handling
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <TableToolBar
        modelName={modelName}
        onAdd={handleActionClick}
        onReload={() => mutate()}
        onSearch={handleSetSearch}
      />
      {/* <div>{`TOOLBAR - ${modelName}`}</div> */}

      <div className={classes.tableWrapper}>
        <Table stickyHeader size="small">
          <EnhancedTableHead
            attributes={attributes}
            handleSetOrder={handleSetOrder}
          />

          {data && !isValidating && (
            <Fade in={!isValidating}>
              <TableBody>
                {data.map((record, index) => (
                  // TODO key should use primaryKey
                  <EnhancedTableRow
                    attributes={attributes}
                    record={record}
                    key={`${record}-${index}`}
                    onAction={handleActionClick}
                  />
                ))}
              </TableBody>
            </Fade>
          )}
        </Table>
        <Box
          display="flex"
          width="100%"
          height="100%"
          position="absolute"
          justifyContent="center"
          alignItems="center"
        >
          {isValidating && (
            <Fade in={isValidating}>
              <CircularProgress color="primary" disableShrink={true} />
            </Fade>
          )}
          {!isValidating && Array.isArray(data) && data.length === 0 && (
            <Typography variant="body1">No data to display</Typography>
          )}
        </Box>
      </div>
      <div style={{ textAlign: 'right' }}>PAGINATION</div>
    </TableContainer>
  );
}

const useStyles = makeStyles(() => ({
  tableWrapper: {
    height: `calc(100vh - 72px - 48px - 128px - 80px)`,
    minWidth: 570,
    overflow: 'auto',
    position: 'relative',
  },
  paper: {
    overflow: 'auto',
    height: `calc(100vh - 72px  - 48px)`,
    minWidth: 570,
  },
  tableBackdrop: {
    WebkitTapHighlightColor: 'transparent',
    minWidth: '100%',
    minHeight: '100%',
  },
}));
