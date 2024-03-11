package com.transperent.ksk.dtos;

import com.transperent.ksk.entity.Payment;
import com.transperent.ksk.entity.User;
import jakarta.persistence.*;

import java.util.List;

public class HouseDto {
    private Long Id;
    private String address;
    private int number;
    private float square;
    private float countPeople;
}
