package com.example.kakaocloud_56;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class PasswordTests {
    @Autowired
    PasswordEncoder passwordEncoder;
    @Test
    public void testEncode(){
        String password="1111";
        String enPw = passwordEncoder.encode(password);
        System.out.println("enPw: " + enPw);
        enPw = passwordEncoder.encode(password);
        System.out.println("enPw: " + enPw);

        boolean result = passwordEncoder.matches(password, enPw);
        System.out.println("result : " + result);
    }
}
