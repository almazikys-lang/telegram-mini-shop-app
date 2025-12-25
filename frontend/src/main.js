// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Initialize the app
tg.ready();

// Set theme to match app
const htmlElement = document.documentElement;
if (tg.colorScheme === 'dark') {
  htmlElement.setAttribute('data-color-scheme', 'dark');
}

// Update theme when changed
tg.onEvent('themeChanged', () => {
  if (tg.colorScheme === 'dark') {
    htmlElement.setAttribute('data-color-scheme', 'dark');
  } else {
    htmlElement.removeAttribute('data-color-scheme');
  }
});

// Setup main button
tg.MainButton.text = 'Send Data';
tg.MainButton.show();

// Handle main button click
tg.MainButton.onClick(() => {
  const data = {
    message: 'Mini app is working!',
    timestamp: new Date().toISOString(),
  };
  
  // Send data back to bot
  tg.sendData(JSON.stringify(data));
});

// Handle back button
tg.onEvent('backButtonClicked', () => {
  tg.close();
});

// Show back button
tg.BackButton.show();

// Log app info
console.log('Telegram WebApp initialized:', {
  initData: tg.initData,
  user: tg.initDataUnsafe.user,
  colorScheme: tg.colorScheme,
  platform: tg.platform,
});

// Trigger haptic feedback
tg.HapticFeedback.impactOccurred('light');

// Render initial UI
const app = document.getElementById('app');
if (app) {
  app.innerHTML = `
    <div class="container">
      <h1>Telegram Mini App</h1>
      <p>User: <strong>${tg.initDataUnsafe.user?.first_name || 'Guest'}</strong></p>
      <p>Platform: <strong>${tg.platform}</strong></p>
      <p>Click the button below to send data to the bot.</p>
    </div>
  `;
}
