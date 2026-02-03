package com.aifrench.backend.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "xp_log")
public class XpLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private int amount;

    private LocalDate date;

    // getters
    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public int getAmount() { return amount; }
    public LocalDate getDate() { return date; }
}
