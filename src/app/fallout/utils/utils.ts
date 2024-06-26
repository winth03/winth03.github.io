export function toTitleCase(str: string) {
    str = str?.split("\\").pop()?.split("/").pop()?.replace(/_/gi, " ").split(".")[0] ?? "";
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
        }
    );
}