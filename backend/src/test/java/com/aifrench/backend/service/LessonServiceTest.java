package com.aifrench.backend.service;

import com.aifrench.backend.domain.LessonProgress;
import com.aifrench.backend.dto.LevelRoadmap;
import com.aifrench.backend.repository.LessonProgressRepository;
import com.aifrench.backend.repository.QuizRepository;
import com.aifrench.backend.repository.LessonResultRepository;
import com.aifrench.backend.repository.UserQuestionAttemptRepository;
import com.aifrench.backend.repository.XpRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class LessonServiceTest {

    @Test
    void buildRoadmap_usesProgressWhenAvailable() {
        QuizRepository quizRepo = Mockito.mock(QuizRepository.class);
        LessonProgressRepository progressRepo = Mockito.mock(LessonProgressRepository.class);
        LessonResultRepository lr = Mockito.mock(LessonResultRepository.class);
        UserQuestionAttemptRepository ur = Mockito.mock(UserQuestionAttemptRepository.class);
        XpRepository xp = Mockito.mock(XpRepository.class);
        EntityManager em = Mockito.mock(EntityManager.class);

        // user has 0 xp globally
        when(xp.totalXp(1L)).thenReturn(0L);

        // but has a LessonProgress for lesson 2
        LessonProgress p = new LessonProgress();
        p.setUserId(1L);
        // create a fake lesson reference with id 2
        com.aifrench.backend.domain.Lesson l = new com.aifrench.backend.domain.Lesson();
        l.setId(2L);
        p.setLesson(l);
        p.setEarnedXp(40);
        p.setCompleted(false);

        when(progressRepo.findByUserId(1L)).thenReturn(List.of(p));

        LessonService svc = new LessonService(quizRepo, progressRepo, lr, ur, xp, em);

        List<LevelRoadmap> roadmap = svc.buildRoadmap(1L);

        // level 2 should be unlocked due to explicit progress and show the userXp we set
        LevelRoadmap lvl2 = roadmap.get(1); // index 1 == level 2
        assertTrue(lvl2.isUnlocked());
        assertEquals(40, lvl2.getUserXp());
    }
}
