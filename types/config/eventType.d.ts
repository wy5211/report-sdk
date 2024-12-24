export declare const eventType: {
    /** 客户端接口限频 */
    ClientApiRateLimit: string;
    /** 广告曝光事件 */
    'meeting.main.join_meeting': string;
    /** 广告点击事件 */
    'meeting.main.create_meeting': string;
    /** 成员保护限制 */
    MemberProtection: string;
    /** APP用户行为 */
    AppEvent: string;
    /** 频道曝光 */
    ChannelView: string;
};
export type EventType = keyof typeof eventType;
