package com.kakao.kakaocloud_48.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParamDTO {
    private String name;
    private String email;
    private String organization;
}
