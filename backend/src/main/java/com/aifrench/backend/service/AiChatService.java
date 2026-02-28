package com.aifrench.backend.service;

import com.aifrench.backend.dto.AiChatResponse;
import com.aifrench.backend.ai.HuggingFaceClient;

import com.aifrench.backend.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AiChatService {

    private final HuggingFaceClient openAiClient;

    // In-memory conversation per user (can be DB later)
    private final Map<String, List<ChatMessage>> memory = new HashMap<>();

    // Simple cooldown map (email -> lastCallTimestamp millis)
    private final Map<String, Long> lastCall = new HashMap<>();
    private final long COOLDOWN_MS = 800; // 800ms between calls per user

    // Short-term cache for AI responses: key -> {response, cachedAt}
    private final Map<String, CachedResponse> aiCache = new HashMap<>();
    private static class CachedResponse { String resp; long cachedAt; CachedResponse(String r,long t){resp=r;cachedAt=t;} }
    private final long AI_CACHE_TTL_MS = 30_000; // 30s

    private String buildSystemPrompt() {
        return String.join("\n", List.of(
                "You are a professional AI French tutor called 'Elshadi'.",
                "Be concise, encouraging, and didactic.",
                "Always correct grammar and offer improvements when the user writes in French.",
                "If the user writes in English, provide short French translations and examples.",
                "Prefer short dialogs and then a single expanded corrected example.",
                "Format corrections clearly using inline code for phrases and short bullet points.",
                "Do not hallucinate facts; if unsure, ask clarifying questions."
        ));
    }

    public AiChatResponse chat(String email, String userMessage) throws Exception {

        // Cooldown check
        long now = Instant.now().toEpochMilli();
        Long last = lastCall.get(email);
        if (last != null && now - last < COOLDOWN_MS) {
            return new AiChatResponse("Please slow down a bit — processing previous request.");
        }
        lastCall.put(email, now);

        memory.putIfAbsent(email, new ArrayList<>());

        List<ChatMessage> conversation = memory.get(email);

        // System prompt (tutor personality) - ensure it's first in conversation when empty
        if (conversation.isEmpty()) {
            conversation.add(new ChatMessage("system", buildSystemPrompt()));
        }

        conversation.add(new ChatMessage("user", userMessage));

        try {
            // Check cache
            String key = (email + "::" + Integer.toString(userMessage.hashCode()));
            CachedResponse cached = aiCache.get(key);
            long nowMs = Instant.now().toEpochMilli();
            if (cached != null && nowMs - cached.cachedAt < AI_CACHE_TTL_MS) {
                return new AiChatResponse(cached.resp);
            }

            String aiReply = openAiClient.chat(conversation);
            aiCache.put(key, new CachedResponse(aiReply, nowMs));
            conversation.add(new ChatMessage("assistant", aiReply));
            return new AiChatResponse(aiReply);
        } catch (Exception ex) {
            // Log and return a friendly fallback message
            ex.printStackTrace();
            return new AiChatResponse("Sorry, I couldn't reach the AI service right now. Please try again shortly.");
        }
    }
}
