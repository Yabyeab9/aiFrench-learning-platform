package com.aifrench.backend.repository;

import com.aifrench.backend.domain.UserStreak;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStreakRepository
        extends JpaRepository<UserStreak, Long> {
}
