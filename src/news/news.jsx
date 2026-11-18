import axios from "axios";
import { useEffect, useState, createContext } from "react";
import NewsCard from "./newsCard";

export const NewsContext = createContext();

export default function News() {
    const [news, setNews] = useState([])

    useEffect(() => {
        axios.get("https://biquote.io/api/news/market")
            .then(res => setNews(res.data))
            .catch(err => console.error(err))
    }, [])



    return (
        <>
            <NewsContext.Provider value={{ news}}>
                <NewsCard />
            </NewsContext.Provider>
        </>
    )
}