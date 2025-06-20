package com.find.event.service;

import com.find.event.model.PaginatedModel;
import com.find.event.model.category.EventCategoryWithTypesDTO;
import com.find.event.model.event.EventDTO;
import com.find.event.model.event.EventRequestDTO;
import com.find.event.model.event.UpdateEventStatusDTO;

import java.util.List;

public interface EventService {
    PaginatedModel<EventDTO> getEvents(String filterBy,
                                       String filterValue,
                                       String orderBy,
                                       String orderValue,
                                       Integer pageSize,
                                       Integer pageNumber);

    EventDTO getEventById(Long eventId);

    EventDTO createEvent(EventRequestDTO eventRequest);

    void updateEvent(Long eventId, EventRequestDTO eventRequestDTO);

    void deleteEventById(Long id);

    void updateEventStatus(Long eventId, UpdateEventStatusDTO updateEventStatus);

    List<EventCategoryWithTypesDTO> getEventCategoriesWithTypes();
}
