package smartscape.modules.ticket;

import lombok.Builder;
import lombok.Data;
import smartscape.core.Status;

@Data
@Builder
public class TicketResponse {
    private Long id;
    private String title;
    private String description;
    private String photoUrl;
    private Status status;
    private String boardName;
    private String authorPhone;
}