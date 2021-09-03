import {Entity, Unique} from '@mikro-orm/core';
import {BaseMessage} from './base-message.entity';

@Entity({tableName: 'messenger_boost'})
@Unique({properties: ['guildId', 'channelId']})
export class OnBoostMessage extends BaseMessage {
}
