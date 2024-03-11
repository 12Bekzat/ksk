package com.transperent.ksk.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.transperent.ksk.dtos.HouseDto;
import com.transperent.ksk.dtos.JwtRequest;
import com.transperent.ksk.entity.User;
import com.transperent.ksk.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/manage")
public class AdminController {
    private final ObjectMapper objectMapper;
    private final UserService userService;

    @PostMapping("/add/house")
    public ResponseEntity<?> addHouse(@RequestBody HouseDto houseDto) {
        return ResponseEntity.ok("dasd");
    }

    @GetMapping("/users")
    public String getUsers() {
        List<User> allUsers = userService.getAllUsers();
        String jsonData = null;

        try {
            jsonData = objectMapper.writeValueAsString(allUsers);
        } catch (JsonProcessingException e) {
            System.out.println("Json with error");
        }

        return jsonData;
    }

    @GetMapping("/users/{id}")
    public String getUser(@PathVariable String id) {
        User user = userService.getUser(Long.parseLong(id));
        String jsonData = null;

        try {
            jsonData = objectMapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            System.out.println("Json with error");
        }

        return jsonData;
    }
}
