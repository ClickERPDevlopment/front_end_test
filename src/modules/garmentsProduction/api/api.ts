
export const fetchTnaTasksApi = async () => {
    const response = await fetch('/data/floor_list.json'); // fetch from public folder
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return { data };
};

// You can create more mock APIs similarly if needed