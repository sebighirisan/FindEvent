package com.find.event.mapper;

import com.find.event.entity.UserEntity;
import com.find.event.mapper.annotations.IgnoreAuditMappings;
import com.find.event.mapper.annotations.IgnoreIdMapping;
import com.find.event.model.user.CreateUserDTO;
import com.find.event.model.user.UserSummaryDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @IgnoreAuditMappings
    @IgnoreIdMapping
    @Mapping(target = "password", ignore = true)
    UserEntity userDTOToUserEntity(CreateUserDTO user);

    UserSummaryDTO userEntityToUserSummaryDto(UserEntity userEntity);
}
