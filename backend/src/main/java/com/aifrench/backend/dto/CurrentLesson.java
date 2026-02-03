package com.aifrench.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor

public class CurrentLesson {
    private Long id;
    private String title;
    private int progress;
}

