package com.app.goalfybackend.infrastructure.entity;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Getter
@Setter
@Entity
@Table(name = "clients")
@AllArgsConstructor
@NoArgsConstructor
public class ClientsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "telephone", nullable = false)
    private String telephone;

    @Column(name = "cnpj", nullable = false, unique = true)
    private String cnpj;

    @Column(name = "cep", nullable = false)
    private String cep;
    /*
     *    @Column(name = "address", nullable = false)
     *    private String address;
     *    
     *    @Column(name = "city", nullable = false)
     *    private String city;
    */
}