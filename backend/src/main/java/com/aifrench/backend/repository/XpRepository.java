package com.aifrench.backend.repository;

import com.aifrench.backend.domain.XpLog;
import com.aifrench.backend.dto.XpPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface XpRepository extends JpaRepository<XpLog, Long> {

        @Query(value = """
    SELECT DAYNAME(x.date) AS day, SUM(x.amount) AS total
    FROM xp_log x
    WHERE x.user_id = :userId
    GROUP BY DAYNAME(x.date)
    ORDER BY DAYNAME(x.date)
""", nativeQuery = true)
        List<XpPoint> weeklyXp(@Param("userId") Long userId);

}
