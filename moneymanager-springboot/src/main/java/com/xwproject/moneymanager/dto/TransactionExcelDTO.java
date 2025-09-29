package com.xwproject.moneymanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class TransactionExcelDTO {
    private String type;
    private String name;
    private String categoryName;
    private LocalDate date;
    private BigDecimal amount;
}
