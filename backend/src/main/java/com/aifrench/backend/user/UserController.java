package com.aifrench.backend.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {


        UserDetails user = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(
                Map.of(
                        "email", user.getUsername(),
                        "roles", user.getAuthorities()
                )
        );
    }

}
