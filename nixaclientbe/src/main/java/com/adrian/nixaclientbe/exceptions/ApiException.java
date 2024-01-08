package com.adrian.nixaclientbe.exceptions;

import org.springframework.http.HttpStatus;

import java.util.Objects;

public class ApiException {
    private final String message;
    private final HttpStatus httpStatus;


    public ApiException(String message, HttpStatus httpStatus) {
        this.message = message;
        this.httpStatus = httpStatus;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    @Override
    public String toString() {
        return "ApiException{" +
                "message='" + message + '\'' +
                ", httpStatus=" + httpStatus +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ApiException that = (ApiException) o;
        return Objects.equals(message, that.message) && httpStatus == that.httpStatus;
    }


    @Override
    public int hashCode() {
        return Objects.hash(message, httpStatus);
    }
}
