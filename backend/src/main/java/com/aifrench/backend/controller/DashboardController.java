package com.aifrench.backend.controller;

import com.aifrench.backend.dto.DashboardResponse;
import com.aifrench.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")

public class DashboardController {

    private final DashboardService dashboardService;
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }
    @GetMapping
    public DashboardResponse getDashboard(
            @AuthenticationPrincipal UserDetails user
    ) {
        return dashboardService.getDashboard(user.getUsername());
    }
}
