import React from 'react';
import { Sparkles } from 'lucide-react';

const ChatSummary = ({ contact, messages = [] }) => {
  // Generate a simple summary based on messages
  const generateSummary = () => {
    if (!messages || messages.length === 0) {
      return {
        keyPoints: ['No messages in this conversation yet.'],
        sentiment: 'neutral',
        suggestedActions: ['Send a greeting to start the conversation.']
      };
    }

    // Count message types
    const messageCount = messages.length;
    const myMessages = messages.filter(msg => msg.sender === 'me').length;
    const theirMessages = messageCount - myMessages;
    
    // Simple sentiment analysis (in a real app, this would be more sophisticated)
    const positiveWords = ['great', 'thanks', 'happy', 'good', 'awesome', 'perfect'];
    const negativeWords = ['problem', 'issue', 'angry', 'unhappy', 'bad', 'terrible'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    messages.forEach(msg => {
      const text = msg.text.toLowerCase();
      positiveWords.forEach(word => {
        if (text.includes(word)) positiveCount++;
      });
      negativeWords.forEach(word => {
        if (text.includes(word)) negativeCount++;
      });
    });
    
    const sentiment = 
      positiveCount > negativeCount * 2 ? 'positive' :
      negativeCount > positiveCount * 2 ? 'negative' : 'neutral';
    
    // Generate key points
    const keyPoints = [];
    
    if (messageCount > 0) {
      keyPoints.push(`Conversation has ${messageCount} messages in total.`);
      keyPoints.push(`You've sent ${myMessages} messages, received ${theirMessages}.`);
      
      // Add first and last message previews
      const firstMessage = messages[0].text;
      const lastMessage = messages[messages.length - 1].text;
      
      if (firstMessage.length > 50) {
        keyPoints.push(`Started with: "${firstMessage.substring(0, 50)}..."`);
      } else {
        keyPoints.push(`Started with: "${firstMessage}"`);
      }
      
      if (lastMessage.length > 50) {
        keyPoints.push(`Latest message: "${lastMessage.substring(0, 50)}..."`);
      } else {
        keyPoints.push(`Latest message: "${lastMessage}"`);
      }
    }
    
    // Generate suggested actions
    const suggestedActions = [];
    
    if (messageCount === 0) {
      suggestedActions.push('Send a greeting to start the conversation.');
    } else if (sentiment === 'positive') {
      suggestedActions.push('Consider asking if they need any more assistance.');
      suggestedActions.push('You could suggest scheduling a follow-up.');
    } else if (sentiment === 'negative') {
      suggestedActions.push('Consider apologizing for any inconvenience.');
      suggestedActions.push('Offer to escalate the issue if needed.');
    } else {
      suggestedActions.push('Ask if they have any questions.');
    }
    
    return {
      keyPoints,
      sentiment,
      suggestedActions
    };
  };
  
  const summary = generateSummary();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-3">
        <div className="p-1.5 bg-purple-100 rounded-lg">
          <Sparkles className="w-4 h-4 text-purple-600" />
        </div>
        <h4 className="text-sm font-medium text-gray-900">Conversation Summary</h4>
      </div>
      
      <div className="space-y-3">
        <div>
          <h5 className="text-xs font-medium text-gray-500 mb-1">KEY POINTS</h5>
          <ul className="space-y-1.5">
            {summary.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-2 flex-shrink-0"></div>
                <span className="text-xs text-gray-700">{point}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="text-xs font-medium text-gray-500 mb-1">SENTIMENT</h5>
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            summary.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
            summary.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {summary.sentiment.charAt(0).toUpperCase() + summary.sentiment.slice(1)}
          </div>
        </div>
        
        <div>
          <h5 className="text-xs font-medium text-gray-500 mb-1">SUGGESTED ACTIONS</h5>
          <div className="space-y-2">
            {summary.suggestedActions.map((action, index) => (
              <div key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 mr-2 flex-shrink-0"></div>
                <span className="text-xs text-gray-700">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSummary;
