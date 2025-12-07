// Главный файл приложения
class ProcessingXApp {
constructor() {
this.currentPage = 'dashboard';
this.init();
    }

init() {
// Инициализация при загрузке
this.loadPage('dashboard');
this.setupEventListeners();
this.initAnimations();
        
// Инициализация Telegram WebApp
if (window.Telegram && Telegram.WebApp) {
this.initTelegramWebApp();
        }
    }

setupEventListeners() {
// Навигация
document.querySelectorAll('.nav-item').forEach(item => {
item.addEventListener('click', (e) => {
const page = e.currentTarget.dataset.page;
this.navigateTo(page);
            });
        });

// Кнопки быстрых действий
document.getElementById('createPayment')?.addEventListener('click', () => {
this.showCreatePaymentModal();
        });

// Закрытие модальных окон
document.querySelector('.modal-close')?.addEventListener('click', () => {
this.hideModal();
        });

document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
if (e.target === e.currentTarget) {
                this.hideModal();
            }
        });

// Переключение темы
document.querySelector('.theme-toggle')?.addEventListener('click', () => {
this.toggleTheme();
        });

// Поиск
document.querySelector('.search-input')?.addEventListener('input', (e) => {
this.handleSearch(e.target.value);
        });
    }

    initTelegramWebApp() {
        const tg = window.Telegram.WebApp;
        
        // Расширяем на весь экран
        tg.expand();
        
        // Устанавливаем цвет фона
        tg.setBackgroundColor('#0D0F17');
        
        // Обработка событий Telegram
        tg.onEvent('viewportChanged', (e) => {
            console.log('Viewport changed:', e);
        });
        
        console.log('Telegram WebApp инициализирован');
    }

    navigateTo(page) {
        // Анимация перехода
        const oldPage = this.currentPage;
        this.currentPage = page;
        
        // Обновление активного пункта меню
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });
        
        // Загрузка страницы
        this.loadPage(page, oldPage);
    }

    loadPage(page, oldPage = null) {
        const contentElement = document.getElementById('pageContent');
        
        // Анимация исчезновения
        if (oldPage) {
            contentElement.style.opacity = '0';
            contentElement.style.transform = 'translateY(20px)';
        }
        
        setTimeout(() => {
            contentElement.innerHTML = this.generatePageContent(page);
            
            // Анимация появления
            contentElement.style.opacity = '1';
            contentElement.style.transform = 'translateY(0)';
            
            // Инициализация специфичных для страницы элементов
            this.initPageSpecificFeatures(page);
        }, oldPage ? 200 : 0);
    }

    generatePageContent(page) {
        switch(page) {
            case 'dashboard':
                return this.generateDashboard();
            case 'payments':
                return this.generatePayments();
            case 'cards':
                return this.generateCards();
            case 'banks':
                return this.generateBanks();
            case 'analytics':
                return this.generateAnalytics();
            case 'profile':
                return this.generateProfile();
            case 'settings':
                return this.generateSettings();
            default:
                return this.generateDashboard();
        }
    }

    generateDashboard() {
        const { balances } = window.appData;
        
        return `
            <div class="dashboard-page">
                <div class="page-header">
                    <h2>Главная панель</h2>
                    <p class="page-subtitle">Обзор вашей процессинговой активности</p>
                </div>
                
                <div class="dashboard-grid">
                    <div class="stat-card glow">
                        <div class="stat-label">Общий баланс</div>
                        <div class="stat-value">₽${this.formatNumber(balances.rub)}</div>
                        <div class="stat-change positive">
                            <i class="fas fa-arrow-up"></i>
                            ${balances.weeklyChange}
                        </div>
                        <div class="stat-sub">$ ${this.formatNumber(balances.usd)} USD</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-label">Доход сегодня</div>
                        <div class="stat-value">₽${this.formatNumber(balances.todayIncome)}</div>
                        <div class="stat-change positive">
                            <i class="fas fa-chart-line"></i>
                            +8.2%
                        </div>
                        <div class="stat-sub">За последние 24 часа</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-label">Доход за месяц</div>
                        <div class="stat-value">₽${this.formatNumber(balances.monthIncome)}</div>
                        <div class="stat-change positive">
                            <i class="fas fa-calendar-alt"></i>
                            +15.3%
                        </div>
                        <div class="stat-sub">Январь 2024</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-label">Активные каналы</div>
                        <div class="stat-value">8/10</div>
                        <div class="stat-change positive">
                            <i class="fas fa-check-circle"></i>
                            Все системы онлайн
                        </div>
                        <div class="stat-sub">Банки работают стабильно</div>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>Быстрые действия</h3>
                    <div class="section-actions">
                        <button class="btn-text">Посмотреть все</button>
                    </div>
                </div>
                
                <div class="quick-actions-grid">
                    <div class="action-btn" onclick="app.showCreatePaymentModal()">
                        <i class="fas fa-plus-circle"></i>
                        <span>Создать платёж</span>
                    </div>
                    
                    <div class="action-btn" onclick="app.navigateTo('cards')">
                        <i class="fas fa-credit-card"></i>
                        <span>Добавить карту</span>
                    </div>
                    
                    <div class="action-btn">
                        <i class="fas fa-wallet"></i>
                        <span>Открыть приём</span>
                    </div>
                    
                    <div class="action-btn" onclick="app.navigateTo('analytics')">
                        <i class="fas fa-chart-bar"></i>
                        <span>Статистика</span>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>Последние транзакции</h3>
                    <div class="section-actions">
                        <button class="btn-text" onclick="app.navigateTo('payments')">Все транзакции</button>
                    </div>
                </div>
                
                <div class="table-container">
                    ${this.generateRecentTransactions()}
                </div>
            </div>
        `;
    }

    generatePayments() {
        return `
            <div class="payments-page">
                <div class="page-header">
                    <h2>Все платежи</h2>
                    <p class="page-subtitle">История всех транзакций</p>
                </div>
                
                <div class="table-controls">
                    <div class="filter-buttons">
                        <button class="filter-btn active">Все</button>
                        <button class="filter-btn">Успешные</button>
                        <button class="filter-btn">В обработке</button>
                        <button class="filter-btn">Ошибки</button>
                    </div>
                    <div class="date-filter">
                        <input type="date" class="form-input" style="width: auto;">
                    </div>
                </div>
                
                <div class="table-container">
                    <div class="table-header">
                        <div>ID</div>
                        <div>Номер счёта</div>
                        <div>₽ RUB</div>
                        <div>$ USD</div>
                        <div>Комиссия</div>
                        <div>Банк</div>
                        <div>Статус</div>
                        <div>Дата/Время</div>
                    </div>
                    
                    ${window.appData.transactions.slice(0, 15).map(tx => `
                        <div class="table-row">
                            <div><strong>${tx.id}</strong></div>
                            <div class="text-mono">${this.maskAccount(tx.account)}</div>
                            <div><strong>${tx.rub ? `₽${this.formatNumber(tx.rub)}` : '-'}</strong></div>
                            <div>${tx.usd ? `$${this.formatNumber(tx.usd)}` : '-'}</div>
                            <div>${tx.fee}%</div>
                            <div>${tx.bank}</div>
                            <div>
                                <span class="status-badge status-${tx.status}">
                                    ${this.getStatusIcon(tx.status)} ${this.getStatusText(tx.status)}
                                </span>
                            </div>
                            <div>
                                <div>${tx.date}</div>
                                <div class="text-secondary">${tx.time}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="pagination">
                    <button class="pagination-btn active">1</button>
                    <button class="pagination-btn">2</button>
                    <button class="pagination-btn">3</button>
                    <span class="pagination-dots">...</span>
                    <button class="pagination-btn">10</button>
                </div>
            </div>
        `;
    }

    generateCards() {
        return `
            <div class="cards-page">
                <div class="page-header">
                    <h2>Карты</h2>
                    <p class="page-subtitle">Управление банковскими картами</p>
                </div>
                
                <div class="cards-grid">
                    ${window.appData.cards.map(card => `
                        <div class="card-flip">
                            <div class="card-inner">
                                <div class="card-front" style="background: ${card.color}">
                                    <div class="card-header">
                                        <div class="card-chip"></div>
                                        <div class="card-type">${card.type}</div>
                                    </div>
                                    <div class="card-number">${this.maskCardNumber(card.number)}</div>
                                    <div class="card-footer">
                                        <div>
                                            <div class="card-label">Владелец</div>
                                            <div class="card-name">${card.name}</div>
                                        </div>
                                        <div>
                                            <div class="card-label">Срок действия</div>
                                            <div class="card-expiry">${card.expiry}</div>
                                        </div>
                                    </div>
                                    <div class="card-balance">${card.balance} ${card.currency}</div>
                                </div>
                                <div class="card-back">
                                    <div class="card-strip"></div>
                                    <div class="card-cvc">
                                        <div class="card-label">CVC</div>
                                        <div class="card-cvc-number">${card.cvc}</div>
                                    </div>
                                    <div class="card-bank">${card.bank}</div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                    
                    <div class="card-add">
                        <div class="card-add-inner" onclick="app.showAddCardModal()">
                            <i class="fas fa-plus"></i>
                            <span>Добавить карту</span>
                        </div>
                    </div>
                </div>
                
                <div class="section-header">
                    <h3>Управление картами</h3>
                </div>
                
                <div class="cards-management">
                    <button class="btn-secondary">
                        <i class="fas fa-sync"></i>
                        Синхронизировать
                    </button>
                    <button class="btn-secondary">
                        <i class="fas fa-ban"></i>
                        Заблокировать все
                    </button>
                    <button class="btn-secondary">
                        <i class="fas fa-file-export"></i>
                        Экспорт
                    </button>
                </div>
            </div>
        `;
    }

    generateBanks() {
        return `
            <div class="banks-page">
                <div class="page-header">
                    <h2>Банки-партнёры</h2>
                    <p class="page-subtitle">Статус подключенных банков</p>
                </div>
                
                <div class="banks-stats">
                    <div class="stat-card">
                        <div class="stat-label">Всего банков</div>
                        <div class="stat-value">${window.appData.banks.length}</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Онлайн</div>
                        <div class="stat-value">7</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Средняя задержка</div>
                        <div class="stat-value">180мс</div>
                    </div>
                </div>
                
                <div class="table-container">
                    <div class="table-header">
                        <div>Банк</div>
                        <div>Статус</div>
                        <div>Задержка</div>
                        <div>Действия</div>
                    </div>
                    
                    ${window.appData.banks.map(bank => `
                        <div class="table-row">
                            <div>
                                <div class="bank-icon">${bank.icon}</div>
                                <div class="bank-name">${bank.name}</div>
                            </div>
                            <div>
                                <span class="status-badge status-${bank.status.toLowerCase()}">
                                    ${this.getBankStatusIcon(bank.status)} ${bank.status}
                                </span>
                            </div>
                            <div>
                                <div class="bank-delay">${bank.delay}мс</div>
                                ${bank.delay > 250 ? '<div class="delay-warning">Высокая задержка</div>' : ''}
                            </div>
                            <div>
                                <button class="btn-icon" title="Переподключить">
                                    <i class="fas fa-redo"></i>
                                </button>
                                <button class="btn-icon" title="Статистика">
                                    <i class="fas fa-chart-line"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateAnalytics() {
        const { analytics } = window.appData;
        
        return `
            <div class="analytics-page">
                <div class="page-header">
                    <h2>Аналитика</h2>
                    <p class="page-subtitle">Детальная статистика и графики</p>
                </div>
                
                <div class="analytics-grid">
                    <div class="chart-container">
                        <h4>Доход по дням (тыс. ₽)</h4>
                        <div class="chart-line">
                            ${analytics.dailyIncome.map((value, i) => `
                                <div class="chart-bar" style="height: ${(value / 25000) * 100}%" 
                                     title="День ${i+1}: ${value}₽">
                                </div>
                            `).join('')}
                        </div>
                        <div class="chart-labels">
                            <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
                        </div>
                    </div>
                    
                    <div class="chart-container">
                        <h4>Количество транзакций</h4>
                        <div class="chart-line">
                            ${analytics.transactionsCount.map((value, i) => `
                                <div class="chart-bar" style="height: ${(value / 70) * 100}%; background: var(--accent-secondary)" 
                                     title="День ${i+1}: ${value} транзакций">
                                </div>
                            `).join('')}
                        </div>
                        <div class="chart-labels">
                            <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
                        </div>
                    </div>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">Всего транзакций</div>
                        <div class="stat-value">347</div>
                        <div class="stat-change positive">+24%</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-label">Средний чек</div>
                        <div class="stat-value">₽8,420</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-label">Конверсия</div>
                        <div class="stat-value">98.2%</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-label">Комиссия</div>
                        <div class="stat-value">₽121,400</div>
                    </div>
                </div>
                
                <div class="analytics-table">
                    <h4>Распределение по типам карт</h4>
                    <table>
                        <tr>
                            <td>Visa</td>
                            <td>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(analytics.cardTypes.Visa / 27) * 100}%"></div>
                                </div>
                            </td>
                            <td>${analytics.cardTypes.Visa}</td>
                        </tr>
                        <tr>
                            <td>Mastercard</td>
                            <td>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(analytics.cardTypes.Mastercard / 27) * 100}%"></div>
                                </div>
                            </td>
                            <td>${analytics.cardTypes.Mastercard}</td>
                        </tr>
                        <tr>
                            <td>Mir</td>
                            <td>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(analytics.cardTypes.Mir / 27) * 100}%"></div>
                                </div>
                            </td>
                            <td>${analytics.cardTypes.Mir}</td>
                        </tr>
                    </table>
                </div>
            </div>
        `;
    }

    generateProfile() {
        const { user } = window.appData;
        
        return `
            <div class="profile-page">
                <div class="page-header">
                    <h2>Профиль</h2>
                    <p class="page-subtitle">Ваши личные данные и статистика</p>
                </div>
                
                <div class="profile-card">
                    <div class="profile-header">
                        <div class="profile-avatar shimmer"></div>
                        <div class="profile-info">
                            <h3>${user.name}</h3>
                            <p class="profile-id">${user.userId}</p>
                            <div class="profile-status">
                                <span class="status-badge status-success">
                                    <i class="fas fa-check-circle"></i> Активен
                                </span>
                            </div>
                        </div>
                        <button class="btn-secondary">
                            <i class="fas fa-edit"></i> Редактировать
                        </button>
                    </div>
                    
                    <div class="profile-details">
                        <div class="detail-item">
                            <span class="detail-label">Дата подключения</span>
                            <span class="detail-value">${user.joinDate}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Общий доход</span>
                            <span class="detail-value">₽${this.formatNumber(user.totalIncome)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Telegram</span>
                            <span class="detail-value">${user.telegram}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Email</span>
                            <span class="detail-value">${user.email}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Телефон</span>
                            <span class="detail-value">${user.phone}</span>
                        </div>
                    </div>
                </div>
                
                <div class="profile-stats">
                    <div class="stat-card">
                        <div class="stat-label">Дней с нами</div>
                        <div class="stat-value">312</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Рейтинг</div>
                        <div class="stat-value">A+</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">Уровень</div>
                        <div class="stat-value">PRO</div>
                    </div>
                </div>
                
                <div class="security-section">
                    <h4>Безопасность</h4>
                    <div class="security-items">
                        <div class="security-item">
                            <i class="fas fa-shield-alt"></i>
                            <div>
                                <div class="security-title">2FA включена</div>
                                <div class="security-desc">Двухфакторная аутентификация</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="security-item">
                            <i class="fas fa-bell"></i>
                            <div>
                                <div class="security-title">Уведомления</div>
                                <div class="security-desc">Push, Email, Telegram</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    generateSettings() {
        const { settings } = window.appData;
        
        return `
            <div class="settings-page">
                <div class="page-header">
                    <h2>Настройки</h2>
                    <p class="page-subtitle">Настройте платформу под себя</p>
                </div>
                
                <div class="settings-section">
                    <h4>Основные</h4>
                    <div class="settings-items">
                        <div class="setting-item">
                            <div>
                                <div class="setting-title">Тёмная тема</div>
                                <div class="setting-desc">Включить тёмный интерфейс</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" ${settings.darkMode ? 'checked' : ''} onchange="app.toggleTheme()">
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="setting-item">
                            <div>
                                <div class="setting-title">Анимации</div>
                                <div class="setting-desc">Плавные переходы и эффекты</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" ${settings.animations ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="setting-item">
                            <div>
                                <div class="setting-title">Автовывод</div>
                                <div class="setting-desc">Автоматический вывод средств</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" ${settings.autoWithdraw ? 'checked' : ''}>
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h4>Уведомления</h4>
                    <div class="settings-items">
                        <div class="setting-item">
                            <div>
                                <div class="setting-title">Email уведомления</div>
                                <div class="setting-desc">Отправлять на почту</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="setting-item">
                            <div>
                                <div class="setting-title">Telegram уведомления</div>
                                <div class="setting-desc">Отправлять в Telegram</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider"></span>
                            </label>
                        </div>
                        
                        <div class="setting-item">
                            <div>
                                <div class="setting-title">SMS уведомления</div>
                                <div class="setting-desc">Отправлять SMS</div>
                            </div>
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="settings-section">
                    <h4>О приложении</h4>
                    <div class="about-card">
                        <div class="app-logo">PX</div>
                        <div class="app-info">
                            <div class="app-name">ProcessingX Pro</div>
                            <div class="app-version">Версия 2.4.1</div>
                            <div class="app-copyright">© 2024 ProcessingX. Все права защищены.</div>
                        </div>
                    </div>
                    
                    <div class="about-links">
                        <a href="#" class="about-link">
                            <i class="fas fa-question-circle"></i>
                            Помощь и поддержка
                        </a>
                        <a href="#" class="about-link">
                            <i class="fas fa-file-contract"></i>
                            Пользовательское соглашение
                        </a>
                        <a href="#" class="about-link">
                            <i class="fas fa-shield-alt"></i>
                            Политика конфиденциальности
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // Вспомогательные методы
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    maskAccount(account) {
        return `•••• ${account.slice(-4)}`;
    }

    maskCardNumber(number) {
        return number.replace(/\d{4}(?= \d{4})/g, '••••');
    }

    getStatusIcon(status) {
        const icons = {
            'success': '✓',
            'pending': '⏳',
            'error': '✗'
        };
        return icons[status] || '○';
    }

    getStatusText(status) {
        const texts = {
            'success': 'Успешно',
            'pending': 'В обработке',
            'error': 'Ошибка'
        };
        return texts[status] || status;
    }

    getBankStatusIcon(status) {
        const icons = {
            'Online': '✓',
            'Delay': '⚠',
            'Offline': '✗'
        };
        return icons[status] || '○';
    }

    generateRecentTransactions() {
        return window.appData.transactions.slice(0, 5).map(tx => `
            <div class="table-row">
                <div><strong>${tx.id}</strong></div>
                <div>${this.maskAccount(tx.account)}</div>
                <div><strong>${tx.rub ? `₽${this.formatNumber(tx.rub)}` : '-'}</strong></div>
                <div>${tx.usd ? `$${this.formatNumber(tx.usd)}` : '-'}</div>
                <div>${tx.bank}</div>
                <div>
                    <span class="status-badge status-${tx.status}">
                        ${this.getStatusText(tx.status)}
                    </span>
                </div>
                <div>${tx.date}</div>
            </div>
        `).join('');
    }

    // Модальные окна
    showCreatePaymentModal() {
        const modal = document.getElementById('modalOverlay');
        const modalBody = document.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <form id="paymentForm">
                <div class="form-group">
                    <label class="form-label">Сумма (₽)</label>
                    <input type="number" class="form-input" placeholder="10000" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Описание</label>
                    <input type="text" class="form-input" placeholder="Оплата услуг" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Карта списания</label>
                    <select class="form-input">
                        ${window.appData.cards.map(card => 
                            `<option>${card.type} •••• ${card.number.slice(-4)} (${card.bank})</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Банк получателя</label>
                    <select class="form-input">
                        ${window.appData.banks.map(bank => 
                            `<option>${bank.name}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <button type="submit" class="btn-primary" style="width: 100%; margin-top: 20px;">
                    <i class="fas fa-paper-plane"></i>
                    Создать платёж
                </button>
            </form>
        `;
        
        modal.style.display = 'flex';
        
        // Обработка формы
        document.getElementById('paymentForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Платёж успешно создан!');
            this.hideModal();
        });
    }

    showAddCardModal() {
        const modal = document.getElementById('modalOverlay');
        const modalBody = document.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <form id="cardForm">
                <div class="form-group">
                    <label class="form-label">Номер карты</label>
                    <input type="text" class="form-input" placeholder="4242 4242 4242 4242" required>
                </div>
                
                <div class="form-row">
                    <div class="form-group" style="flex: 1;">
                        <label class="form-label">Срок действия</label>
                        <input type="text" class="form-input" placeholder="MM/YY" required>
                    </div>
                    
                    <div class="form-group" style="flex: 1;">
                        <label class="form-label">CVC</label>
                        <input type="text" class="form-input" placeholder="123" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Имя владельца</label>
                    <input type="text" class="form-input" placeholder="ARSLAN KARIMOV" required>
                </div>
                
                <button type="submit" class="btn-primary" style="width: 100%; margin-top: 20px;">
                    <i class="fas fa-credit-card"></i>
                    Добавить карту
                </button>
            </form>
        `;
        
        modal.style.display = 'flex';
        
        document.getElementById('cardForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Карта успешно добавлена!');
            this.hideModal();
        });
    }

    hideModal() {
        document.getElementById('modalOverlay').style.display = 'none';
    }

    // Тема
    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-theme');
        
        if (isDark) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        }
    }

    // Поиск
    handleSearch(query) {
        console.log('Searching for:', query);
        // В реальном приложении здесь бы была фильтрация данных
    }

    // Инициализация анимаций
    initAnimations() {
        // Анимация цифр на главной
        this.animateNumbers();
        
        // Параллакс эффект
        window.addEventListener('scroll', this.handleParallax.bind(this));
        
        // Эффект наведения для карточек
        this.initHoverEffects();
    }

    animateNumbers() {
        const numbers = document.querySelectorAll('.stat-value');
        numbers.forEach(number => {
            const original = number.textContent;
            number.textContent = '0';
            
            let current = 0;
            const target = parseInt(original.replace(/[^0-9]/g, ''));
            const increment = target / 30;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    number.textContent = original;
                    clearInterval(timer);
                } else {
                    number.textContent = Math.floor(current).toLocaleString();
                }
            }, 50);
        });
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelectorAll('.stat-card');
        
        parallax.forEach(card => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            card.style.transform = `translateY(${yPos}px)`;
        });
    }

    initHoverEffects() {
        const cards = document.querySelectorAll('.stat-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initPageSpecificFeatures(page) {
        // Инициализация специфичных для страницы функций
        switch(page) {
            case 'cards':
                this.initCardFlip();
                break;
            case 'analytics':
                this.initCharts();
                break;
        }
    }

    initCardFlip() {
        // Флип карт уже реализован через CSS
        console.log('Card flip initialized');
    }

    initCharts() {
        // В реальном приложении здесь была бы инициализация библиотеки графиков
        console.log('Charts initialized');
    }
}

// Инициализация приложения при загрузке
window.addEventListener('DOMContentLoaded', () => {
    window.app = new ProcessingXApp();
});
