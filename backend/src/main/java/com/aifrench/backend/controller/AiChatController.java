package com.aifrench.backend.controller;


import com.aifrench.backend.dto.AiChatRequest;
import com.aifrench.backend.dto.AiChatResponse;
import com.aifrench.backend.service.AiChatService;
import com.aifrench.backend.config.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiChatController {

    private final AiChatService aiChatService;

    @PostMapping("/chat")
    public AiChatResponse chat(@AuthenticationPrincipal UserPrincipal user, @RequestBody AiChatRequest req) throws Exception {
        String email = user != null ? user.getEmail() : "anonymous";
        return aiChatService.chat(email, req.message());
    }

}
