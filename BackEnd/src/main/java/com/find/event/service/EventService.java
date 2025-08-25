package com.find.event.service;

import com.find.event.enums.AttendanceStatusEnum;
import com.find.event.model.pagination.PaginatedModel;
import com.find.event.model.category.EventCategoryWithTypesDTO;
import com.find.event.model.event.EventDTO;
import com.find.event.model.event.EventRequestDTO;
import com.find.event.model.event.UpdateEventStatusDTO;

import java.util.List;

public interface EventService {

    /**
     * Retrieves a paginated list of events based on the provided pagination, filtering and ordering parameters.
     *
     * @param pageNumber  the page number to retrieve (zero-based or one-based depending on implementation)
     * @param pageSize    the number of records per page
     * @param filterBy    the field name to apply filtering on
     * @param filterValue the value to filter by
     * @param orderBy     the field name to apply sorting on
     * @param orderValue  the sort direction (e.g., "asc" or "desc")
     * @return a paginated model containing the list of matching {@link EventDTO} objects
     */
    PaginatedModel<EventDTO> getEvents(Integer pageNumber,
                                       Integer pageSize,
                                       String filterBy,
                                       String filterValue,
                                       String orderBy,
                                       String orderValue);

    /**
     * Retrieves a single event by its unique identifier.
     *
     * @param eventId the unique ID of the event to retrieve
     * @return the {@link EventDTO} corresponding to the provided event ID
     */
    EventDTO getEventById(Long eventId);

    /**
     * Creates a new event using the provided event request data.
     *
     * @param eventRequest the {@link EventRequestDTO} containing the event creation details
     * @return the created {@link EventDTO} representing the newly created event
     */
    EventDTO createEvent(EventRequestDTO eventRequest);

    /**
     * Updates an existing event identified by its ID with the provided updated data.
     *
     * @param eventId         the unique ID of the event to update
     * @param eventRequestDTO the {@link EventRequestDTO} containing the updated event details
     */
    void updateEvent(Long eventId, EventRequestDTO eventRequestDTO);

    /**
     * Deletes the event identified by its unique ID.
     *
     * @param id the unique ID of the event to delete
     */
    void deleteEventById(Long id);

    /**
     * Updates the status of an existing event identified by its ID.
     *
     * @param eventId           the unique ID of the event to update
     * @param updateEventStatus the {@link UpdateEventStatusDTO} containing the new status information
     */
    void updateEventStatus(Long eventId, UpdateEventStatusDTO updateEventStatus);

    void updateAttendanceStatus(Long eventId, AttendanceStatusEnum attendanceStatus);

    /**
     * Retrieves a list of all event categories along with their associated event types.
     *
     * @return a list of {@link EventCategoryWithTypesDTO} objects representing available event categories and their types
     */
    List<EventCategoryWithTypesDTO> getEventCategoriesWithTypes();

    /**
     * Retrieves a list of up to 10 trending events.
     *
     * @return a list of {@link EventDTO} objects representing the trending events
     */
    PaginatedModel<EventDTO> getTrendingEvents(Integer pageSize, Integer pageNumber);

    byte[] getEventImage(Long eventId);

    // TODO: Add Javadoc
    PaginatedModel<EventDTO> getPersonalEvents(Integer pageSize,
                                               Integer pageNumber,
                                               AttendanceStatusEnum attendanceStatus);

    // TODO: Add Javadoc
    List<EventDTO> getUpcomingEvents();

    // TODO: Add JavaDoc
    PaginatedModel<EventDTO> getEventsSuggestions(Integer pageSize, Integer pageNumber);
}
