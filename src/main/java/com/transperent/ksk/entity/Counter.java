package com.transperent.ksk.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "counter")
public class Counter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private Long uniqueNumber;
    private String dateReading;
    private int value;
    private String type;
}
