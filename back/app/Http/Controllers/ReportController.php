<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function analyzeMonth($month)
    {
        $sales = DB::table('sales')
            ->whereMonth('created_at', $month)
            ->get();

        $users = DB::table('users')->get();
        $products = DB::table('products')->get();

        $userSales = [];
        $productSales = [];

        foreach ($sales as $sale) {
            $user = $users->firstWhere('id', $sale->user_id);
            $product = $products->firstWhere('id', $sale->product_id);

            if (isset($userSales[$user->name])) {
                $userSales[$user->name] += $sale->quantity;
            } else {
                $userSales[$user->name] = $sale->quantity;
            }

            if (isset($productSales[$product->name])) {
                $productSales[$product->name] += $sale->quantity;
            } else {
                $productSales[$product->name] = $sale->quantity;
            }
        }

        arsort($userSales);
        arsort($productSales);

        $topUsers = array_slice($userSales, 0, 5, true);
        $topProducts = array_slice($productSales, 0, 5, true);

        $userReportData = [];
        $productReportData = [];

        foreach ($topUsers as $userName => $quantity) {
            $userReportData[] = [
                'classification' => count($userReportData) + 1,
                'client' => $userName,
                'product' => '-',
                'total' => $quantity,
            ];
        }

        foreach ($topProducts as $productName => $quantity) {
            $productReportData[] = [
                'classification' => count($productReportData) + 1,
                'client' => '-',
                'product' => $productName,
                'total' => $quantity,
            ];
        }

        foreach ($userReportData as $reportData) {
            DB::table('reports')->insert([
                'classification' => $reportData['classification'],
                'client' => $reportData['client'],
                'product' => $reportData['product'],
                'total' => $reportData['total'],
            ]);
        }

        foreach ($productReportData as $reportData) {
            DB::table('reports')->insert([
                'classification' => $reportData['classification'],
                'client' => $reportData['client'],
                'product' => $reportData['product'],
                'total' => $reportData['total'],
            ]);
        }

        return response()->json([
            'message' => 'Los reportes han sido creados',
        ]);
    }
}


