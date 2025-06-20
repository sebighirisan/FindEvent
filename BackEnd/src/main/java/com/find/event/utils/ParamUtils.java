package com.find.event.utils;

import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ParamUtils {
    private static final String FIELD_SEPARATOR = "|";

    /**
     * Extracts the filterBy and filterValue params from a GET REST request and stores them in a Map.
     *
     * @param filterBy    the request param filterBy.
     * @param filterValue the request param filterValue.
     * @return a map with the associated keys and values.
     * @throws FindEventBadRequestException if filterBy and filterValue have different sizes.
     */
    public static Map<String, String> filtersToMap(String filterBy, String filterValue) {
        final Map<String, String> filtersMap = new HashMap<>();

        // split the filters
        final List<String> filterByList = splitFilter(filterBy);
        final List<String> filterValueList = splitFilter(filterValue);

        if (filterByList.size() != filterValueList.size()) {
            throw new FindEventBadRequestException(ErrorCode.DIFFERENT_SIZES, "filterBy", "filterValue");
        }

        // validations
        if (CollectionUtils.isEmpty(filterByList)) {
            return filtersMap;
        }

        // convert to map
        for (int i = 0; i < filterByList.size(); i++) {
            filtersMap.put(filterByList.get(i), filterValueList.get(i));
        }

        return filtersMap;
    }

    /**
     * Splits the provided filter string into a list of substrings,
     * using the defined field separator.
     *
     * @param filter the input string to be split.
     * @return a list of substrings obtained by splitting the filter string,
     * or an empty list if the input is null.
     */
    private static List<String> splitFilter(String filter) {
        if (StringUtils.isBlank(filter)) {
            return new ArrayList<>();
        }

        return Arrays
                .stream(filter.split(Pattern.quote(FIELD_SEPARATOR)))
                .toList();
    }
}
