package com.dropbox.prototype.entity.response;

import com.dropbox.prototype.models.User;

import java.util.List;

public class SuggestionResponse {
    List<User> users;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }


}
