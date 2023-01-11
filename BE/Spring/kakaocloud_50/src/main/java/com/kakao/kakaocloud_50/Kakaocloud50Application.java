package com.kakao.kakaocloud_50;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
//JPA의 변화를 감시하겠다는 어노테이션
@EnableJpaAuditing
public class Kakaocloud50Application {

    public static void main(String[] args) {
        SpringApplication.run(Kakaocloud50Application.class, args);
    }

}
