import { ParsedAttribute, AttributeScalarType } from '@/types/models';

export interface QueryVariables {
  [key: string]: unknown;
}

export interface RawQuery {
  resolver: string;
  query: string;
}

export interface ComposedQuery<V = QueryVariables> extends RawQuery {
  variables?: V;
}

export interface QueryVariableSearch {
  field: string;
  value: string;
  valueType: AttributeScalarType;
}

export interface QueryVariableOrder {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface QueryVariablePagination {
  first?: number;
  last?: number;
  after?: string;
  before?: string;
  includeCursor?: boolean;
}

export interface QueryModelTableRecordsVariables extends QueryVariables {
  search?: QueryVariableSearch;
  pagination: QueryVariablePagination;
  order?: QueryVariableOrder;
}

export type QueryModelTableRecords = (
  modelName: string,
  attributes: ParsedAttribute[]
) => RawQuery;

/**
 * RECORD
 */
export type CrudRecord = (
  modelName: string,
  attributes: ParsedAttribute[]
) => {
  create: RawQuery;
  read: RawQuery;
  update: RawQuery;
  delete: RawQuery;
};

export interface QueryRecordAttributesVariables extends QueryVariables {
  id: string | number;
}
export type QueryRecordAttributes = (
  modelName: string,
  attributes: ParsedAttribute[]
) => RawQuery;

export type MutateRecordAttributes = (
  modelName: string,
  attributes: ParsedAttribute[]
) => RawQuery;
