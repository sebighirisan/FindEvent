package com.find.event.service;

import com.find.event.entity.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {
    /**
     * Generates a JWT token for the specified user.
     *
     * @param userDetails the {@link UserEntity} containing user information to include in the token payload
     * @return a JWT token representing the authenticated user
     */
    String generateToken(UserEntity userDetails);

    /**
     * Extracts the username from the provided JWT token.
     *
     * @param token the JWT token from which to extract the username
     * @return the username extracted from the token
     */
    String extractUsername(String token);

    /**
     * Validates the provided JWT token against the specified user details.
     *
     * @param token       the JWT token to validate
     * @param userDetails the {@link UserDetails} to validate against the token's claims
     * @return {@code true} if the token is valid, {@code false} otherwise
     */
    boolean isTokenValid(String token, UserDetails userDetails);
}

