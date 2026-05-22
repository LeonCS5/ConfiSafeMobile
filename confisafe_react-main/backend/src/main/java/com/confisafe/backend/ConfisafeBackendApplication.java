package com.confisafe.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ConfisafeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfisafeBackendApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("   ConfiSafe Backend está rodando!");
        System.out.println("   URL: http://localhost:8080");
        System.out.println("========================================\n");
    }
}
