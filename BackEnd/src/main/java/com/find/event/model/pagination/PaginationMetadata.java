package com.find.event.model.pagination;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaginationMetadata {
    private Long totalCount;
    private Integer pageCount;
    private Integer pageNumber;
    private Integer pageSize;
}
