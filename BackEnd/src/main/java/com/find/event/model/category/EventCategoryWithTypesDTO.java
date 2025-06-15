package com.find.event.model.category;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class EventCategoryWithTypesDTO {
    private String category;
    private List<EventTypeDTO> types;
}
