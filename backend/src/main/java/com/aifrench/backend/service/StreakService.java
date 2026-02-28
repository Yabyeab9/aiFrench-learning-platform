package com.aifrench.backend.service;

import com.aifrench.backend.domain.UserStreak;
import com.aifrench.backend.repository.UserStreakRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class StreakService {

    private final UserStreakRepository streakRepo;

    @Transactional
    public int updateStreak(Long userId) {

        LocalDate today = LocalDate.now();

        UserStreak streak = streakRepo.findById(userId)
                .orElseGet(() -> {
                    UserStreak s = new UserStreak();
                    s.setUserId(userId);
                    s.setCurrentStreak(0);
                    s.setLongestStreak(0);
                    return s;
                });

        if (streak.getLastActiveDate() == null) {
            streak.setCurrentStreak(1);
        } else {
            long diff = ChronoUnit.DAYS.between(
                    streak.getLastActiveDate(),
                    today
            );

            if (diff == 1) {
                streak.setCurrentStreak(streak.getCurrentStreak() + 1);
            } else if (diff > 1) {
                streak.setCurrentStreak(1);
            }
        }

        streak.setLastActiveDate(today);

        if (streak.getCurrentStreak() > streak.getLongestStreak()) {
            streak.setLongestStreak(streak.getCurrentStreak());
        }

        streakRepo.save(streak);

        return streak.getCurrentStreak();
    }
}
