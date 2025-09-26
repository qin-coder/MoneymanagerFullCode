package com.xwproject.moneymanager.service;

import com.xwproject.moneymanager.entity.ProfileEntity;
import com.xwproject.moneymanager.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {
    private final ProfileRepository profileRepository;
    private final ExpenseService expenseService;
    @Value("${money.manager.frontend.url}")
    private String frontendUrl;

    @Scheduled(cron = "0 0 22 * * *")
    public void sendDailyIncomeExpenseReminder(Long profileId) {
        List<ProfileEntity> profiles = profileRepository.findAll();
        for (ProfileEntity profile : profiles) {
            String body = "Hi " + profile.getFullName() + "<br><br>" +
                    "Today is " + LocalDate.now() + "<br>" +
                    "A friendly reminder to add your income and " +
                    "expenses for today.<br><br>" +

                    "<a href='" + frontendUrl + "' " +
                    "style='display: inline-block; padding: 10px " +
                    "20px; " +
                    "background-color: #4CAF50; color: white; " +
                    "text-decoration: none; border-radius: 5px; " +
                    "font-weight: bold;'>" +
                    "Add Transactions" +
                    "</a><br><br>" +

                    "Best regards,<br>" +
                    "Money Manager Team";
        }
    }
}