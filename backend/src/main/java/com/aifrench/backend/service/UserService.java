package com.aifrench.backend.service;

import com.aifrench.backend.domain.User;
import com.aifrench.backend.auth.RegisterRequest;
import com.aifrench.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword())) // 🔐 HASHED
                .nativeLanguage(request.getNativeLanguage())
                .targetLanguage(request.getTargetLanguage())
                .level(request.getLevel())
                .build();

        userRepository.save(user);
    }
}
