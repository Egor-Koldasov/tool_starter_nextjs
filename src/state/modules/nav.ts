import { useUpdateModule } from "../useUpdateModule";
import { useSelectorPath } from "../useSelector";

export const navInit = {
  open: false,
};

export const useToggleNav = () => {
  const open = useSelectorPath('nav.open');
  const updateNav = useUpdateModule('nav')
  return () => updateNav({open: !open});
}