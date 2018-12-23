export default {
    plugins: [
        [
            'umi-plugin-react',
            {
                antd: true,
                locale: {
                    enable:true,
                    default: 'zh-CN', //默认语言 zh-CN
                    baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
                    antd: true // 是否启用antd的<LocaleProvider />
                }
            },
        ],

    ],
    routes: [{
        path: '/',
        component: './HelloWorld',
        routes: [
            {
                path: '/HelloWorld',
                name: 'helloWorld',
                component: './HelloWorld',
            },
        ]
    }],
}