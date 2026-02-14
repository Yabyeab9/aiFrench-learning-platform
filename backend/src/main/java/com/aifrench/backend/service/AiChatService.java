package com.aifrench.backend.service;

import com.aifrench.backend.dto.AiChatResponse;
import com.aifrench.backend.ai.HuggingFaceClient;

import com.aifrench.backend.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AiChatService {

    private final HuggingFaceClient openAiClient;

    // In-memory conversation per user (can be DB later)
    private final Map<String, List<ChatMessage>> memory = new HashMap<>();

    public AiChatResponse chat(String email, String userMessage) throws Exception {

        memory.putIfAbsent(email, new ArrayList<>());

        List<ChatMessage> conversation = memory.get(email);

        // System prompt (tutor personality)
        if (conversation.isEmpty()) {
            conversation.add(new ChatMessage(
                    "system",
                    """
                    You are a professional AI French tutor.
                    Rules:
                    - Explain clearly and simply
                    - Correct mistakes gently
                    - Use examples
                    - Encourage the learner
                    - If user writes English, teach French
                    - If user writes French, correct & improve
                    """
            ));
        }

        conversation.add(new ChatMessage("user", userMessage));

        String aiReply = openAiClient.chat(conversation);

        conversation.add(new ChatMessage("assistant", aiReply));

        return new AiChatResponse(aiReply);
    }
}
