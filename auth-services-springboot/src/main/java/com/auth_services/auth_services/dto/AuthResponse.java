package com.auth_services.auth_services.dto;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor


public class AuthResponse {

    private String token;
    private String username;
    private String role;
    
}
