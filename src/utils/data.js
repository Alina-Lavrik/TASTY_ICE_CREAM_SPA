import vanilla from '../images/vanilla.png'
import chocolate from '../images/chocolate.png'
import strawberry from '../images/strawberry.png'
import pistachio from '../images/pistachio.png'
import caramel from '../images/caramel.png'
import cherry from '../images/cherry.png'
import donut_berry from '../images/donut_berry.png'
import donut_strawberry from '../images/donut_strawberry.png'
import donut_lemon from '../images/donut_lemon.png'
import mix from '../images/mix.png'

export const initialProducts = [
        { 
            id: 'p1', 
            name: 'Ванильный пломбир', 
            description: 'Классический, 15% жирности', 
            price: 120, 
            amountToBuy: 1,
            image: vanilla,
        },
        { 
            id: 'p2', 
            name: 'Шоколадный брауни', 
            description: 'С кусочками брауни', 
            price: 150, 
            amountToBuy: 1,
            image: chocolate,
        },
        { 
            id: 'p3', 
            name: 'Клубничный сорбет', 
            description: 'Освежающий, без лактозы', 
            price: 135, 
            amountToBuy: 1,
            image: strawberry,
        },
        { 
            id: 'p4', 
            name: 'Фисташковый крем', 
            description: 'С итальянскими фисташками', 
            price: 170, 
            amountToBuy: 1,
            image: pistachio,
        },
        { 
            id: 'p5', 
            name: 'Карамельный попкорн', 
            description: 'Солёная карамель', 
            price: 160, 
            amountToBuy: 1,
            image: caramel,
        },
         { 
            id: 'p6', 
            name: 'Спелая вишня', 
            description: 'Сливочное с кусочками вишни', 
            price: 160, 
            amountToBuy: 1,
            image: cherry,
        },
        { 
            id: 'p7', 
            name: 'Донат черника', 
            description: 'Со вкусом черники и малиновой крошкой', 
            price: 190, 
            amountToBuy: 1,
            image: donut_berry,
        },
        { 
            id: 'p8', 
            name: 'Донат клубника', 
            description: 'Со вкусом клубники и маршмеллоу', 
            price: 190, 
            amountToBuy: 1,
            image: donut_strawberry,
        },
         { 
            id: 'p9', 
            name: 'Донат ваниль', 
            description: 'С ванильным вкусом и лимонной крошкой', 
            price: 180, 
            amountToBuy: 1,
            image: donut_lemon,
    },
         { 
            id: 'p10', 
            name: 'Ассорти', 
            description: 'Разнообразие вкусов в одном рожке', 
            price: 190, 
            amountToBuy: 1,
            image: mix,
        },
];
    
