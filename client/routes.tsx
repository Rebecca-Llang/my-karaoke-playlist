import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App'
import AddSong from './components/AddSong'
import Songs from './components/Songs'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<AddSong />} />
    <Route path="/songs" element={<Songs />} />
  </Route>,
)
