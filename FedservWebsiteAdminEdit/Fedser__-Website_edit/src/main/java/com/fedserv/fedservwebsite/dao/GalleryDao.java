package com.fedserv.fedservwebsite.dao;

import com.fedserv.fedservwebsite.model.Gallery;
import com.fedserv.fedservwebsite.model.VideoDetails;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Repository
public class GalleryDao {

    @Autowired
    EntityManager entityManager;

    public String addGallery(MultipartFile file, int index) {

        try {
            Gallery gallery = new Gallery();
            gallery.setData(file.getBytes());
            gallery.setIndexNumber(index);
            Session currentSession = entityManager.unwrap(Session.class);
            currentSession.clear();
            currentSession.saveOrUpdate(gallery);
            currentSession.close();
            return "true";
        } catch (Exception e) {
            return "false";
        }

    }

    public List<Gallery> getGalleryDetails() {
        try {
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("FROM GALLERY_DETAILS", Gallery.class);
            List<Gallery> resultList = query.getResultList();
            currentSession.close();
            return resultList;

        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public int getGalleryIndex() {

        try {
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("FROM GALLERY_DETAILS AS g ORDER BY g.indexNumber DESC", Gallery.class);
            List<Gallery> galleryList = query.getResultList();
            currentSession.close();
            if (galleryList.isEmpty()) {
                return 1;
            } else {
                return galleryList.get(0).getIndexNumber() + 1;
            }
        } catch (Exception e) {
            return -1;
        }


    }


    public String deletePhoto(int index) {
        try {
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("DELETE FROM GALLERY_DETAILS AS g WHERE g.indexNumber = :index");
            query.setParameter("index", index);
            int rowsAffected = query.executeUpdate();
            System.out.println("Rows affected: " + rowsAffected);
            return "true";
        } catch (Exception e) {
            e.printStackTrace();
            return "false";
        }
    }

    public String addVideo(MultipartFile file) {
        try {
            VideoDetails video = new VideoDetails();
            video.setData(file.getBytes());
            Session currentSession = entityManager.unwrap(Session.class);
            currentSession.clear();
            currentSession.saveOrUpdate(video);
            currentSession.close();
            return "true";
        } catch (Exception e) {
            return "false";

        }
    }

    public VideoDetails getVideoDetails() {
        try {
            Session currentSession = entityManager.unwrap(Session.class);
            Query query = currentSession.createQuery("FROM VIDEO_DETAILS", VideoDetails.class);
            List<VideoDetails> videoDetails = query.getResultList();
            currentSession.close();
            if (!videoDetails.isEmpty()) {
                return videoDetails.get(0);
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


}

