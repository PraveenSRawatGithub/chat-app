export const useUpdateSeenStatus = () => {
  const updateSeenStatus = async (messageId) => {
    try {
      let res = await fetch(`/api/messages/updateSeenStatus/${messageId}`);
      let data = await res.json();

    } catch (error) {
      console.log("Error updating status: ", error.message);
    }
  }

  return { updateSeenStatus }
}
