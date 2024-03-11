package com.transperent.ksk.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @OneToOne
    private JKH manager;
    @OneToOne
    private House house;
    @OneToMany
    private List<Counter> bills;
    private String deadline;
    private float amount;
    private float debt;
    private int status;
}
