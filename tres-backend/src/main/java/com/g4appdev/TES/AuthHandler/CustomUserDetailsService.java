package com.g4appdev.TES.AuthHandler;

import com.g4appdev.TES.Staff.Staff;
import com.g4appdev.TES.Staff.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;
import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private StaffRepository staffRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Staff staff = staffRepository.findByEmail(email);
        if (staff == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new User(staff.getEmail(), staff.getPassword(), new ArrayList<>());
    }
}