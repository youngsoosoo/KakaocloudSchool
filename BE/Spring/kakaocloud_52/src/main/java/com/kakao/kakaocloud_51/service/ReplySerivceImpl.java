package com.kakao.kakaocloud_51.service;

import com.kakao.kakaocloud_51.domain.Board;
import com.kakao.kakaocloud_51.domain.Reply;
import com.kakao.kakaocloud_51.dto.ReplyDTO;
import com.kakao.kakaocloud_51.persistence.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReplySerivceImpl implements ReplyService{
    private final ReplyRepository replyRepository;

    @Override
    public Long register(ReplyDTO replyDTO) {
        Reply reply = dtoToEntity(replyDTO);
        replyRepository.save(reply);
        return reply.getRno();
    }

    @Override
    public List<ReplyDTO> getList(Long bno) {
        List<Reply> result = replyRepository.findByBoardOrderByRno(Board.builder()
                .bno(bno).build());
        //result의 내용을 정렬하기 - 수정한 시간의 내림차순
        result.sort(new Comparator<Reply>() {
            @Override
            public int compare(Reply o1, Reply o2) {
                //오름차순 정렬 o1과 o2의 위치를 바꾸면 내림차순
                return o2.getModDate().compareTo(o1.getModDate());
            }
        });

        //Reply의 List를 ReplyDTO의 List로 변경
        return result.stream().map(reply -> entityToDTO(reply)).collect(Collectors.toList());
    }

    @Override
    public Long modify(ReplyDTO replyDTO) {
        Reply reply = dtoToEntity(replyDTO);
        replyRepository.save(reply);
        return reply.getRno();
    }

    @Override
    public Long remove(Long rno) {
        replyRepository.deleteById(rno);
        return rno;
    }
}
