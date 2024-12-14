import { Memory } from "@/types";

// Fetch all memories by id
export const fetchMemories = async (userId: string): Promise<Memory[]> => {
  try {
    const res = await fetch(`/api/memories/read?user_id=${userId}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch memories: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching memories:", error);
    return [];
  }
};

// Add a new memory
export const addMemory = async (memoryData: Partial<Memory>): Promise<Memory | null> => {
  try {
    const res = await fetch(`/api/memories/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memoryData),
    });

    if (!res.ok) {
      throw new Error(`Failed to add memory: ${res.statusText}`);
    }

    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error("Error adding memory:", error);
    return null;
  }
};

// Update an existing memory
export const updateMemory = async (memoryData: Partial<Omit<Memory, "id">> & { id: number }): Promise<Memory | null> => {
  try {
    const res = await fetch(`/api/memories/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memoryData),
    });

    if (!res.ok) {
      throw new Error(`Failed to update memory: ${res.statusText}`);
    }

    const data = await res.json();
    return data[0];
  } catch (error) {
    console.error("Error updating memory:", error);
    return null;
  }
};

// Delete a memory
export const deleteMemory = async (memoryId: number): Promise<boolean> => {
  try {
    const res = await fetch(`/api/memories/delete?memory_id=${memoryId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete memory: ${res.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting memory:", error);
    return false;
  }
};
