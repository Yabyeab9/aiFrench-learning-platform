package com.aifrench.backend.service;

import com.aifrench.backend.domain.WordPerformance;
import com.aifrench.backend.repository.WordPerformanceRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class WordTrackingService {

    private final WordPerformanceRepository repo;

    @Transactional
    public void recordAnswer(
            Long userId,
            Long wordId,
            boolean correct
    ) {

        WordPerformance wp = repo.findAll().stream()
                .filter(x -> x.getUserId().equals(userId)
                        && x.getWordId().equals(wordId))
                .findFirst()
                .orElseGet(() -> {
                    WordPerformance w = new WordPerformance();
                    w.setUserId(userId);
                    w.setWordId(wordId);
                    return w;
                });

        if (correct) wp.setCorrectCount(wp.getCorrectCount() + 1);
        else wp.setWrongCount(wp.getWrongCount() + 1);

        int total = wp.getCorrectCount() + wp.getWrongCount();
        wp.setStrengthScore(total == 0 ? 0 :
                (double) wp.getCorrectCount() / total);

        wp.setLastSeen(LocalDateTime.now());

        repo.save(wp);
    }
}

