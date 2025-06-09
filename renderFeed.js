import { getFeedHtml } from "./getFeed.js";

export function render(dataInput) {
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    feed.append(getFeedHtml(dataInput));

}