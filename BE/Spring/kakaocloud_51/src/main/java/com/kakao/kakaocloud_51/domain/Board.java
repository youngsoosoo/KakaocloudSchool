package com.kakao.kakaocloud_51.domain;

import lombok.*;

import javax.persistence.*;
import javax.transaction.Transactional;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "writer")//toString 만들 때 writer의 toString 호출 안 함
public class Board extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bno;
    private String title;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    //처음에는 가져오지 않고 사용을 할 때 가져옵니다.
    private Member writer;

    //title을 수정하는 메서드
    public void changeTitle(String title){
        if (title == null || title.trim().length() == 0){
            this.title = "무제";
            return;
        }
        this.title = title;
    }

    //content를 수정하는 메서드
    public void changeContent(String content){
        this.content = content;
    }
}
