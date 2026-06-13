package smartscape.auth.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import smartscape.core.Role;

@Data
public class UserRegistrationRequest {
    @NotBlank(message = "Номер телефона не может быть пустым")
    @Size(min = 11, max = 11, message = "Длина номера должна быть 11 символов")
    private String phone;

    @NotBlank(message = "Пароль не может быть пустым")
    @Size(min = 8, message = "Длина пароля от 8 символов!")
    private String password;

    @NotNull(message = "Вы обязаны выбрать роль")
    private Role role;

}