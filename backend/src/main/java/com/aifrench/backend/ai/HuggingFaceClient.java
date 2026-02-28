package com.aifrench.backend.ai;

import com.aifrench.backend.dto.ChatMessage;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.net.SocketTimeoutException;
import java.util.List;
import java.util.Map;

@Component
public class HuggingFaceClient {

    private static final String API_URL = "https://router.huggingface.co/v1/chat/completions";
    private static final String MODEL = "google/gemma-3-27b-it";

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${huggingface.api.key}")
    private String apiKey;

    private RestTemplate buildRestTemplate(int timeoutMs) {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(timeoutMs);
        factory.setReadTimeout(timeoutMs);
        return new RestTemplate(factory);
    }

    public String chat(List<ChatMessage> messages) throws Exception {
        RestTemplate restTemplate = buildRestTemplate(20_000); // 20s timeout

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

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(API_URL, request, String.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode root = objectMapper.readTree(response.getBody());
                JsonNode choice = root.path("choices");
                if (choice.isArray() && choice.size() > 0) {
                    JsonNode contentNode = choice.get(0).path("message").path("content");
                    String content = contentNode.asText();

                    // Handle nested JSON inside content (Gemma sometimes returns this)
                    if (content != null && content.trim().startsWith("{")) {
                        try {
                            JsonNode innerRoot = objectMapper.readTree(content);
                            JsonNode innerChoice = innerRoot.path("choices");
                            if (innerChoice.isArray() && innerChoice.size() > 0) {
                                content = innerChoice.get(0).path("message").path("content").asText();
                            }
                        } catch (Exception e) {
                            // If parsing fails, fall back to raw content
                        }
                    }

                    return content;
                }

                throw new RestClientException("No choices returned from HuggingFace model");
            } else {
                String bodyStr = response.getBody();
                throw new RestClientException("HuggingFace API error: " + response.getStatusCode() + " " + bodyStr);
            }
        } catch (RestClientException ex) {
            // Wrap and rethrow to allow the service to handle gracefully
            throw new Exception("AI provider request failed: " + ex.getMessage(), ex);
        } catch (Exception ex) {
            throw new Exception("Unexpected error calling AI provider: " + ex.getMessage(), ex);
        }
    }
}
