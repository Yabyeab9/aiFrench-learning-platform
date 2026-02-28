package com.aifrench.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LevelRoadmap {

    private int level;
    private boolean unlocked;
    private boolean completed;
    private int xpRequired;
    private int userXp;
}

