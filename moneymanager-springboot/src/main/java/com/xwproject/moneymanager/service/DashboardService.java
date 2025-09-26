package com.xwproject.moneymanager.service;

import com.xwproject.moneymanager.dto.ExpenseDTO;
import com.xwproject.moneymanager.dto.IncomeDTO;
import com.xwproject.moneymanager.dto.RecentTransactionDTO;
import com.xwproject.moneymanager.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Stream.concat;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;

    public Map<String, Object> getDashboardData() {
        ProfileEntity currentProfile =
                profileService.getCurrentProfile();
        Map<String, Object> dashboardData = new LinkedHashMap<>();
        List<IncomeDTO> latest5Incomes =
                incomeService.getLatest5IncomesForCurrentUser();
        List<ExpenseDTO> latest5Expenses =
                expenseService.getLatest5ExpensesForCurrentUser();
        List<RecentTransactionDTO> recentTransactions =
                concat(latest5Incomes.stream().map(income -> RecentTransactionDTO.builder()
                        .id(income.getId())
                        .profileId(currentProfile.getId())
                        .icon(income.getIcon())
                        .name(income.getName())
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .createdAt(income.getCreatedAt())
                        .updatedAt(income.getUpdatedAt())
                        .type("income")
                        .build()),
                latest5Expenses.stream().map(expense -> RecentTransactionDTO.builder()
                        .id(expense.getId())
                        .profileId(currentProfile.getId())
                        .icon(expense.getIcon())
                        .name(expense.getName())
                        .amount(expense.getAmount())
                        .date(expense.getDate())
                        .createdAt(expense.getCreatedAt())
                        .updatedAt(expense.getUpdatedAt())
                        .type("expense")
                        .build()))
                .sorted((a, b) -> {
                    int cmp = b.getDate().compareTo(a.getDate());
                    if (cmp == 0 && a.getCreatedAt() != null && b.getCreatedAt() != null) {
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return cmp;
                }).collect(Collectors.toList());
        dashboardData.put("totalBalance",
                incomeService.getTotalIncomesForCurrentUser().subtract(expenseService.getTotalExpensesForCurrentUser()));
        dashboardData.put("totalIncome",
                incomeService.getTotalIncomesForCurrentUser());
        dashboardData.put("totalExpense",
                expenseService.getTotalExpensesForCurrentUser());
        dashboardData.put("latest5Expenses",
                expenseService.getLatest5ExpensesForCurrentUser());
        dashboardData.put("latest5Incomes",
                incomeService.getLatest5IncomesForCurrentUser());
        dashboardData.put("recentTransactions", recentTransactions);
        return dashboardData;

    }
}
