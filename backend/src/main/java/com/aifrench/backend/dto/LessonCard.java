package com.aifrench.backend.dto;

public record LessonCard(
        Long lessonId,
        String title,
        int progressPercent
) {}
