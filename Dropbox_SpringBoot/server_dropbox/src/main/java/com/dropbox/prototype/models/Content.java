package com.dropbox.prototype.models;

import javax.persistence.*;

@Entity
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer contentid;
    private String originalname;
    private String virtualname;
    private String date;
    private String type;
    private Boolean star;
    private Integer userid;

    public Content(Integer contentid, String originalname, String virtualname, String date, String type, Boolean star, Integer userid) {
        this.contentid = contentid;
        this.originalname = originalname;
        this.virtualname = virtualname;
        this.date = date;
        this.type = type;
        this.star = star;
        this.userid = userid;
    }

    public Content(){}

    public Content(String originalname, String virtualname, String date, Integer userid, Boolean star) {
        this.originalname = originalname;
        this.virtualname = virtualname;
        this.date = date;
        this.userid = userid;
        this.star = star;
    }

    public Integer getContentid() {
        return contentid;
    }

    public void setContentid(Integer contentid) {
        this.contentid = contentid;
    }

    public String getOriginalname() {
        return originalname;
    }

    public void setOriginalname(String originalname) {
        this.originalname = originalname;
    }

    public String getVirtualname() {
        return virtualname;
    }

    public void setVirtualname(String virtualname) {
        this.virtualname = virtualname;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getStar() {
        return star;
    }

    public void setStar(Boolean star) {
        this.star = star;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }
}
