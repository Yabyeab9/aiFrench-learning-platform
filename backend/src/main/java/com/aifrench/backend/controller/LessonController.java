package com.aifrench.backend.controller;

import com.aifrench.backend.common.ApiResponse;
import com.aifrench.backend.config.UserPrincipal;
import com.aifrench.backend.domain.LessonResult;
import com.aifrench.backend.domain.Question;
import com.aifrench.backend.dto.AnswerRequest;
import com.aifrench.backend.dto.LevelRoadmap;
import com.aifrench.backend.service.LessonService;
import com.aifrench.backend.service.QuestionGeneratorService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/lessons")
@RequiredArgsConstructor
public class LessonController {
    private final QuestionGeneratorService questionGeneratorService;
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
    @GetMapping("/level/{level}")
    public List<Question> getLevel(
            @PathVariable int level,
            @AuthenticationPrincipal UserPrincipal user,
            Authentication auth
    ) {
        Long userId = user.getId();

        return questionGeneratorService.generateLevelQuestions(level);
    }

    @GetMapping("/roadmap")
    public List<LevelRoadmap> getRoadmap(@AuthenticationPrincipal UserPrincipal user) {
        Long userId = user.getId();
        try {
            return lessonService.buildRoadmap(userId);
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @PostMapping("/{lessonId}/answer")
    public boolean answer(@AuthenticationPrincipal UserPrincipal user, @PathVariable Long lessonId, @RequestBody AnswerRequest req) {
        Long userId = user.getId();
        return lessonService.submitAnswer(userId, lessonId, req.getQuestion(), req.getAnswer());
    }

    @PostMapping("/level/{level}/unlock")
    public ApiResponse<Boolean> unlockLevel(@AuthenticationPrincipal UserPrincipal user, @PathVariable int level) {
        Long userId = user.getId();
        lessonService.unlockLevel(userId, level);
        return ApiResponse.success(true);
    }

}
