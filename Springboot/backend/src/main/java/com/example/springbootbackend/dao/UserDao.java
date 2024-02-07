package com.example.springbootbackend.dao;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Repository
public class UserDao {

    private final static List<UserDetails> APPLICATION_USERS = generateUsers();

    private static List<UserDetails> generateUsers() {
        List<UserDetails> users = new ArrayList<>();

        for (int i = 1; i <= 100; i++) {
            String username = "user" + i + "@gmail.com";
            String password = "password";
            List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

            UserDetails user = new User(username, password, authorities);
            users.add(user);
        }

        return Collections.unmodifiableList(users);
    }

    public UserDetails findUserByEmail(String email){
        return APPLICATION_USERS
                .stream()
                .filter(u-> u.getUsername().equals(email))
                .findFirst()
                .orElseThrow(() -> new UsernameNotFoundException("No user was found"))
                ;
    }
}
