package com.aifrench.backend.service;

import com.aifrench.backend.domain.User;
import com.aifrench.backend.dto.*;
import com.aifrench.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepo;
    private final XpRepository xpRepo;
    private final LessonProgressRepository progressRepo;
    private final QuizRepository quizRepo;
    private final LevelService levelService;

    public DashboardResponse getDashboard(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow();

        Long userId = user.getId();

        // 🔢 CORE METRICS
        int totalXp = 2;
        int level = levelService.calculateLevel(totalXp);
        int streak =1;
        String fluency = progressRepo.estimateFluency(userId);

        // 📈 XP CHART
        List<XpPoint> weeklyXp = xpRepo.weeklyXp(userId);

        // 🎓 LEARNING STATE
        LessonCard continueLesson =
                progressRepo.findCurrentLesson(userId);

        boolean isNewUser =
                progressRepo.countByUserId(userId) == 0;

        // 🧪 QUIZ METRICS
        Double avgQuizScore =
                quizRepo.averageScore(userId);

        return new DashboardResponse(
                new UserSummary(
                        user.getName(),
                        level,
                        totalXp,
                        streak,
                        fluency
                ),
                weeklyXp,
                continueLesson,
                avgQuizScore,
                isNewUser
        );
    }
}
