/**
 * Plugin to automatically update range slider styles to match purple theme
 * This runs on the client side only
 */
export default defineNuxtPlugin(() => {
  if (!process.client) return;

  /**
   * Update slider track fill color for webkit browsers
   */
  function updateSliderStyle(element: HTMLInputElement) {
    const min = parseFloat(element.min) || 0;
    const max = parseFloat(element.max) || 100;
    const value = parseFloat(element.value) || min;
    const percentage = ((value - min) / (max - min)) * 100;

    element.style.setProperty('--slider-progress', `${percentage}%`);
  }

  /**
   * Initialize slider styles for all range inputs
   */
  function initSliders() {
    const sliders = document.querySelectorAll<HTMLInputElement>('input[type="range"]');
    sliders.forEach((slider) => {
      updateSliderStyle(slider);
      slider.addEventListener('input', () => updateSliderStyle(slider));
    });
  }

  // Initialize on mount
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSliders);
  } else {
    initSliders();
  }

  // Watch for dynamically added sliders
  const observer = new MutationObserver(() => {
    initSliders();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Cleanup on unmount
  return {
    provide: {
      updateSliderStyle,
    },
  };
});
