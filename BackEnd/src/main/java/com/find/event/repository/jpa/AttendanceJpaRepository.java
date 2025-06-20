package com.find.event.repository.jpa;

import com.find.event.entity.AttendanceEntity;
import com.find.event.entity.UserEventId;
import com.find.event.enums.AttendanceStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceJpaRepository extends JpaRepository<AttendanceEntity, UserEventId> {
    boolean existsByIdAndAttendanceStatus(UserEventId id, AttendanceStatusEnum attendanceStatus);
}
