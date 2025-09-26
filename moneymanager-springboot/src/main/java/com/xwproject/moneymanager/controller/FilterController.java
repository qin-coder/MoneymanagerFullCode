package com.xwproject.moneymanager.controller;

import com.xwproject.moneymanager.dto.ExpenseDTO;
import com.xwproject.moneymanager.dto.FilterDTO;
import com.xwproject.moneymanager.dto.IncomeDTO;
import com.xwproject.moneymanager.service.ExpenseService;
import com.xwproject.moneymanager.service.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filter")
public class FilterController {
    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<?> filterTransactions(@RequestBody FilterDTO filterDTO) {
        LocalDate startDate = filterDTO.getStartDate();  // 允许为 null
        LocalDate endDate = (filterDTO.getEndDate() != null) ?
                filterDTO.getEndDate() : LocalDate.now();

        String keyword = (filterDTO.getKeyword() != null) ?
                filterDTO.getKeyword() : "";

        String sortField = (filterDTO.getSortField() != null) ?
                filterDTO.getSortField() : "date";
        Sort.Direction direction =
                "desc".equalsIgnoreCase(filterDTO.getSortOrder())
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;
        Sort sort = Sort.by(direction, sortField);

        String type = filterDTO.getType();
        if ("income".equalsIgnoreCase(type)) {
            List<IncomeDTO> incomes =
                    incomeService.filterIncomes(startDate, endDate,
                            keyword, sort);
            return ResponseEntity.ok(incomes);
        } else if ("expense".equalsIgnoreCase(type) || "expenses".equalsIgnoreCase(type)) {
            List<ExpenseDTO> expenses =
                    expenseService.filterExpenses(startDate,
                            endDate, keyword, sort);
            return ResponseEntity.ok(expenses);
        } else {
            return ResponseEntity.badRequest()
                    .body("Invalid filter type, must be 'income' or" +
                            " 'expense(s)'");
        }
    }
}