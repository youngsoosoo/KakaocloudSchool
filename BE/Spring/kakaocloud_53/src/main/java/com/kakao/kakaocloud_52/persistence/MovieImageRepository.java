package com.kakao.kakaocloud_52.persistence;

import com.kakao.kakaocloud_52.domain.MovieImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieImageRepository extends JpaRepository<MovieImage, Long> {
}
