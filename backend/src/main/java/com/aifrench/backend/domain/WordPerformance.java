package com.aifrench.backend.domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "word_performance")
@Getter @Setter
public class WordPerformance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long wordId;

    private int correctCount;
    private int wrongCount;
    private double strengthScore; // 0 → weak, 1 → strong

    private LocalDateTime lastSeen;
}

