package com.find.event.model.pagination;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PaginatedModel<T> {
    private PaginationMetadata metadata;
    private List<T> items;
}
