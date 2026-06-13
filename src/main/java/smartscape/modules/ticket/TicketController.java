package smartscape.modules.ticket;

import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import smartscape.auth.user.UserEntity;
import smartscape.core.Status;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import smartscape.modules.ai.AiTicketRequest;
import smartscape.modules.board.BoardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/ticket")
@RequiredArgsConstructor
@Tag(name = "Доска для добавления, удаления и получения запросов")
public class TicketController {
    private final BoardService boardService;
    private final TicketService ticketService;

    @PostMapping
    @Operation(summary = "Создание запроса с ИИшкой")
    @PreAuthorize("hasRole('CITIZEN')")
    public ResponseEntity<?> createTicket(
            @Valid @RequestBody AiTicketRequest request) throws NullPointerException {
        UserEntity user = (UserEntity) Objects.requireNonNull(SecurityContextHolder
                        .getContext()
                        .getAuthentication())
                .getPrincipal();
        TicketEntity ticket = ticketService.create(
                user.getId(), request.getBoardId(), request.getRawUSerText(), request.getPhotoUrl()
        );

        TicketResponse response = TicketResponse.builder()
                .id(ticket.getId())
                .title(ticket.getTitle())
                .description(ticket.getDescription())
                .photoUrl(ticket.getPhotoUrl())
                .status(ticket.getStatus())
                .boardName(ticket.getBoard().getName())
                .authorPhone(ticket.getUser().getPhone())
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Выполнение (удаление) запроса")
    @PreAuthorize("hasRole('OSI')")
    public ResponseEntity<?> deleteTicket(
            @Valid @RequestParam Long id) {
        ticketService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Обновление статуса доски")
    @PreAuthorize("hasRole('OSI')")
    public ResponseEntity<?> updateTicketStatus(
            @Valid
            @PathVariable Long id,
            @RequestParam Status newStatus) {
        return ResponseEntity.ok(ticketService.update(id, newStatus));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Получение запроса по его ID")
    public ResponseEntity<?> getTicket(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getTicket(id));
    }

    @GetMapping()
    @Operation(summary = "Получение всех запросов для админа")
    public ResponseEntity<?> getAllTickets() {
        return ResponseEntity.ok(ticketService.getAllTickets());
    }

    @GetMapping("/osi/{osiId}")
    @Operation(summary = "Получение запросов по ID ОСИ")
    public ResponseEntity<?> getTicketsByOSIId(@RequestParam Long osiId) {
        return ResponseEntity.ok(boardService.getBoardByOsiId(osiId));
    }
}