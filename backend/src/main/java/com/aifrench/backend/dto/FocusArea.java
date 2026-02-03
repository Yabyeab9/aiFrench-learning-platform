package com.aifrench.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FocusArea {
    private String label;
    private String status; // weak | strong
}

