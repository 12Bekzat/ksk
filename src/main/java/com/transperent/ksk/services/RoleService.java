package com.transperent.ksk.services;

import com.transperent.ksk.dtos.RegistrationUserDto;
import com.transperent.ksk.entity.Role;
import com.transperent.ksk.entity.User;
import com.transperent.ksk.repositories.RoleRepository;
import com.transperent.ksk.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;

    public Role getUserRole() {
        return roleRepository.findByName("ROLE_USER").get();
    }

    public Role getAdminRole() {
        return roleRepository.findByName("ROLE_ADMIN").get();
    }

    public Role getSecondaryRole() {
        return roleRepository.findByName("ROLE_SECONDARY").get();
    }
}
