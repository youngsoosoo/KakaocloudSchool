package com.kakao.kakaocloud_48.controller;

import com.kakao.kakaocloud_48.dto.SampleVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Controller
public class pageController {
    //로거 객체 생성
    private final Logger LOGGER = LoggerFactory.getLogger(pageController.class);

    @GetMapping("/")
    public String main(Model model){
        Map<String, Object> map = new HashMap<>();
        map.put("language", "Java");
        map.put("buildtool", "Gradle");
        map.put("ide", "IntelliJ");
//        model.addAttribute("message", "Spring Boot에서의 JSP");
        model.addAttribute("map", map);

        List<String> list = new ArrayList<>();
        list.add("Developer");
        list.add("Operator");
        list.add("MLOps");
        list.add("DevOps");
        list.add("DBA");

        model.addAttribute("list", list);

        return "main";
    }

    @GetMapping("ex1")
    //리턴 타입이 void이면 출력하는 뷰 이름은 요청 URL
    //view의 이름은 ex1
    public void ex1(Model model){
        LOGGER.info("ex1 요청");
    }

    @GetMapping("ex2")
    public void ex2(Model model){
        List<SampleVO> list = IntStream.range(1, 20).asLongStream().mapToObj(
                i->{
                    SampleVO vo = SampleVO.builder()
                            .sno(i)
                            .first("First.."+ i)
                            .last("Last.." + i)
                            .regTime(LocalDateTime.now())
                            .build();
                    return vo;
                }).collect(Collectors.toList());
        model.addAttribute("list", list);
    }

    @GetMapping({"/exlink", "/exformat"})
    public void exlink(Model model){
        List<SampleVO> list = new ArrayList<>();
        for(long i=0; i<10; i++){
            SampleVO vo = SampleVO.builder()
                    .sno(i)
                    .first("First.."+ i)
                    .last("Last.." + i)
                    .regTime(LocalDateTime.now())
                    .build();
            list.add(vo);
        }
        model.addAttribute("list", list);
    }

    @GetMapping("/exlayout1")
    public void exlayout(){}
}
