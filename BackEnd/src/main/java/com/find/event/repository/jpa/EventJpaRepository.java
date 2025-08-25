package com.find.event.repository.jpa;

import com.find.event.entity.EventEntity;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EventJpaRepository extends JpaRepository<EventEntity, Long> {
    @Query("SELECT e FROM EventEntity e " +
           "JOIN FETCH e.publisher " +
           "JOIN FETCH e.eventStatus " +
           "WHERE e.id = :eventId")
    Optional<EventEntity> findByIdWithPublisher(Long eventId);

    @Query(value = """
            SELECT e.*
            FROM events e
            JOIN attendances a ON e.id = a.event_id
            JOIN event_status es ON es.event_id = e.id
            JOIN users u ON u.id = e.publisher_id
            WHERE (a.attendance_status = 'INTERESTED' OR a.attendance_status = 'GOING')
              AND es.status = 'APPROVED'
              AND e.start_date > NOW()
            GROUP BY e.id, es.event_id, u.id
            ORDER BY COUNT(a.event_id) DESC
           """, nativeQuery = true)
    Page<EventEntity> findTrendingEvents(Pageable pageable);

    @Query("""
           SELECT DISTINCT e FROM EventEntity e
           LEFT JOIN FETCH e.publisher p
           LEFT JOIN FETCH e.eventStatus es
           JOIN e.eventAttendances ea
           JOIN ea.user u
           WHERE u.id = :userId AND ea.attendanceStatus = 'GOING'
           """)
    Page<EventEntity> findGoingEvents(@Param("userId") Long userId, Pageable pageable);

    @Query("""
           SELECT DISTINCT e FROM EventEntity e
           LEFT JOIN FETCH e.publisher p
           LEFT JOIN FETCH e.eventStatus es
           JOIN e.eventAttendances ea
           JOIN ea.user u
           WHERE u.id = :userId AND ea.attendanceStatus = 'INTERESTED'
           """)
    Page<EventEntity> findInterestedEvents(@Param("userId") Long userId, Pageable pageable);

    @Query("""
           SELECT DISTINCT e FROM EventEntity e
           LEFT JOIN FETCH e.publisher p
           LEFT JOIN FETCH e.eventStatus es
           WHERE es.status = 'APPROVED' AND e.startDate > CURRENT_TIMESTAMP
           ORDER BY e.startDate
           """)
    List<EventEntity> findUpcomingEvents(Pageable pageable);
}
