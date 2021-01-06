import React from 'react'
import DefaultTemplate from '~/templates/DefaultTemplate'
import AppRouter from '~/pages/AppRouter'

function App() {
  return (
    <DefaultTemplate>
      <AppRouter/>
    </DefaultTemplate>
  );
}

export default App;