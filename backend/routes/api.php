<?php

use App\Http\Controllers\api\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'crud/v1'], function () {

    Route::get('employee', [EmployeeController::class, 'index']);
    Route::post('employee/store', [EmployeeController::class, 'store']);
    Route::get('employee/edit/{id}', [EmployeeController::class, 'edit']);
    Route::put('employee/update/{id}', [EmployeeController::class, 'update']);
    Route::delete('employee/destroy/{id}', [EmployeeController::class, 'destroy']);

});