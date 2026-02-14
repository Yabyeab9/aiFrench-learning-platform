package com.aifrench.backend.service;

import com.aifrench.backend.domain.LessonProgress;
import com.aifrench.backend.domain.LessonResult;
import com.aifrench.backend.domain.Question;
import com.aifrench.backend.domain.QuizAttempt;
import com.aifrench.backend.repository.LessonProgressRepository;
import com.aifrench.backend.repository.LessonResultRepository;
import com.aifrench.backend.repository.QuizRepository;
import com.aifrench.backend.repository.UserQuestionAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final QuizRepository questionRepo;
        private final LessonProgressRepository progressRepo;
        private final LessonResultRepository lessonResultRepository
                ;
    private final UserQuestionAttemptRepository attemptRepo;
      public Question getNextQuestion(Long userId, Long lessonId) {

        List<Question> remaining =
                questionRepo.findUnanswered(lessonId, userId);

        if (remaining.isEmpty()) return null;

        Collections.shuffle(remaining);
        return remaining.get(0);
    }

    public boolean submitAnswer(
            Long userId,
            Long lessonId,
            Long questionId,
            String answer
    ) {
        Question q = questionRepo.findById(questionId)
                .orElseThrow(()->new  IllegalArgumentException("Question Not Found"));

        boolean correct = q.getCorrectAnswer().equalsIgnoreCase(answer);

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUserId(userId);
        attempt.setLessonId(lessonId);
        attempt.setQuestion(q);
        attempt.setCreatedAt(LocalDateTime.now());
        attempt.setCorrect(correct);
        attemptRepo.save(attempt);

        LessonProgress progress = progressRepo.findByUserIdAndLessonId(userId, lessonId)
                .orElseGet(() -> {
                    LessonProgress p = new LessonProgress();
                    p.setUserId(userId);
                    p.setLesson(q.getLesson());
                    p.setEarnedXp(q.getXp());
                    p.setLastAccessedAt(LocalDateTime.now());
                    return p;
                });


        if (correct) {
            progress.setEarnedXp(progress.getEarnedXp() + q.getXp());
        }

        if (progress.getEarnedXp() >= 10) {
            progress.setCompleted(true);
        }

        progressRepo.save(progress);

        LessonResult result = new LessonResult();
        result.setUserId(userId);
        result.setLessonId(lessonId);
        result.setTotalScore(progress.getEarnedXp());
        result.setCompleted(progress.isCompleted());

        if (progress.isCompleted()) {
            result.setCompletedAt(LocalDateTime.now());
        }

        lessonResultRepository.save(result);

        return correct;
    }
    public List<Question> getQuestions(Long userId, Long lessonId) {
        // Query the repository for all questions in this lesson
       return questionRepo.findUnanswered(lessonId, userId);
    }

}
