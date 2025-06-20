package com.find.event.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "reviews")
public class ReviewEntity {

    @EmbeddedId
    private UserEventId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("eventId")
    @JoinColumn(name = "event_id", nullable = false)
    private EventEntity event;

    @Min(1)
    @Max(5)
    @NotNull
    @Column(name = "rating", nullable = false)
    private Integer rating;

    @Column(name = "message")
    private String message;

    public ReviewEntity(UserEntity user, EventEntity event) {
        this.user = user;
        this.event = event;
        this.id = new UserEventId(user.getId(), event.getId());
    }
}