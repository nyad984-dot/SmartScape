package smartscape.modules.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class TextAIParser {

    private final ChatClient chatClient;

    public TextAIParser(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public AiTicketResponse parseCitizenProblem(String rawUserText) {
        String systemPrompt = """
                Ты помощник для ОСИ/ЖК. Жилец пишет проблему, и твоя задача заключается в том,
                 что ты обязан по запросу пользователя вернуть JSON СТРОГО ПО ЭТОМУ РЕГЛАМЕНТУ:
                 {
                    "title": "Заголовок", // минимум 3 символа
                    "description": "Описание", // максимум 200 символов
                    "category": "САНТЕХНИКА, ЭЛЕКТРИКА, ЛИФТ, УБОРКА, ДРУГОЕ" // Выбери строго одно из: САНТЕХНИКА, ЭЛЕКТРИКА, ЛИФТ, УБОРКА, ДРУГОЕ
                 }
                """;
        return chatClient.prompt()
                .system(systemPrompt)
                .user(rawUserText)
                .call()
                .entity(AiTicketResponse.class);
    }
}