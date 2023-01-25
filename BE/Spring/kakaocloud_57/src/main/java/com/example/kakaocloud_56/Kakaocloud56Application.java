package com.example.kakaocloud_56;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Kakaocloud56Application {

    public static void main(String[] args) {
        SpringApplication.run(Kakaocloud56Application.class, args);
    }

}
