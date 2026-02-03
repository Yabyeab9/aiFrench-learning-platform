package com.aifrench.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSummary {
    private String name;
    private int level;
    private int xp;
    private int streak;
    private String fluency;
}
