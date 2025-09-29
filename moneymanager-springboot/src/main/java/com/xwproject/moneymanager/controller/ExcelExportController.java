package com.xwproject.moneymanager.controller;

import com.xwproject.moneymanager.service.ExcelExportService;
import com.xwproject.moneymanager.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;

@RestController
@RequestMapping("/download")
@RequiredArgsConstructor
public class ExcelExportController {

    private final ExcelExportService excelExportService;
    private final ProfileService profileService;

    // ------------------- Income -------------------
    @GetMapping("/incomes")
    public ResponseEntity<InputStreamResource> downloadIncomeExcel() {
        Long currentUserId = profileService.getCurrentProfile().getId();
        ByteArrayInputStream in = excelExportService.exportUserIncomesToExcel(currentUserId);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=incomes.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(in));
    }

    // ------------------- Expense -------------------
    @GetMapping("/expenses")
    public ResponseEntity<InputStreamResource> downloadExpenseExcel() {
        Long currentUserId = profileService.getCurrentProfile().getId();
        ByteArrayInputStream in = excelExportService.exportUserExpensesToExcel(currentUserId);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=expenses.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(in));
    }
}
