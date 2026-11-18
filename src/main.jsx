import { createRoot } from 'react-dom/client'
import './index.css' // <-- Import Tailwind CSS here!
import News from './news/news.jsx'
import EconCalendar from './news/economicCalendar.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <News />
        <EconCalendar />
    </>

)