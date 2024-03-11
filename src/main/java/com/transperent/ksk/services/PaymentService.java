package com.transperent.ksk.services;

import com.transperent.ksk.entity.Payment;
import com.transperent.ksk.repositories.CounterRepository;
import com.transperent.ksk.repositories.HouseRepository;
import com.transperent.ksk.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final HouseRepository houseRepository;
    private final CounterRepository counterRepository;
}
