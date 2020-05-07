const { get } = require('lodash');
const EventEmitter = require('events');
const config = require('config');
const HasClaim = require('./exceptions/hasclaim');
const CharacterNotFound = require('./exceptions/playernotfound');
const NotInOutfit = require('./exceptions/notinoutfit');
const ProtectedRank = require('./exceptions/protectedrank');
const CharacterClaim = require('../database/characterclaim');
const Claimed = require('./exceptions/claimed');

module.exports = class OutfitModerator extends EventEmitter {
    constructor({ apisPs2 }) {
        super();

        this.api = apisPs2;
    }

    /**
     * @param member
     * @param name
     * @return {Promise<*>}
     */
    async makeClaim(member, name) {
        if (await CharacterClaim.hasClaim(member)) {
            throw new HasClaim(member);
        }

        return this.revalidateClaim(member, name);
    }

    /**
     * @param member
     * @param name
     * @return {Promise<*>}
     */
    async revalidateClaim(member, name) {
        const character = await this.api.getCharacterByName(name, { resolve: 'outfit_member' });

        if (!character) {
            throw new CharacterNotFound(member, name);
        }

        this.filter(member, character);

        if (await CharacterClaim.isClaimed(member.guild, character)) {
            throw new Claimed(member, character);
        }

        return CharacterClaim.claim(member, character);
    }

    /**
     * @param member
     * @param character
     */
    filter(member, character) {
        if (get(character, 'outfit_member.outfit_id')
            !== config.get(`guilds.${member.guild.id}.outfitChecker.outfit`)) {
            throw new NotInOutfit(member, character);
        }

        if (config.get(`guilds.${member.guild.id}.outfitChecker.filterRank`)
            .includes(get(character, 'outfit_member.rank'))) {
            throw new ProtectedRank(member, character);
        }
    }
};
