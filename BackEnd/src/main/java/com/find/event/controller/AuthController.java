package com.find.event.controller;

import com.find.event.model.user.CreateUserDTO;
import com.find.event.model.user.LoginRequestDTO;
import com.find.event.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody CreateUserDTO createUserDTO) {
        return userService.signup(createUserDTO);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDTO loginRequest) {
        return userService.login(loginRequest);
    }
}
