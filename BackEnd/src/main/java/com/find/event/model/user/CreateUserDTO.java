package com.find.event.model.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserDTO {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
}
