package com.xwproject.moneymanager.service;

import com.xwproject.moneymanager.dto.TransactionExcelDTO;
import com.xwproject.moneymanager.entity.ExpenseEntity;
import com.xwproject.moneymanager.entity.IncomeEntity;
import com.xwproject.moneymanager.repository.ExpenseRepository;
import com.xwproject.moneymanager.repository.IncomeRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExcelExportService {

    private final IncomeRepository incomeRepository;
    private final ExpenseRepository expenseRepository;

    // ------------------- Income -------------------

    public ByteArrayInputStream exportUserIncomesToExcel(Long userId) {
        List<IncomeEntity> incomes = incomeRepository.findByProfileIdOrderByDateDesc(userId);

        List<TransactionExcelDTO> list = incomes.stream()
                .map(i -> new TransactionExcelDTO(
                        "Income",
                        i.getName(),
                        i.getCategory().getName(),
                        i.getDate(),
                        i.getAmount()
                ))
                .collect(Collectors.toList());

        return writeExcel(list, "Incomes");
    }

    // ------------------- Expense -------------------

    public ByteArrayInputStream exportUserExpensesToExcel(Long userId) {
        List<ExpenseEntity> expenses = expenseRepository.findByProfileIdOrderByDateDesc(userId);

        List<TransactionExcelDTO> list = expenses.stream()
                .map(e -> new TransactionExcelDTO(
                        "Expense",
                        e.getName(),
                        e.getCategory().getName(),
                        e.getDate(),
                        e.getAmount()
                ))
                .collect(Collectors.toList());

        return writeExcel(list, "Expenses");
    }

    // ------------------- Private Helper -------------------
    private ByteArrayInputStream writeExcel(List<TransactionExcelDTO> transactions, String sheetName) {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet(sheetName);

            // Header
            String[] headers = {"Type", "Name", "Category", "Date", "Amount"};
            Row headerRow = sheet.createRow(0);
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);

            for (int i = 0; i < headers.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(headers[i]);
                cell.setCellStyle(headerStyle);
            }

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            // Data rows
            int rowIdx = 1;
            for (TransactionExcelDTO tx : transactions) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(tx.getType());
                row.createCell(1).setCellValue(tx.getName());
                row.createCell(2).setCellValue(tx.getCategoryName());
                row.createCell(3).setCellValue(tx.getDate().format(formatter));
                row.createCell(4).setCellValue(tx.getAmount().doubleValue());
            }


            // Autosize columns
            for (int i = 0; i < headers.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (Exception e) {
            throw new RuntimeException("Failed to export Excel file: " + e.getMessage(), e);
        }
    }
}
