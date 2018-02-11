package com.dropbox.prototype.service;

import com.dropbox.prototype.dao.ActivityRepository;
import com.dropbox.prototype.dao.ContentRepository;
import com.dropbox.prototype.dao.UserRepository;
import com.dropbox.prototype.entity.request.SignUpUser;
import com.dropbox.prototype.entity.response.Response;
import com.dropbox.prototype.entity.response.SignInResponse;
import com.dropbox.prototype.entity.response.SuggestionResponse;
import com.dropbox.prototype.models.Activity;
import com.dropbox.prototype.models.Content;
import com.dropbox.prototype.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ContentRepository contentRepository;
    @Autowired
    private ActivityRepository activityRepository;


    Response response = new Response();
    SignInResponse signInResponse = new SignInResponse();

    private void exceptionHandling(Exception e){
        response.setStatus("error");
        response.setMsg("Something went wrong, Try Again. Error Message :" + e.getMessage());
    }

    public SignInResponse signin(User user){
        try{
            System.out.println(user.getEmail());
            User _user = userRepository.findUserByEmailAndPassword(user.getEmail(), user.getPassword());
            if(_user == null){
                response.setStatus("error");
                response.setMsg("Email / Password may wrong.");
            }
            else{
                System.out.println("successfully logged in");
                response.setStatus("success");
                response.setMsg("Successfully Logged In with "+user.getEmail());
            }
            signInResponse.setUser(_user);
            signInResponse.setResponse(response);
        }catch (Exception e){
            exceptionHandling(e);
            signInResponse.setResponse(response);
        }
        return signInResponse;
    }

    public SignInResponse checkSession(User data){
        try{
            User user = userRepository.findOne(data.getId());
            if(user != null){
                response.setStatus("success");
                response.setMsg("");
            }else{
                response.setStatus("error");
                response.setMsg("Please Sign In.");
            }
            signInResponse.setUser(user);
            signInResponse.setResponse(response);
        }catch (Exception e){
            exceptionHandling(e);
            signInResponse.setResponse(response);
        }
        return signInResponse;
    }

    public Response signup(SignUpUser new_user){
        try{
            System.out.println("FirstName " + new_user.getFirstname());
            System.out.println("Email " +new_user.getEmail());
            User user = userRepository.findUserByEmail(new_user.getEmail());
            if(user != null){
                response.setStatus("error");
                response.setMsg("Already registered Email ID...");
            }else{
                user = userRepository.save(new User(new_user.getFirstname(),new_user.getLastname(), new_user.getEmail(),new_user.getPassword()));
                user.setSuggestions(new_user.getFirstname() + " " + new_user.getLastname() + " ( " + new_user.getEmail() + " )");
                Content content = new Content("root","root",new Date().toString(),user.getId(),"NO");
                contentRepository.save(content);
                response.setStatus("success");
                response.setMsg("Account Created successfully...!!");
            }
        }catch (Exception e){
            exceptionHandling(e);
        }
        return response;
    }

    public SignInResponse update(User data){
        try{
            User updated = userRepository.save(data);
            response.setStatus("success");
            response.setMsg("Profile has been updated");
            signInResponse.setUser(updated);
            signInResponse.setResponse(response);
        }catch (Exception e){
            exceptionHandling(e);
            signInResponse.setResponse(response);
        }
        return signInResponse;
    }

    public SuggestionResponse allUsers(String keyword){
        SuggestionResponse suggestion_resp = new SuggestionResponse();
        try{
            List<User> users = userRepository.findUsersByEmailStartsWith(keyword);
            users.addAll(userRepository.findUsersByFirstnameStartsWith(keyword));
            suggestion_resp.setUsers(users);
        }catch (Exception e){
            exceptionHandling(e);
            suggestion_resp.setUsers(null);
        }
        return suggestion_resp;
    }

    public List<Activity> getActivities(User user) {
        System.out.println(user.getId());
        return activityRepository.findAllByUserId(user.getId());
    }
}
