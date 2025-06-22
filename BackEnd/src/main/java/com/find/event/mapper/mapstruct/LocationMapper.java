package com.find.event.mapper.mapstruct;

import com.find.event.entity.LocationEntity;
import com.find.event.mapper.annotations.IgnoreIdMapping;
import com.find.event.model.location.LocationDTO;
import com.find.event.utils.GeometryUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.locationtech.jts.geom.Point;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE,
        imports = GeometryUtils.class
)
public interface LocationMapper {

    @IgnoreIdMapping
    @Mapping(target = "coordinates", source = ".", qualifiedByName = "mapLongAndLatToPoint")
    LocationEntity locationDtoToLocationEntity(LocationDTO location);

    @Mapping(target = "longitude", source = "coordinates.x")
    @Mapping(target = "latitude", source = "coordinates.y")
    LocationDTO locationEntityToLocationDto(LocationEntity location);

    @Named("updateLocationEntity")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @IgnoreIdMapping
    @Mapping(target = "coordinates", source = ".", qualifiedByName = "mapLongAndLatToPoint")
    void updateLocationEntity(@MappingTarget LocationEntity locationEntity, LocationDTO location);

    @Named("mapLongAndLatToPoint")
    default Point mapLongAndLatToPoint(LocationDTO locationDTO) {
        Double longitude = locationDTO.getLongitude();
        Double latitude = locationDTO.getLatitude();

        if (ObjectUtils.anyNull(longitude, latitude)) {
            return null;
        }

        return GeometryUtils.createPoint(latitude, longitude);
    }
}
