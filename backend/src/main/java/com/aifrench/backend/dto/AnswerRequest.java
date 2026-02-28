package com.aifrench.backend.dto;

import com.aifrench.backend.domain.Question;
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
    private Question question;
}

