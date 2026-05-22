export const getHotels = async () => {
    const response = await fetch('http://localhost:3000/hotels');
    if (!response.ok) {
        throw new Error('Failed to fetch hotels');
    }
    return await response.json();
};