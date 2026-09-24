export let frozenConfettiValue: number | null = null;

export const setFrozenConfetti = (val: number | null) => {
  frozenConfettiValue = val;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('frozenConfettiChanged'));
  }
};
