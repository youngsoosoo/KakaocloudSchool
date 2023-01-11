package com.kakao.kakaocloud_50.service;

import com.kakao.kakaocloud_50.domain.GuestBook;
import com.kakao.kakaocloud_50.dto.GuestBookDTO;
import com.kakao.kakaocloud_50.dto.PageRequestDTO;
import com.kakao.kakaocloud_50.dto.PageResponseDTO;
import com.kakao.kakaocloud_50.persistence.GuestBookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

@Service
@Log4j2
@RequiredArgsConstructor
public class GuestServiceImpl implements GuestBookService{
    private final GuestBookRepository guestBookRepository;

    public Long register(GuestBookDTO dto){
        //파라미터가 제대로 넘어오는지 확인
        log.info("삽입 데이터: " + dto.toString());
        //repositort의 메서드 매개변수로 변형
        GuestBook entity = dtoToEntity(dto);
        //save를 할 때 설정한 내역을 가지고 필요한 데이터를 설정
        //gno, regDate, modDate가 설정됩니다.
        guestBookRepository.save(entity);
        return entity.getGno();

    }


    //목록 보기를 위한 메서드
    public PageResponseDTO<GuestBookDTO, GuestBook> getList(PageRequestDTO requestDTO){
        //Repository에게 넘겨줄 Pageable 객체를 생성
        //gno의 내림차순으로 정렬
        Pageable pageable = requestDTO.getPageable(Sort.by("gno").descending());
        //데이터 찾아오기
        Page<GuestBook> result = guestBookRepository.findAll(pageable);

        //데이터 목록을 받아서
        //데이터 목록을 순회하면서 제공된 메서드가 리턴하는
        //목록을 변경해주는 람다
        Function<GuestBook, GuestBookDTO> fn = (entity -> entityToDto(entity));
        return new PageResponseDTO<>(result, fn);
    }
}
