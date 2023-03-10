<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Models\Invoice;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Models\Sale;

class SaleController extends Controller
{
    public function saveSalesRecord($invoice_code)
    {
        $invoice = Invoice::where('invoice_code', $invoice_code)->first();
        if (!$invoice) {
            return response()->json(['message' => 'No se encontró una factura disponible'], 404);
        }
        $order = Order::where('order_code', $invoice->order_code)->first();
        if (!$order) {
            return response()->json(['message' => 'La orden correspondiente no existe'], 404);
        }
        $productData = Product::findOrFail($order->product_id);
        $customer = User::where('id', $order->customer_id)->first();
        $sale = new Sale;
        $sale->sale_code = 'SL-' . Str::random(32);
        $sale->invoice_code = $invoice->invoice_code;
        $sale->total_price = $order->total_purchase;
        $sale->customer = $customer;
        $sale->product = $productData;
        $sale->quantity = $order->quantity_products;
        $sale->save();

        return response()->json(compact('sale'),201);
    }

    public function findSale($sale_code)
    {
        $sale = Sale::where('sale_code', $sale_code)->first();
        if (!$sale) {
            return response()->json(['message' => 'El codigo de venta no existe'], 404);
        }
        return response()->json(compact('sale'),200);
    }
}

