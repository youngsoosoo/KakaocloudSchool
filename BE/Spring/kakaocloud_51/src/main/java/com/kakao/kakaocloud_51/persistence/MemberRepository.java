package com.kakao.kakaocloud_51.persistence;

import com.kakao.kakaocloud_51.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, String> {
}
