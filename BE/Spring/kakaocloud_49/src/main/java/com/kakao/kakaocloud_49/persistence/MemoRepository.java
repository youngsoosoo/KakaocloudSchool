package com.kakao.kakaocloud_49.persistence;

import com.kakao.kakaocloud_49.domain.Memo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MemoRepository extends JpaRepository<Memo, Long> {
    //mno의 값이 from부터 to 사이인 데이터 조회하는 메서드
    List<Memo> findByMnoBetween(Long from, Long to);

    //mno의 값이 from부터 to 사이인 데이터를 Mno의 내림차순 정렬해서 조회하는 메서드
    List<Memo> findByMnoBetweenOrderByMnoDesc(Long from, Long to);

    Page<Memo> findByMnoBetween(Long from, Long to, Pageable pageable);

    void deleteByMnoLessThan(Long num);

    //mno와 memoText를 매개 변수로 받아서 수정하는 메서드 - JPQL 사용
    @Transactional
    @Modifying
    //Native SQL이 아니기 떄문에 Table 이름을 적는 것이 아니고
    //Entity 클래스의 이름을 사용해야 합니다.
    @Query("update Memo m set m.memoText = :memoText where m.mno = :mno")
    public int updateMemoText(@Param("mno") Long mno, @Param("memoText") String memoText);

    @Transactional
    @Modifying
    @Query("update Memo m set m.memoText = :#{#param.memoText}" + " where m.mno = :#{#param.mno}")
    public int updateMemoText(@Param("param") Memo memo);

    @Query("select m from Memo m where m.mno > :mno")
    Page<Memo> getListWithQuery(@Param("mno") Long mno, Pageable pageable);

    @Query("select m.mno, m.memoText, CURRENT_DATE " + "from Memo m where m.mno > :mno")
    Page<Object []> getObjectWithQuery(@Param("mno") Long mno, Pageable pageable);
}
