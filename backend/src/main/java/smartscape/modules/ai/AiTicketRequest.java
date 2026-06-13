package smartscape.modules.ai;

import lombok.Data;

@Data
public class AiTicketRequest {
    private Long boardId;
    private String rawUSerText;
    private String photoUrl;
}
