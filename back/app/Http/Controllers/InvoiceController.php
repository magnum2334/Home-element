<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Models\Payment;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;

class InvoiceController extends Controller
{
    public function generateInvoice($orderCode)
    {
        $payment = Payment::where('order_code', $orderCode)->first();
        $order =  Order::where('order_code', $orderCode)->first();

        if (!$payment) {
            throw new Exception('No se encontró un pago para la orden especificada');
        }

        $invoiceCode = 'INV-' . Str::random(32);
        $invoice = new Invoice;
        $invoice->order_code = $orderCode;
        $invoice->invoice_code = $invoiceCode;
        $invoice->save();

        $user = User::where('id', $order->customer_id)->first();
        $user->number_purchases += 1;
        $user->save();

        return response()->json([
            'message' => 'Invoice saved successfully',
            'invoice' => $invoice
        ],201);
    }

    public function findInvoice($invoice_code)
    {
        $invoice = Invoice::where('invoice_code', $invoice_code)->first();
        if (!$invoice) {
            return response()->json(['message' => 'El invoice no existe'], 404);
        }
        $order = Order::where('order_code', $invoice->order_code)->first();
        if (!$order) {
            return response()->json(['message' => 'La orden correspondiente no existe'], 404);
        }

        $productData = Product::findOrFail($order->product_id);

        $product = $order->product;
        $quantity = $order->quantity_products;
        $total_price = $order->total_purchase;
        return response()->json([
            'invoice_code' => $invoice->invoice_code,
            'total_price' => $total_price,
            'product' => $productData,
            'quantity' => $quantity
        ],200);
    }

}
