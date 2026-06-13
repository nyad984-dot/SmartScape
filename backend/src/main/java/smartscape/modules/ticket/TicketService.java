package smartscape.modules.ticket;
import smartscape.auth.user.UserEntity;
import smartscape.auth.user.UserRepository;
import smartscape.core.Status;

import smartscape.modules.ai.AiTicketResponse;
import smartscape.modules.ai.TextAIParser;
import smartscape.modules.board.BoardEntity;
import smartscape.modules.board.BoardRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketService {
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private final BoardRepository boardRepository;
    private final TextAIParser aiParser;


    @Transactional
    public TicketEntity create(Long userId, Long boardId, String rawUserText, String photoUrl) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Пользователь с ID: " + userId + " не найден."));
        BoardEntity board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Дэшборд с ID: " + boardId + " не найден."));

        AiTicketResponse aiResponse = aiParser.parseCitizenProblem(rawUserText);

        TicketEntity ticket = new TicketEntity();
        ticket.setTitle(aiResponse.getTitle());
        ticket.setDescription(aiResponse.getDescription());
        ticket.setStatus(Status.OPEN);
        ticket.setUser(user);
        ticket.setBoard(board);
        ticket.setPhotoUrl(photoUrl);

        return ticketRepository.save(ticket);
    }

    @Transactional
    public void delete(Long id) {
        ticketRepository.delete(findTicketById(id));
    }

    @Transactional(readOnly = true)
    public List<TicketEntity> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Transactional(readOnly = true)
    public TicketEntity getTicket(Long id) {
        return findTicketById(id);
    }

    @Transactional
    public TicketEntity update(Long id, Status newStatus) {
        TicketEntity ticket = findTicketById(id);

        ticket.setStatus(newStatus);

        return ticketRepository.save(ticket);
    }

    private TicketEntity findTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Такого запроса с ID: " + id + " не существует."));
    }
}
