const getAllTraits = async () => {
  const data = await fetch("/data.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data.json();
};

export default getAllTraits;
