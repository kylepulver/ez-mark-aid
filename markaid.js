import { MarkAidApplication } from "./app.js";

console.log("EZ Mark Aid | Loaded");

const getMessage = (html) => {
    return game.messages.get($(html).data("messageId"))
}

Hooks.on("renderChatMessage",  async (message, html, data) => {
    const marks = message.getFlag("ez-mark-aid", "marks");

    if (!marks) return;

    Object.keys(marks.id).forEach(id => {
        if (marks.id[id]) {
            const actor = game.actors.get(id)
            if (!!actor) {
                html.find(".message-content").append(`<div class="ez-mark-aid-mark"><i class="fas fa-plus-circle"></i> Aiding <strong>${actor.name}</strong></div>`)
            }
        }
    })
})

Hooks.on("getChatLogEntryContext", (application, options) => {
    options.push({
        name: "Mark as Aid",
        icon: `<i class="fas fa-circle"></i>`,
        condition: li => {
            const message = getMessage(li);
            return message.isRoll;
        },
        callback: li => {
            const message = getMessage(li);
            new MarkAidApplication(message).render(true);
        }
    }
    )
});