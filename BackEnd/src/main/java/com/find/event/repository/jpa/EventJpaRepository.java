package com.find.event.repository.jpa;

import com.find.event.entity.EventEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
    List<EventEntity> findTrendingEvents();

    @Query(value = """
            SELECT e.* FROM events e
            JOIN users u ON e.publisher_id = u.id
            JOIN event_status es ON e.id = es.event_id
            JOIN locations l ON e.id = l.event_id
            WHERE
            (
              CAST(:name AS VARCHAR) IS NULL
              OR LOWER(e.name) LIKE LOWER(CONCAT('%', CAST(:name AS VARCHAR),'%'))
            ) AND
            (
              CAST(:proximity AS INTEGER) IS NULL
              OR CAST(:latitude AS NUMERIC) IS NULL
              OR CAST(:longitude AS NUMERIC) IS NULL
              OR ST_DWithin(
                l.coordinates,
                ST_MakePoint(CAST(:longitude AS NUMERIC), CAST(:latitude AS NUMERIC))::geography,
                CAST(:proximity AS INTEGER)
              )
            ) AND e.start_date > NOW()
            ORDER BY e.start_date ASC
            """, nativeQuery = true)
    List<EventEntity> findUpcomingEvents(@Param("name") String name,
                                         @Param("longitude") Double longitude,
                                         @Param("latitude") Double latitude,
                                         @Param("proximity") Long proximity);

    @Query("""
           SELECT DISTINCT e FROM EventEntity e
           LEFT JOIN FETCH e.publisher p
           LEFT JOIN FETCH e.eventStatus es
           JOIN e.eventAttendances ea
           JOIN ea.user u
           WHERE u.id = :userId AND ea.attendanceStatus = 'GOING'
           """)
    List<EventEntity> findGoingEvents(@Param("userId") Long userId);

    @Query("""
           SELECT DISTINCT e FROM EventEntity e
           LEFT JOIN FETCH e.publisher p
           LEFT JOIN FETCH e.eventStatus es
           JOIN e.eventAttendances ea
           JOIN ea.user u
           WHERE u.id = :userId AND ea.attendanceStatus = 'INTERESTED'
           """)
    List<EventEntity> findInterestedEvents(@Param("userId") Long userId);

    @Query("""
           SELECT DISTINCT e FROM EventEntity e
           LEFT JOIN FETCH e.publisher p
           LEFT JOIN FETCH e.eventStatus es
           WHERE es.status = 'APPROVED' AND e.startDate > CURRENT_TIMESTAMP
           ORDER BY e.startDate
           """)
    List<EventEntity> findUpcomingEvents(Pageable pageable);
}
