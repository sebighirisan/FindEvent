package com.find.event.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    USER_NOT_FOUND_BY_USERNAME("User with username %s could not be found."),
    OPTIMISTIC_LOCK_ERROR("The resource was modified during the request by someone else.");

    public String formatted(final Object... args) {
        return this.message.formatted(args);
    }

    private final String message;
}