package com.find.event.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // Not Found
    USER_NOT_FOUND_BY_USERNAME_OR_EMAIL("User with username or email %s could not be found"),
    ROLE_NOT_FOUND("Role %s could not be found"),

    // Bad Request
    MANDATORY_VALUE_IS_MISSING("%s was not provided"),
    INVALID_PASSWORD("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"),
    BAD_CREDENTIALS("Invalid username/email or password"),
    INVALID_EMAIL("Email is invalid"),

    // Conflict
    USERNAME_ALREADY_TAKEN("Username %s already taken"),
    EMAIL_ALREADY_TAKEN("Email %s already registered"),

    // Internal Server Error
    OPTIMISTIC_LOCK_ERROR("The resource was modified during the request by someone else."),
    LOGIN_ERROR("User cannot sign in.");

    public String formatted(final Object... args) {
        return this.message.formatted(args);
    }

    private final String message;
}