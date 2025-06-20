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
    private static final Set<String> EVENT_ORDER_BY_FIELDS = Set.of("");

    private static final String EVENT_QUERY = """
            
            """;

    private static final String EVENT_COUNT_QUERY = """
            """;

    @PersistenceContext
    private EntityManager entityManager;

    public List<EventDTO> getEvents(Integer pageNo,
                                    Integer pageSize,
                                    String orderBy,
                                    String orderValue,
                                    Map<String, Object> filters) {
        String orderedQuery = composeQueryWithOrdering(
                EVENT_ORDER_BY_FIELDS, EVENT_QUERY, orderBy, orderValue
        );

        int firstResult = pageNo == -1 ? 0 : pageNo * pageSize;
        int maxResults = pageNo == -1 ? Integer.MAX_VALUE : pageSize;

        Query query = entityManager.createNativeQuery(orderedQuery, Tuple.class)
                .setFirstResult(firstResult)
                .setMaxResults(maxResults);

        filters.forEach(query::setParameter);

        return ((Stream<Tuple>) query.getResultStream())
                .map(EventTupleMapper::tupleToEventDto)
                .toList();
    }

    public Long getEventsCount(Map<String, Object> filters) {
        Query query = entityManager.createNativeQuery(EVENT_COUNT_QUERY, Long.class);

        filters.forEach(query::setParameter);

        return (Long) query.getSingleResult();
    }
}
