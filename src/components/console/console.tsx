export function createNode(htmlStr: string) {
    const div = document.createElement("div");
    div.innerHTML = htmlStr;
    return div.childNodes[0];
}
