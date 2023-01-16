package com.kakao.kakaocloud_52.persistence;

import com.kakao.kakaocloud_52.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
