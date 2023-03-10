<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Payment;


class PaymentController extends Controller
{

    public function payOrder(Request $request, $order_code)
    {
        $order = Order::where('order_code', $order_code)->first();
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
        $payment = new Payment;
        $payment->total_payable = (float) $order->total_purchase;
        $payment->order_code = $request->order_code;
        $payment->save();

        return response()->json([
            'message' => 'Order paid successfully',
            'payment' => $payment
        ], 201);
    }

    public function findPayment($id)
    {
        $payment = Payment::find($id);
        if (!$payment) {
            return response()->json([ 'message' => 'Payment not found'], 404);
        }
        return response()->json(compact('payment'),200);
    }
}
