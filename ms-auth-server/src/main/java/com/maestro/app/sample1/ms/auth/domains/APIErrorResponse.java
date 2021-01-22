package com.maestro.app.sample1.ms.auth.domains;

import java.util.Collections;
import java.util.List;

public class APIErrorResponse {
    private ErrorStatus status;
    private String message;
    private List<String> errors;

    public APIErrorResponse(ErrorStatus status, String message, List<String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public APIErrorResponse(ErrorStatus status, String message, String error) {
        this.status = status;
        this.message = message;
        errors = Collections.singletonList(error);
    }

    public ErrorStatus getStatus() {
        return status;
    }

    public void setStatus(final ErrorStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(final List<String> errors) {
        this.errors = errors;
    }

    public void setError(final String error) {
        errors = Collections.singletonList(error);
    }

    @Override
    public String toString() {
        return "ApuErrorResponse{" +
                "error='" + status.getValue() + '\'' +
                ", message='" + message + '\'' +
                ", errors=" + errors.toString() + '\'' +
                '}';
    }
}
