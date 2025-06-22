package com.find.event.utils.constants;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class FilterParamConstants {
    // Event
    public static final String NAME = "name";
    public static final String START_DATE = "startDate";
    public static final String END_DATE = "endDate";
    public static final String STATUS = "status";
    public static final String CATEGORIES = "categories";
    public static final String PUBLISHER_ID = "publisherId";

    // Location
    public static final String PROXIMITY = "proximity";
    public static final String LONGITUDE = "longitude";
    public static final String LATITUDE = "latitude";
}
