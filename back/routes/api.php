<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SaleController;


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('me', 'me');
});

Route::controller(ProductController::class)->group(function () {
    Route::get('products', 'index');
    Route::get('products/{code}', 'findByCode');
});

Route::controller(OrderController::class)->group(function () {
    Route::post('create/order/{customerId}/{productCode}', 'addProduct')->middleware('jwt.auth');
    Route::get('order/{id}', 'findOrder')->middleware('jwt.auth');
});

Route::controller(PaymentController::class)->group(function () {
    Route::post('create/payment/{order_code}', 'payOrder')->middleware('jwt.auth');
    Route::get('payment/{id}', 'findPayment')->middleware('jwt.auth');
});

Route::controller(InvoiceController::class)->group(function () {
    Route::post('create/invoice/{order_code}', 'generateInvoice')->middleware('jwt.auth');
    Route::get('invoice/{invoice_code}', 'findInvoice')->middleware('jwt.auth');
});

Route::controller(SaleController::class)->group(function () {
    Route::post('create/sale/{invoice_code}', 'saveSalesRecord')->middleware('jwt.auth');
    Route::get('sale/{sale_code}', 'findSale')->middleware('jwt.auth');
});

Route::controller(ReportController::class)->group(function () {
    Route::post('create/report/{month}', 'analyzeMonth')->middleware('jwt.auth');
    Route::get('report/{user_id}/{id}', 'findReportForUser')->middleware('jwt.auth');
    Route::get('reports', 'allReports')->middleware('jwt.auth');
});

