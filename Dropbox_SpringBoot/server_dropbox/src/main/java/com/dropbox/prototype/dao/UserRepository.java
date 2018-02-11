package com.dropbox.prototype.dao;

import com.dropbox.prototype.models.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findUserByEmail(String email);
    User findUserByEmailAndPassword(String email, String password);
    List<User> findUsersByEmailStartsWith(String keyword);
    List<User> findUsersByFirstnameStartsWith(String keyword);
    List<User> findUsersByIdIn(List<Integer> userid);


}

