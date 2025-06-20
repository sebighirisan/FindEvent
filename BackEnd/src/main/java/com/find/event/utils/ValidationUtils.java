package com.find.event.utils;

import com.find.event.enums.OrderEnum;
import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import com.find.event.model.user.CreateUserDTO;
import com.find.event.model.user.LoginRequestDTO;
import com.find.event.model.event.EventRequestDTO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Objects;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.regex.Pattern;

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

    public static void validateLoginRequest(LoginRequestDTO loginRequest) {
        // Validate mandatory fields
        checkForMissingField(loginRequest, LoginRequestDTO::getUsername, "Username / Email");
        checkForMissingField(loginRequest, LoginRequestDTO::getPassword, "Password");
    }

    public static void validateEventRequest(EventRequestDTO eventRequest) {
        // Validate mandatory fields
        checkForMissingField(eventRequest, EventRequestDTO::getName, "Event name");
        checkForMissingField(eventRequest, EventRequestDTO::getDescription, "Event description");
        checkForMissingField(eventRequest, EventRequestDTO::getHyperlink, "External link");
        checkForMissingField(eventRequest, EventRequestDTO::getStartDate, "Start Date", Objects::nonNull);

        // Validate start date and end date
        LocalDateTime startDate = eventRequest.getStartDate();
        LocalDateTime endDate = eventRequest.getEndDate();

        validateStartDate(startDate);
        validateEndDate(startDate, endDate);
    }

    public static void validateUpdateEventRequest(EventRequestDTO updatedEventRequest) {
        LocalDateTime startDate = updatedEventRequest.getStartDate();

        if (startDate == null) {
            return;
        }

        validateStartDate(startDate);
        validateEndDate(startDate, updatedEventRequest.getEndDate());
    }

    private static <T> void checkForMissingField(T obj, Function<T, String> getFieldValue, String fieldName) {
        if (StringUtils.isBlank(getFieldValue.apply(obj))) {
            throw new FindEventBadRequestException(ErrorCode.MANDATORY_VALUE_IS_MISSING, fieldName);
        }
    }

    private static <T, V> void checkForMissingField(T obj,
                                                    Function<T, V> getFieldValue,
                                                    String fieldName,
                                                    Predicate<V> condition) {
        if (!condition.test(getFieldValue.apply(obj))) {
            throw new FindEventBadRequestException(ErrorCode.MANDATORY_VALUE_IS_MISSING, fieldName);
        }
    }

    private static boolean isValidPassword(String password) {
        return password.length() >= 8 &&
               password.matches(".*[A-Z].*") &&      // at least one uppercase
               password.matches(".*[a-z].*") &&      // at least one lowercase
               password.matches(".*\\d.*") &&        // at least one digit
               password.matches(".*[!@#$%^&*()].*"); // at least one special character
    }

    private static boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    private static void validateStartDate(LocalDateTime startDate) {
        if (startDate.isBefore(LocalDateTime.now().plusDays(1))) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_START_DATE);
        }
    }

    private static void validateEndDate(LocalDateTime startDate, LocalDateTime endDate) {
        if (endDate != null && startDate.isAfter(endDate)) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_END_DATE);
        }
    }
}
