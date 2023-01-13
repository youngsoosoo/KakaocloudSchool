package com.kakao.kakaocloud_51;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Kakaocloud51Application {

    public static void main(String[] args) {
        SpringApplication.run(Kakaocloud51Application.class, args);
    }

}
