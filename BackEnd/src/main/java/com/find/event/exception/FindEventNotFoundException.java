package com.find.event.exception;

public class FindEventNotFoundException extends RuntimeException {
    public FindEventNotFoundException(String message) {
        super(message);
    }

    public FindEventNotFoundException(ErrorCode errorCode) {
        super(errorCode.getMessage());
    }

    public FindEventNotFoundException(ErrorCode errorCode, Object... args) {
        super(errorCode.formatted(args));
    }
}
