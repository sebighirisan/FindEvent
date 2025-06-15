package com.find.event.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum EventCategoryEnum {
    MUSIC("Music"),
    SPORT_AND_FITNESS("Sport & Fitness"),
    PERFORMANCE_AND_VISUAL_ARTS("Performance & Visual Arts"),
    FOOD_AND_DRINK_EVENTS("Food & Drink Events"),
    EDUCATIONAL_AND_PROFESSIONAL("Educational & Professional"),
    CHARITY("Charity"),
    ACTIVISM_AND_SOCIAL_MOVEMENT("Activism & Social Movement"),
    OTHER("Other");

    private final String name;
}
