package com.xwproject.moneymanager.repository;
import com.xwproject.moneymanager.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {

    //select * from tbl_profile where email = ?
    Optional<ProfileEntity> findByEmail(String email);
}
