package com.aifrench.backend.dto;

import java.util.List;

public record DashboardResponse(
        UserSummary user,
        List<XpPoint> weeklyXp,
        LessonCard continueLesson,
        Double averageQuizScore,
        boolean isNewUser
) {}
