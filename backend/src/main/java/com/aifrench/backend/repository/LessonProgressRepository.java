package com.aifrench.backend.repository;

import com.aifrench.backend.domain.LessonProgress;
import com.aifrench.backend.dto.LessonCard;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface LessonProgressRepository
        extends JpaRepository<LessonProgress, Long> {

    long countByUserId(Long userId);

    @Query("""
        SELECT new com.aifrench.backend.dto.LessonCard(
            lp.lesson.id,
            lp.lesson.title,
            lp.progressPercent
        )
        FROM LessonProgress lp
        WHERE lp.userId = :userId
        ORDER BY lp.lastAccessedAt DESC
        LIMIT 1
    """)
    LessonCard findCurrentLesson(@Param("userId") Long userId);

    @Query("""
        SELECT CASE
            WHEN AVG(lp.progressPercent) < 40 THEN 'A1'
            WHEN AVG(lp.progressPercent) < 70 THEN 'A2'
            ELSE 'B1'
        END
        FROM LessonProgress lp
        WHERE lp.userId = :userId
    """)
    String estimateFluency(@Param("userId") Long userId);
}
