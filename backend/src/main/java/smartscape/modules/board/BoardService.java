package smartscape.modules.board;

import smartscape.auth.user.UserEntity;
import smartscape.auth.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    @Transactional
    public BoardEntity create(BoardEntity board) {
        return boardRepository.save(board);
    }

    @Transactional
    public void delete(Long id) {
        boardRepository.delete(getBoardById(id));
    }

    @Transactional(readOnly = true)
    public List<BoardEntity> getAllBoards() {
        return boardRepository.findAll();
    }

    @Transactional(readOnly = true)
    public BoardEntity getBoard(Long id) {
        return getBoardById(id);
    }

    @Transactional(readOnly = true)
    public BoardEntity getBoardByOsiId(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Такого юзера с ID: " + id + " не существует."));
        return boardRepository.findByOsiId(user.getId()).get();
    }

    private BoardEntity getBoardById(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Такой доски с ID: " + id + " не существует."));
    }
}
