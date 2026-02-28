package com.aifrench.backend.service;

import com.aifrench.backend.domain.Difficulty;
import com.aifrench.backend.domain.Question;
import com.aifrench.backend.repository.QuizRepository;
import com.aifrench.backend.repository.UserQuestionAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdaptiveLearningService {

    private final QuizRepository quizRepo;

    public Difficulty resolveDifficulty(Long userId) {

        Double avg = quizRepo.averageScore(userId);

        if (avg == null) return Difficulty.A1;

        if (avg < 50) return Difficulty.A1;
        if (avg < 80) return Difficulty.MEDIUM;

        return Difficulty.HARD;
    }
//    public List<Question> getSmartQuestions(Long userId, Long lessonId) {
//
//        Difficulty diff = resolveDifficulty(userId);
//
//        return questionRepo.findByLessonIdAndDifficulty(
//                lessonId,
//                diff
//        );
//    }

}

