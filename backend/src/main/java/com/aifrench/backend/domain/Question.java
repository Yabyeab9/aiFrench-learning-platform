package com.aifrench.backend.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "questions")
@Getter
@Setter
public class Question {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Lesson lesson;

    private String type; // mcq, translate, listen

    private String question;

    @ElementCollection
    private List<String> options;

    private String correctAnswer;

    private int xp; // XP gained if correct

    private Difficulty difficulty;
}

