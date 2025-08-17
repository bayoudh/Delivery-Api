import mongoose from "mongoose";
import { Product } from "../model/Product";
import { Order } from "../model/Order";
import { OrderItem } from "../model/OrderItem";
import { asyncHandler } from "../utils/asyncHandler";
export const createOrder = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { customer_id, restaurant_id, payment_method, delivery_street, delivery_city, delivery_zipcode, items } = req.body;
        // items: [{ product_id, quantity }]
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items are required" });
        }
        // compute prices
        const productDocs = await Product.find({ _id: { $in: items.map((i) => i.product_id) } }).session(session);
        const priceMap = new Map(productDocs.map((p) => [p._id.toString(), p.price]));
        const orderItems = items.map((i) => ({
            product_id: i.product_id,
            quantity: i.quantity,
            price: priceMap.get(i.product_id) || 0,
        }));
        const total_price = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const order = await Order.create([
            { customer_id, restaurant_id, total_price, payment_method, delivery_street, delivery_city, delivery_zipcode }
        ], { session });
        await OrderItem.insertMany(orderItems.map((i) => ({ ...i, order_id: order[0]._id })), { session });
        await session.commitTransaction();
        res.status(201).json({ order_id: order[0]._id, total_price });
    }
    catch (e) {
        await session.abortTransaction();
        throw e;
    }
    finally {
        session.endSession();
    }
});
export const listOrders = asyncHandler(async (req, res) => {
    const { customer_id, restaurant_id, status } = req.query;
    const filter = {};
    if (customer_id)
        filter.customer_id = customer_id;
    if (restaurant_id)
        filter.restaurant_id = restaurant_id;
    if (status)
        filter.status = status;
    const orders = await Order.find(filter).sort({ created_at: -1 });
    res.json(orders);
});
export const getOrder = asyncHandler(async (req, res) => {
    const [order, items] = await Promise.all([
        Order.findById(req.params.id),
        OrderItem.find({ order_id: req.params.id }).populate("product_id")
    ]);
    if (!order)
        return res.status(404).json({ message: "Order not found" });
    res.json({ order, items });
});
export const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status, driver_id } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status, driver_id }, { new: true });
    if (!order)
        return res.status(404).json({ message: "Order not found" });
    res.json(order);
});
export const deleteOrder = asyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        await OrderItem.deleteMany({ order_id: req.params.id }).session(session);
        const order = await Order.findByIdAndDelete(req.params.id).session(session);
        await session.commitTransaction();
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted" });
    }
    catch (e) {
        await session.abortTransaction();
        throw e;
    }
    finally {
        session.endSession();
    }
});
