package com.transperent.ksk.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String username;
    private String name;
    private String surname;
    private String email;
    private String password;
}
