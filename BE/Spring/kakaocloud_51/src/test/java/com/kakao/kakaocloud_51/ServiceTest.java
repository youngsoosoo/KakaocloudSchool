package com.kakao.kakaocloud_51;

import com.kakao.kakaocloud_51.board.PageRequestDTO;
import com.kakao.kakaocloud_51.dto.BoardDTO;
import com.kakao.kakaocloud_51.dto.PageResponeDTO;
import com.kakao.kakaocloud_51.service.BoardService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ServiceTest {
    @Autowired
    private BoardService boardService;

    //등록 테스트
    @Test
    public void registerTest(){
        BoardDTO dto = BoardDTO.builder()
                .title("등록 테스트")
                .content("등록을 테스트합니다.")
                .writerEmail("user33@kakao.com")
                .build();
        Long bno = boardService.register(dto);
        System.out.println(bno);
    }

    @Test
    public void testList(){
        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        PageResponeDTO<BoardDTO, Object []> result = boardService.getList(pageRequestDTO);
        System.out.println(result);
    }

    @Test
    public void testGet(){
        Long bno = 100L;
        BoardDTO boardDTO = boardService.get(bno);
        System.out.println(boardDTO);
    }

    @Test
    public void testDelete(){
        boardService.removeWithReplies(100L);
    }

    @Test
    public void testUpdate(){
        BoardDTO dto = BoardDTO.builder()
                .bno(99L)
                .title("제목 변경")
                .content("내용 변경")
                .build();
        System.out.println(boardService.modify(dto));
    }
}
