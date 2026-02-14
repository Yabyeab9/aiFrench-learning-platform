package com.aifrench.backend.repository;

import com.aifrench.backend.domain.Question;
import com.aifrench.backend.domain.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserQuestionAttemptRepository
        extends JpaRepository<QuizAttempt, Long> {

    boolean existsByUserIdAndQuestionId(Long userId, Long questionId);

    List<QuizAttempt> findByUserIdAndQuestionIdIn(
            Long userId,
            List<Long> questionIds
    );
}

