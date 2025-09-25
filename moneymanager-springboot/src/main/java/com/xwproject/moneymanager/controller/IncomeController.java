package com.xwproject.moneymanager.controller;

import com.xwproject.moneymanager.dto.ExpenseDTO;
import com.xwproject.moneymanager.dto.IncomeDTO;
import com.xwproject.moneymanager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {
    private final IncomeService incomeService;
    @PostMapping
    public ResponseEntity<IncomeDTO> addIncome(@RequestBody IncomeDTO incomeDTO) {
        IncomeDTO saved = incomeService.addIncome(incomeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getExpensesForCurrentUser() {
        List<IncomeDTO> incomes = incomeService.getCurrentMonthIncomesForCurrentUser();
        return ResponseEntity.ok(incomes);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncomeById(@PathVariable Long id) {
        incomeService.deleteIncomeById(id);
        return ResponseEntity.noContent().build();
    }
}
