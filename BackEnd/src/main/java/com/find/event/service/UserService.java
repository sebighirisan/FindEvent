package com.find.event.service;

import com.find.event.model.user.CreateUserDTO;
import com.find.event.model.user.LoginRequestDTO;

public interface UserService {
    String signup(CreateUserDTO user);

    String login(LoginRequestDTO loginRequest);
}
