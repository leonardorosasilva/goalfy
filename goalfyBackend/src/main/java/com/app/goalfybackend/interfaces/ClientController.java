package com.app.goalfybackend.interfaces;

import com.app.goalfybackend.domain.dto.ClientRequestDTO;
import com.app.goalfybackend.domain.dto.ClientsResponseDTO;
import com.app.goalfybackend.domain.service.ClientsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin(origins = "*")
public class ClientController {

    private final ClientsService clientsService;

    public ClientController(ClientsService clientsService) {
        this.clientsService = clientsService;
    }

    @GetMapping
    public ResponseEntity<List<ClientsResponseDTO>> getAllClients(
            @RequestParam(required = false) String search) {
        List<ClientsResponseDTO> clients;
        if (search != null && !search.isEmpty()) {
            clients = clientsService.searchClients(search);
        } else {
            clients = clientsService.getAllClients();
        }
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientsResponseDTO> getClientById(@PathVariable Long id) {
        ClientsResponseDTO client = clientsService.getClientById(id);
        return ResponseEntity.ok(client);
    }

    @PostMapping
    public ResponseEntity<ClientsResponseDTO> createClient(@RequestBody ClientRequestDTO requestDTO) {
        ClientsResponseDTO createdClient = clientsService.createClient(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientsResponseDTO> updateClient(
            @PathVariable Long id,
            @RequestBody ClientRequestDTO requestDTO) {
        ClientsResponseDTO updatedClient = clientsService.updateClient(id, requestDTO);
        return ResponseEntity.ok(updatedClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientsService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}

