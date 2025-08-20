import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Transactions from '@/pages/Transactions';

function Router() {
  return(
    <BrowserRouter>
      <Routes>

        <Route path="/" 
          element={
            <Transactions />
          } 
        />

      </Routes>
    </BrowserRouter>
  )
}

export default Router;