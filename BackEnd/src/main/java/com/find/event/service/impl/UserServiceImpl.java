package com.find.event.service.impl;

import com.find.event.entity.RoleEntity;
import com.find.event.entity.UserEntity;
import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import com.find.event.exception.FindEventConflictException;
import com.find.event.exception.FindEventInternalServerError;
import com.find.event.exception.FindEventNotFoundException;
import com.find.event.mapper.mapstruct.UserMapper;
import com.find.event.model.user.LoginRequestDTO;
import com.find.event.model.user.CreateUserDTO;
import com.find.event.repository.jpa.RoleJpaRepository;
import com.find.event.repository.jpa.UserJpaRepository;
import com.find.event.service.JwtService;
import com.find.event.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.find.event.utils.RoleConstants.USER;
import static com.find.event.utils.ValidationUtils.validateLoginRequest;
import static com.find.event.utils.ValidationUtils.validateUserDTO;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserJpaRepository userJpaRepository;
    private final RoleJpaRepository roleJpaRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public String signup(CreateUserDTO user) {
        validateUserDTO(user);

        String username = user.getUsername();
        if (userJpaRepository.existsByUsername(username)) {
            throw new FindEventConflictException(ErrorCode.USERNAME_ALREADY_TAKEN, username);
        }

        String email = user.getEmail();
        if (userJpaRepository.existsByEmail(email)) {
            throw new FindEventConflictException(ErrorCode.EMAIL_ALREADY_TAKEN, email);
        }

        UserEntity newUserEntity = userMapper.userDTOToUserEntity(user);
        newUserEntity.setPassword(passwordEncoder.encode(user.getPassword()));

        RoleEntity userRole = roleJpaRepository.findByName(USER)
                .orElseThrow(() -> new FindEventNotFoundException(ErrorCode.ROLE_NOT_FOUND, USER));
        newUserEntity.getRoles().add(userRole);

        userJpaRepository.save(newUserEntity);

        return jwtService.generateToken(newUserEntity);
    }

    public String login(LoginRequestDTO loginRequest) {
        validateLoginRequest(loginRequest);

        String usernameOrEmail = loginRequest.getUsername();

        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(usernameOrEmail, loginRequest.getPassword())
            );

            return jwtService.generateToken((UserEntity) auth.getPrincipal());
        } catch (BadCredentialsException ex) {
            throw new FindEventBadRequestException(ErrorCode.BAD_CREDENTIALS);
        } catch (Exception e) {
            throw new FindEventInternalServerError(ErrorCode.LOGIN_ERROR, e);
        }
    }
}
