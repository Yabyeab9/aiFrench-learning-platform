package com.aifrench.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "vocabulary")
@Getter
@Setter
public class Vocabulary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🇫🇷 French word
    @Column(nullable = false)
    private String frenchWord;

    // 🇬🇧 English meaning
    @Column(nullable = false)
    private String englishWord;

    // example sentence for fill-blank
    @Column(length = 1000)
    private String exampleSentence;

    // difficulty level (A1/A2/B1…)
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    // optional category (food, travel…)
    private String category;
}
