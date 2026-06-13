package smartscape.modules.ticket;

import com.fasterxml.jackson.annotation.JsonIgnore;
import smartscape.auth.user.UserEntity;
import smartscape.core.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import smartscape.modules.board.BoardEntity;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tickets")
public class TicketEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 3, message = "Длина названия от 3 символов минимум!")
    @Column(nullable = false)
    private String title;

    @Size(message = "Длина названия от 3 символов минимум! Максимум - 200", max = 200)
    @Column(nullable = false)
    private String description;

    @NotBlank(message = "Вы обязаны разместить фото!")
    @Column(nullable = false)
    private String photoUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    @ToString.Exclude
    private BoardEntity board;
}
