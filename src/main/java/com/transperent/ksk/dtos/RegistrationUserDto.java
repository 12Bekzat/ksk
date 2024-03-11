package com.transperent.ksk.dtos;

import com.transperent.ksk.entity.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;

@Data
public class RegistrationUserDto {
    private Long id;
    private String username;
    private String name;
    private String surname;
    private String email;
    private String password;
}
