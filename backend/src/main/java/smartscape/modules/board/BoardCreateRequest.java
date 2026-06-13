package smartscape.modules.board;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BoardCreateRequest {
    @NotBlank(message = "Название доски ЖК не может быть пустым")
    private String name;
}
