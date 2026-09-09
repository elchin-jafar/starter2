import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string) =>
    DOMPurify.sanitize(html, {
        USE_PROFILES: { html: true },
        ALLOWED_TAGS: ["p", "br", "strong", "em", "u", "a", "ul", "ol", "li", "h2", "h3"],
        ALLOWED_ATTR: ["href", "target", "rel"],
        FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "img"],
        FORBID_ATTR: ["style", "onerror", "onclick", "onload"],
    });
