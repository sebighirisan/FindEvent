package com.find.event.service.impl;

import com.find.event.entity.RoleEntity;
import com.find.event.entity.UserEntity;
import com.find.event.exception.ErrorCode;
import com.find.event.exception.FindEventBadRequestException;
import com.find.event.exception.FindEventConflictException;
import com.find.event.exception.FindEventNotFoundException;
import com.find.event.mapper.UserMapper;
import com.find.event.model.LoginRequestDTO;
import com.find.event.model.UserDTO;
import com.find.event.repository.RoleRepository;
import com.find.event.repository.UserRepository;
import com.find.event.service.JwtService;
import com.find.event.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.find.event.utils.RoleConstants.USER;
import static com.find.event.utils.ValidationUtils.validateLoginRequest;
import static com.find.event.utils.ValidationUtils.validateUserDTO;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public String signup(UserDTO user) {
        validateUserDTO(user);

        String username = user.getUsername();
        if (userRepository.existsByUsername(username)) {
            throw new FindEventConflictException(ErrorCode.USERNAME_ALREADY_TAKEN, username);
        }

        String email = user.getEmail();
        if (userRepository.existsByEmail(email)) {
            throw new FindEventConflictException(ErrorCode.EMAIL_ALREADY_TAKEN, email);
        }

        UserEntity newUserEntity = userMapper.userDTOToUserEntity(user);
        newUserEntity.setPassword(passwordEncoder.encode(user.getPassword()));

        RoleEntity userRole = roleRepository.findByName(USER)
                .orElseThrow(() -> new FindEventNotFoundException(ErrorCode.ROLE_NOT_FOUND, USER));
        newUserEntity.getRoles().add(userRole);

        userRepository.save(newUserEntity);

        return jwtService.generateToken(newUserEntity);
    }

    public String login(LoginRequestDTO loginRequest) {
        validateLoginRequest(loginRequest);

        String username = loginRequest.getUsername();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, loginRequest.getPassword())
            );
        } catch (BadCredentialsException ex) {
            throw new FindEventBadRequestException(ErrorCode.BAD_CREDENTIALS);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new FindEventBadRequestException(ErrorCode.LOGIN_ERROR);
        }

        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new FindEventNotFoundException(ErrorCode.USER_NOT_FOUND_BY_USERNAME_OR_EMAIL, username));

        return jwtService.generateToken(user);
    }
}
