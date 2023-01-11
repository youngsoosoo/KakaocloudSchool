package com.kakao.kakaocloud_50.controller;

import com.kakao.kakaocloud_50.domain.GuestBook;
import com.kakao.kakaocloud_50.dto.GuestBookDTO;
import com.kakao.kakaocloud_50.dto.PageRequestDTO;
import com.kakao.kakaocloud_50.dto.PageResponseDTO;
import com.kakao.kakaocloud_50.service.GuestBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
public class JSONController {
    private final GuestBookService guestBookService;

    @GetMapping("/guestbook/list.json")
    public PageResponseDTO<GuestBookDTO, GuestBook> list(PageRequestDTO pageRequestDTO){
        return guestBookService.getList(pageRequestDTO);
    }
}
