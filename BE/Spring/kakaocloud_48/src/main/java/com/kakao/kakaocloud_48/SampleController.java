package com.kakao.kakaocloud_48;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
//View 대신에 문자열(CSV)나 JSON을 리턴하는 컨트롤러를
//만들고자 할 때 사용하는 어노테이션
@RestController
public class SampleController {
    //hello라는 요청을 Get방식으로 요청한 경우
    @GetMapping("/hello")
    //String을 리턴하면 일반 문자열로 출력
    //VO나 List를 리턴하면 JSON 문자열로 출력
    public String [] hello(){
        return new  String []{"STS", "IntelliJ"};
    }
}
