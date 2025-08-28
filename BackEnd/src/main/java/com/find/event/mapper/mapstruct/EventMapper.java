package com.find.event.mapper.mapstruct;

import com.find.event.entity.AttendanceEntity;
import com.find.event.entity.EventEntity;
import com.find.event.entity.UserEntity;
import com.find.event.enums.AttendanceStatusEnum;
import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventInternalServerError;
import com.find.event.mapper.annotations.IgnoreAuditMappings;
import com.find.event.mapper.annotations.IgnoreIdMapping;
import com.find.event.model.event.EventDTO;
import com.find.event.model.event.EventRequestDTO;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        uses = {UserMapper.class, LocationMapper.class}
)
public interface EventMapper {
    @Mapping(target = "status", source = "eventStatus.status")
    @Mapping(target = "type", source = "type.name")
    @Mapping(target = "interested", source = ".", qualifiedByName = "mapInterested")
    @Mapping(target = "going", source = ".", qualifiedByName = "mapGoing")
    @Mapping(target = "hasSplashImage", expression = "java(eventEntity.getSplashImage() != null && eventEntity.getSplashImage().length > 0)")
//    @Mapping(target = "splashImage", qualifiedByName = "convertSplashImageToBase64")
    EventDTO eventEntityToEventDTO(EventEntity eventEntity);

    @IgnoreIdMapping
    @IgnoreAuditMappings
    @Mapping(target = "splashImage", qualifiedByName = "convertMultipartToByteArray")
    @Mapping(target = "publisher", ignore = true)
    EventEntity eventRequestDtoToEventEntity(EventRequestDTO eventRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @IgnoreIdMapping
    @IgnoreAuditMappings
    @Mapping(target = "publisher", ignore = true)
    @Mapping(target = "splashImage", qualifiedByName = "convertMultipartToByteArray")
    @Mapping(target = "location", qualifiedByName = "updateLocationEntity")
    void updateEvent(@MappingTarget EventEntity event, EventRequestDTO updatedEvent);

//    @Named("convertSplashImageToBase64")
//    default String convertSplashImageToBase64(byte[] splashImage) {
//        if (splashImage == null) {
//            return null;
//        }
//
//        return new String(Base64.getEncoder().encode(splashImage));
//    }

    @Named("convertMultipartToByteArray")
    default byte[] convertMultipartToByteArray(MultipartFile splashImage) {
        if (splashImage == null) {
            return null;
        }

        try {
            return splashImage.getBytes();
        } catch (IOException e) {
            throw new FindEventInternalServerError(ErrorCode.INTERNAL_SERVER_ERROR, e);
        }
    }

    @Named("mapInterested")
    default List<String> mapInterested(EventEntity event) {
        if (CollectionUtils.isEmpty(event.getEventAttendances())) {
            return new ArrayList<>();
        }

        return event.getEventAttendances().stream()
                .filter(eventAttendance -> AttendanceStatusEnum.INTERESTED.equals(eventAttendance.getAttendanceStatus()))
                .map(AttendanceEntity::getUser)
                .map(UserEntity::getUsername)
                .toList();
    }

    @Named("mapGoing")
    default List<String> mapGoing(EventEntity event) {
        if (CollectionUtils.isEmpty(event.getEventAttendances())) {
            return new ArrayList<>();
        }

        return event.getEventAttendances().stream()
                .filter(eventAttendance -> AttendanceStatusEnum.GOING.equals(eventAttendance.getAttendanceStatus()))
                .map(AttendanceEntity::getUser)
                .map(UserEntity::getUsername)
                .toList();
    }
}
