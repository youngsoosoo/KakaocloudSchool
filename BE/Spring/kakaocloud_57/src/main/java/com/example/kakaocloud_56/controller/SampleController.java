package com.example.kakaocloud_56.controller;

import com.example.kakaocloud_56.security.dto.ClubMemberSecurityDTO;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Log4j2
public class SampleController {
    @GetMapping("/")
    public String index(){
        log.info("메인");
        return "/index";
    }

    @GetMapping("/sample/all")
    public void main(){
        log.info("모두 허용");
    }
    
    //로그인 한 유저만 접속이 가능
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/sample/member")
    public void member(@AuthenticationPrincipal ClubMemberSecurityDTO clubMemberSecurityDTO){
        log.info("멤버만 허용");
        //로그인 한 유저 정보
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("로그인 한 유저", clubMemberSecurityDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/sample/admin")
    public void admin(){
        log.info("관리자만 허용");
    }
}
