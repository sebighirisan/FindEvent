export interface PagingMetadataModel {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
}

export interface PaginatedResponseModel<T> {
  metadata: PagingMetadataModel;
  items: T[];
}
