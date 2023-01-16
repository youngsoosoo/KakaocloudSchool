package com.kakao.kakaocloud_52.persistence;

import com.kakao.kakaocloud_52.domain.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface MovieRepository extends JpaRepository<Movie, Long> {
    @Query("select m, mi, avg(coalesce(r.grade, 0)) from Movie m left outer join MovieImage mi on mi.movie = m" +
            " left outer join Review r on r.movie = m group by m")
    public Page<Object []> getList(Pageable pageable);
}
