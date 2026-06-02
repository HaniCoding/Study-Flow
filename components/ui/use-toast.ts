import { toast as sonnerToast } from 'sonner';

export const useToast = () => {
  return {
    toast: sonnerToast,
    dismiss: (id?: string) => sonnerToast.dismiss(id),
  };
};

export { sonnerToast as toast };