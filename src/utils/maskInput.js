// POSTFIX -> 00000 ₽
export const maskInputPostfix = (value, mask) => {
  const maskArray = mask;
  const numericValue = value?.replace(/\D+/g, '') || '';
  const formattedValueResult = numericValue.split('').filter(item => !maskArray.includes(item));

  if (numericValue.length === 0) return '';
  return [...formattedValueResult, ...maskArray].join('');
};

export const onlyNum = value => {
  return value?.replace(/\D+/g, '') || '';
};
