interface DataItem {
    title: string;
    subtitle: string;
    rating: string;
    image: string;
  }
  

// Function to chunk an array into groups of specified size
  export const chunkArray = (array: DataItem[], size: number): DataItem[][] => {
    const chunks: DataItem[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };
  