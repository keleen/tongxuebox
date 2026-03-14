/**
 * Composable for customizing range slider appearance to match purple theme
 * Updates the slider track fill color dynamically based on the current value
 */
export function useRangeSlider() {
  /**
   * Update the slider track fill color for webkit browsers
   * @param element - The input[type="range"] element
   */
  function updateSliderStyle(element: HTMLInputElement) {
    if (!element) return;

    const min = parseFloat(element.min) || 0;
    const max = parseFloat(element.max) || 100;
    const value = parseFloat(element.value) || min;
    const percentage = ((value - min) / (max - min)) * 100;

    // Update CSS custom property for webkit browsers
    element.style.setProperty('--slider-progress', `${percentage}%`);
  }

  /**
   * Setup slider style updates on input events
   * @param elementRef - Ref to the input element
   */
  function setupSlider(elementRef: Ref<HTMLInputElement | undefined>) {
    if (!process.client) return;

    watch(
      () => elementRef.value,
      (element) => {
        if (element && element.type === 'range') {
          updateSliderStyle(element);
          element.addEventListener('input', () => updateSliderStyle(element));
        }
      },
      { immediate: true },
    );
  }

  return {
    updateSliderStyle,
    setupSlider,
  };
}
