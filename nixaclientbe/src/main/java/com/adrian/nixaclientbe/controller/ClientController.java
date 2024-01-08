package com.adrian.nixaclientbe.controller;

import com.adrian.nixaclientbe.models.Client;
import com.adrian.nixaclientbe.services.ClientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("api/v1/clients")
public class ClientController {
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping()
    public ResponseEntity<?> getAllClients() {
        try {
            var clientList = this.clientService.getAllClients();
            return new ResponseEntity<>(clientList, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<?> addNewClient(@RequestBody Client client) {
        try {
            var clientCreated = this.clientService.addNewClient(client);
            return new ResponseEntity<>(clientCreated, HttpStatus.CREATED);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{clientId}")
    public ResponseEntity<?> getClientById(@PathVariable("clientId") String clientId) {
        try {
            var client = this.clientService.getClientById(clientId);
            return new ResponseEntity<>(client, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{clientId}")
    public ResponseEntity<?> deleteClientById(@PathVariable("clientId") String clientId) {
        try {
            this.clientService.deleteClientById(clientId);
            return new ResponseEntity<>("Client with id %s deleted".formatted(clientId), HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateClient(@RequestBody Client client){
        try {
            var clientUpdated = this.clientService.updateClient(client);
            return new ResponseEntity<>(clientUpdated, HttpStatus.CREATED);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sort/{key}")
    public ResponseEntity<?> getClientsListSorted(@PathVariable("key") String key, @RequestParam String sortDirection){
        try {
            var sortedClientList = this.clientService.getAllClientsSorted(key, sortDirection);
            return new ResponseEntity<>(sortedClientList, HttpStatus.OK);
        } catch (ExecutionException | InterruptedException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
