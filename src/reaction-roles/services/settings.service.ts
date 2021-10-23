import {Injectable} from '@nestjs/common';
import {EntityManager} from '@mikro-orm/mariadb';
import {ReactionRole} from '../entities/reaction-role.entity';
import {OnJoinRole} from '../entities/on-join-role.entity';
import {OnJoinSettings} from '../entities/on-join-settings.entity';

@Injectable()
export class SettingsService {
    private readonly entityManager: EntityManager;

    constructor(
        entityManager: EntityManager,
    ) {
        this.entityManager = entityManager.fork();
    }

    getRole(channelId: string, messageId: string, emojiName: string, emojiId?: string): Promise<ReactionRole | null> {
        return this.entityManager.findOne(ReactionRole, {channel: channelId, messageId, emojiName, emoji: emojiId});
    }

    getStaticRolesByGuild(guildId: string): Promise<ReactionRole[]> {
        return this.entityManager.find(ReactionRole, {referenceType: 'static', guild: guildId});
    }

    getJoinRoles(guildId: string): Promise<OnJoinRole[]> {
        return this.entityManager.find(OnJoinRole, {guild: guildId});
    }

    getJoinSettings(guildId: string): Promise<OnJoinSettings | null> {
        return this.entityManager.findOne(OnJoinSettings, {guild: guildId});
    }

    async createJoinRole(channelId: string, messageId: string, join: OnJoinRole, expireAt: Date | null): Promise<ReactionRole> {
        const reactionRole = this.entityManager.create(ReactionRole, {
            // guildId: join.guildId,
            // roleId: join.roleId,
            // channelId,
            // messageId,
            // emojiName: join.emojiName,
            // emojiId: join.emojiId,
            // expireAt,
            // referenceType: 'join',
            // referenceId: join.id.toString(),
        });
        await this.entityManager.persistAndFlush(reactionRole);

        return reactionRole;
    }
}