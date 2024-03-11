package com.transperent.ksk.repositories;

import com.transperent.ksk.entity.House;
import com.transperent.ksk.entity.JKH;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JKHRepository extends JpaRepository<JKH, Long> {
}
