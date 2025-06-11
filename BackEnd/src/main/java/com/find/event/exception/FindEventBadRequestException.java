package com.find.event.exception;

public class FindEventBadRequestException extends RuntimeException {
    public FindEventBadRequestException(String message) {
        super(message);
    }

    public FindEventBadRequestException(ErrorCode errorCode) {
        super(errorCode.getMessage());
    }

    public FindEventBadRequestException(ErrorCode errorCode, Object... args) {
        super(errorCode.formatted(args));
    }
}
