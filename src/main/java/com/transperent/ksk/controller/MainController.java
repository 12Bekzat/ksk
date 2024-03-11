package com.transperent.ksk.controller;

import com.transperent.ksk.services.RoleService;
import com.transperent.ksk.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MainController {
    @GetMapping("/home")
    public String home() {
        return "Hello world!";
    }

    @GetMapping("/user")
    public String user() {
        return "User access";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Admin access";
    }
}
