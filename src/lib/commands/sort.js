const config = require('config');
const Command = require('../core/command');
const positions = require('../admin/channels/positions.js');

module.exports = class SortCommand extends Command {
    constructor() {
        super();

        this.name = 'sort';
    }

    /**
     * @param message
     * @return {Promise<*>}
     */
    async execute(message) {
        if (!config.get('features.channelPositionsEnforcement')) {
            return message.channel.send('Sorry but the channel position enforcement feature is currently disabled');
        }

        positions.globalCheck();

        return message.channel.send('Sent global sort request to channels/positions.js');
    }
};
