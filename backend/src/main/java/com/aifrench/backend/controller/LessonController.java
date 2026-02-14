package com.aifrench.backend.controller;

import com.aifrench.backend.config.UserPrincipal;
import com.aifrench.backend.domain.LessonResult;
import com.aifrench.backend.domain.Question;
import com.aifrench.backend.dto.AnswerRequest;
import com.aifrench.backend.service.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @GetMapping("/{lessonId}/next")
    public Question getNext(@AuthenticationPrincipal UserPrincipal user, @PathVariable Long lessonId) {
        Long userId = user.getId();
        return lessonService.getNextQuestion(userId, lessonId);
    }

    @GetMapping("/{lessonId}/questions")
    public List<Question> getQuestions(@AuthenticationPrincipal UserPrincipal user, @PathVariable Long lessonId) {
        Long userId = user.getId();
        return lessonService.getQuestions(userId, lessonId); // <-- fetch all questions
    }


    @PostMapping("/{lessonId}/answer")
    public boolean answer(@AuthenticationPrincipal UserPrincipal user, @PathVariable Long lessonId, @RequestBody AnswerRequest req) {
        Long userId = user.getId();
        return lessonService.submitAnswer(userId, lessonId, req.getQuestionId(), req.getAnswer());
    }
}

