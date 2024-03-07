export default function groupMessagesByDate(messages) {
    const groupedMessage = [];
    let currentDate = null;

    messages.forEach(message => {
        const messageDate = new Date(message.createdAt).toDateString();

        if (messageDate !== currentDate) {
            groupedMessage.push({ date: messageDate, messages: [message] })
            currentDate = messageDate;
        }
        else {
            groupedMessage[groupedMessage.length - 1].messages.push(message);
        }
    });

    return groupedMessage;
}