package com.transperent.ksk.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "jkh")
public class JKH {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String name;
    private String address;
    private String phoneNumber;
    private String email;
}
