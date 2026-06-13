import { useSearchParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import ChatWindow from '../components/assistant/ChatWindow';
import { useAssistant } from '../hooks/useAssistant';

export default function AssistantPage() {
  const [searchParams] = useSearchParams();
  const { messages, isTyping, sendMessage } = useAssistant();

  const zhkName = searchParams.get('name');
  const dashId = searchParams.get('dashId');

  const title = zhkName ? `AI Assistant: ${zhkName}` : 'City Safety Assistant';
  const description = zhkName 
    ? `Interact with the smart AI for ${zhkName} (Dashboard ID: ${dashId}) to analyze incidents and view status.`
    : 'Interact with the smart city safety AI to categorize incidents, analyze priorities, or review response guidelines.';

  return (
    <>
      <PageHeader
        description={description}
        eyebrow={zhkName ? "Dashboard Co-pilot" : "AI Co-pilot"}
        title={title}
      />
      <div className="mt-6">
        <ChatWindow messages={messages} isTyping={isTyping} onSend={sendMessage} />
      </div>
    </>
  );
}
