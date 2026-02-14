package com.aifrench.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @Email
    @NotBlank
    private String email;
    @NotBlank
    private String name;
    @NotBlank
    private String password;

    @NotBlank
    private String nativeLanguage;

    @NotBlank
    private String targetLanguage;

    @NotBlank
    private String level;
}
