package com.aifrench.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class AnswerRequest {
    private Long userId;
    private Long lessonId;
    private Long questionId;
    private String answer;
}

