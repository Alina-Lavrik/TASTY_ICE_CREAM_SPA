import { useEffect, useState } from 'react';
import { loadPurchases, PLAN_PER_PRODUCT, savePurchases } from '../utils/purchases';
import { buildStats } from '../utils/periods';

// Компонент статистики (полная страница)
const StatsPage = () => {

    const [period, setPeriod] = useState('daily');
    const [purchases, setPurchases] = useState(loadPurchases());

    useEffect(() => {
        const handleStorage = () => setPurchases(loadPurchases());
        window.addEventListener('storage', handleStorage);
        const interval = setInterval(() => setPurchases(loadPurchases()), 1500);
        return () => {
            window.removeEventListener('storage', handleStorage);
            clearInterval(interval);
        };
    }, []);

    const resetStats = () => {
        if (window.confirm('Вы уверены, что хотите сбросить всю статистику?')) {
            savePurchases([]);
            setPurchases([]);
        }
    };

    const stats = buildStats(purchases, period);
    const periods = Object.keys(stats).sort((a, b) => b.localeCompare(a));

    const periodLabels = {
        daily: 'День',
        weekly: 'Неделя',
        monthly: 'Месяц',
        yearly: 'Год'
    };
    
    // Общий итог по всем периодам

    const grandTotalQty = periods.reduce((sum, key) => sum + stats[key].totalQty, 0);
    const grandTotalSum = periods.reduce((sum, key) => sum + stats[key].totalSum, 0);
    
    return (
        <div className="stats-section">
            <h2>Аналитика продаж</h2>
                <div className="stats-tabs">
                    {['daily', 'weekly', 'monthly', 'yearly'].map(item => (
                        <button key={item}
                            className={period === item ? 'active' : ''}
                            onClick={() => setPeriod(item)}>
                            {periodLabels[item]}
                        </button>
                    ))}
                </div>
                {periods.length === 0 ? (
                    <div className="empty-message">Нет данных о покупках. Оформите заказ, нажав кнопку «Купить» в корзине.</div>
                ) : (
                    <div>
                        {periods.map(periodKey => {
                            const periodData = stats[periodKey];
                            const items = Object.values(periodData.items);
                            
                            return (
                                <div key={periodKey} className='period-elem'>
                                    <h3 className='period-elem-name'>
                                        {periodKey}
                                    </h3>
                                    <div className="stats-table-wrap">
                                        <table className="stats-table">
                                            <thead>
                                                <tr>
                                                    <th>Товар</th>
                                                    <th>Продано, шт</th>
                                                    <th>Сумма, руб</th>
                                                    <th>План ({PLAN_PER_PRODUCT} шт)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map(item => {
                                                    const planDone = item.quantity >= PLAN_PER_PRODUCT;
                                                    return (
                                                        <tr key={item.productId}>
                                                            <td>
                                                                <div className="product-cell">
                                                                    <img src={item.image} alt={item.name} className="stats-image" />
                                                                   
                                                                    <span className="stats-name">{item.name}</span> 
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="qty-badge">{item.quantity} шт</span>
                                                            </td>
                                                            <td>{item.sum} ₽</td>
                                                            <td>
                                                                <span className={`plan-badge ${planDone ? 'plan-done' : 'plan-fail'}`}>
                                                                    {planDone ? '✓ Выполнено' : `✗ Не выполнено ${item.quantity}/${PLAN_PER_PRODUCT}`}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td><strong>Итого за период</strong></td>
                                                    <td><strong>{periodData.totalQty} шт</strong></td>
                                                    <td><strong className="stat-total">{periodData.totalSum} ₽</strong></td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}
                            <div className="total-result">
                                <span><strong>Общий итог:</strong></span>
                                <span><strong>Продано:</strong> {grandTotalQty} шт</span>
                                <span><strong>Сумма:</strong> <span className="stat-total">{grandTotalSum} ₽</span></span>
                            </div>
                    </div>
                )}
                <button className="reset-stats" onClick={resetStats}>Сбросить статистику</button>
            </div>
        );
    };


export default StatsPage;