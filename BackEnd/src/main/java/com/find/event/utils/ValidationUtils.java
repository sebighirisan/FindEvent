package com.find.event.utils;

import com.find.event.entity.EventEntity;
import com.find.event.entity.UserEntity;
import com.find.event.enums.EventStatusEnum;
import com.find.event.enums.OrderEnum;
import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import com.find.event.exception.FindEventUnauthorizedException;
import com.find.event.model.location.LocationDTO;
import com.find.event.model.user.CreateUserDTO;
import com.find.event.model.user.LoginRequestDTO;
import com.find.event.model.event.EventRequestDTO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.ObjectUtils;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.regex.Pattern;

import static com.find.event.utils.JwtUtils.getAuthenticatedUser;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ValidationUtils {
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    );

    /**
     * Checks if a value given as parameter is a valid {@link OrderEnum} field.
     *
     * @param name the value to be checked
     * @throws FindEventBadRequestException if the value is not a valid {@link OrderEnum} field.
     */
    public static void validateOrderEnum(final String name) {
        if (Arrays.stream(OrderEnum.values()).noneMatch(order -> order.getName().equalsIgnoreCase(name))) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_ENUM_VALUE, name, Arrays.toString(OrderEnum.values()));
        }
    }

    /**
     * Checks if a value given as parameter is a valid ordering parameter.
     *
     * @param param       the value to be checked.
     * @param orderParams a collection of possible order parameters.
     * @throws FindEventBadRequestException if the provided value is not a valid ordering parameter.
     */
    public static void validateOrderParam(final String param, final Set<String> orderParams) {
        if (orderParams.stream().noneMatch(value -> value.equals(param))) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_ORDER_PARAM, param, orderParams);
        }
    }

    /**
     * Validates the provided {@link CreateUserDTO} for user registration.
     * Checks that all mandatory fields are present and that the email and password meet required formats.
     *
     * @param user the {@link CreateUserDTO} to validate
     * @throws FindEventBadRequestException if validation fails.
     */
    public static void validateUserDTO(CreateUserDTO user) {
        // Validate mandatory fields
        checkForMissingField(user, CreateUserDTO::getFirstName, "First name");
        checkForMissingField(user, CreateUserDTO::getLastName, "Last name");
        checkForMissingField(user, CreateUserDTO::getEmail, "Email");
        checkForMissingField(user, CreateUserDTO::getPassword, "Password");
        checkForMissingField(user, CreateUserDTO::getUsername, "Username");

        // Validate password
        if (!isValidPassword(user.getPassword())) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_PASSWORD);
        }

        // Validate email
        if (!isValidEmail(user.getEmail())) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_EMAIL);
        }
    }

    /**
     * Validates the provided {@link LoginRequestDTO} for login requests.
     * Ensures that username (or email) and password are provided.
     *
     * @param loginRequest the {@link LoginRequestDTO} to validate
     * @throws FindEventBadRequestException if any required fields are missing.
     */
    public static void validateLoginRequest(LoginRequestDTO loginRequest) {
        // Validate mandatory fields
        checkForMissingField(loginRequest, LoginRequestDTO::getUsername, "Username / Email");
        checkForMissingField(loginRequest, LoginRequestDTO::getPassword, "Password");
    }

    /**
     * Validates the provided {@link EventRequestDTO} for event creation.
     * Ensures all required fields are present and that the start and end dates are valid.
     *
     * @param eventRequest the {@link EventRequestDTO} to validate
     * @throws FindEventBadRequestException if validation fails.
     */
    public static void validateEventRequest(EventRequestDTO eventRequest) {
        // Validate mandatory fields
        checkForMissingField(eventRequest, EventRequestDTO::getName, "Event name");
        checkForMissingField(eventRequest, EventRequestDTO::getDescription, "Event description");
        checkForMissingField(eventRequest, EventRequestDTO::getHyperlink, "External link");
        checkForMissingField(eventRequest, EventRequestDTO::getStartDate, "Start date", Objects::nonNull);
        checkForMissingField(eventRequest, EventRequestDTO::getLocation, "Location details", Objects::nonNull);

        // Validate location
        LocationDTO location = eventRequest.getLocation();
        checkForMissingField(location, LocationDTO::getName, "Location name");
        checkForMissingField(location, LocationDTO::getLongitude, "Longitude", Objects::nonNull);
        checkForMissingField(location, LocationDTO::getLatitude, "Latitude", Objects::nonNull);

        validateLatitude(location.getLatitude());
        validateLongitude(location.getLongitude());

        // Validate start date and end date
        LocalDateTime startDate = eventRequest.getStartDate();
        LocalDateTime endDate = eventRequest.getEndDate();

        validateStartDate(startDate);
        validateEndDate(startDate, endDate);
    }

    /**
     * Validates the provided {@link EventRequestDTO} for event updates.
     *
     * @param updatedEventRequest the {@link EventRequestDTO} containing updated event data
     * @throws FindEventBadRequestException if date or location validation fails.
     */
    public static void validateUpdateEventRequest(EventRequestDTO updatedEventRequest, EventEntity existingEvent) {
        // Validate location
        LocationDTO updatedLocation = updatedEventRequest.getLocation();

        if (updatedLocation != null) {
            validateLatitude(updatedLocation.getLatitude());
            validateLongitude(updatedLocation.getLongitude());
        }

        // Validate start date and end date
        LocalDateTime startDate = updatedEventRequest.getStartDate();
        LocalDateTime updatedEndDate = updatedEventRequest.getEndDate();
        if (updatedEndDate != null &&
                startDate == null
                && updatedEndDate.isBefore(existingEvent.getStartDate())) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_END_DATE);
        }

        validateStartDate(startDate);
        validateEndDate(startDate, updatedEventRequest.getEndDate());
    }

    public static void validateLatitude(Double latitude) {
        Optional.ofNullable(latitude)
                .ifPresent(existingLat -> {
                    if (existingLat < -90 || existingLat > 90) {
                        throw new FindEventBadRequestException(ErrorCode.INVALID_LATITUDE, existingLat);
                    }
                });
    }

    public static void validateLongitude(Double longitude) {
        Optional.ofNullable(longitude)
                .ifPresent(existingLong -> {
                    if (existingLong < -180 || existingLong > 180) {
                        throw new FindEventBadRequestException(ErrorCode.INVALID_LONGITUDE, existingLong);
                    }
                });
    }

    /**
     * Validates if the provided {@link EventStatusEnum} corresponding to a filter parameter is allowed
     * for the current authenticated user.
     *
     * @param eventStatusEnum the event status to validate
     * @param publisherId     the ID of the user who published the event
     * @throws FindEventUnauthorizedException if the user is not authorized to filter by the given status
     */
    public static void validateEventStatus(EventStatusEnum eventStatusEnum, Integer publisherId) {
        UserEntity authenticatedUser = getAuthenticatedUser();

        if (ObjectUtils.nullSafeEquals(authenticatedUser.getId(), publisherId)
                || EventStatusEnum.APPROVED.equals(eventStatusEnum)) {
            return;
        }

        if (EventStatusEnum.DRAFT.equals(eventStatusEnum) || !authenticatedUser.isAdmin()) {
            throw new FindEventUnauthorizedException(ErrorCode.UNAUTHORIZED);
        }
    }

    /**
     * Checks if a mandatory string field is present and non-blank.
     *
     * @param obj           the object containing the field
     * @param getFieldValue a function to extract the field value from the object
     * @param fieldName     the name of the field (for error reporting)
     * @param <T>           the type of the object
     * @throws FindEventBadRequestException if the field is missing.
     */
    private static <T> void checkForMissingField(T obj, Function<T, String> getFieldValue, String fieldName) {
        if (StringUtils.isBlank(getFieldValue.apply(obj))) {
            throw new FindEventBadRequestException(ErrorCode.MANDATORY_VALUE_IS_MISSING, fieldName);
        }
    }

    /**
     * Checks if a mandatory field satisfies a custom condition.
     *
     * @param obj           the object containing the field
     * @param getFieldValue a function extracting the field value from the object
     * @param fieldName     the name of the field (for error reporting)
     * @param condition     a predicate defining the valid condition for the field
     * @param <T>           the type of the object
     * @param <V>           the type of the field
     * @throws FindEventBadRequestException if the condition fails.
     */
    private static <T, V> void checkForMissingField(T obj,
                                                    Function<T, V> getFieldValue,
                                                    String fieldName,
                                                    Predicate<V> condition) {
        if (!condition.test(getFieldValue.apply(obj))) {
            throw new FindEventBadRequestException(ErrorCode.MANDATORY_VALUE_IS_MISSING, fieldName);
        }
    }

    /**
     * Validates if the provided password meets the defined security requirements.
     * <p>
     * Requirements include: at least 8 characters, one uppercase letter, one lowercase letter, one digit,
     * and one special character.
     *
     * @param password the password string to validate
     * @return {@code true} if the password is valid, {@code false} otherwise
     */
    private static boolean isValidPassword(String password) {
        return password.length() >= 8 &&
                password.matches(".*[A-Z].*") &&      // at least one uppercase
                password.matches(".*[a-z].*") &&      // at least one lowercase
                password.matches(".*\\d.*") &&        // at least one digit
                password.matches(".*[!@#$%^&*()].*"); // at least one special character
    }

    /**
     * Validates if the provided email address has a valid format.
     *
     * @param email the email string to validate
     * @return {@code true} if the email is valid, {@code false} otherwise
     */
    private static boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    /**
     * Validates that the start date is at least one day in the future.
     *
     * @param startDate the start date to validate
     * @throws FindEventBadRequestException if the start date is invalid.
     */
    private static void validateStartDate(LocalDateTime startDate) {
        if (startDate != null && startDate.isBefore(LocalDateTime.now().plusDays(1))) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_START_DATE);
        }
    }

    /**
     * Validates that the end date is after the start date, if an end date is provided.
     *
     * @param startDate the start date
     * @param endDate   the end date to validate
     * @throws FindEventBadRequestException if the end date is invalid.
     */
    private static void validateEndDate(LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate != null && endDate != null && startDate.isAfter(endDate)) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_END_DATE);
        }
    }
}
