package smartscape.modules.ai;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AiController {

    private final TextAIParser aiParser;

    public AiController(TextAIParser aiParser) {
        this.aiParser = aiParser;
    }

    @PostMapping("/chat")
    public ResponseEntity<AiChatResponse> chat(@Valid @RequestBody AiChatRequest request) {
        String response = aiParser.chatWithAssistant(request.getMessage());
        return ResponseEntity.ok(new AiChatResponse(response));
    }
}
