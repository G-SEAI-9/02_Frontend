export const starsLoader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const res = await fetch('/stars.json');
  if (res.status !== 200) throw Error('something went wrong');
  const data = await res.json();
  return data;
};
