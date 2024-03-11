import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),

    newMessageCollection: [],
    setNewMessageCollection: (newValue) => {
        set((state) => {
            // Check if newValue already exists in newMessageCollection
            if (newValue === null) {
                return { newMessageCollection: [] }
            }
            if (!state.newMessageCollection.includes(newValue)) {
                // If not exists, push the newValue to newMessageCollection
                const updatedCollection = [...state.newMessageCollection, newValue];
                return { newMessageCollection: updatedCollection };
            }
            // If exists, return the current state
            return state;
        });
    },

    demo: 0,
    setDemo: (demo) => set({ demo }),
}))

export default useConversation;