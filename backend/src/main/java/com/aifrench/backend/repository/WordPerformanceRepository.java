package com.aifrench.backend.repository;

import com.aifrench.backend.domain.WordPerformance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface WordPerformanceRepository
        extends JpaRepository<WordPerformance, Long> {

    @Query("""
        SELECT w
        FROM WordPerformance w
        WHERE w.userId = :userId
        ORDER BY w.strengthScore ASC
    """)
    List<WordPerformance> findWeakWords(Long userId);
}

