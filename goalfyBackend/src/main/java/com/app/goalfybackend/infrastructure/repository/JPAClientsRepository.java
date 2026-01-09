package com.app.goalfybackend.infrastructure.repository;

import com.app.goalfybackend.infrastructure.entity.ClientsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JPAClientsRepository extends JpaRepository<ClientsEntity, Long> {
    

}   
