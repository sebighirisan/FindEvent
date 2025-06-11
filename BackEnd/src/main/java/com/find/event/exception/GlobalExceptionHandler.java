package com.find.event.exception;

import com.find.event.model.ErrorDTO;
import jakarta.persistence.OptimisticLockException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RequiredArgsConstructor
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FindEventNotFoundException.class)
    @ResponseStatus
    public ResponseEntity<ErrorDTO> handleFindEventNotFoundException(final FindEventNotFoundException exception, final HttpServletRequest request) {
        log.error(exception.getMessage(), exception);
        return handleException(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(FindEventBadRequestException.class)
    @ResponseStatus
    public ResponseEntity<ErrorDTO> handleFindEventBadRequestException(final FindEventBadRequestException exception, final HttpServletRequest request) {
        log.error(exception.getMessage(), exception);
        return handleException(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FindEventConflictException.class)
    @ResponseStatus
    public ResponseEntity<ErrorDTO> handleFindEventConflictException(final FindEventConflictException exception, final HttpServletRequest request) {
        log.error(exception.getMessage(), exception);
        return handleException(exception.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(OptimisticLockException.class)
    @ResponseStatus
    public ResponseEntity<ErrorDTO> handleOptimisticLockException(final OptimisticLockException exception) {
        log.error(exception.getMessage(), exception);
        return handleException(ErrorCode.OPTIMISTIC_LOCK_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus
    public ResponseEntity<ErrorDTO> handleException(final Exception exception, final HttpServletRequest request) {
        log.error(exception.getMessage(), exception);
        return handleException(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ErrorDTO> handleException(final String messagePath, final HttpStatus httpStatus) {
        final ErrorDTO errorDTO = ErrorDTO.builder()
                .code(httpStatus.name())
                .message(messagePath)
                .build();

        return new ResponseEntity<>(errorDTO, httpStatus);
    }
}