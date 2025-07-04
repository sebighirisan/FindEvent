package com.find.event.utils;

import com.find.event.entity.UserEntity;
import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventUnauthorizedException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class JwtUtils {

    /**
     * Retrieves the currently authenticated user from the Spring Security context.
     *
     * @return the authenticated {@link UserEntity}
     * @throws FindEventUnauthorizedException if no valid authenticated user is found
     */
    public static UserEntity getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            Object principal = auth.getPrincipal();
            if (principal instanceof UserEntity userEntity) {
                return userEntity;
            }
        }

        throw new FindEventUnauthorizedException(ErrorCode.UNAUTHORIZED);
    }
}
