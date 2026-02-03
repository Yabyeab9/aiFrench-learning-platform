package com.aifrench.backend.service;

import org.springframework.stereotype.Service;

@Service
public class LevelService {

    public int calculateLevel(int totalXp) {
        if (totalXp < 500) return 1;
        if (totalXp < 1000) return 2;
        if (totalXp < 2000) return 3;
        if (totalXp < 3500) return 4;
        return 5;
    }
}
