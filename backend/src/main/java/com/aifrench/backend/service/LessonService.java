package com.aifrench.backend.service;

import com.aifrench.backend.domain.LessonProgress;
import com.aifrench.backend.domain.LessonResult;
import com.aifrench.backend.domain.Question;
import com.aifrench.backend.domain.QuizAttempt;
import com.aifrench.backend.dto.LevelRoadmap;
import com.aifrench.backend.repository.LessonProgressRepository;
import com.aifrench.backend.repository.LessonResultRepository;
import com.aifrench.backend.repository.QuizRepository;
import com.aifrench.backend.repository.UserQuestionAttemptRepository;
import com.aifrench.backend.repository.XpRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final QuizRepository questionRepo;
    private final LessonProgressRepository progressRepo;
    private final LessonResultRepository lessonResultRepository
            ;
    private final UserQuestionAttemptRepository attemptRepo;
    private final XpRepository xpRepository;
    private final EntityManager em;

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
            Question q,
            String answer
    ) {
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
    public List<LevelRoadmap> buildRoadmap(Long userId) {

        List<LevelRoadmap> roadmap = new ArrayList<>();

        Long totalXpLong = xpRepository.totalXp(userId);
        int userXp = totalXpLong == null ? 0 : totalXpLong.intValue();

        // Load per-lesson progress for user to serve as authoritative source
        List<LessonProgress> progressList = progressRepo.findByUserId(userId);
        Map<Long, LessonProgress> progressMap = new HashMap<>();
        for (LessonProgress lp : progressList) {
            if (lp.getLesson() != null && lp.getLesson().getId() != null) {
                progressMap.put(lp.getLesson().getId(), lp);
            }
        }

        // Build roadmap for a fixed number of levels (50)
        for (int lvl = 1; lvl <= 50; lvl++) {

            int requiredXp = lvl * 100;

            // check progressMap for explicit progress
            LessonProgress lp = progressMap.get((long) lvl);
            boolean unlocked;
            boolean completed;
            int userXpForLevel;
            if (lp != null) {
                unlocked = true;
                completed = lp.isCompleted();
                userXpForLevel = Math.min(lp.getEarnedXp(), requiredXp);
            } else {
                // fallback to XP-based heuristics
                unlocked = userXp >= (lvl - 1) * 100;
                completed = userXp >= requiredXp;
                userXpForLevel = Math.min(userXp, requiredXp);
            }

            roadmap.add(new LevelRoadmap(
                    lvl,
                    unlocked,
                    completed,
                    requiredXp,
                    userXpForLevel
            ));
        }

        return roadmap;
    }
    public void unlockLevel(Long userId, int levelNumber) {
        // Create or update LessonProgress for the lesson corresponding to levelNumber
        LessonProgress progress = progressRepo.findByUserIdAndLessonId(userId, (long)levelNumber)
                .orElseGet(() -> {
                    LessonProgress p = new LessonProgress();
                    p.setUserId(userId);
                    // set a minimal XP to mark unlocked (0 xp but not completed)
                    p.setEarnedXp(0);
                    p.setCompleted(false);
                    p.setLastAccessedAt(LocalDateTime.now());
                    // associate a lesson reference by id to avoid loading full entity
                    p.setLesson(em.getReference(com.aifrench.backend.domain.Lesson.class, (long) levelNumber));
                    return p;
                });

        progress.setLastAccessedAt(LocalDateTime.now());
        // ensure a lesson reference exists
        if (progress.getLesson() == null) {
            progress.setLesson(em.getReference(com.aifrench.backend.domain.Lesson.class, (long) levelNumber));
        }
        progressRepo.save(progress);
    }

}
