import {Injectable} from '@nestjs/common';
import {EntityManager} from '@mikro-orm/mariadb';
import {ReactionRole} from './entities/reaction-role.entity';
import {OnJoinRole} from './entities/on-join-role.entity';
import {OnJoinSettings} from './entities/on-join-settings.entity';

@Injectable()
export class SettingsService {
    constructor(
        private readonly entityManager: EntityManager,
    ) {
    }

    getRole(messageId: string, emojiName: string, emojiId?: string): Promise<ReactionRole | null> {
        return this.entityManager.findOne(ReactionRole, {messageId, emojiName, emojiId});

    }

    getJoinRoles(guildId: string): Promise<OnJoinRole[]> {
        return this.entityManager.find(OnJoinRole, {guildId});
    }

    getJoinSettings(guildId: string): Promise<OnJoinSettings | null> {
        return this.entityManager.findOne(OnJoinSettings, {guildId});

    }

    createJoinRole(channelId: string, messageId: string, join: OnJoinRole, expireAt: Date | null) {
        return this.entityManager.create(ReactionRole, {
            guildId: join.guildId,
            roleId: join.roleId,
            channelId,
            messageId,
            emojiName: join.emojiName,
            emojiId: join.emojiId,
            expireAt,
            referenceType: 'join',
            referenceId: join.id,
        });
    }
}
