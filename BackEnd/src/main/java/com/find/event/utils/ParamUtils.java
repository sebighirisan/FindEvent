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
import static com.find.event.utils.ValidationUtils.validateLatitude;
import static com.find.event.utils.ValidationUtils.validateLongitude;
import static com.find.event.utils.constants.FilterParamConstants.CATEGORIES;
import static com.find.event.utils.constants.FilterParamConstants.END_DATE;
import static com.find.event.utils.constants.FilterParamConstants.LATITUDE;
import static com.find.event.utils.constants.FilterParamConstants.LONGITUDE;
import static com.find.event.utils.constants.FilterParamConstants.PROXIMITY;
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

    /**
     * Extracts and parses the start date from the provided filter map.
     *
     * @param filters the map containing filter parameters
     * @return the parsed {@link LocalDate} start date, or {@code null} if not present
     */
    public static LocalDate extractStartDate(Map<String, String> filters) {
        return Optional.ofNullable(filters.get(START_DATE))
                .map(startDate -> convertToLocalDate("start date", startDate))
                .orElse(null);
    }

    /**
     * Extracts and parses the end date from the provided filter map.
     *
     * @param filters the map containing filter parameters
     * @return the parsed {@link LocalDate} end date, or {@code null} if not present
     */
    public static LocalDate extractEndDate(Map<String, String> filters) {
        return Optional.ofNullable(filters.get(END_DATE))
                .map(endDate -> convertToLocalDate("end date", endDate))
                .orElse(null);
    }

    /**
     * Extracts and validates the event status from the provided filter map.
     * <p>
     * If present, the status string is trimmed and validated against allowed {@link EventStatusEnum} values,
     * taking into account the user's permissions.
     *
     * @param filters     the map containing filter parameters
     * @param publisherId the ID of the publisher for permission validation
     * @return the trimmed status string, or {@code null} if not provided
     */
    public static String extractStatus(Map<String, String> filters, Integer publisherId) {
        String status = filters.get(STATUS);

        if (StringUtils.isBlank(status)) {
            return null;
        }

        String trimmedStatus = status.trim();
        validateEventStatus(EventStatusEnum.of(trimmedStatus), publisherId);

        return trimmedStatus;
    }

    /**
     * Extracts and parses the publisher ID from the provided filter map.
     *
     * @param filters the map containing filter parameters
     * @return the parsed publisher ID as {@link Integer}, or {@code null} if not present
     * @throws FindEventBadRequestException if parsing fails.
     */
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

    /**
     * Extracts and parses the event categories from the provided filter map.
     * <p>
     * Expects the categories string to be a properly formatted array string (e.g., "[Category1;Category2]").
     * Validates each category against {@link EventTypeEnum}.
     *
     * @param filters the map containing filter parameters
     * @return a list of valid category names, or {@code null} if not provided
     * @throws FindEventBadRequestException if format or validation fails.
     */
    public static List<String> extractCategories(Map<String, String> filters) {
        List<String> categories = splitArray("tipul evenimentului", filters.get(CATEGORIES));

        if (!CollectionUtils.isEmpty(categories)) {
            categories.forEach(EventTypeEnum::of);
        }

        return categories;
    }

    public static Integer extractProximity(Map<String, String> filters) {
        String proximity = filters.get(PROXIMITY);

        if (StringUtils.isBlank(proximity)) {
            return null;
        }

        try {
            int proximityAsInt = Integer.parseInt(proximity);

            if (proximityAsInt < 0) {
                throw new FindEventBadRequestException(ErrorCode.INVALID_POSITIVE_VALUE, proximity, PROXIMITY);
            }

            return proximityAsInt;
        } catch (NumberFormatException e) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_NUMERIC_VALUE, proximity, PROXIMITY);
        }
    }

    public static Double extractLongitude(Map<String, String> filters) {
        String longitude = filters.get(LONGITUDE);

        if (StringUtils.isBlank(longitude)) {
            return null;
        }

        try {
            double longitudeAsDouble = Double.parseDouble(longitude);
            validateLongitude(longitudeAsDouble);

            return longitudeAsDouble;
        } catch (NumberFormatException e) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_NUMERIC_VALUE, longitude, LONGITUDE);
        }
    }

    public static Double extractLatitude(Map<String, String> filters) {
        String latitude = filters.get(LATITUDE);

        if (StringUtils.isBlank(latitude)) {
            return null;
        }

        try {
            double latitudeAsDouble = Double.parseDouble(latitude);
            validateLatitude(latitudeAsDouble);

            return latitudeAsDouble;
        } catch (NumberFormatException e) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_NUMERIC_VALUE, latitude, LATITUDE);
        }
    }

    /**
     * Converts the string representation of LocalDate to its corresponding object.
     *
     * @param name              the name of the field whose value should be converted.
     * @param localDateAsString the time value as string.
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

    /**
     * Splits the provided array string into a list of strings.
     * <p>
     * The array string must be enclosed in square brackets. The splitting is performed using
     * a predefined array parameter separator.
     *
     * @param name  the name of the field being parsed (used for error reporting)
     * @param array the string representing the array to split
     * @return the list of extracted elements, or {@code null} if input is blank
     * @throws FindEventBadRequestException if the format is invalid.
     */
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
