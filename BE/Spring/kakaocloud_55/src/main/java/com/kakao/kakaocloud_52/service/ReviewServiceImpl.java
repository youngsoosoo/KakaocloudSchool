package com.kakao.kakaocloud_52.service;

import com.kakao.kakaocloud_52.domain.Movie;
import com.kakao.kakaocloud_52.domain.Review;
import com.kakao.kakaocloud_52.dto.ReviewDTO;
import com.kakao.kakaocloud_52.persistence.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;

    @Override
    public List<ReviewDTO> getList(Long mno) {
        Movie movie = Movie.builder().mno(mno).build();
        List<Review> result = reviewRepository.findByMovie(movie);
        return result.stream().map(review -> entityToDTO(review)).collect(Collectors.toList());
    }

    @Override
    public Long register(ReviewDTO reviewDTO) {
        Review review = dtoToEntity(reviewDTO);
        reviewRepository.save(review);
        return review.getReviewnum();
    }

    //수정과 삽입은 동일하다.
    @Override
    public Long modify(ReviewDTO reviewDTO) {
        Review review = dtoToEntity(reviewDTO);
        reviewRepository.save(review);
        return review.getReviewnum();
    }

    @Override
    public Long remove(Long rnum) {
        reviewRepository.deleteById(rnum);
        return rnum;
    }
}
