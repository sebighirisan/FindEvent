package com.find.event.utils;

import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import com.find.event.model.LoginRequestDTO;
import com.find.event.model.UserDTO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;

import java.util.function.Function;
import java.util.regex.Pattern;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ValidationUtils {
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    );

    public static void validateUserDTO(UserDTO user) {
        checkForMissingField(user, UserDTO::getFirstName, "First name");
        checkForMissingField(user, UserDTO::getLastName, "Last name");
        checkForMissingField(user, UserDTO::getEmail, "Email");
        checkForMissingField(user, UserDTO::getPassword, "Password");
        checkForMissingField(user, UserDTO::getUsername, "Username");

        if (!isValidPassword(user.getPassword())) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_PASSWORD);
        }

        if (!isValidEmail(user.getEmail())) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_EMAIL);
        }
    }

    public static void validateLoginRequest(LoginRequestDTO loginRequest) {
        checkForMissingField(loginRequest, LoginRequestDTO::getUsername, "Username / Email");
        checkForMissingField(loginRequest, LoginRequestDTO::getPassword, "Password");
    }

    private static <T> void checkForMissingField(T obj, Function<T, String> getFieldValue, String fieldName) {
        if (StringUtils.isBlank(getFieldValue.apply(obj))) {
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
}
