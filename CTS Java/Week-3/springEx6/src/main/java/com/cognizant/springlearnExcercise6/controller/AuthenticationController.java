package com.cognizant.springlearnExcercise6.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @GetMapping("/authenticate")
    public String authenticate() {

        return "{\"token\":\"sample-jwt-token\"}";
    }
}
