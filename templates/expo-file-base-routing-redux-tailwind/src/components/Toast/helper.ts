const CLASSNAME: Record<'success' | 'error' | 'info', string> = {
  success: 'bg-success',
  error: 'bg-error',
  info: 'bg-primary',
};

export const getToastClassName = (type: 'success' | 'error' | 'info'): string => CLASSNAME[type];
