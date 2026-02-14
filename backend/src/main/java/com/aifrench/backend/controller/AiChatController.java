package com.aifrench.backend.controller;


import com.aifrench.backend.dto.AiChatRequest;
import com.aifrench.backend.dto.AiChatResponse;
import com.aifrench.backend.service.AiChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiChatController {

    private final AiChatService aiChatService;


}
