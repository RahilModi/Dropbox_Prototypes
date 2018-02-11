package com.dropbox.prototype.dao;

import com.dropbox.prototype.models.Content;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ContentRepository extends CrudRepository<Content, Integer> {
    List<Content> findAllByUserid(int userid);

    Content findAllByUseridAndOriginalname(int userid, String root);

    List<Content> findAllByContentidIn(List<Integer>contentid);

    @Transactional
    void deleteByContentid(int contentid);


}
