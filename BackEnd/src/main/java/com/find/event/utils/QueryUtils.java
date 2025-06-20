package com.find.event.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.util.Set;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class QueryUtils {

    /**
     * Helper method for adding SQL injection-safe ordering statement to an existing SQL native query.
     *
     * @param validOrderByFields a {@link Set} containing the valid field names to order by
     * @param query              the unordered query string
     * @param orderBy            the field name to order by
     * @param order              the order value (ASC or DESC)
     * @return the initial query with order by statement
     */
    public static String composeQueryWithOrdering(
            Set<String> validOrderByFields, String query, String orderBy, String order
    ) {
        if (StringUtils.isAnyBlank(order, orderBy)) {
            return query;
        }

        ValidationUtils.validateOrderEnum(order);
        ValidationUtils.validateOrderParam(orderBy, validOrderByFields);

        return query
                .concat(" ORDER BY " + orderBy)
                .concat(" " + order);
    }
}
