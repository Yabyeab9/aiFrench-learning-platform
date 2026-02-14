package com.aifrench.backend.repository;

import com.aifrench.backend.domain.Question;
import com.aifrench.backend.domain.QuizAttempt;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizRepository
        extends JpaRepository<Question, Long> {

    @Query("""
        SELECT q FROM Question q
        WHERE q.lesson.id = :lessonId
    """)
    List<Question> findUnanswered(Long lessonId, Long userId);
    @Query("""
   SELECT AVG(q.score)
   FROM QuizAttempt q
   WHERE q.userId = :userId
""")

    Double averageScore(@Param("userId") Long userId);
}
