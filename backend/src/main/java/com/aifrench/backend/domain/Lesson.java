package com.aifrench.backend.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "lessons")
@Getter @Setter
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String difficulty;   // A1, A2, B1
//
//    private int orderIndex; // lesson order in course
//    private int requiredXp;
//    private int totalXp;
//
//    private boolean published;
}
