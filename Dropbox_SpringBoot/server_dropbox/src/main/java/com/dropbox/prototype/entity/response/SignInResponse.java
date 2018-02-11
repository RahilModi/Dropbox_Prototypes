package com.dropbox.prototype.entity.response;

import com.dropbox.prototype.models.User;

public class SignInResponse {

    Response response;
    User user;

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
