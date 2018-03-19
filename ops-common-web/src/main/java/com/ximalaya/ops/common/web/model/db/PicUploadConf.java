package com.ximalaya.ops.common.web.model.db;

import java.util.List;

/**
 * Created by nihao on 16/12/28.
 */
public class PicUploadConf {
    private String swfUrl;
    private Long imageSize;
    private String upImageUrl;
    private List<String> supportImage;
    private Integer width;
    private Integer height;

    public String getSwfUrl() {
        return swfUrl;
    }

    public void setSwfUrl(String swfUrl) {
        this.swfUrl = swfUrl;
    }

    public Long getImageSize() {
        return imageSize;
    }

    public void setImageSize(Long imageSize) {
        this.imageSize = imageSize;
    }

    public List<String> getSupportImage() {
        return supportImage;
    }

    public void setSupportImage(List<String> supportImage) {
        this.supportImage = supportImage;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public Integer getHeight() {
        return height;
    }

    public void setHeight(Integer height) {
        this.height = height;
    }

    public String getUpImageUrl() {
        return upImageUrl;
    }

    public void setUpImageUrl(String upImageUrl) {
        this.upImageUrl = upImageUrl;
    }
}
