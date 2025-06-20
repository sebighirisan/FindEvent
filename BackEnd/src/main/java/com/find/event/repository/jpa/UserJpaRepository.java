package com.find.event.repository.jpa;

import com.find.event.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserJpaRepository extends JpaRepository<UserEntity, Long> {
    @Query("SELECT user FROM UserEntity user " +
           "LEFT JOIN FETCH user.roles " +
           "WHERE user.username = :username or user.email = :username")
    Optional<UserEntity> findByUsernameOrEmail(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
