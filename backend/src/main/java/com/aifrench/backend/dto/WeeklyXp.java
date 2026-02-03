package com.aifrench.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class WeeklyXp {
    private String day;
    private int xp;
}


