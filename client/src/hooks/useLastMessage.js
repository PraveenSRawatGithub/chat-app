export default function useLastMessage() {
    const getLastMessage = async (receiverId) => {
        try {
            let id = receiverId;
            const res = await fetch(`/api/messages/getLastMessage/${id}`)
            const data = await res.json();
            // console.log(data);

            return data.message;
        } catch (error) {
            console.log("Error in last message: ", error);
        }
    }

    return {getLastMessage}
}
