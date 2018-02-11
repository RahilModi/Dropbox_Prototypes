package com.dropbox.prototype.controller;

import com.dropbox.prototype.entity.request.Delete;
import com.dropbox.prototype.entity.request.Folder;
import com.dropbox.prototype.entity.request.General;
import com.dropbox.prototype.entity.request.Share;
import com.dropbox.prototype.entity.response.ContentLoadResponse;
import com.dropbox.prototype.entity.response.Contents;
import com.dropbox.prototype.entity.response.Response;
import com.dropbox.prototype.entity.response.RootResponse;
import com.dropbox.prototype.models.Content;
import com.dropbox.prototype.models.User;
import com.dropbox.prototype.service.ContentService;
import com.dropbox.prototype.service.MappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/content")
public class ContentController {

    @Autowired
    private ContentService contentService;

    @Autowired
    private MappingService mappingService;


    private static String UPLOADED_FOLDER = System.getProperty("user.dir")+ "/src/main/resources/static/";


    @RequestMapping(path="/load",method = RequestMethod.POST)
    public ContentLoadResponse getFolderData(@RequestBody Folder folder) {
        return contentService.getFolderData(folder);
    }

    @RequestMapping(path="/root",method = RequestMethod.POST)
    public RootResponse getRoot(@RequestBody User user) {
        return contentService.getRoot(user);
    }
    @RequestMapping(path="/createfolder",method = RequestMethod.POST)
    public ContentLoadResponse CreateFolder(@RequestBody Folder folder) {
        return contentService.CreateFolder(folder);
    }

    @RequestMapping(path="/upload",method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ContentLoadResponse fileUpload(@RequestParam("file") MultipartFile multipartFile,
                                          @RequestParam("fileparent") String fileparent,
                                          @RequestParam("userid") String userid){

        // String email = (String) session.getAttribute("email");
        Content content = new Content();
        Date date = new Date();
        String virtualname= date+"_"+ multipartFile.getOriginalFilename();
        String filepath = UPLOADED_FOLDER + virtualname;
        Response response = new Response();
        ContentLoadResponse contentLoadResponse = new ContentLoadResponse();
        try {

            byte[] bytes = multipartFile.getBytes();
            Path path = Paths.get(filepath);
            Files.write(path, bytes);

            contentLoadResponse = contentService.UploadFile(multipartFile.getOriginalFilename(),
                    virtualname,Integer.parseInt(fileparent),Integer.parseInt(userid));

        } catch (IOException e) {
            response.setStatus("error");
            response.setMsg("Error in uploading, Please Try Again.");
            contentLoadResponse.setContents(null);
            contentLoadResponse.setResponse(response);
        }

        return contentLoadResponse;
    }


    @RequestMapping(path="/share",method = RequestMethod.POST)
    public Response Share(@RequestBody Share share) {
        System.out.println("shared " +share);
        return contentService.Share(share);
    }

    @RequestMapping(path="/removemember",method = RequestMethod.POST)
    public Response RemoveMember(@RequestBody General general) {
        return mappingService.RemoveMember(Integer.parseInt(general.getData1()),Integer.parseInt(general.getData2()));
    }

    @RequestMapping(path="/delete",method = RequestMethod.POST)
    public Response DeleteFile(@RequestBody Delete data) {
        return contentService.DeleteFile(data);
    }
    @RequestMapping(path="/dostar",method = RequestMethod.POST)
    public Response dostar(@RequestBody Contents data) {
        return contentService.dostar(data);
    }

}
