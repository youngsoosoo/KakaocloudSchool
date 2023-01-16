package com.kakao.kakaocloud_52;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class Kakaocloud52Application {

	public static void main(String[] args) {
		SpringApplication.run(Kakaocloud52Application.class, args);
	}

}
