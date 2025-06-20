package com.find.event.utils;

import com.find.event.model.pagination.PaginationMetadata;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class PagingMetadataUtil {

    /**
     * Builds a {@link PaginationMetadata} object containing pagination details based on the current
     * page number, page size and total number of items.
     *
     * @param pageNo     the current page number.
     * @param pageSize   the number of items per page.
     * @param totalCount the total number of items.
     * @return a {@link PaginationMetadata} object that includes information such as the page number,
     *         page size, total item count and the total number of pages required.
     */
    public static PaginationMetadata buildPagingMetadata(int pageNo, int pageSize, long totalCount) {
        final int pageCount = pageNo == -1 ? 1 : computePageCount(totalCount, pageSize);

        return PaginationMetadata.builder()
                .pageNumber(pageNo)
                .pageSize(pageSize)
                .totalCount(totalCount)
                .pageCount(pageCount)
                .build();
    }

    /**
     * Computes the total number of pages based on the total number of items
     * and the number of items per page
     *
     * @param totalCount the total number of items.
     * @param pageSize   the number of items per page.
     * @return the total number of pages.
     */
    private static int computePageCount(long totalCount, int pageSize) {
        return (int) Math.ceil((double) totalCount / pageSize);
    }
}
