package com.aifrench.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Entity
@Table(name = "lesson_results")
@Setter
public class LessonResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
@Transient
private boolean correct;
    private Long userId;
    private Long lessonId;

    private int totalScore;

    private boolean completed;

    private LocalDateTime completedAt;
}
