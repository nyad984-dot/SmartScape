package smartscape.auth.user;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import smartscape.core.Role;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Номер телефона не может быть пустым")
    @Size(min = 11, max = 11, message = "Длина номера телефона должна равняться 11 символам")
    @Column(unique = true, nullable = false)
    private String phone;

    @NotBlank(message = "Пароль не может быть пустым")
    @Size(min = 8, message = "Длина пароля от 8 символов!")
    @Column(nullable = false)
    private String password;

    @NotNull(message = "Вы обязаны выбрать роль")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Size(max = 36, message = "Недостаточное количество символов в токене.")
    @Column(nullable = false)
    private String token;
}