package com.find.event.repository.jpa;


import com.find.event.entity.ReviewEntity;
import com.find.event.entity.UserEventId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface ReviewJpaRepository extends JpaRepository<ReviewEntity, UserEventId> {
    @Modifying
    @Query("DELETE FROM ReviewEntity WHERE id = :id")
    int deleteReviewById(UserEventId id);
}
