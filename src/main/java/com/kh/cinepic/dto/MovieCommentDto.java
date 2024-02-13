package com.kh.cinepic.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class MovieCommentDto {
    private Long commentId;
    private Long movieId;
    private String image;
    private String alias;
    private String ratingField;
    private Integer ratingNum;
    private String ratingText;
    private LocalDateTime commentRegDate;
}
