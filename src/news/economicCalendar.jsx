import axios from "axios";
import { useEffect, useState } from "react";
import "./economicCalendar.css";
import { formatDate } from "../assets/dateUtiles";
import FilterCalendar from "./filterCalendar";

export default function EconCalendar() {
    const [econCalendar, setEconCalendar] = useState([]);

    useEffect(() => {
        axios.get('https://biquote.io/api/calendar')
            .then(res => setEconCalendar(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
        <FilterCalendar  data={econCalendar} />
            <div className="calendar-container">
                <div className="calendar-card">
                    <div className="calendar-scroll">
                        <table className="calendar-table">
                            <thead className="calendar-thead">
                                <tr>
                                    <th className="calendar-th-center">Importance</th>
                                    <th className="calendar-th">Time</th>
                                    <th className="calendar-th">Period</th>
                                    <th className="calendar-th">Country</th>
                                    <th className="calendar-th">Name</th>
                                    <th className="calendar-th">Currency</th>
                                    <th className="calendar-th">Previous</th>
                                    <th className="calendar-th">Actual</th>
                                    <th className="calendar-th">Forecast</th>
                                    <th className="calendar-th">Type</th>
                                </tr>
                            </thead>
                            <tbody className="calendar-tbody">
                                {econCalendar.map(e => (
                                    <tr key={e.id} className="calendar-row">
                                        <td className="calendar-td-center">
                                            <span className={`badge-importance ${e.importance === 'high' ? 'badge-high' : e.importance === 'medium' ? 'badge-medium' : 'badge-low'
                                                }`}>
                                                {e.importance}
                                            </span>
                                        </td>
                                        <td className="calendar-td-mono">{formatDate(e.time)}</td>
                                        <td className="calendar-td-mono">{formatDate(e.period) ?? 'Not Specified'}</td>
                                        <td className="calendar-td-country">{e.countryCode}</td>
                                        <td className="calendar-td-name">{e.name}</td>
                                        <td className="calendar-td-currency">{e.currency}</td>
                                        <td className="calendar-td">{e.previous ?? '--'}</td>
                                        <td className="calendar-td-actual">{e.actual ?? '--'}</td>
                                        <td className="calendar-td">{e.forecast ?? '--'}</td>
                                        <td className="calendar-td-type">{e.type}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
