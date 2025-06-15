package com.find.event.model.category;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EventTypeDTO {
    private String name;
    private String value;
}
