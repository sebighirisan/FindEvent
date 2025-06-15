package com.find.event.service;

import com.find.event.enums.EventStatusEnum;
import com.find.event.model.category.EventCategoryWithTypesDTO;
import com.find.event.model.event.EventDTO;
import com.find.event.model.event.EventRequestDTO;
import com.find.event.model.event.UpdateEventStatusDTO;

import java.util.List;

public interface EventService {
    EventDTO getEventById(Long eventId);

    EventDTO createEvent(EventRequestDTO eventRequest);

    void updateEvent(Long eventId, EventRequestDTO eventRequestDTO);

    void deleteEventById(Long id);

    void updateEventStatus(Long eventId, UpdateEventStatusDTO updateEventStatus);

    List<EventCategoryWithTypesDTO> getEventCategoriesWithTypes();
}
