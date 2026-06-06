export function linesOrTbd(value) {
    return value && String(value).trim() ? String(value).trim() : "TBD";
}

export function slugify(value) {
 return (value || "untitled-game")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}
