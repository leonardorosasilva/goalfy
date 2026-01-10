package com.app.goalfybackend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientRequestDTO {
    private String name;
    private String email;
    private String telephone;
    private String cnpj;
    private String cep;
    private String address;
    private String city;
}

