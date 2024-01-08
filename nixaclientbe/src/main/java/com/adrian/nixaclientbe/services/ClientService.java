package com.adrian.nixaclientbe.services;

import com.adrian.nixaclientbe.exceptions.RequestValidationException;
import com.adrian.nixaclientbe.exceptions.ResourceNotFoundException;
import com.adrian.nixaclientbe.models.Client;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class ClientService implements ClientServiceSpec {
    private static final String COLLECTION_NAME = "clients";

    @Override
    public List<Client> getAllClients() throws ExecutionException, InterruptedException {
        var fireStore = this.getFirestore();
        var apiFuture = fireStore.collection(COLLECTION_NAME).get();

        return apiFuture.get().getDocuments().stream()
                .map( doc -> doc.toObject(Client.class))
                .toList();
    }

    @Override
    public List<Client> getAllClientsSorted(String key, String sortDirection) throws ExecutionException, InterruptedException {
        Query.Direction queryDirection;

        switch (sortDirection) {
            case "asc" ->   queryDirection = Query.Direction.ASCENDING;

            case "desc" -> queryDirection = Query.Direction.DESCENDING;

            default -> throw new RequestValidationException("sortDirection query param must be asc or desc");
        }

        var firestore = this.getFirestore();
        var apiFuture = firestore.collection(COLLECTION_NAME).orderBy(key, queryDirection).get();

        return apiFuture.get()
                .getDocuments()
                .stream()
                .map(doc -> doc.toObject(Client.class))
                .toList();
    }

    @Override
    public Client addNewClient(Client client) throws ExecutionException, InterruptedException {
        var firestore = this.getFirestore();
        var docRef = firestore.collection(COLLECTION_NAME).document();
        client.setId(docRef.getId());
        docRef.set(client).get();
        var apiFuture =  firestore.collection(COLLECTION_NAME).document(client.getId()).get();
        return apiFuture.get().toObject(Client.class);
    }

    @Override
    public Client getClientById(String clientId) throws ExecutionException, InterruptedException {
        var firestore = this.getFirestore();
        var apiFuture = firestore.collection(COLLECTION_NAME).document(clientId).get();
        var optionalClient = Optional.ofNullable(apiFuture.get().toObject(Client.class));

        if (optionalClient.isEmpty()){
            throw new ResourceNotFoundException("No client with id %s present".formatted(clientId));
        }

        return optionalClient.get();
    }

    @Override
    public void deleteClientById(String clientId) throws ExecutionException, InterruptedException {
        this.getClientById(clientId);
        var firestore = getFirestore();
        var docRef = firestore.collection(COLLECTION_NAME).document(clientId);
        docRef.delete().get();
    }

    @Override
    public Client updateClient(Client client) throws ExecutionException, InterruptedException {
        this.getClientById(client.getId());
        var firestore = getFirestore();
        var docRef = firestore.collection(COLLECTION_NAME).document(client.getId());
        docRef.set(client).get();
        return this.getClientById(client.getId());
    }





    private Firestore getFirestore() {
        return FirestoreClient.getFirestore();
    }
}
