package com.find.event.service;

import com.find.event.model.user.CreateUserDTO;
import com.find.event.model.user.LoginRequestDTO;

public interface UserService {

    /**
     * Registers a new user based on the provided {@link CreateUserDTO} data and returns a JWT upon successful signup.
     *
     * @param user the data transfer object containing user signup information
     * @return a JWT token representing the newly registered user
     */
    String signup(CreateUserDTO user);

    /**
     * Authenticates the user based on the provided {@link LoginRequestDTO} credentials and returns a JWT upon successful login.
     *
     * @param loginRequest the data transfer object containing login credentials (e.g., username and password)
     * @return a JWT token if authentication is successful
     */
    String login(LoginRequestDTO loginRequest);
}
