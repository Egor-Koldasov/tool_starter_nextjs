import { useSelectorPath, useUpdateModule } from "../state-update";

export const navInit = {
  open: false,
};

export const useToggleNav = () => {
  const open = useSelectorPath('nav.open');
  const updateNav = useUpdateModule('nav')
  return () => updateNav({open: !open});
}