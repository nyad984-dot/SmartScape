package smartscape.auth.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class LoginRequest {
    @NotBlank(message = "Минимум и максимум 11 символов")
    @Size(min = 11, max = 11)
    private String phone;

    @NotBlank(message = "Минимум 8 символов")
    @Size(min = 8)
    private String password;
}
