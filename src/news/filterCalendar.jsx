import { useState } from "react"

export default function FilterCalendar({ econCalendar }) {
    const [country, setCountry] = useState('')
    const [currency, setCurrency] = useState('')
    const [name, setName] = useState('')
    const [importance, setImportance] = useState('')

    const countries = [...new Set(econCalendar.map(i => i.countryCode).filter(Boolean))]
    const currencies = [...new Set(econCalendar.map(i => i.currency).filter(Boolean))]



    return (
        <>
            <select value={country} onChange={e => { setCountry(e.target.value); fitler() }}>
                <option value="">All</option>
                {countries.map(c =>
                    <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={currency} onChange={e => {setCurrency(e.target.value); fitler()}}>
                <option value="">All</option>
                {currencies.map(c =>
                    <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="text" onChange={e => {setName(e.target.value); fitler()}} />
            <select onChange={onselect(e => {setImportance(e.target.value); fitler()})}>
                <option value="">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </>
    )
}