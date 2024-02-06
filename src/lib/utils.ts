
export function generateID() {
    // take date in milliseconds and add random number to it
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000 + 1);
    return (random + timestamp).toString();
}

export function generateRandomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return `#${randomColor}`;
}