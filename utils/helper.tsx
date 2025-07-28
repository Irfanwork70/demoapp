type LogType = 'log' | 'warn' | 'error';

export const devLog = (
  message: string,
  extraProps: Record<string, unknown> = {},
  type: LogType = 'log'
): void => {
  if (__DEV__) {
    switch (type) {
      case 'warn':
        console.warn(message, extraProps);
        break;
      case 'error':
        console.error(message, extraProps);
        break;
      case 'log':
      default:
        console.log(message, extraProps);
        break;
    }
  }
};
