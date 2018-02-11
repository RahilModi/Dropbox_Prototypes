package com.dropbox.prototype.controller;

import com.dropbox.prototype.entity.request.General;
import com.dropbox.prototype.entity.request.SignUpUser;
import com.dropbox.prototype.entity.response.Response;
import com.dropbox.prototype.entity.response.SignInResponse;
import com.dropbox.prototype.entity.response.SuggestionResponse;
import com.dropbox.prototype.models.Activity;
import com.dropbox.prototype.models.User;
import com.dropbox.prototype.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(path="/signup", method = RequestMethod.POST)
    @ResponseBody
    public Response signup(@RequestBody SignUpUser user){
        return userService.signup(user);
    }

    @RequestMapping(path="/signin", method = RequestMethod.POST)
    public SignInResponse signin(@RequestBody User user){
        return userService.signin(user);
    }

    @RequestMapping(path="/checksession",method = RequestMethod.POST) // Map ONLY POST Requests
    public SignInResponse CheckSession (@RequestBody User user) {
        return userService.checkSession(user);
    }

    @RequestMapping(path="/update",method = RequestMethod.POST) // Map ONLY POST Requests
    public SignInResponse Update (@RequestBody User user) {
        return userService.update(user);
    }

    @RequestMapping(path="/suggestions",method = RequestMethod.POST) // Map ONLY POST Requests
    public SuggestionResponse AllUsers (@RequestBody General general) {
        return userService.allUsers(general.getData1());
    }

    @RequestMapping(path="/activities",method = RequestMethod.POST) // Map ONLY POST Requests
    public List<Activity> AllUsers (@RequestBody User user) {
        return userService.getActivities(user);
    }

}
