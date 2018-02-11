package com.dropbox.prototype.entity.request;

import com.dropbox.prototype.models.Content;
import com.dropbox.prototype.models.User;

import java.util.List;

public class Share {

    private Content content;
    private List<User> users;
    private int userid;

    public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }
}
