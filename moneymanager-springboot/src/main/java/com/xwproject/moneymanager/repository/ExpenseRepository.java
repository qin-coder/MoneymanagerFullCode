package com.xwproject.moneymanager.repository;

import com.xwproject.moneymanager.entity.ExpenseEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {
    //select * from tbl_expenses where profile_id = ? order by date
    // desc
    List<ExpenseEntity> findByProfileIdOrderByDateDesc(Long profileId);

    //select * from tbl_expenses where profile_id = ? order by date
    // desc limit 5
    List<ExpenseEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    @Query("select coalesce(sum(e.amount), 0) from ExpenseEntity e " +
            "where e.profile.id = :profileId")
    BigDecimal findTotalExpensesByProfileId(@Param("profileId") Long profileId);

    // select * from tbl_expenses where profile_id = ? and date
    // between ? and ? and name like %xx%
    List<ExpenseEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            Long profileId,
            LocalDate startDate,
            LocalDate endDate,
            String keyword,
            Sort sort
    );

    // select * from tbl_expenses where profile_id = ? and date
    // between ? and ?
    List<ExpenseEntity> findByProfileIdAndDateBetween(Long profileId, LocalDate startDate, LocalDate endDate);

}
