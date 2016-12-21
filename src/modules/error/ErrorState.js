const RESET_ERROR_MESSAGE = 'ErrorState/RESET_ERROR_MESSAGE';

// Updates error message to notify about the failed fetches.
export default function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }

  return state;
}
