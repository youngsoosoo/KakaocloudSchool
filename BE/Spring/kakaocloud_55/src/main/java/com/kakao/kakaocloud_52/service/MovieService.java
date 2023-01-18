package com.kakao.kakaocloud_52.service;

import com.kakao.kakaocloud_52.domain.Movie;
import com.kakao.kakaocloud_52.domain.MovieImage;
import com.kakao.kakaocloud_52.dto.MovieDTO;
import com.kakao.kakaocloud_52.dto.MovieImageDTO;
import com.kakao.kakaocloud_52.dto.PageRequestDTO;
import com.kakao.kakaocloud_52.dto.PageResponseDTO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public interface MovieService {
    //데이터 삽입을 위한 메서드
    Long register(MovieDTO movieDTO);

    //데이터 목록을 위한 메서드
    PageResponseDTO<MovieDTO, Object []> getList(PageRequestDTO requestDTO);

    MovieDTO getMovie(Long mno);
    
    //DTO를 Entity로 변환
    //하나의 Entity가 아니라 Movie와 MovieImage로 변환이 되어야 해서
    //Map으로 리턴
    default Map<String, Object> dtoToEntity(MovieDTO movieDTO){
        Map<String, Object> entityMap = new HashMap<>();

        Movie movie = Movie.builder()
                .mno(movieDTO.getMno())
                .title(movieDTO.getTitle())
                .build();
        entityMap.put("movie", movie);

        //MovieImageDTO의 List
        List<MovieImageDTO> imageDTOList = movieDTO.getImageDTOList();

        //MOvieImageDTO의 List를 MovieImage Entity의 List로 변환
        if(imageDTOList != null && imageDTOList.size() > 0){
            List<MovieImage> movieImageList = imageDTOList.stream().map(movieImageDTO -> {
                MovieImage movieImage = MovieImage.builder()
                        .path(movieImageDTO.getPath())
                        .imgName(movieImageDTO.getImgName())
                        .uuid(movieImageDTO.getUuid())
                        .movie(movie)
                        .build();
                return movieImage;
            }).collect(Collectors.toList());
            entityMap.put("imgList",movieImageList);
        }

        return entityMap;
    }

    //검색 결과를 DTO로 변환해주는 메서드
    default MovieDTO entitiesToDTO(Movie movie, List<MovieImage> movieImages, double avg, Long reviewCnt){
        MovieDTO movieDTO = MovieDTO.builder()
                .mno(movie.getMno())
                .title(movie.getTitle())
                .regDate(movie.getRegDate())
                .modDate(movie.getModDate())
                .build();
        List<MovieImageDTO> movieImageDTOList = movieImages.stream().map(movieImage -> {
            return MovieImageDTO.builder()
                    .imgName(movieImage.getImgName())
                    .path(movieImage.getPath())
                    .uuid(movieImage.getUuid())
                    .build();
        }).collect(Collectors.toList());
        movieDTO.setImageDTOList(movieImageDTOList);
        movieDTO.setAvg(avg);
        movieDTO.setReviewCnt(reviewCnt);

        return movieDTO;
    }
}
