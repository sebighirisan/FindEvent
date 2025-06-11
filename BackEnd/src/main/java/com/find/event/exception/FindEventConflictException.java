package com.find.event.exception;

public class FindEventConflictException extends RuntimeException {
    public FindEventConflictException(String message) {
        super(message);
    }

    public FindEventConflictException(ErrorCode errorCode) {
        super(errorCode.getMessage());
    }

    public FindEventConflictException(ErrorCode errorCode, Object... args) {
        super(errorCode.formatted(args));
    }
}
