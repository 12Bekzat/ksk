package com.transperent.ksk.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "house")
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long Id;
    private String address;
    private int number;
    private float square;
    private float countPeople;
    @OneToMany
    private List<Payment> payments;
    @OneToOne
    private User owner;
}
