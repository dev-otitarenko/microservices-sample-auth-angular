package com.maestro.app.sample1.ms.auth.domains;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ErrorStatus {
    ERROR("error"), INFO("info"), WARNING("warning");

    private String status;

    ErrorStatus(String status) {
        this.status = status;
    }

    @JsonValue
    public String getValue() {
        return this.status;
    }
}
