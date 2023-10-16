import React, { useState, useEffect } from "react";
import Range from "./Calculator/Range";

const Calculator = () => {
    // Налаштування діапазону Amount
    const amountRange = {
        min: 500, // Мінімальне
        max: 10000, // Максимальне
        step: 500, // Крок
    };

    // Налаштування діапазону Days
    const daysRange = {
        min: 3, // Мінімальне
        max: 14, // Максимальне
        step: 1, // Крок
    };

    // Оборот клієнта
    const turnover = 35000;

    // Ліміт
    const limit = 45000;

    // Кількість днів до кінця періоду
    const daysLeft = 10;

    // Вибрана сума, що відображається на калькуляторі
    const [amount, setAmount] = useState(3000);

    // Вибраний термін, що відображається на калькуляторі
    const [days, setDays] = useState(5);

    // Максимальна сума, яку можна вибрати на калькуляторі
    const [maxAmount, setMaxAmount] = useState(10000);

    // Признак досягнення ліміту (для візуалізації)
    const [limitDetected, setLimitDetected] = useState(false);

    // Обробка вхідного значення Amount
    const handleAmount = (value) => {
        // Якщо вхідне значення більше максимального
        if (value > maxAmount) {
            // То присвоюємо йому максимальне значення
            // Таким чином ми не даємо можливості вибрати більше значення.
            value = maxAmount;

            // Ставим признак досягнення ліміту
            setLimitDetected(true);
        } else {
            // Знімаєм признак досягнення ліміту
            setLimitDetected(false);
        }

        // Оновлення стейту
        setAmount(value);
    };

    // Калькуляція максимальної суми при зміні days або amount
    useEffect(() => {
        // Відсотки
        let percents = 0;

        // Перебор днів від поточного до кінця періоду
        for (let day = 0; day < daysLeft; day++) {
            // Стандартний відсоток
            let percent = 3.5;

            // Якщо день менший ніж вибрано на калькуляторі (саме менше, бо ми починаємо з 0 а не з 1)
            if (day < days) {
                // Пільговий відсоток
                percent = 2.5;
            }

            // Сумуюємо загальну кількість відсотків
            percents += (amount * percent) / 100;
        }

        // Прогноз обороту = оборот + тіло + відсотки
        let prediction = turnover + amount + percents;

        // Прогноз обороту більший ніж ліміт
        if (prediction > limit) {
            // Максимальна сума = ліміт - оборот - відсотки
            let maxAmount = limit - turnover - percents;

            // Робим максимальну суму кратну кроку для Amount
            // Накриклад: Math.floor(4700 / 500) * 500 = 4500;
            // 1) 4700 / 500 => 9.4;
            // 2) Math.floor(9.4) => 9;
            // 3) 9 * 500 => 4500;
            maxAmount =
                Math.floor(maxAmount / amountRange.step) * amountRange.step;

            // Оновлення стейту
            setMaxAmount(maxAmount);
        }
    }, [days, amount]);

    return (
        <div className="flex flex-col gap-4">
            <Range
                min={amountRange.min}
                max={amountRange.max}
                step={amountRange.step}
                value={amount}
                // Тут перед тим як змінити стейт amount ми проганяєм значення через функцію
                onChange={(e) => handleAmount(e.target.value)}
            >
                Amount
            </Range>
            <Range
                min={daysRange.min}
                max={daysRange.max}
                step={daysRange.step}
                value={days}
                // Тут ми просто змінюємо стейт
                onChange={(e) => setDays(e.target.value)}
            >
                Days
            </Range>
            {limitDetected && (
                <div className="text-red-500 p-5 text-center">Ліміт</div>
            )}
        </div>
    );
};

export default Calculator;
