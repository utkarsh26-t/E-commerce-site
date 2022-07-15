const mongoose = require('mongoose');
const Product = require('./models/product');


const products = [
    {
        name : 'Iphone 13',
        img : 'https://images.unsplash.com/photo-1603791239531-1dda55e194a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBpcGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        price : 69000,
        desc : "The most advanced dual-camera system ever on iPhone. Lightning-fast A15 Bionic chip. A big leap in battery life. Durable design. And a brighter Super Retina XDR display."
    },
    {
        name : 'Nike Shoes',
        img : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        price : 4400,
        desc : "Nike shoes are a popular brand of trendy shoes that offer a relaxed feel with style. The recognised brand is known for its variety of footwear options"
    },
    {
        name : 'Macbook Air M1',
        img : 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price : 92900,
        desc : "The Apple M1 chip is the first system on a chip (SoC) for Mac. Packed with an astonishing 16 billion transistors, it integrates the CPU, GPU, I/O, and every other significant component and controller onto a single tiny chip. Designed by Apple, M1 brings incredible performance, custom technologies, and unparalleled power efficiency to the Mac."
    },
    {
        name : 'Titan Watch',
        img : 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdhdGNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price : 6999,
        desc : "Titan is the largest and most trusted watch brand in India. Buy 100% genuine watches for Men and Women. Also get latest couple watches & kids watches."
    },
    {
        name : 'Drones',
        img : 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJvbmVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price : 49999,
        desc : "An unmanned aerial vehicle (UAV), commonly known as a drone, is an aircraft without any human pilot, crew, or passengers on board. UAVs are a component of ..."
    },
    {
        name : 'Bicycle',
        img : 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmljeWNsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        price : 23999,
        desc : "A bicycle, also called a pedal cycle, bike or cycle, is a human-powered or motor-powered assisted, pedal-driven, single-track vehicle, having two wheels attached to a frame, one behind the other. A bicycle rider is called a cyclist, or bicyclist."
    }
];


async function seedDB(){
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Product Seeded");
}

module.exports = seedDB;
