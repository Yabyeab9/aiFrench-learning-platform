package com.aifrench.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "user_streaks")
@Getter
@Setter
public class UserStreak {

    @Id
    private Long userId;

    private int currentStreak;
    private int longestStreak;

    private LocalDate lastActiveDate;
}

