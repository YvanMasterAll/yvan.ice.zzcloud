const DATA = [
    {
        id: 1,
        name: '项目 A',
        endTime: '2018-12-01',
        lead:
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
            'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png'
        ],
        percent: 60,
        status: 'ACTIVE',
        color: '#666',
        state: 'success'
    },
    {
        id: 2,
        name: '项目 B',
        endTime: '2018-12-02',
        lead:
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
            'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png'
        ],
        percent: 30,
        status: 'ACTIVE',
        color: '#666',
        state: 'error'
    },
    {
        id: 3,
        name: '项目 C',
        endTime: '2018-12-03',
        lead:
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png'
        ],
        percent: 70,
        status: 'PENDING',
        color: '#ee706d',
        state: 'success'
    },
    {
        id: 4,
        name: '项目 D',
        endTime: '2018-12-04',
        lead:
            'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
            'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png'
        ],
        percent: 40,
        status: 'ACTIVE',
        color: '#666',
        state: 'error'
    },
    {
        id: 5,
        name: '项目 E',
        endTime: '2018-12-05',
        lead:
            'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
            'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png'
        ],
        percent: 60,
        status: 'ACTIVE',
        color: '#666',
        state: 'normal'
    },
    {
        id: 6,
        name: '项目 F',
        endTime: '2018-12-06',
        lead:
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png'
        ],
        percent: 20,
        status: 'CLOSED',
        color: '#f7da47',
        state: 'error'
    },
    {
        id: 7,
        name: '项目 G',
        endTime: '2018-12-07',
        lead:
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png'
        ],
        percent: 80,
        status: 'ACTIVE',
        color: '#666',
        state: 'success'
    },
    {
        id: 8,
        name: '项目 H',
        endTime: '2018-12-08',
        lead:
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
            'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png'
        ],
        percent: 45,
        status: 'CLOSED',
        color: '#f7da47',
        state: 'normal'
    },
    {
        id: 9,
        name: '项目 I',
        endTime: '2018-12-09',
        lead:
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png'
        ],
        percent: 50,
        status: 'PENDING',
        color: '#ee706d',
        state: 'normal'
    },
    {
        id: 10,
        name: '项目 G',
        endTime: '2018-12-10',
        lead:
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png'
        ],
        percent: 60,
        status: 'PENDING',
        color: '#ee706d',
        state: 'normal'
    },
    {
        id: 11,
        name: '项目 K',
        endTime: '2018-12-11',
        lead:
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png',
            'https://img.alicdn.com/tfs/TB10geFAMHqK1RjSZFPXXcwapXa-45-45.png'
        ],
        percent: 30,
        status: 'ACTIVE',
        color: '#666',
        state: 'normal'
    },
    {
        id: 12,
        name: '项目 L',
        endTime: '2018-12-12',
        lead:
            'https://img.alicdn.com/tfs/TB1T5SzAPTpK1RjSZKPXXa3UpXa-45-45.png',
        team: [
            'https://img.alicdn.com/tfs/TB1L15IAMHqK1RjSZFEXXcGMXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB15m1BAHvpK1RjSZPiXXbmwXXa-45-45.png',
            'https://img.alicdn.com/tfs/TB1NhOCAIbpK1RjSZFyXXX_qFXa-45-45.png'
        ],
        percent: 40,
        status: 'PENDING',
        color: '#ee706d',
        state: 'normal'
    }
]

export default DATA
