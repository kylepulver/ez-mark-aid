export class MarkAidApplication extends FormApplication {
    constructor(message) {
        super();
        this.message = message;
    }
    
    static get defaultOptions() {
        const defaults = super.defaultOptions;

        const overrides = {
            height: 'auto',
            id: 'mark-aid',
            template: 'modules/ez-mark-aid/template.hbs',
            title: "Mark Aid",
            width: 500,
            classes: ["ez-mark-aid"]
        };

        return foundry.utils.mergeObject(defaults, overrides);
    }

    getData(options) {
        const pcs = [];
        const npcs = [];
        const messages = [];
        const others = [];

        const marks = this.message.getFlag("ez-mark-aid", "marks");

        game.users.forEach(user => {
            if (user.character) {
                pcs.push(user.character)
            }
        })

        return {
            pcs: pcs,
            npcs: npcs,
            messages: messages,
            others: others,
            marks: marks
        }
    }

    activateListeners(html) {
        super.activateListeners(html);

    }
    
    _updateObject(event, formData) {
        const data = foundry.utils.expandObject(formData);

        this.message.setFlag("ez-mark-aid", "marks", data);
    }
}