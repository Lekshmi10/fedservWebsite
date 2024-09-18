package com.fedserv.fedservwebsite.service;

import com.fedserv.fedservwebsite.dao.GalleryDao;

import com.fedserv.fedservwebsite.model.Gallery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class GalleryService {

    @Autowired
    GalleryDao galleryDao;
    @Transactional
public String addGallery(MultipartFile file,int index){

    return galleryDao.addGallery(file,index);
}
    public List<Gallery> getGalleryDetails(){

        return galleryDao.getGalleryDetails();
    }
    @Transactional
    public int fetchIndex(){

        return galleryDao.getGalleryIndex();
    }
    @Transactional
    public  String deletePhoto(int index){
        return galleryDao.deletePhoto(index);
    }
}
