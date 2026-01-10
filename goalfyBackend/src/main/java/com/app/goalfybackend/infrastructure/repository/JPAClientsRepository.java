package com.app.goalfybackend.infrastructure.repository;

import com.app.goalfybackend.infrastructure.entity.ClientsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface JPAClientsRepository extends JpaRepository<ClientsEntity, Long> {
    Optional<ClientsEntity> findById(Long id);
    Optional<ClientsEntity> findByName(String name);
    Optional<ClientsEntity> findByEmail(String email);
    Optional<ClientsEntity> findByCnpj(String cnpj);
}   
