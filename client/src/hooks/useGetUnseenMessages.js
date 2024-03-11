export const useGetUnseenMessages = () => {
    const getUnseenMessages = async (id) => {
        try {
            const res = await fetch(`/api/messages/getUnseenMessages/${id}`);
            const data = await res.json();
            return data.unseen;

        } catch (error) {
            console.log("error in get unseen messages: ", error.message);
        }
    }

    return { getUnseenMessages }
}
