import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { AppointmentBooking } from './appointment-booking/AppointmentBooking'

const queryClient = new QueryClient();


function App() {
  return (
    <>
      <div className="main">
        <QueryClientProvider client={queryClient}>
          <AppointmentBooking />
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App
