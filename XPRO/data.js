// Все фиктивные данные для приложения
window.appData = {
    // Данные пользователя
    user: {
        name: "Арслан Каримов",
        userId: "PRO-8842-2024",
        joinDate: "15.03.2023",
        avatar: "assets/avatar.svg",
        email: "arslan@processingx.com",
        phone: "+7 (999) 123-45-67",
        totalIncome: 213000,
        telegram: "@arslan_pro"
    },
    
    // Балансы
    balances: {
        rub: 254700,
        usd: 3842,
        todayIncome: 9700,
        monthIncome: 213000,
        weeklyChange: "+12.5%"
    },
    
    // Транзакции (30 записей)
    transactions: [
        { id: "TX-2024-001", account: "40817810500012345678", rub: 15000, usd: 0, fee: 1.5, bank: "Тинькофф", status: "success", date: "2024-01-15 14:30", time: "14:30" },
        { id: "TX-2024-002", account: "40817810500087654321", rub: 0, usd: 500, fee: 2.0, bank: "Альфа-Банк", status: "pending", date: "2024-01-15 13:15", time: "13:15" },
        { id: "TX-2024-003", account: "40817810500055555555", rub: 25000, usd: 0, fee: 1.8, bank: "Сбербанк", status: "success", date: "2024-01-15 12:00", time: "12:00" },
        { id: "TX-2024-004", account: "40817810500011111111", rub: 0, usd: 1200, fee: 2.5, bank: "ВТБ", status: "error", date: "2024-01-15 11:45", time: "11:45" },
        { id: "TX-2024-005", account: "40817810500022222222", rub: 18000, usd: 0, fee: 1.2, bank: "Газпромбанк", status: "success", date: "2024-01-15 10:30", time: "10:30" },
        { id: "TX-2024-006", account: "40817810500033333333", rub: 0, usd: 750, fee: 1.9, bank: "Райффайзен", status: "success", date: "2024-01-15 09:15", time: "09:15" },
        { id: "TX-2024-007", account: "40817810500044444444", rub: 32000, usd: 0, fee: 2.1, bank: "Открытие", status: "pending", date: "2024-01-15 08:00", time: "08:00" },
        { id: "TX-2024-008", account: "40817810500066666666", rub: 0, usd: 300, fee: 1.0, bank: "Совкомбанк", status: "success", date: "2024-01-14 17:45", time: "17:45" },
        { id: "TX-2024-009", account: "40817810500077777777", rub: 42000, usd: 0, fee: 2.3, bank: "МКБ", status: "success", date: "2024-01-14 16:30", time: "16:30" },
        { id: "TX-2024-010", account: "40817810500088888888", rub: 0, usd: 950, fee: 1.7, bank: "Промсвязьбанк", status: "pending", date: "2024-01-14 15:15", time: "15:15" },
        { id: "TX-2024-011", account: "40817810500099999999", rub: 28000, usd: 0, fee: 1.4, bank: "Россельхозбанк", status: "success", date: "2024-01-14 14:00", time: "14:00" },
        { id: "TX-2024-012", account: "40817810500010101010", rub: 0, usd: 1100, fee: 2.2, bank: "Уралсиб", status: "error", date: "2024-01-14 12:45", time: "12:45" },
        { id: "TX-2024-013", account: "40817810500020202020", rub: 19000, usd: 0, fee: 1.6, bank: "Тинькофф", status: "success", date: "2024-01-14 11:30", time: "11:30" },
        { id: "TX-2024-014", account: "40817810500030303030", rub: 0, usd: 600, fee: 1.8, bank: "Альфа-Банк", status: "success", date: "2024-01-14 10:15", time: "10:15" },
        { id: "TX-2024-015", account: "40817810500040404040", rub: 36000, usd: 0, fee: 2.0, bank: "Сбербанк", status: "pending", date: "2024-01-14 09:00", time: "09:00" }
        // ... еще 15 транзакций для заполнения до 30
    ],
    
    // Банковские карты
    cards: [
        { 
            id: 1, 
            type: "Visa", 
            number: "4242 4242 4242 4242", 
            name: "Арслан Каримов", 
            expiry: "12/26", 
            cvc: "123", 
            bank: "Тинькофф", 
            balance: 125000,
            currency: "RUB",
            color: "linear-gradient(135deg, #1a237e, #283593)"
        },
        { 
            id: 2, 
            type: "Mastercard", 
            number: "5555 5555 5555 4444", 
            name: "Арслан Каримов", 
            expiry: "09/25", 
            cvc: "456", 
            bank: "Сбербанк", 
            balance: 89700,
            currency: "RUB",
            color: "linear-gradient(135deg, #311b92, #4527a0)"
        },
        { 
            id: 3, 
            type: "Mir", 
            number: "2200 1234 5678 9012", 
            name: "Арслан Каримов", 
            expiry: "03/27", 
            cvc: "789", 
            bank: "ВТБ", 
            balance: 45600,
            currency: "RUB",
            color: "linear-gradient(135deg, #004d40, #00695c)"
        },
        { 
            id: 4, 
            type: "Visa", 
            number: "4012 8888 8888 1881", 
            name: "Арслан Каримов", 
            expiry: "11/24", 
            cvc: "234", 
            bank: "Альфа-Банк", 
            balance: 1200,
            currency: "USD",
            color: "linear-gradient(135deg, #0d47a1, #1565c0)"
        }
    ],
    
    // Банки
    banks: [
        { name: "Тинькофф", status: "Online", delay: 120, icon: "🏦" },
        { name: "Сбербанк", status: "Online", delay: 180, icon: "🏛️" },
        { name: "Альфа-Банк", status: "Delay", delay: 320, icon: "💰" },
        { name: "ВТБ", status: "Online", delay: 150, icon: "🏢" },
        { name: "Газпромбанк", status: "Offline", delay: 0, icon: "⛽" },
        { name: "Райффайзен", status: "Online", delay: 200, icon: "🇦🇹" },
        { name: "Открытие", status: "Delay", delay: 280, icon: "🚪" },
        { name: "Совкомбанк", status: "Online", delay: 170, icon: "🤝" },
        { name: "МКБ", status: "Online", delay: 140, icon: "🏘️" },
        { name: "Промсвязьбанк", status: "Online", delay: 160, icon: "📡" }
    ],
    
    // Аналитика
    analytics: {
        dailyIncome: [12000, 18000, 15000, 22000, 25000, 19000, 9700],
        transactionsCount: [45, 52, 48, 63, 59, 51, 28],
        cardTypes: { Visa: 12, Mastercard: 8, Mir: 5, UnionPay: 2 },
        countries: { Russia: 85, USA: 7, EU: 5, Asia: 3 }
    },
    
    // Настройки
    settings: {
        darkMode: true,
        animations: true,
        notifications: true,
        autoWithdraw: false,
        twoFactorAuth: true,
        language: "ru"
    }
};
