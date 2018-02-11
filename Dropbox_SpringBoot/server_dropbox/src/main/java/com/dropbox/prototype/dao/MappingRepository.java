package com.dropbox.prototype.dao;

import com.dropbox.prototype.models.Mapping;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MappingRepository extends CrudRepository<Mapping, Integer> {

    List<Mapping> findMappingByFolderid(int folderid);

    List<Mapping> findAllByContentid(int contentid);

    @Transactional
    void deleteByContentidAndUserid(int contentid, int userid);
}
