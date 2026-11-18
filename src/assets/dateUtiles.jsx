// src/utils/dateUtils.js

export function formatDate(isoString) {
    if (!isoString) return "";
    return new Date(isoString).toLocaleString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export function getTimeAgo(isoString) {
    if (!isoString) return "";

    const published = new Date(isoString).getTime();
    const diffInSeconds = Math.floor((Date.now() - published) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
}