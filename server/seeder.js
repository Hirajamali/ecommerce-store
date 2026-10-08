/* global process */
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });

const sampleProducts = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b',
    description: 'Bluetooth technology lets you connect it with compatible devices wirelessly',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
  },
  {
    name: 'iPhone 13 Pro 256GB Memory',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
  }
];

const importData = async () => {
  try {
    // Wait for Database Connection
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(sampleProducts);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();