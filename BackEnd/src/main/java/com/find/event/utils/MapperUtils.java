package com.find.event.utils;

import jakarta.persistence.Tuple;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class MapperUtils {

    /**
     * Extracts a {@link LocalDateTime} value from the specified column of the provided {@link Tuple}.
     *
     * @param tuple      the tuple containing the data
     * @param columnName the name of the column to extract the value from
     * @return the {@link LocalDateTime} value if present, or {@code null} if the column value is {@code null}
     */
    public static LocalDateTime extractLocalDateTimeValueFromTuple(Tuple tuple, String columnName) {
        return Optional.ofNullable(tuple.get(columnName, Timestamp.class))
                .map(Timestamp::toLocalDateTime)
                .orElse(null);
    }

    /**
     * Extracts a byte array from the specified column of the provided {@link Tuple} and encodes it as a Base64 string.
     *
     * @param tuple      the tuple containing the data
     * @param columnName the name of the column to extract the byte array from
     * @return the Base64-encoded string representation of the byte array, or {@code null} if the column value is {@code null}
     */
    public static String extractByteArrayFromTuple(Tuple tuple, String columnName) {
        byte[] byteArr = tuple.get(columnName, byte[].class);

        if (byteArr == null) {
            return null;
        }

        return new String(Base64.getEncoder().encode(byteArr));
    }
}
