package com.aifrench.backend.dto;

public class XpPoint {

    private String day;
    private Long xp;

    public XpPoint(String day, Long xp) {
        this.day = day;
        this.xp = xp;
    }

    public String getDay() {
        return day;
    }

    public Long getXp() {
        return xp;
    }
}
