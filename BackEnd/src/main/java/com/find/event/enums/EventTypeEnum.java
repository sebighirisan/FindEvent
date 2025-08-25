package com.find.event.enums;

import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import com.find.event.model.category.EventTypeDTO;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;

@RequiredArgsConstructor
@Getter
public enum EventTypeEnum {
    // Music
    OUTDOOR_CONCERT("Outdoor Concert", EventCategoryEnum.MUSIC),
    LOCAL_CONCERT("Local Concert", EventCategoryEnum.MUSIC),
    MUSIC_FESTIVAL("Music Festival", EventCategoryEnum.MUSIC),
    ORCHESTRA_PERFORMANCE("Orchestra Performance", EventCategoryEnum.MUSIC),

    // Sport & Fitness
    MARATHON("Marathon", EventCategoryEnum.SPORT_AND_FITNESS),
    RACE("Race", EventCategoryEnum.SPORT_AND_FITNESS),
    TOURNAMENT("Tournament", EventCategoryEnum.SPORT_AND_FITNESS),

    // Performance & Visual Arts
    THEATER_PERFORMANCE("Theater Performance", EventCategoryEnum.PERFORMANCE_AND_VISUAL_ARTS),
    SONG_CONTEST("Song Contest", EventCategoryEnum.PERFORMANCE_AND_VISUAL_ARTS),
    STREET_PERFORMANCE("Street Performance", EventCategoryEnum.PERFORMANCE_AND_VISUAL_ARTS),
    FILM_SCREENING("Film Screening", EventCategoryEnum.PERFORMANCE_AND_VISUAL_ARTS),
    ART_EXPO("Art Expo", EventCategoryEnum.PERFORMANCE_AND_VISUAL_ARTS),

    // Food & Drink Events
    FOOD_TRUCK_FESTIVAL("Food Truck Festival", EventCategoryEnum.FOOD_AND_DRINK_EVENTS),
    COOKING_COMPETITION("Cooking Competition", EventCategoryEnum.FOOD_AND_DRINK_EVENTS),
    GALA_DINNER("Gala Dinner", EventCategoryEnum.FOOD_AND_DRINK_EVENTS),

    // Educational & Professional
    CONFERENCE("Conference", EventCategoryEnum.EDUCATIONAL_AND_PROFESSIONAL),
    NETWORKING_EVENT("Networking Event", EventCategoryEnum.EDUCATIONAL_AND_PROFESSIONAL),
    WORKSHOP("Workshop", EventCategoryEnum.EDUCATIONAL_AND_PROFESSIONAL),
    HACKATHON("Hackathon", EventCategoryEnum.EDUCATIONAL_AND_PROFESSIONAL),
    TRAINING_SEMINAR("Training Seminar", EventCategoryEnum.EDUCATIONAL_AND_PROFESSIONAL),

    // Charity
    FUNDRAISER("Fundraiser", EventCategoryEnum.CHARITY),
    AUCTION("Auction", EventCategoryEnum.CHARITY),
    VOLUNTEERING("Volunteering", EventCategoryEnum.CHARITY),

    // Activism & Social Movement
    PROTEST("Protest", EventCategoryEnum.ACTIVISM_AND_SOCIAL_MOVEMENT),
    AWARENESS_MOVEMENT("Awareness Movement", EventCategoryEnum.ACTIVISM_AND_SOCIAL_MOVEMENT),
    PUBLIC_GATHERING("Public Gathering", EventCategoryEnum.ACTIVISM_AND_SOCIAL_MOVEMENT),

    // Other
    OTHER("Other", EventCategoryEnum.OTHER);

    public static EventTypeEnum of(String value) {
        return Arrays.stream(EventTypeEnum.values())
                .filter(eventType -> eventType.name().equals(value))
                .findFirst()
                .orElseThrow(() -> new FindEventBadRequestException(ErrorCode.INVALID_ENUM_VALUE, value, Arrays.toString(EventTypeEnum.values())));
    }

    public EventTypeDTO convertToEventTypeDTO() {
        return EventTypeDTO.builder()
                .name(name())
                .value(name)
                .build();
    }

    private final String name;
    private final EventCategoryEnum eventCategory;
}
