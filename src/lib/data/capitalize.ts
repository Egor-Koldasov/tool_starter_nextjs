const capitalize = (str: string) => (str[0]?.toUpperCase() || '') + (str.substr(1) || '');

export default capitalize;