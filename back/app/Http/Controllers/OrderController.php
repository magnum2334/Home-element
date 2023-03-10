<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
    public function addProduct(Request $request, $customerId, $productCode)
    {
        $quantity = (int) $request->quantity_products;
        $product = Product::where('code', $productCode)->first();
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $order = Order::where('customer_id', $customerId)->where('status', 'pending')->first();
        if (!$order) {
            $order = new Order;
            $order->order_code = 'ORD-' . Str::random(32);
            $order->status = 'accepted';
            $order->product_id = $product->id;
            $order->customer_id = (int) $customerId;
            $order->quantity_products = $quantity;
            $order->total_purchase = $product->price * $quantity;
            $order->save();
        }

        return response()->json([
            'message' => 'Product added to order',
            'product code add' => (int) $productCode,
            'order' => $order
        ], 201);
    }

    public function findOrder($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json([ 'message' => 'Order not found'], 404);
        }
        return response()->json(compact('order'),200);
    }
}
