package com.fedserv.fedservwebsite.model;

import javax.persistence.*;
@Entity(name = "VIDEO_DETAILS")
@Table(name = "VIDEO_DETAILS")
public class VideoDetails {

    @Id
    @Column(name = "ID")
    private int id; // Fixed primary key

    @Column(name = "DATA")
    @Lob
    private byte[] data;

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
}
