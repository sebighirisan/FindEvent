package com.find.event.service.impl;

import com.find.event.entity.EventEntity;
import com.find.event.entity.ReviewEntity;
import com.find.event.entity.UserEntity;
import com.find.event.entity.UserEventId;
import com.find.event.enums.AttendanceStatusEnum;
import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import com.find.event.exception.FindEventNotFoundException;
import com.find.event.model.review.ReviewDTO;
import com.find.event.repository.jpa.AttendanceJpaRepository;
import com.find.event.repository.jpa.EventJpaRepository;
import com.find.event.repository.jpa.ReviewJpaRepository;
import com.find.event.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Objects;

import static com.find.event.utils.JwtUtils.getAuthenticatedUser;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewJpaRepository reviewJpaRepository;
    private final EventJpaRepository eventJpaRepository;
    private final AttendanceJpaRepository attendanceJpaRepository;

    @Override
    public void addOrUpdateReview(Long eventId, ReviewDTO review) {
        UserEntity user = getAuthenticatedUser();
        EventEntity event = eventJpaRepository.findById(eventId)
                .orElseThrow(() -> new FindEventNotFoundException(ErrorCode.EVENT_NOT_FOUND, eventId));

        if (LocalDateTime.now().isBefore(Objects.requireNonNullElse(event.getEndDate(), event.getStartDate()))) {
            throw new FindEventBadRequestException(ErrorCode.NOT_FINISHED_EVENT, eventId);
        }

        UserEventId userEventId = new UserEventId(user.getId(), eventId);
        if (!attendanceJpaRepository.existsByIdAndAttendanceStatus(userEventId, AttendanceStatusEnum.GOING)) {
            throw new FindEventBadRequestException(ErrorCode.UNATTENDED_EVENT, eventId);
        }

        ReviewEntity reviewEntity = reviewJpaRepository.findById(userEventId)
                .orElseGet(() -> new ReviewEntity(user, event));

        reviewEntity.setRating(review.getRating());
        reviewEntity.setMessage(review.getMessage());

        reviewJpaRepository.save(reviewEntity);
    }

    @Transactional
    @Override
    public void deleteReviewByEventId(Long eventId) {
        UserEntity user = getAuthenticatedUser();

        if (!eventJpaRepository.existsById(eventId)) {
            throw new FindEventNotFoundException(ErrorCode.EVENT_NOT_FOUND, eventId);
        }

        if (reviewJpaRepository.deleteReviewById(new UserEventId(user.getId(), eventId)) == 0) {
            throw new FindEventNotFoundException(ErrorCode.REVIEW_NOT_FOUND, eventId);
        }
    }
}
