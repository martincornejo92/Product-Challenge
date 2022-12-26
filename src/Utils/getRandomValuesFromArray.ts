

export default function getRandomProduct(count: number) {
    const array = titles;
    const randomArray = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * array.length);
        randomArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return randomArray;
}

export const titles:string[] = [
    "Product 1",
    "Product 1",
    "Product 1",
    "Product 1",
    "Product 1",
    "Product 1",
    "Product 1",
    "Product 1",
  ]
