package com.find.event.controller;

import com.find.event.enums.AttendanceStatusEnum;
import com.find.event.model.category.EventCategoryWithTypesDTO;
import com.find.event.model.event.EventDTO;
import com.find.event.model.event.EventRequestDTO;
import com.find.event.model.event.UpdateEventStatusDTO;
import com.find.event.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/event")
public class EventController {
    private final EventService eventService;

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable("id") Long eventId) {
        return new ResponseEntity<>(eventService.getEventById(eventId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> getEvents(@RequestParam(name = "name", required = false) String name,
                                                    @RequestParam(name = "longitude", required = false) Double longitude,
                                                    @RequestParam(name = "latitude", required = false) Double latitude,
                                                    @RequestParam(name = "proximity", required = false) Long proximity) {
        return new ResponseEntity<>(eventService.getEvents(name, longitude, latitude, proximity), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventDTO> createEvent(@ModelAttribute EventRequestDTO eventRequest) {
        return new ResponseEntity<>(eventService.createEvent(eventRequest), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEvent(@PathVariable("id") Long eventId,
                                            @ModelAttribute EventRequestDTO eventRequestDTO) {
        eventService.updateEvent(eventId, eventRequestDTO);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventById(@PathVariable("id") Long eventId) {
        eventService.deleteEventById(eventId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}/attendance")
    public ResponseEntity<Void> deleteEventAttendanceStatus(@PathVariable("id") Long eventId) {
        eventService.deleteEventAttendanceStatus(eventId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> updateEventStatus(@PathVariable("id") Long eventId,
                                                  @RequestBody UpdateEventStatusDTO updatedEventStatus) {
        eventService.updateEventStatus(eventId, updatedEventStatus);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/types")
    public ResponseEntity<List<EventCategoryWithTypesDTO>> getEventCategoriesWithTypes() {
        return new ResponseEntity<>(eventService.getEventCategoriesWithTypes(), HttpStatus.OK);
    }

    @PutMapping("/{id}/attendance")
    public ResponseEntity<Void> updateAttendanceStatus(@PathVariable("id") Long eventId,
                                                       @RequestParam("status") AttendanceStatusEnum attendanceStatus) {
        eventService.updateAttendanceStatus(eventId, attendanceStatus);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getEventImage(@PathVariable Long id) {
        byte[] image = eventService.getEventImage(id);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // or IMAGE_PNG depending on your case
                .body(image);
    }

    @GetMapping("/trending")
    public ResponseEntity<List<EventDTO>> getTrendingEvents(@RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
                                                            @RequestParam(name = "pageNumber", defaultValue = "0") Integer pageNumber) {
        return new ResponseEntity<>(eventService.getTrendingEvents(pageSize, pageNumber), HttpStatus.OK);
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<EventDTO>> getUpcomingEvents() {
        return new ResponseEntity<>(eventService.getUpcomingEvents(), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<List<EventDTO>> getPersonalEvents(@RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
                                                            @RequestParam(name = "pageNumber", defaultValue = "0") Integer pageNumber,
                                                            @RequestParam(name = "attendanceStatus") AttendanceStatusEnum attendanceStatus) {
        return new ResponseEntity<>(eventService.getPersonalEvents(pageSize, pageNumber, attendanceStatus), HttpStatus.OK);
    }

    @GetMapping("/suggestions")
    public ResponseEntity<List<EventDTO>> getEventsSuggestions(@RequestParam(name = "pageSize", defaultValue = "10") Integer pageSize,
                                                               @RequestParam(name = "pageNumber", defaultValue = "0") Integer pageNumber) {
        return new ResponseEntity<>(eventService.getEventsSuggestions(pageSize, pageNumber), HttpStatus.OK);
    }
}