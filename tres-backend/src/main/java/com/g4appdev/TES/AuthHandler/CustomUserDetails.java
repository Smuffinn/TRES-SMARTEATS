package com.g4appdev.TES.AuthHandler;

import com.g4appdev.TES.Staff.Staff;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(Staff staff) {
        this.email = staff.getEmail();
        this.password = staff.getPassword();
        this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_STAFF"));
    }

    // public CustomUserDetails(Student student) {
    //     this.email = student.getEmail();
    //     this.password = student.getPassword();
    //     this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_STUDENT"));
    // }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}