export const formatPath = (path) => {
  // const  = path.replace("/", "");
  const fullPath = path.replace("/", "").toLowerCase().split(" ");

  let suffix = fullPath[fullPath.length - 1];

  suffix = suffix[0].toUpperCase() + suffix.slice(1);

  return suffix;
};
