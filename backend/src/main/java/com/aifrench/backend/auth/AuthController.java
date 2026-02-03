package com.aifrench.backend.auth;

import com.aifrench.backend.domain.RefreshToken;
import com.aifrench.backend.repository.RefreshTokenRepository;
import com.aifrench.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.aifrench.backend.security.JwtUtil;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
private  final UserService userService;
    private final PasswordEncoder passwordEncoder;

private final RefreshTokenRepository refreshTokenRepository;
    public AuthController(
            AuthenticationManager authManager,
            JwtUtil jwtUtil, UserService userService, PasswordEncoder passwordEncoder, RefreshTokenRepository refreshTokenRepository
    ) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {
try{
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword() // Raw password
                )
        );

        String accessToken =
                jwtUtil.generateAccessToken(request.getEmail());

        String refreshToken =
                jwtUtil.generateRefreshToken(request.getEmail());

        try {
            Optional<RefreshToken> token = refreshTokenRepository.findByEmail(request.getEmail());
            token.ifPresent(refreshTokenRepository::delete);
        } catch (Exception e) {
            e.printStackTrace(); // this prints the full cause
        }
        RefreshToken rt = new RefreshToken();
        rt.setToken(refreshToken);
        rt.setEmail(request.getEmail());
        rt.setExpiryDate(
                Instant.now().plus(7, ChronoUnit.DAYS)
        );

        refreshTokenRepository.save(rt);

        return ResponseEntity.ok(
                Map.of(
                        "accessToken", accessToken,
                        "refreshToken", refreshToken
                )
        );}
catch (AuthenticationException e) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
            .body("Invalid email or password");
}
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            // 1️⃣ Call your existing service method
            userService.register(request);

            // 2️⃣ Generate JWT tokens immediately (like login)
            String accessToken = jwtUtil.generateAccessToken(request.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(request.getEmail());

            // 3️⃣ Save refresh token
            RefreshToken rt = new RefreshToken();
            rt.setEmail(request.getEmail());
            rt.setToken(refreshToken);
            rt.setExpiryDate(Instant.now().plus(7, ChronoUnit.DAYS));
            refreshTokenRepository.save(rt);

            // 4️⃣ Return response with tokens
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    Map.of(
                            "accessToken", accessToken,
                            "refreshToken", refreshToken,
                            "email", request.getEmail()
                    )
            );

        } catch (IllegalArgumentException e) {
            // Email already registered
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            // Catch all other errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(
            @RequestBody Map<String, String> request) {

        String refreshToken = request.get("refreshToken");

        if (!jwtUtil.isRefreshTokenValid(refreshToken)) {
            return ResponseEntity.status(401).build();
        }

        RefreshToken storedToken =
                refreshTokenRepository
                        .findByToken(refreshToken)
                        .orElseThrow(() ->
                                new RuntimeException("Invalid refresh token"));

        String email = jwtUtil.extractEmail(refreshToken);

        // 🔄 Rotate token
        refreshTokenRepository.delete(storedToken);

        String newAccessToken =
                jwtUtil.generateAccessToken(email);

        String newRefreshToken =
                jwtUtil.generateRefreshToken(email);

        RefreshToken newRT = new RefreshToken();
        newRT.setToken(newRefreshToken);
        newRT.setEmail(email);
        newRT.setExpiryDate(
                Instant.now().plus(7, ChronoUnit.DAYS)
        );

        refreshTokenRepository.save(newRT);

        return ResponseEntity.ok(
                Map.of(
                        "accessToken", newAccessToken,
                        "refreshToken", newRefreshToken
                )
        );
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @RequestBody Map<String, String> request) {

        String refreshToken = request.get("refreshToken");

        refreshTokenRepository
                .findByToken(refreshToken)
                .ifPresent(refreshTokenRepository::delete);

        return ResponseEntity.ok(
                Map.of("message", "Logged out successfully")
        );
    }



        @PostMapping("/chat")
        public ResponseEntity<?> chat(@RequestBody Map<String, String> request) {
            String userMessage = request.get("message");

            if (userMessage == null || userMessage.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Message cannot be empty"));
            }

            // For now: simple mock AI response
            String reply = "AI says: " + new StringBuilder(userMessage).reverse().toString();

            // TODO: Replace with actual AI logic (OpenAI API or your ML model)
            return ResponseEntity.ok(Map.of("reply", reply));
        }


}
