package com.find.event.service;

import com.find.event.model.review.ReviewDTO;

public interface ReviewService {
    void addOrUpdateReview(Long eventId, ReviewDTO review);

    void deleteReviewByEventId(Long eventId);
}
