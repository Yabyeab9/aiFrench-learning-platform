package com.aifrench.backend.controller;

import com.aifrench.backend.dto.RegisterRequest;
import com.aifrench.backend.repository.UserRepository;
import com.aifrench.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.aifrench.backend.dto.LoginRequest;
import com.aifrench.backend.dto.LoginResponse;
import com.aifrench.backend.security.JwtUtil;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@Valid @RequestBody RegisterRequest request) {
        userService.register(request);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        var userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        var user = userOpt.get();

        // Compare raw password with encoded password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        // Generate JWT
        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(new LoginResponse(token));
    }

}
