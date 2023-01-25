package com.example.kakaocloud_56.service;

import com.example.kakaocloud_56.security.dto.ClubMemberJoinDTO;

public interface MemberService {
    //회원이 존재하는 경우 발생시킬 예외 클래스
    static class MidExistException extends Exception{

    }

    void join(ClubMemberJoinDTO memberJoinDTO) throws MidExistException;
}
