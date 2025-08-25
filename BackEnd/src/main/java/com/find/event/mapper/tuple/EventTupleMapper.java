package com.find.event.mapper.tuple;

import com.find.event.enums.EventStatusEnum;
import com.find.event.enums.EventTypeEnum;
import com.find.event.model.event.EventDTO;
import com.find.event.model.location.LocationDTO;
import com.find.event.model.user.UserSummaryDTO;
import jakarta.persistence.Tuple;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.geolatte.geom.Point;
import org.geolatte.geom.Position;

import static com.find.event.utils.MapperUtils.extractByteArrayFromTuple;
import static com.find.event.utils.MapperUtils.extractLocalDateTimeValueFromTuple;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class EventTupleMapper {

    public static EventDTO tupleToEventDto(Tuple tuple) {
        // User Details
        UserSummaryDTO publisher = UserSummaryDTO.builder()
                .id((long) tuple.get("publisherId", Integer.class))
                .username(tuple.get("publisherUsername", String.class))
                .build();

        // Location
        String locationName = tuple.get("locationName", String.class);
        Point<Position> coordinates = tuple.get("coordinates", Point.class);
        Position position = coordinates.getPosition();
        LocationDTO location = new LocationDTO(
                locationName,
                position.getCoordinate(0),
                position.getCoordinate(1)
        );

        // Status
        EventStatusEnum eventStatusEnum = EventStatusEnum.of(tuple.get("status", String.class));
        EventTypeEnum eventTypeEnum = EventTypeEnum.of(tuple.get("type", String.class));

        // Event
        return EventDTO.builder()
                .description(tuple.get("description", String.class))
                .name(tuple.get("name", String.class))
                .type(eventTypeEnum.getName())
                .startDate(extractLocalDateTimeValueFromTuple(tuple, "startDate"))
                .endDate(extractLocalDateTimeValueFromTuple(tuple, "endDate"))
                .hyperlink(tuple.get("hyperlink", String.class))
                // .splashImage(extractByteArrayFromTuple(tuple, "splashImage"))
                .publisher(publisher)
                .status(eventStatusEnum)
                .location(location)
                .build();
    }
}
