package com.find.event.exception;

import lombok.Getter;

@Getter
public class FindEventInternalServerError extends RuntimeException {
    private final String customMessage;

    public FindEventInternalServerError(ErrorCode errorCode, Exception exception) {
        super(exception);
        this.customMessage = errorCode.getMessage();
    }

    public FindEventInternalServerError(ErrorCode errorCode, Exception exception, Object... args) {
        super(exception);
        this.customMessage = errorCode.formatted(args);
    }
}
