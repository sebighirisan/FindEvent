package com.find.event.enums;

import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;

import java.util.Arrays;

public enum EventStatusEnum {
    PENDING,
    APPROVED,
    DECLINED;

    public static EventStatusEnum of(String value) {
        return Arrays.stream(EventStatusEnum.values())
                .filter(eventType -> eventType.name().equals(value))
                .findFirst()
                .orElseThrow(() -> new FindEventBadRequestException(ErrorCode.INVALID_ENUM_VALUE, value, Arrays.toString(EventStatusEnum.values())));
    }
}
