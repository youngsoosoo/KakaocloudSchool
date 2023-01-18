package com.kakao.kakaocloud_52.persistence;

import com.kakao.kakaocloud_52.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
