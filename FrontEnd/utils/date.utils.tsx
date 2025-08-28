const formatDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
};

export default formatDate;