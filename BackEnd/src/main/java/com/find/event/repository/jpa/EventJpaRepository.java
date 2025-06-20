package com.find.event.repository.jpa;

import com.find.event.entity.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EventJpaRepository extends JpaRepository<EventEntity, Long> {
    @Query("SELECT e FROM EventEntity e " +
           "JOIN FETCH e.publisher " +
           "JOIN FETCH e.eventStatus " +
           "WHERE e.id = :eventId")
    Optional<EventEntity> findByIdWithPublisher(Long eventId);
}
