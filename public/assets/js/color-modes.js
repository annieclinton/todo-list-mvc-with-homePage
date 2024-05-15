/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict';

  // Retrieve the stored theme or determine from system preferences
  const getStoredTheme = () => localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // Save the selected theme in local storage
  const setStoredTheme = theme => localStorage.setItem('theme', theme);

  // Apply the theme to the document and update the image
  const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    updateImageForTheme(theme);
  };

  // Update the image based on the current theme
  const updateImageForTheme = theme => {
    const imageElement = document.querySelector('.logo');
    imageElement.src = theme === 'dark' ? '/images/toDoListLogoDarkTheme.png' : '/images/toDoListLogo.png';
  };

  // Initialize the theme from local storage or system preference
  const initializeTheme = () => {
    const theme = getStoredTheme();
    setTheme(theme);
    showActiveTheme(theme);
  };

  // Show the active theme in the UI
  const showActiveTheme = (theme) => {
    const themeSwitcherText = document.querySelector('#bd-theme-text');
    const activeThemeIcon = document.querySelector('.theme-icon-active use');
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);

    if (btnToActive) {
      const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');
      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active');
        element.setAttribute('aria-pressed', 'false');
      });
  
      btnToActive.classList.add('active');
      btnToActive.setAttribute('aria-pressed', 'true');
      activeThemeIcon.setAttribute('href', svgOfActiveBtn);
      themeSwitcherText.textContent = `${btnToActive.textContent} (${theme})`;
    }
  };

  // Add event listener for theme change from system preferences
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const newTheme = e.matches ? 'dark' : 'light';
    setStoredTheme(newTheme);
    setTheme(newTheme);
    showActiveTheme(newTheme);
  });

  // Add event listeners for manual theme change
  document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value');
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme);
      });
    });
  });
})();
