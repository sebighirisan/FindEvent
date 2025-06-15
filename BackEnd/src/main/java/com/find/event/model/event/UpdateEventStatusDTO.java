package com.find.event.model.event;

import com.find.event.enums.EventStatusEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEventStatusDTO {
    private EventStatusEnum newStatus;
    private String message;
}
