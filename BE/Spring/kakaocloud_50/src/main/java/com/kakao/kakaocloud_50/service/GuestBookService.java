package com.kakao.kakaocloud_50.service;

import com.kakao.kakaocloud_50.domain.GuestBook;
import com.kakao.kakaocloud_50.dto.GuestBookDTO;
import com.kakao.kakaocloud_50.dto.PageRequestDTO;
import com.kakao.kakaocloud_50.dto.PageResponseDTO;

public interface GuestBookService {
    //데이터 삽입을 위한 메서드 - 기본 키의 값 리턴
    //매개변수는 대부분의 경우 DTO
    //리턴 타입은 삽입된 데이터를 그대로 리턴하기도 하고
    //성공과 실패 여부를 위해서 boolean을 리턴하기도 하고
    //영향받은 행의 개수를 의미하는 int를 리턴하기도 하고
    //기본 키의 값을 리턴하는 경우도 있습니다.
    public Long register(GuestBookDTO dto);

    //목록 보기를 위한 메서드
    PageResponseDTO<GuestBookDTO, GuestBook> getList(PageRequestDTO requestDTO);

    //DTO를 Entity로 변환해주는 메서드
    default GuestBook dtoToEntity(GuestBookDTO dto){
        //삽입 날짜와 수정 날짜는 entity가
        //삽입되거나 수정될 때 생성되므로 옮겨줄 필요가 없음
        GuestBook entity = GuestBook.builder()
                .gno(dto.getGno())
                .title(dto.getTitle())
                .content(dto.getContent())
                .writer(dto.getWriter())
                .build();
        return entity;
    }

    //entity를 dto로 변환해주는 메서드
    //전부 옮겨 주어야 합니다.
    default GuestBookDTO entityToDto(GuestBook entity){
        GuestBookDTO dto = GuestBookDTO.builder()
                .gno(entity.getGno())
                .title(entity.getTitle())
                .content(entity.getContent())
                .writer(entity.getWriter())
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .build();
        return dto;
    }
}