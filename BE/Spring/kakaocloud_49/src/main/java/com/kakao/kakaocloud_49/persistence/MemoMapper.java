package com.kakao.kakaocloud_49.persistence;

import com.kakao.kakaocloud_49.dto.MemoDTO;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemoMapper {
    @Select("select * from tbl_memo")
    public List<MemoDTO> listMemo();
}
