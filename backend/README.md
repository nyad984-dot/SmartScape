# SmartScape Backend

SmartScape - это интеллектуальная платформа для автоматизации управления городскими тикетами и ресурсами. Система использует возможности **Google Gemini AI** для анализа запросов.

##  Технологический стек
- **Java 21**
- **Spring Boot 4.1.0**
- **Spring AI (Google Gemini)**
- **Spring Security**
- **PostgreSQL**
- **Docker & Docker Compose**

##  Быстрый старт

Убедитесь, что у вас установлены **Docker Desktop** и **PostgreSQL**.

### 1. Клонирование репозитория
```bash
git clone git@github.com:nyad984-dot/SmartScape.git
```

``` bash
cd SmartScape
```

### 2. Запуск проекта

Просто выполните команду:

```bash
docker compose up --build
```

После завершения сборки приложение будет доступно по адресу: `http://localhost:8080`.

### 3. API Документация

Swagger UI автоматически генерирует документацию при запуске приложения:
`http://localhost:8080/swagger-ui.html`

### 4. Инструкция для запуска:

Установите ngrok
### 5. Установите ngrok:
macOS (через Homebrew):
``` bash
brew install ngrok/ngrok/ngrok
```
Windows (через PowerShell):
``` bash
winget install ngrok.ngrok
```
(Или скачайте архив с официального сайта: https://ngrok.com).


### 6. Запустите туннель:
После того как проект запущен через docker compose up, откройте новый терминал и выполните:

``` bash
 ngrok http 8080
```

### 7. Используйте URL:
Ngrok выдаст вам публичную ссылку. Вот главная: https://unnegotiated-apocalyptically-paulette.ngrok-free.dev/swagger-ui/index.html.

### И с помощью этой ссылки и моста со сборкой проекта через Docker у вас всё должно заработать :DDD
