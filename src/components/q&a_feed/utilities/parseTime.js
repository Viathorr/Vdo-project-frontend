const parseTimeInfo = (date) => {
    const now = new Date();
    const timeDiff = now.getTime() - date.getTime();
    
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    if (days >= 30) {
      const months = Math.floor(days / 30);
      if (months >= 12) {
        const years = Math.floor(months / 12);
        return `${years} year${years > 1 ? 's' : ''} ago`;
      }
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days >= 1) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    if (hours >= 1) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    const minutes = Math.floor(timeDiff / (1000 * 60));
    return `${minutes} minute${minutes > 1 || !minutes ? 's' : ''} ago`;
};
  
export default parseTimeInfo;