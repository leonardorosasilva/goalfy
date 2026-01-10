package com.app.goalfybackend.domain.exception;



public class ClientNotFoundException extends DomainException {

    private final Long clientId;

    public ClientNotFoundException(String message, Long clientId) {

        super(String.format("Cliente não encontrado"));
        this.clientId = clientId;
    }

    public Long getClientId() {
        return clientId;
    }
}
