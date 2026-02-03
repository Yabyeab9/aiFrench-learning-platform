package com.aifrench.backend.repository;

import com.aifrench.backend.domain.QuizAttempt;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface QuizRepository
        extends JpaRepository<QuizAttempt, Long> {

    @Query("""
        SELECT AVG(q.score)
        FROM QuizAttempt q
        WHERE q.userId = :userId
    """)
    Double averageScore(@Param("userId") Long userId);
}
