package com.aifrench.backend.repository;

import com.aifrench.backend.domain.Difficulty;
import com.aifrench.backend.domain.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabularyRepository
        extends JpaRepository<Vocabulary, Long> {
    List<Vocabulary> findTop20ByDifficulty(Difficulty difficulty);

    List<Vocabulary> findTop50ByDifficultyOrderByIdAsc(Difficulty difficulty);
    @Query(value = """
        SELECT *
        FROM vocabulary
        WHERE difficulty = :difficulty
        ORDER BY RANDOM()
    """, nativeQuery = true)
    List<Vocabulary> findRandomByDifficulty(
            @Param("difficulty") String difficulty,
            @Param("limit") int limit
    );
}
