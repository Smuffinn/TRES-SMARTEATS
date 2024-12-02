// package com.g4appdev.TES.JWT;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;
// import io.jsonwebtoken.ExpiredJwtException;
// import io.jsonwebtoken.JwtException;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.stereotype.Component;
// import com.g4appdev.TES.Admin.AdminEntity;

// import java.util.Date;

// @Component
// public class JwtTokenUtil {

//     @Value("${jwt.secret.key}")  // Reading the secret key from the properties file
//     private String secretKey;

//     @Value("${jwt.expiration.time}")  // Expiration time from properties file (in milliseconds)
//     private long expirationTime;

//     // Generate JWT Token
//     public String generateToken(AdminEntity admin) {
//         return Jwts.builder()
//                 .setSubject(admin.getEmail())
//                 .setIssuedAt(new Date())
//                 .setExpiration(new Date(System.currentTimeMillis() + expirationTime))  // Using configurable expiration time
//                 .signWith(SignatureAlgorithm.HS256, secretKey)
//                 .compact();
//     }

//     // Extract username (email in this case) from the token
//     public String extractUsername(String token) {
//         return extractClaims(token).getSubject();
//     }

//     // Extract Claims from the token
//     private Claims extractClaims(String token) {
//         try {
//             return Jwts.parser()
//                     .setSigningKey(secretKey)
//                     .parseClaimsJws(token)
//                     .getBody();
//         } catch (ExpiredJwtException e) {
//             throw new JwtException("Token is expired", e);
//         } catch (JwtException e) {
//             throw new JwtException("Invalid token", e);
//         }
//     }

//     // Check if the token is expired
//     public boolean isTokenExpired(String token) {
//         return extractClaims(token).getExpiration().before(new Date());
//     }

//     // Optionally, you can add a method for refreshing the token if it's expired (if needed)
//     public String refreshToken(String token) {
//         if (isTokenExpired(token)) {
//             String username = extractUsername(token);
//             // Assuming we can fetch the admin again based on email, you could extend the logic to refresh the token
//             AdminEntity admin = findAdminByEmail(username);
//             return generateToken(admin);
//         }
//         return token;
//     }

//     // Dummy method to get admin by email (You will need to implement this)
//     private AdminEntity findAdminByEmail(String email) {
//         // Query the database or repository to get the admin based on the email
//         return new AdminEntity();  // This should return an actual admin entity from the database
//     }
// }
