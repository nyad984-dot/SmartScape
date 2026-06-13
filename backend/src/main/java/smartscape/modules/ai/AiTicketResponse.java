package smartscape.modules.ai;

import smartscape.core.Category;
import lombok.Data;

@Data
public class AiTicketResponse {
    private String title;
    private String description;
    private Category category;
}