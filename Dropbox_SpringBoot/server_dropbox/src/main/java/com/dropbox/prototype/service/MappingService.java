package com.dropbox.prototype.service;

import com.dropbox.prototype.dao.MappingRepository;
import com.dropbox.prototype.entity.response.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MappingService {

    @Autowired
    private MappingRepository mappingRepository;

    public Response RemoveMember(int contentid, int userid){
        Response response = new Response();
        try{
            mappingRepository.deleteByContentidAndUserid(contentid,userid);
            response.setStatus("success");
            response.setMsg("Leave Group Successfully.");
        }
        catch (Exception e){
            response.setStatus("error");
            response.setMsg("Something went wrong."+e);
        }
        return response;
    }
}
