export const handleResize = (setChunkSize: (size: number) => void) => {
    const width = window.innerWidth;
    if (width >= 1280) {
      setChunkSize(5);
    } else if (width >= 1024) {
      setChunkSize(4);
    } else if (width >= 768) {
      setChunkSize(3);
    } else if (width >= 640) {
      setChunkSize(2);
    } else {
      setChunkSize(1);
    }
  };