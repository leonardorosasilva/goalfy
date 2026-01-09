package com.app.goalfybackend.domain.exception;
import com.app.goalfybackend.domain.exception.DomainException; 

public class InvalidCnpjException extends DomainException {
    public InvalidCnpjException(String message) {
        super(message);
    }
}
