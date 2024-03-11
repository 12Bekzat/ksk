package com.transperent.ksk.repositories;

import com.transperent.ksk.entity.Counter;
import com.transperent.ksk.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
}
