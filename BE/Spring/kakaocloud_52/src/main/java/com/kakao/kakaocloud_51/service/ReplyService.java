package com.kakao.kakaocloud_51.service;

import com.kakao.kakaocloud_51.domain.Board;
import com.kakao.kakaocloud_51.domain.Reply;
import com.kakao.kakaocloud_51.dto.ReplyDTO;

import java.util.List;

public interface ReplyService {
    //댓글 등록
    Long register(ReplyDTO replyDTO);

    //댓글 목록
    List<ReplyDTO> getList(Long bno);

    //댓글 수정
    Long modify(ReplyDTO replyDTO);

    //댓글 삭제
    Long remove(Long rno);
    
    //ReplyDTO를 Reply Entity로 변환해주는 메서드
    default Reply dtoToEntity(ReplyDTO dto){
        Board board = Board.builder().bno(dto.getBno()).build();
        Reply reply = Reply.builder()
                .rno(dto.getRno())
                .text(dto.getText())
                .replyer(dto.getReplyer())
                .board(board).build();
        return reply;
    }
    //Reply Entity를 ReplyDTO로 변환해주는 메서드
    default ReplyDTO entityToDTO(Reply reply){
        ReplyDTO dto = ReplyDTO.builder()
                .rno(reply.getRno())
                .text(reply.getText())
                .replyer(reply.getReplyer())
                .regDate(reply.getRegDate())
                .modDate(reply.getModDate())
                .build();
        return dto;
    }
}
