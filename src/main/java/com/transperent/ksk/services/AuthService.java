package com.transperent.ksk.services;

import com.transperent.ksk.dtos.JwtRequest;
import com.transperent.ksk.dtos.JwtResponse;
import com.transperent.ksk.dtos.RegistrationUserDto;
import com.transperent.ksk.dtos.UserDto;
import com.transperent.ksk.entity.User;
import com.transperent.ksk.exceptions.AppError;
import com.transperent.ksk.utils.JwtTokenUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class AuthService {
    private final UserService userService;
    private final JwtTokenUtils jwtToken;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(UserService userService, JwtTokenUtils jwtToken, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtToken = jwtToken;
        this.authenticationManager = authenticationManager;
    }

    public ResponseEntity<?> createAuthToken(@RequestBody JwtRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.value(), "Не правильный логин или пароль"), HttpStatus.UNAUTHORIZED);
        }

        UserDetails userDetails = userService.loadUserByUsername(authRequest.getUsername());
        String token = jwtToken.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    public ResponseEntity<?> createNewUser(@RequestBody RegistrationUserDto registrationUserDto) {
        if (userService.findByUsername(registrationUserDto.getUsername()).isPresent()) {
            return new ResponseEntity<>(new AppError(HttpStatus.BAD_REQUEST.value(), "Пользователь уже существует"), HttpStatus.BAD_REQUEST);
        }

        User user = userService.createNewUser(registrationUserDto);
        return ResponseEntity.ok(new UserDto(user.getId(), user.getUsername(), user.getName(), user.getSurname(), user.getEmail(), user.getPassword()));
    }
}
