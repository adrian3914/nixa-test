package com.adrian.nixaclientbe.services;

import com.adrian.nixaclientbe.models.Client;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface ClientServiceSpec {
    Client addNewClient(Client client) throws ExecutionException, InterruptedException;
    Client getClientById(String clientId) throws ExecutionException, InterruptedException;
    void deleteClientById(String clientId) throws ExecutionException, InterruptedException;
    Client updateClient(Client client) throws ExecutionException, InterruptedException;
    List<Client> getAllClients() throws ExecutionException, InterruptedException;
    List<Client> getAllClientsSorted(String key, String sortDirection) throws ExecutionException, InterruptedException;
}
