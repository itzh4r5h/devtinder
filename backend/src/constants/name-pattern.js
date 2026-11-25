// letters only, with single spaces between words for full names (e.g. "john doe").
// also keeps html out of the emails that show the name
export const NAME_PATTERN = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
export const NAME_PATTERN_MESSAGE = "name can only contain letters and single spaces between words";
