package com.find.event.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // Not Found
    USER_NOT_FOUND_BY_USERNAME_OR_EMAIL("User with username or email %s could not be found"),
    ROLE_NOT_FOUND("Role %s could not be found"),
    EVENT_NOT_FOUND("Event with id %d could not be found"),
    REVIEW_NOT_FOUND("The currently authenticated user hasn't left any review for the event with id %d"),

    // Bad Request
    MANDATORY_VALUE_IS_MISSING("%s was not provided"),
    INVALID_PASSWORD("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"),
    BAD_CREDENTIALS("Invalid username/email or password"),
    INVALID_EMAIL("Email is invalid"),
    INVALID_START_DATE("The event start date must be at least one week from today to allow proper scheduling and preparation."),
    INVALID_END_DATE("The event end date must occur after the start date."),
    INVALID_EVENT_STATUS("The event status is invalid"),
    INVALID_UNAPPROVED_EVENT("The event with id %d has not yet been approved by an admin, so the attendance status cannot be updated."),
    UNATTENDED_EVENT("You cannot add a review for the event with id %d since you didn't attend it"),
    NOT_FINISHED_EVENT("You cannot add a review for the event with id %d since it isn't yet finished"),
    INVALID_OWN_EVENT("Updating attendance status or submitting reviews is not permitted for events you have published."),
    DIFFERENT_SIZES("%s and %s must have the same length"),
    INVALID_ENUM_VALUE("'%s' is not a valid option. Valid options are %s."),
    INVALID_ORDER_PARAM("Sorting parameter '%s' cannot be used for this query. Available parameters are: %s"),
    INVALID_FILTER_PARAM("Filter parameter '%s' corresponding to the %s is invalid"),
    INVALID_ARRAY("Filter parameter '%s' corresponding to the %s is not a valid array"),

    // Unauthorized
    UNAUTHORIZED("You are not authorized to perform this action"),

    // Conflict
    USERNAME_ALREADY_TAKEN("Username %s already taken"),
    EMAIL_ALREADY_TAKEN("Email %s already registered"),

    // Internal Server Error
    INTERNAL_SERVER_ERROR("Internal server error"),
    OPTIMISTIC_LOCK_ERROR("The resource was modified during the request by someone else."),
    LOGIN_ERROR("User cannot sign in.");

    public String formatted(final Object... args) {
        return this.message.formatted(args);
    }

    private final String message;
}