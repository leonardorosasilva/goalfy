package com.app.goalfybackend.domain.model;


public final class Cnpj {
    private final String value;
    
    private Cnpj(String value) {
        this.value = value;
    }

    public static Cnpj of(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("CPNJ não pode ser nulo");
        }


        return new Cnpj(value);
    }

    public String getValue() {
        return value;
    }
}