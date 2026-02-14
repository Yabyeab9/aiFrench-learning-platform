package com.aifrench.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@Table(name = "quiz_attempts")
@Getter @Setter
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long lessonId;
    private int score;
    private int totalQuestions;
    @ManyToOne
    private Question question;

    private boolean correct;
    private LocalDateTime createdAt;
}
