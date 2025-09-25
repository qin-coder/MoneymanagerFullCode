package com.xwproject.moneymanager.service;

import com.xwproject.moneymanager.dto.IncomeDTO;
import com.xwproject.moneymanager.entity.CategoryEntity;
import com.xwproject.moneymanager.entity.IncomeEntity;
import com.xwproject.moneymanager.entity.ProfileEntity;
import com.xwproject.moneymanager.repository.CategoryRepository;
import com.xwproject.moneymanager.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IncomeService {
    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;

    public IncomeDTO addIncome(IncomeDTO incomeDTO) {
        ProfileEntity currentProfile =
                profileService.getCurrentProfile();
        CategoryEntity category =
                categoryRepository.findById(incomeDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category " +
                        "not found"));
        IncomeEntity newIncome = toEntity(incomeDTO,
                currentProfile, category);
        newIncome = incomeRepository.save(newIncome);
        return toDTO(newIncome);
    }


    //help methods
    private IncomeEntity toEntity(IncomeDTO income,
                                  ProfileEntity profile,
                                  CategoryEntity category) {
        return IncomeEntity.builder()
                .name(income.getName())
                .icon(income.getIcon())
                .date(income.getDate())
                .amount(income.getAmount())
                .category(category)
                .profile(profile)
                .build();
    }

    public IncomeDTO toDTO(IncomeEntity income) {
        return IncomeDTO.builder()
                .id(income.getId())
                .name(income.getName())
                .icon(income.getIcon())
                .categoryName(income.getCategory() != null ?
                        income.getCategory().getName() : "N/A")
                .categoryId(income.getCategory() != null ?
                        income.getCategory().getId() : null)
                .amount(income.getAmount())
                .date(income.getDate())
                .createdAt(income.getCreatedAt())
                .updatedAt(income.getUpdatedAt())
                .build();
    }
}
