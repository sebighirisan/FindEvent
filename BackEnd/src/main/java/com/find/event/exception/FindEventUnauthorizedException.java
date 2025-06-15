package com.find.event.exception;

public class FindEventUnauthorizedException extends RuntimeException {
    public FindEventUnauthorizedException(String message) {
        super(message);
    }

    public FindEventUnauthorizedException(ErrorCode errorCode) {
        super(errorCode.getMessage());
    }

    public FindEventUnauthorizedException(ErrorCode errorCode, Object... args) {
        super(errorCode.formatted(args));
    }
}
