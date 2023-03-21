const getAllTraits = async () => {
  const data = await fetch("/data.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data.json();
};

const getATrait = async () => {
  const data = await fetch("/trait.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return data.json();
};

export { getAllTraits, getATrait };
