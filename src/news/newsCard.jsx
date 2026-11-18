import { useContext, useState } from "react";
import { NewsContext } from "./news";
import { formatDate, getTimeAgo } from "../assets/dateUtiles";

export default function NewsCard() {
    const { news } = useContext(NewsContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);

    // Duplicate list once to create a seamless infinite loop
    const loopedNews = [...news, ...news];

    const readMore = newsUrl => setSelectedNews(news.find(item => item.url === newsUrl));

    return (
        <>
            <div className="w-full overflow-hidden py-8 mask-fade-edges" >
                <div className="animate-ticker flex w-max gap-6">
                    {loopedNews.map((item, i) => (
                        <article
                            key={i}
                            className="group flex w-[340px] shrink-0 flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                            onClick={() => { setIsOpen(true); readMore(item.url) }}
                        >
                            {/* Label */}
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                        News
                                    </span>
                                </div>
                                <span className="text-xs font-medium text-slate-400">
                                    {getTimeAgo(item.publishedDate)}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="line-clamp-3 min-h-[4.5rem] text-lg font-semibold leading-snug text-slate-900">
                                {item.title}
                            </h3>

                            {/* Footer */}
                            <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                                <time className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                    {formatDate(item.publishedDate)}
                                </time>

                                <button
                                    onClick={() => { setIsOpen(true); readMore(item.url) }}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-slate-700"
                                >
                                    Read more
                                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                                </button>
                            </div>
                        </article>

                    ))}
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
                    <div className="relative flex max-h-[90vh] w-full max-w-md flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl sm:rounded-[2.5rem] sm:p-8">
                        {/* Close icon */}
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close"
                            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                            ✕
                        </button>

                        {/* Title */}
                        <div className="flex min-h-[80px] items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-6 py-4 pr-12 text-center">
                            <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 sm:text-lg">
                                {selectedNews.title}
                            </h3>
                        </div>

                        {/* Date */}
                        <div className="mt-4 flex justify-center">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {formatDate(selectedNews.publishedDate)}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mt-5 flex-1 overflow-y-auto px-2">
                            <p className="text-center text-sm leading-relaxed text-slate-600 sm:text-base">
                                {selectedNews.description}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                            <a
                                href={selectedNews.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate text-center text-xs font-medium text-slate-500 underline-offset-4 hover:underline sm:max-w-[40%] sm:text-left"
                            >
                                Source: {selectedNews.publisher}
                            </a>

                            <div className="flex items-center justify-center gap-2">
                                <a
                                    href={selectedNews.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-full border border-slate-800 bg-slate-900 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-slate-700"
                                >
                                    Read more
                                </a>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}