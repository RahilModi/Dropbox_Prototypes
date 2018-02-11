package com.dropbox.prototype.dao;

import com.dropbox.prototype.models.Activity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ActivityRepository extends CrudRepository<Activity, Integer>{

    List<Activity> findAllByUserId(int id);
}
