package com.find.event.mapper;

import com.find.event.entity.EventEntity;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = UserMapper.class)
public interface EventMapper {
    @Mapping(target = "status", source = "eventStatus.status")
    @Mapping(target = "type", source = "type.name")
    @Mapping(target = "splashImage", qualifiedByName = "convertSplashImageToBase64")
    EventDTO eventEntityToEventDTO(EventEntity eventEntity);

    @IgnoreIdMapping
    @IgnoreAuditMappings
    @Mapping(target = "splashImage", qualifiedByName = "convertMultipartToByteArray")
    @Mapping(target = "publisher", ignore = true)
    EventEntity eventRequestDtoToEventEntity(EventRequestDTO eventRequest);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "publisher", ignore = true)
    @Mapping(target = "splashImage", qualifiedByName = "convertMultipartToByteArray")
    void updateEvent(@MappingTarget EventEntity event, EventRequestDTO updatedEvent);

    @Named("convertSplashImageToBase64")
    default String convertSplashImageToBase64(byte[] splashImage) {
        if (splashImage == null) {
            return null;
        }

        return new String(Base64.getEncoder().encode(splashImage));
    }

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
}
