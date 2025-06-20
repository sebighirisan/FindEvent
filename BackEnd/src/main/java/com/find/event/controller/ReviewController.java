package com.find.event.controller;

import com.find.event.model.review.ReviewDTO;
import com.find.event.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;

    @PutMapping("/event/{id}")
    public ResponseEntity<Void> createOrUpdateReview(@PathVariable("id") Long eventId,
                                                     @RequestBody ReviewDTO review) {
        reviewService.addOrUpdateReview(eventId, review);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<Void> deleteReviewByEventId(@PathVariable("id") Long eventId) {
        reviewService.deleteReviewByEventId(eventId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
