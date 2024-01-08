package com.adrian.nixaclientbe.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(value = DuplicateResourceException.class)
    public ResponseEntity<Object> handleApiRequestException(DuplicateResourceException e) {

        var apiException = new ApiException(
                e.getMessage(),
                HttpStatus.CONFLICT
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }

    @ExceptionHandler(value = ResourceNotFoundException.class)
    public ResponseEntity<Object> handleApiRequestException(ResourceNotFoundException e) {

        var apiException = new ApiException(
                e.getMessage(),
                HttpStatus.NOT_FOUND
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }

    @ExceptionHandler(value = RequestValidationException.class)
    public ResponseEntity<Object> handleApiRequestException(RequestValidationException e) {

        var apiException = new ApiException(
                e.getMessage(),
                HttpStatus.BAD_REQUEST
        );

        return new ResponseEntity<>(apiException, apiException.getHttpStatus());
    }
}
