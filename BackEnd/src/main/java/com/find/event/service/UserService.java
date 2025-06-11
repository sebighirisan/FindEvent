package com.find.event.service;

import com.find.event.model.LoginRequestDTO;
import com.find.event.model.UserDTO;

public interface UserService {
    String signup(UserDTO user);

    String login(LoginRequestDTO loginRequest);
}
