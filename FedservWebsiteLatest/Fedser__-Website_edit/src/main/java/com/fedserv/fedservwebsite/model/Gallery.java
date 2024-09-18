package com.fedserv.fedservwebsite.model;

import javax.persistence.*;

@Entity(name = "GALLERY_DETAILS")
@Table(name = "GALLERY_DETAILS")

public class Gallery {

        @Id
        @Column(name = "ID")
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "gallery_generator")
        @SequenceGenerator(name = "gallery_generator", sequenceName = "gallery_generator_seq", allocationSize = 1)
        int id;
        @Column(name = "DATA")
        @Lob
        private byte[] data;
        @Column(name="INDEX_NUMBER",nullable=false,unique = true)
        private int indexNumber;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public int getIndexNumber() {
        return indexNumber;
    }

    public void setIndexNumber(int indexNumber) {
        this.indexNumber = indexNumber;
    }
}
