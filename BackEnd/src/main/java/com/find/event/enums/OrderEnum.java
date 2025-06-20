package com.find.event.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OrderEnum {
    ASC("asc"),
    DESC("desc");

    private final String name;
}
