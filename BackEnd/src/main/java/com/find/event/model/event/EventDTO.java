package com.find.event.model.event;

import com.find.event.enums.EventStatusEnum;
import com.find.event.model.location.LocationDTO;
import com.find.event.model.user.UserSummaryDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class EventDTO {
    private String name;
    private String description;
    private UserSummaryDTO publisher;
    private String type;
    private String hyperlink;
    private String splashImage;
    private LocationDTO location;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private EventStatusEnum status;
}
