package com.find.event.repository.nativequeries;

import com.find.event.mapper.tuple.EventTupleMapper;
import com.find.event.model.event.EventDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.Tuple;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Stream;

import static com.find.event.utils.QueryUtils.composeQueryWithOrdering;

@Repository
public class EventRepository {
    private static final Set<String> EVENT_ORDER_BY_FIELDS = Set.of("startDate", "endDate", "type", "name", "createdAt", "updatedAt");

    private static final String WHERE_CLAUSE = """
            WHERE
            (
              CAST(:name AS VARCHAR) IS NULL
              OR LOWER(e.name) LIKE LOWER(CONCAT('%', CAST(:name AS VARCHAR),'%'))
            ) AND
            (
              CAST(:status AS VARCHAR) IS NULL
              OR es.status::varchar = CAST(:status AS VARCHAR)
            ) AND
            (
              CAST(:startDate AS DATE) IS NULL
              OR DATE(e.start_date) >= CAST(:startDate AS DATE)
            ) AND
            (
              CAST(:endDate AS DATE) IS NULL
              OR (e.end_date IS NULL AND DATE(e.start_date) <= CAST(:endDate AS DATE))
              OR DATE(e.end_date) <= CAST(:endDate AS DATE)
            ) AND
            (
              CAST(:categories AS VARCHAR[]) IS NULL
              OR e.type::varchar = ANY(CAST(:categories AS VARCHAR[]))
            ) AND
            (
              CAST(:publisherId AS INTEGER) IS NULL
              OR u.id = CAST(:publisherId AS INTEGER)
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
            )
            """;

    private static final String EVENT_QUERY = """
            SELECT
                e.id AS id,
                e.name AS name,
                e.start_date AS startDate,
                e.end_date AS endDate,
                e.description AS description,
                e.type::varchar AS type,
                e.hyperlink AS hyperlink,
                e.splash_image AS splashImage,
                e.created_at AS createdAt,
                e.updated_at AS updatedAt,
                u.id AS publisherId,
                u.username AS publisherUsername,
                es.status::varchar AS status,
                l.name AS locationName,
                l.coordinates AS coordinates
            FROM events e
            JOIN users u ON e.publisher_id = u.id
            JOIN event_status es ON e.id = es.event_id
            JOIN locations l ON e.id = l.event_id
            """ + WHERE_CLAUSE;

    private static final String EVENT_COUNT_QUERY = """
            SELECT COUNT(*) FROM events e
            JOIN users u ON e.publisher_id = u.id
            JOIN event_status es ON e.id = es.event_id
            JOIN locations l ON e.id = l.event_id
            """ + WHERE_CLAUSE;

    @PersistenceContext
    private EntityManager entityManager;

    public List<EventDTO> getEvents(String orderBy,
                                    String orderValue,
                                    Map<String, Object> filters) {
        String orderedQuery = composeQueryWithOrdering(
                EVENT_ORDER_BY_FIELDS, EVENT_QUERY, orderBy, orderValue
        );

        int firstResult = 0;
        int maxResults = Integer.MAX_VALUE;

        Query query = entityManager.createNativeQuery(orderedQuery, Tuple.class)
                .setFirstResult(firstResult)
                .setMaxResults(maxResults);

        filters.forEach(query::setParameter);

        return ((Stream<Tuple>) query.getResultStream())
                .map(EventTupleMapper::tupleToEventDto)
                .toList();
    }
}
