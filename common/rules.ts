const onlyAlphabet = (name: string) => {
  return {
    value: /^[a-zA-Z]+$/,
    message: `• ${name} must contain only the alphabet.`,
  };
};

const onlyNumber = (name: string) => {
  return {
    value: /^[0-9]+$/,
    message: `• ${name} must contain only the alphabet.`,
  };
};

const forID = (name: string) => {
  return {
    value: /^[A-Za-z]{1}[A-Za-z0-9_]+$/,
    message: `• ${name} must start with the alphabet and can contain only '_' and numbers.`,
  };
};

const foremail = () => {
  return {
    value: /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/,
    message: "• It must be in email format.",
  };
};

const minLength = (name: string, value: number) => {
  return {
    value,
    message: `• ${name} should be longer than ${value} chars.`,
  };
};

const maxLength = (name: string, value: number) => {
  return {
    value,
    message: `• ${name} should be less than ${value} chars.`,
  };
};

export default {
  onlyAlphabet,
  onlyNumber,
  forID,
  foremail,
  minLength,
  maxLength,
};
