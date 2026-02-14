package com.aifrench.backend.ai;

import com.aifrench.backend.dto.ChatMessage;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Component
public class HuggingFaceClient {

    private static final String API_URL = "https://router.huggingface.co/v1/chat/completions";
    private static final String MODEL = "google/gemma-3-27b-it";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${huggingface.api.key}")
    private String apiKey;

    public String chat(List<ChatMessage> messages) throws Exception {

        // Build request body
        Map<String, Object> body = Map.of(
                "model", MODEL,
                "messages", messages,
                "temperature", 0.6,
                "max_tokens", 500
        );

        // Build headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        // Send POST request
        ResponseEntity<String> response = restTemplate.postForEntity(API_URL, request, String.class);

        // Parse the JSON response
        JsonNode root = objectMapper.readTree(response.getBody());
        JsonNode contentNode = root.path("choices").get(0).path("message").path("content");

        String content = contentNode.asText();

        // Handle nested JSON inside content (Gemma sometimes returns this)
        if (content.trim().startsWith("{")) {
            JsonNode innerRoot = objectMapper.readTree(content);
            content = innerRoot.path("choices").get(0).path("message").path("content").asText();
        }

        return content;
    }
}
