import { atom, useAtom } from 'jotai';
import { LAYOUT_OPTIONS } from '@/lib/constants';

// 1. set initial atom for layout
const nucalLayoutAtom = atom(
  typeof window !== 'undefined'
    ? localStorage.getItem('nucal-layout')
    : LAYOUT_OPTIONS.MINIMAL
);

const nucalLayoutAtomWithPersistence = atom(
  (get) => get(nucalLayoutAtom),
  (get, set, newStorage: any) => {
    set(nucalLayoutAtom, newStorage);
    localStorage.setItem('nucal-layout', newStorage);
  }
);

// 2. useLayout hook to check which layout is available
export function useLayout() {
  const [layout, setLayout] = useAtom(nucalLayoutAtomWithPersistence);
  return {
    layout,
    setLayout,
  };
}
