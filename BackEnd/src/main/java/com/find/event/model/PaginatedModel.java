package com.find.event.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PaginatedModel<T> {
    private PaginationMetadata metadata;
    private List<T> items;

    @Getter
    @Setter
    public static class PaginationMetadata {
        private Integer totalCount;
        private Integer pageCount;
        private Integer pageNumber;
        private Integer pageSize;
    }
}
