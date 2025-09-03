package com.find.event.service.impl;

import com.find.event.entity.AttendanceEntity;
import com.find.event.entity.UserEventId;
import com.find.event.entity.EventEntity;
import com.find.event.entity.EventStatusEntity;
import com.find.event.entity.UserEntity;
import com.find.event.enums.AttendanceStatusEnum;
import com.find.event.enums.EventStatusEnum;
import com.find.event.enums.EventTypeEnum;
import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import com.find.event.exception.FindEventNotFoundException;
import com.find.event.exception.FindEventUnauthorizedException;
import com.find.event.mapper.mapstruct.EventMapper;
import com.find.event.model.category.EventCategoryWithTypesDTO;
import com.find.event.model.event.EventDTO;
import com.find.event.model.event.EventRequestDTO;
import com.find.event.model.event.UpdateEventStatusDTO;
import com.find.event.repository.jpa.AttendanceJpaRepository;
import com.find.event.repository.jpa.EventJpaRepository;
import com.find.event.repository.nativequeries.EventRepository;
import com.find.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import static com.find.event.enums.EventStatusEnum.*;
import static com.find.event.utils.JwtUtils.getAuthenticatedUser;
import static com.find.event.utils.ValidationUtils.validateEventRequest;
import static com.find.event.utils.ValidationUtils.validateUpdateEventRequest;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;
import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventMapper eventMapper;
    private final EventJpaRepository eventJpaRepository;
    private final AttendanceJpaRepository attendanceJpaRepository;
    private final EventRepository eventRepository;

    private static final Map<EventStatusEnum, Set<EventStatusEnum>> statusTransitions = Map.of(
            PENDING, Set.of(APPROVED, DECLINED),
            APPROVED, Set.of(DECLINED),
            DECLINED, Set.of(APPROVED)
    );

    @Transactional(readOnly = true)
    @Override
    public List<EventDTO> getEvents(String name,
                                    Double longitude,
                                    Double latitude,
                                    Long proximity) {

        return eventJpaRepository.findUpcomingEvents(name, longitude, latitude, proximity)
                .stream()
                .map(eventMapper::eventEntityToEventDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    @Override
    public EventDTO getEventById(Long eventId) {
        return eventJpaRepository
                .findByIdWithPublisher(eventId)
                .map(eventMapper::eventEntityToEventDTO)
                .orElseThrow(() -> new FindEventNotFoundException(ErrorCode.EVENT_NOT_FOUND, eventId));
    }

    @Transactional
    @Override
    public EventDTO createEvent(EventRequestDTO eventRequest) {
        validateEventRequest(eventRequest);

        EventStatusEntity eventStatus = new EventStatusEntity();

        EventEntity newEventEntity = eventMapper.eventRequestDtoToEventEntity(eventRequest);
        newEventEntity.setPublisher(getAuthenticatedUser());
        newEventEntity.setEventStatus(eventStatus);
        newEventEntity.getLocation().setEvent(newEventEntity);

        eventStatus.setEvent(newEventEntity);

        return eventMapper.eventEntityToEventDTO(eventJpaRepository.save(newEventEntity));
    }

    @Transactional
    @Override
    public void updateEvent(Long eventId, EventRequestDTO updatedEvent) {
        EventEntity existingEvent = eventJpaRepository.findById(eventId)
                .orElseThrow(() -> new FindEventNotFoundException(ErrorCode.EVENT_NOT_FOUND, eventId));
        EventStatusEntity eventStatus = existingEvent.getEventStatus();
        EventStatusEnum currentStatus = eventStatus.getStatus();

        validateUpdateEventRequest(updatedEvent, existingEvent);

        if (DECLINED.equals(currentStatus)) {
            eventStatus.setStatus(PENDING);
            eventStatus.setMessage(null);
        }

        eventMapper.updateEvent(existingEvent, updatedEvent);
    }

    @Transactional
    @Override
    public void deleteEventById(Long eventId) {
        EventEntity event = eventJpaRepository.findByIdWithPublisher(eventId).orElseThrow(
                () -> new FindEventNotFoundException(ErrorCode.EVENT_NOT_FOUND, eventId));

        UserEntity publisher = event.getPublisher();
        UserEntity authUser = getAuthenticatedUser();

        if (!Objects.equals(publisher.getId(), authUser.getId()) && !authUser.isAdmin()) {
            throw new FindEventUnauthorizedException(ErrorCode.UNAUTHORIZED);
        }

        eventJpaRepository.delete(event);
    }

    @Transactional
    @Override
    public void updateEventStatus(Long eventId, UpdateEventStatusDTO updatedEventStatus) {
        EventEntity event = eventJpaRepository.findByIdWithPublisher(eventId).orElseThrow(
                () -> new FindEventNotFoundException(ErrorCode.EVENT_NOT_FOUND, eventId));
        EventStatusEntity eventStatusEntity = event.getEventStatus();
        EventStatusEnum eventStatus = eventStatusEntity.getStatus();
        EventStatusEnum newStatus = updatedEventStatus.getNewStatus();

        UserEntity authUser = getAuthenticatedUser();
        UserEntity publisher = event.getPublisher();

        if (!statusTransitions.get(eventStatus).contains(newStatus)) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_EVENT_STATUS);
        }

        boolean hasAdmin = authUser.isAdmin();

        switch (newStatus) {
            case PENDING:
                if (!Objects.equals(authUser, publisher)) {
                    throw new FindEventUnauthorizedException(ErrorCode.UNAUTHORIZED);
                }
                break;
            case DECLINED, APPROVED:
                if (!hasAdmin || Objects.equals(authUser, publisher)) {
                    throw new FindEventUnauthorizedException(ErrorCode.UNAUTHORIZED);
                }
                break;
            default:
                break;
        }

        eventStatusEntity.setMessage(updatedEventStatus.getMessage());
        eventStatusEntity.setStatus(newStatus);
    }

    @Override
    @Transactional
    public void updateAttendanceStatus(Long eventId, AttendanceStatusEnum attendanceStatus) {
        EventEntity event = eventJpaRepository.findById(eventId)
                .orElseThrow(() -> new FindEventNotFoundException(ErrorCode.EVENT_NOT_FOUND, eventId));
        UserEntity loggedInUser = getAuthenticatedUser();

        if (!EventStatusEnum.APPROVED.equals(event.getEventStatus().getStatus())) {
            throw new FindEventBadRequestException(ErrorCode.INVALID_UNAPPROVED_EVENT, eventId);
        }

        UserEventId userEventId = new UserEventId(loggedInUser.getId(), eventId);

        AttendanceEntity attendanceEntity = attendanceJpaRepository
                .findById(userEventId)
                .orElseGet(() -> new AttendanceEntity(loggedInUser, event));

        attendanceEntity.setAttendanceStatus(attendanceStatus);
        attendanceJpaRepository.save(attendanceEntity);
    }

    @Override
    @Transactional
    public void deleteEventAttendanceStatus(Long eventId) {
        Long userId = getAuthenticatedUser().getId();

        attendanceJpaRepository.deleteById(new UserEventId(userId, eventId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventCategoryWithTypesDTO> getEventCategoriesWithTypes() {
        return Arrays.stream(EventTypeEnum.values())
                .collect(groupingBy(
                        EventTypeEnum::getEventCategory,
                        mapping(EventTypeEnum::convertToEventTypeDTO, toList()))
                )
                .entrySet()
                .stream()
                .map(entrySet ->
                        EventCategoryWithTypesDTO.builder()
                                .category(entrySet.getKey().getName())
                                .types(entrySet.getValue())
                                .build()
                )
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventDTO> getTrendingEvents(Integer pageSize, Integer pageNumber) {
        List<EventEntity> trendingEventsPaginated = eventJpaRepository.findTrendingEvents();

        return trendingEventsPaginated
                .stream().map(eventMapper::eventEntityToEventDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public byte[] getEventImage(Long eventId) {
        return eventJpaRepository.findById(eventId)
                .map(EventEntity::getSplashImage)
                .orElseThrow(() -> new FindEventNotFoundException(ErrorCode.EVENT_NOT_FOUND, eventId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventDTO> getPersonalEvents(Integer pageSize,
                                            Integer pageNumber,
                                            AttendanceStatusEnum attendanceStatus) {
        Long authenticatedUserId = getAuthenticatedUser().getId();

        List<EventEntity> personalEventsPaginated = switch (attendanceStatus) {
            case GOING -> eventJpaRepository.findGoingEvents(authenticatedUserId);
            case INTERESTED -> eventJpaRepository.findInterestedEvents(authenticatedUserId);
        };

        return personalEventsPaginated
                .stream().map(eventMapper::eventEntityToEventDTO).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventDTO> getUpcomingEvents() {
        Pageable pageable = PageRequest.of(0, 10);

        return eventJpaRepository
                .findUpcomingEvents(pageable)
                .stream()
                .map(eventMapper::eventEntityToEventDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventDTO> getEventsSuggestions(Integer pageSize, Integer pageNumber) {
        return null;
    }
}
