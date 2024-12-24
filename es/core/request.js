const mapper = {
    config: { method: 'GET', path: '/config/$env/common.json', hostConfigKey: 'COS_URL' },
    upload: { method: 'POST', path: '/api/log-center/logCenter/saveBurialPointInfo', hostConfigKey: 'CHANNEL_SERVER' }
};
export const requestInstance = (config) => {
    return {
        method: mapper[config.type].method,
        hostConfigKey: mapper[config.type].hostConfigKey,
        path: mapper[config.type].path.replace('$env', (config === null || config === void 0 ? void 0 : config.env) || ''),
        body: config.body,
        header: JSON.parse(JSON.stringify({
            'Content-Type': 'application/json',
            'X-User-Id': config.userId,
            'X-User-Channel': config.userChannel,
            'X-Version': config.version,
        }))
    };
};
