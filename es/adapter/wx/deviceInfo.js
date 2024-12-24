export default function getDeviceInfo() {
    const info = wx.getDeviceInfo();
    return JSON.stringify(info);
}
