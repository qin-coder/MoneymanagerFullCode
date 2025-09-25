package com.xwproject.moneymanager.service;

import com.xwproject.moneymanager.dto.ExpenseDTO;
import com.xwproject.moneymanager.entity.CategoryEntity;
import com.xwproject.moneymanager.entity.ExpenseEntity;
import com.xwproject.moneymanager.entity.ProfileEntity;
import com.xwproject.moneymanager.repository.CategoryRepository;
import com.xwproject.moneymanager.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ExpenseService {
    private final CategoryService categoryService;
    private final ExpenseRepository expenseRepository;
    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;

    public ExpenseDTO addExpense(ExpenseDTO expenseDTO) {
        ProfileEntity currentProfile =
                profileService.getCurrentProfile();
        CategoryEntity category =
                categoryRepository.findById(expenseDTO.getCategoryId())
                        .orElseThrow(() -> new RuntimeException(
                                "Category " +
                                "not found"));
        ExpenseEntity newExpense = toEntity(expenseDTO,
                currentProfile, category);
        newExpense = expenseRepository.save(newExpense);
        return toDTO(newExpense);
    }

    //retrives all expenses for current user based on start date
    // and end date
    public List<ExpenseDTO> getCurrentMonthExpensesForCurrentUser() {
        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startDate = now.withDayOfMonth(1);
        LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
        List<ExpenseEntity> list =
                expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);
        return list.stream().map(this::toDTO).toList();
    }

    //delete  expense by id for current user
    public void deleteExpenseById(Long expenseId) {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        ExpenseEntity expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if(!expense.getProfile().getId().equals(currentProfile.getId())){
            throw new RuntimeException("Unauthorised yo delete");
        }
        expenseRepository.delete(expense);
    }


    //help methods
    private ExpenseEntity toEntity(ExpenseDTO expenseDTO,
                                   ProfileEntity profile,
                                   CategoryEntity category) {
        return ExpenseEntity.builder()
                .name(expenseDTO.getName())
                .icon(expenseDTO.getIcon())
                .date(expenseDTO.getDate())
                .amount(expenseDTO.getAmount())
                .category(category)
                .profile(profile)
                .build();
    }

    public ExpenseDTO toDTO(ExpenseEntity expense) {
        return ExpenseDTO.builder()
                .id(expense.getId())
                .name(expense.getName())
                .icon(expense.getIcon())
                .categoryName(expense.getCategory() != null ?
                        expense.getCategory().getName() : "N/A")
                .categoryId(expense.getCategory() != null ?
                        expense.getCategory().getId() : null)
                .amount(expense.getAmount())
                .date(expense.getDate())
                .createdAt(expense.getCreatedAt())
                .updatedAt(expense.getUpdatedAt())
                .build();
    }
}
