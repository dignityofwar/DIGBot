const Command = require('./foundation/command');

module.exports = class HelpCommand extends Command {
    constructor({ commandRegister }) {
        super();

        this.name = 'help';

        this.throttle = {
            attempts: 1,
            decay: 30,
            peruser: false,
        };

        this.register = commandRegister;
    }

    /**
     * @param request
     * @return {Promise<void>}
     */
    async execute(request) {
        // const commandMessage = this.wantsSomething(message.cleanContent);
        //
        // if (commandMessage) {
        //     return message.channel.send(commandMessage);
        // }

        return request.respond(this.createReply());
    }

    // /**
    //  * @param content
    //  */
    // wantsSomething(content) {
    //     return ;
    // }

    /**
     * @return {string}
     */
    createReply() {
        return {
            embed: {
                title: 'Commands',
                fields: [
                    ...this.register.toArray()
                        .filter(({ special }) => !special)
                        .map(({ name, help }) => ({
                            name: `!${name}`,
                            value: help(),
                        })),
                ],
            },
        };
    }

    /**
     * @return {string}
     */
    help() {
        return 'Will give a more detailed explanation of the command.';
    }
};
