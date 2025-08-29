package com.find.event.model.event;

import com.find.event.enums.EventStatusEnum;
import com.find.event.model.location.LocationDTO;
import com.find.event.model.user.UserSummaryDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class EventDTO {
    private Long id;
    private String name;
    private String description;
    private UserSummaryDTO publisher;
    private String type;
    private String hyperlink;
    private boolean hasSplashImage;
    private LocationDTO location;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private EventStatusEnum status;
    private List<String> interested;
    private List<String> going;
}
