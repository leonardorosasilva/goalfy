package com.app.goalfybackend.domain.service;

import com.app.goalfybackend.domain.dto.ClientRequestDTO;
import com.app.goalfybackend.domain.dto.ClientsResponseDTO;
import com.app.goalfybackend.domain.exception.ClientNotFoundException;
import com.app.goalfybackend.infrastructure.entity.ClientsEntity;
import com.app.goalfybackend.infrastructure.repository.JPAClientsRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientsService {
    private final JPAClientsRepository clientsRepository;

    public ClientsService(JPAClientsRepository clientsRepository) {
        this.clientsRepository = clientsRepository;
    }

    @Transactional(readOnly = true)
    public List<ClientsResponseDTO> getAllClients() {
        return clientsRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ClientsResponseDTO> searchClients(String searchTerm) {
        return clientsRepository.findAll().stream()
                .filter(client -> client.getName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                                client.getEmail().toLowerCase().contains(searchTerm.toLowerCase()) ||
                                client.getCnpj().contains(searchTerm) ||
                                client.getTelephone().contains(searchTerm))
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ClientsResponseDTO getClientById(Long id) {
        ClientsEntity clientsEntity = clientsRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Cliente não encontrado", id));
        return toDTO(clientsEntity);
    }

    @Transactional
    public ClientsResponseDTO createClient(ClientRequestDTO requestDTO) {
        ClientsEntity entity = new ClientsEntity();
        entity.setName(requestDTO.getName());
        entity.setEmail(requestDTO.getEmail());
        entity.setTelephone(requestDTO.getTelephone());
        entity.setCnpj(requestDTO.getCnpj());
        entity.setCep(requestDTO.getCep());
        entity.setAddress(requestDTO.getAddress());
        entity.setCity(requestDTO.getCity());

        ClientsEntity savedEntity = clientsRepository.save(entity);
        return toDTO(savedEntity);
    }

    @Transactional
    public ClientsResponseDTO updateClient(Long id, ClientRequestDTO requestDTO) {
        ClientsEntity entity = clientsRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Cliente não encontrado", id));

        entity.setName(requestDTO.getName());
        entity.setEmail(requestDTO.getEmail());
        entity.setTelephone(requestDTO.getTelephone());
        entity.setCnpj(requestDTO.getCnpj());
        entity.setCep(requestDTO.getCep());
        entity.setAddress(requestDTO.getAddress());
        entity.setCity(requestDTO.getCity());

        ClientsEntity updatedEntity = clientsRepository.save(entity);
        return toDTO(updatedEntity);
    }

    @Transactional
    public void deleteClient(Long id) {
        ClientsEntity entity = clientsRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Cliente não encontrado", id));
        clientsRepository.delete(entity);
    }

    private ClientsResponseDTO toDTO(ClientsEntity entity) {
        return new ClientsResponseDTO(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getTelephone(),
                entity.getCnpj(),
                entity.getCep(),
                entity.getAddress(),
                entity.getCity()
        );
    }
}

