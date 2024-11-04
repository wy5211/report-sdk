export const spmId = {
  /** 会议首页面PV */
  'meeting.main.pv': 'meeting.main.pv',
  /** 会议首页加入会议功能点击 */
  'meeting.main.join_meeting': 'meeting.main.join_meeting',
  /** 会议首页创建会议功能点击 */
  'meeting.main.create_meeting': 'meeting.main.create_meeting',
  /** 会议首页预定会议功能点击 */
  'meeting.main.order_meeting': 'meeting.main.order_meeting',
  /** 会议首页广告功能曝光 */
  'meeting.main.ad_exposure': 'meeting.main.ad_exposure',
  /** 会议首页权限接口报错 */
  'meeting.main.right_api_err': 'meeting.main.right_api_err',
  /** 会议会议间页面PV */
  'meeting_room.main.pv': 'meeting_room.main.pv',
  /** 会议会议间页面RTC进入房间 */
  'meeting_room.main.rtc_room_enter': 'meeting_room.main.rtc_room_enter',
  /** 会议会议间页面RTC退出房间 */
  'meeting_room.main.rtc_room_exit': 'meeting_room.main.rtc_room_exit',
  /** 会议会议间页面点击nav header结束会议按钮 */
  'meeting_room.nav.close_meeting': 'meeting_room.nav.close_meeting',
  /** 会议会议间页面点击nav header声音播放模式按钮, 会议会议间页面点击tabbar静音按钮 */
  'meeting_room.nav.switch_voice_play_type': 'meeting_room.nav.switch_voice_play_type',
};

export type SpmIdType = keyof typeof spmId;
