package com.find.event.utils;

import com.find.event.enums.EventStatusEnum;
import com.find.event.enums.EventTypeEnum;
import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Pattern;

import static com.find.event.utils.ValidationUtils.validateEventStatus;
import static com.find.event.utils.constants.FilterParamConstants.CATEGORIES;
import static com.find.event.utils.constants.FilterParamConstants.END_DATE;
import static com.find.event.utils.constants.FilterParamConstants.PUBLISHER_ID;
import static com.find.event.utils.constants.FilterParamConstants.START_DATE;
import static com.find.event.utils.constants.FilterParamConstants.STATUS;

@Slf4j
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ParamUtils {
    private static final String FIELD_SEPARATOR = "|";
    private static final String ARRAY_PARAM_SEPARATOR = ";";

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

    public static LocalDate extractStartDate(Map<String, String> filters) {
        return Optional.ofNullable(filters.get(START_DATE))
                .map(startDate -> convertToLocalDate("start date", startDate))
                .orElse(null);
    }

    public static LocalDate extractEndDate(Map<String, String> filters) {
        return Optional.ofNullable(filters.get(END_DATE))
                .map(endDate -> convertToLocalDate("end date", endDate))
                .orElse(null);
    }

    public static String extractStatus(Map<String, String> filters, Integer publisherId) {
        String status = filters.get(STATUS);

        if (StringUtils.isBlank(status)) {
            return null;
        }

        String trimmedStatus = status.trim();
        validateEventStatus(EventStatusEnum.of(trimmedStatus), publisherId);

        return trimmedStatus;
    }

    public static Integer extractPublisherId(Map<String, String> filters) {
        String publisherId = filters.get(PUBLISHER_ID);

        if (StringUtils.isBlank(publisherId)) {
            return null;
        }

        try {
            return Integer.valueOf(publisherId);
        } catch(Exception e) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_FILTER_PARAM, publisherId, "publisher id");
        }
    }

    public static List<String> extractCategories(Map<String, String> filters) {
        List<String> categories = splitArray("tipul evenimentului", filters.get(CATEGORIES));

        if (!CollectionUtils.isEmpty(categories)) {
            categories.forEach(EventTypeEnum::of);
        }

        return categories;
    }

    /**
     * Converts the string representation of LocalDate to its corresponding object.
     *
     * @param name              The name of the field whose value should be converted.
     * @param localDateAsString The time value as string.
     * @return A {@link LocalDate} object holding the converted value.
     * @throws FindEventBadRequestException If the value cannot be converted to LocalDate object.
     */
    private static LocalDate convertToLocalDate(final String name, final String localDateAsString) {
        if (StringUtils.isBlank(localDateAsString)) {
            return null;
        }

        try {
            return LocalDate.parse(localDateAsString);
        } catch (Exception e) {
            log.error("An error occurred while converting {} to LocalDate", localDateAsString, e);
            throw new FindEventBadRequestException(ErrorCode.INVALID_FILTER_PARAM, localDateAsString, name);
        }
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

    private static List<String> splitArray(String name, String array) {
        if (StringUtils.isBlank(array)) {
            return null;
        }

        String formattedArray = array.trim();

        if (!formattedArray.startsWith("[") && !formattedArray.endsWith("]")) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_ARRAY, array, name);
        }

        return List.of(formattedArray.split(ARRAY_PARAM_SEPARATOR));
    }
}
