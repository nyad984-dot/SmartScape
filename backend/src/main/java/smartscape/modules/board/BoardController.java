package smartscape.modules.board;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import smartscape.auth.user.UserEntity;
import smartscape.auth.user.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
@Tag(name = "Доска для добавления, удаления и получения запросов")
public class BoardController {
    private final BoardService boardService;
    private final UserRepository userRepository;

    @PostMapping
    @Operation(summary = "Создание доски")
    @PreAuthorize("hasRole('OSI')")
    public ResponseEntity<?> createBoard(
           @Valid @RequestBody BoardCreateRequest request) {
        UserEntity user = (UserEntity) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        BoardEntity board = new BoardEntity();
        board.setName(request.getName());
        board.setOsiId(user.getId());
        BoardEntity savedboard = boardService.create(board);
        return new ResponseEntity<>(savedboard, HttpStatus.CREATED);
    }
    @DeleteMapping("/{id}")
    @Operation(summary = "Удаление доски")
    @PreAuthorize("hasRole('OSI')")
    public ResponseEntity<?> deleteBoard(
            @Valid @RequestParam Long id) {
        boardService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    @Operation(summary = "Получение всех досок")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllBoards() {
        return ResponseEntity.ok(boardService.getAllBoards());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Получение доски по ее ID")
    public ResponseEntity<?> getBoard(@PathVariable Long id) {
        return ResponseEntity.ok(boardService.getBoard(id));
    }

    @GetMapping("/osi/{osiId}")
    @Operation(summary = "Получение досок по ID ОСИ")
    public ResponseEntity<?> getBoardsByOsiId(@RequestParam Long OSIId) {
        return ResponseEntity.ok(boardService.getBoardByOsiId(OSIId));
    }
}