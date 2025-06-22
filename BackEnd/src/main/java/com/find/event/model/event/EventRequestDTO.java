package com.find.event.model.event;

import com.find.event.enums.EventTypeEnum;
import com.find.event.model.location.LocationDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
public class EventRequestDTO {
    private String name;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private EventTypeEnum type;
    private String hyperlink;
    private LocationDTO location;
    private MultipartFile splashImage;
}
