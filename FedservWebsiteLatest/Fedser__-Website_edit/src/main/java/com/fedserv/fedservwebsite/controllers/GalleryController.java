package com.fedserv.fedservwebsite.controllers;

import com.fedserv.fedservwebsite.model.Gallery;
import com.fedserv.fedservwebsite.service.GalleryService;
import com.sun.xml.internal.ws.server.ServerRtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GalleryController {

    @Autowired
    GalleryService galleryService;

    @PostMapping("/addGallery")

    public String addGallery(@RequestParam("photo") MultipartFile file,@RequestParam int index){
        return galleryService.addGallery(file,index);
    }
    @PostMapping("/fetchGalleryDetails")
    public  List<Gallery>  getGalleryDetails(){
        return galleryService.getGalleryDetails();
    }
    @GetMapping("/fetchGalleryIndex")
    public  int fetchGalleryIndex(){
        return galleryService.fetchIndex();
    }

    @PostMapping("/deletePhoto")
    public  String deletePhoto(@RequestParam int index){
        return galleryService.deletePhoto(index);
    }
}
