package com.find.event.utils;

import jakarta.persistence.Tuple;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class MapperUtils {

    // TODO: Add comments
    public static LocalDateTime extractLocalDateTimeValueFromTuple(Tuple tuple, String columnName) {
        return Optional.ofNullable(tuple.get(columnName, Timestamp.class))
                .map(Timestamp::toLocalDateTime)
                .orElse(null);
    }
}
