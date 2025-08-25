package com.find.event.exception;

import org.springframework.security.core.AuthenticationException;

public class FindEventUnauthenticatedException extends AuthenticationException {
    public FindEventUnauthenticatedException(String msg) {
        super(msg);
    }
}
