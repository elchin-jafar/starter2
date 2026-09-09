export function removeTags(html: string) {
    return (
        new DOMParser().parseFromString(html || "", "text/html").body.textContent ||
        ""
    ).trim();
}
