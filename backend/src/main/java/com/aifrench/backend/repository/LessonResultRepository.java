package com.aifrench.backend.repository;

import com.aifrench.backend.domain.LessonProgress;
import com.aifrench.backend.domain.LessonResult;
import com.aifrench.backend.dto.LessonCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
public interface LessonResultRepository
        extends JpaRepository<LessonResult, Long> {

    Optional<LessonResult> findByUserIdAndLessonId(Long userId, Long lessonId);
}
