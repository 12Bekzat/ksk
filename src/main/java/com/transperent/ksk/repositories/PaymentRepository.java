package com.transperent.ksk.repositories;

import com.transperent.ksk.entity.JKH;
import com.transperent.ksk.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
