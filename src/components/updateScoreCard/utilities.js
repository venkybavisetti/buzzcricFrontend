const getBallClass = (runs) => {
  let className = 'ball ';
  if (!Number.isInteger(+runs)) className += runs.slice(-2);
  else className += 'run' + runs;
  return className;
};

export { getBallClass };
