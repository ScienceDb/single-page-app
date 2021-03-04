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
import EnhancedTableHead from './enhanced-tablehead';
import EnhancedTableRow, { ActionHandler } from './enhanced-tablerow';
import RecordsTablePagination from '../models/RecordsTablePagination';
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
const initialVariables: QueryModelTableRecordsVariables = {
  search: undefined,
  order: undefined,
  pagination: { first: 5 },
};

export default function EnhancedTable({
  modelName,
  attributes,
  requests,
}: EnhancedTableProps): ReactElement {
  // ? To accomodate associations will need to receive the operation as well
  const classes = useStyles();
  const router = useRouter();

  const [variables, dispatch] = useReducer(variablesReducer, initialVariables);

  const handleSetOrder = (value: QueryVariableOrder): void => {
    dispatch({ type: 'SET_ORDER', value });
  };

  const handleActionClick: ActionHandler = async (primaryKey, action) => {
    const route = `/${modelName}/item?${action}=${primaryKey}`;
    switch (action) {
      case 'read':
      case 'update':
        router.push(route);
        break;
      case 'delete': {
        console.log(action + ' - ' + primaryKey);
        const { query, resolver } = requests.delete;
        const request: ComposedQuery = {
          resolver,
          query,
          variables: { id: primaryKey },
        };
        console.log(request);
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

  const handlePagination = (action: string): void => {
    console.log(data?.pageInfo);
    const limit = variables.pagination.first ?? variables.pagination.last;
    switch (action) {
      case 'first':
        dispatch({
          type: 'SET_PAGINATION',
          value: {
            first: limit,
          },
        });
        break;
      case 'last':
        dispatch({
          type: 'SET_PAGINATION',
          value: {
            last: limit,
          },
        });
        break;
      case 'forward':
        dispatch({
          type: 'SET_PAGINATION',
          value: {
            first: limit,
            after: data ? data.pageInfo.endCursor : undefined,
          },
        });
        break;
      case 'backward':
        dispatch({
          type: 'SET_PAGINATION',
          value: {
            first: limit,
            before: data ? data.pageInfo.startCursor : undefined,
          },
        });
        break;
    }
  };

  const handlePaginationLimitChange = (
    event: React.ChangeEvent<{ value: number }>
  ): void => {
    const limit = variables.pagination.first ?? variables.pagination.last;
    if (event.target.value !== limit) {
      dispatch({
        type: 'SET_PAGINATION',
        value: {
          first: event.target.value,
          includeCursor: false,
        },
      });
    }
  };

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <div>{`TOOLBAR - ${modelName}`}</div>
      <div className={classes.tableWrapper}>
        <Table stickyHeader size="small">
          <EnhancedTableHead
            attributes={attributes}
            handleSetOrder={handleSetOrder}
          />
          {data && !isValidating && (
            <Fade in={!isValidating}>
              <TableBody>
                {data.data.map((record, index) => (
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
      <div>
        <RecordsTablePagination
          onPagination={handlePagination}
          count={30}
          options={[5, 10, 15, 20, 25, 50]}
          paginationLimit={variables.pagination.first}
          onPaginationLimitChange={handlePaginationLimitChange}
          hasFirstPage={data ? data.pageInfo.hasPreviousPage : false}
          hasLastPage={data ? data.pageInfo.hasNextPage : false}
          hasPreviousPage={data ? data.pageInfo.hasPreviousPage : false}
          hasNextPage={data ? data.pageInfo.hasNextPage : false}
        />
      </div>
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
