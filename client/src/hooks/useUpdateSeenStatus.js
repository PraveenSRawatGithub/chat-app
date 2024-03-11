export const useUpdateSeenStatus = () => {
  const updateSeenStatus = async(messageId) => {
    try {
        let res = await fetch(`/api/messages/updateSeenStatus/${messageId}`);
        let data = await res.json();

        console.log("message status: ", data);
    } catch (error) {
        console.log("Error updating status: ", error.message);
    }
  }

  return {updateSeenStatus}
}
