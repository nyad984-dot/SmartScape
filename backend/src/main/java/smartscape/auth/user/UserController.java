package smartscape.auth.user;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Аутентификация пользователей")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "Регистрация")
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserRegistrationRequest request) {
        UserEntity user = new UserEntity();
        user.setPhone(request.getPhone());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        userService.register(user);
        return ResponseEntity.ok("Регистрация прошла успешно!");
    }

    @Operation(summary = "Логин")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        UserEntity user = userRepository.findByPhone(loginRequest.getPhone())
                .orElseThrow(() -> new RuntimeException("Пользователь с таким номером телефона не существует"));
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Пароль неверный");
        }
        return ResponseEntity.ok(user.getToken());
    }
}
