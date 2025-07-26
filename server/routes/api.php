<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [\App\Http\Controllers\LogovanjeController::class, 'logovanje']);
Route::post('/register', [\App\Http\Controllers\LogovanjeController::class, 'registracija']);
Route::post('/logout', [\App\Http\Controllers\LogovanjeController::class, 'logout']);

Route::get('/putovanja', [\App\Http\Controllers\PutovanjeController::class,'index']);
Route::get('/aranzmani', [\App\Http\Controllers\AranzmaniController::class,'vratiAktivneAranzmane']);

Route::get('/aranzmani/{putovanjeId}', [\App\Http\Controllers\AranzmaniController::class,'vratiAranzmanePoPutovanju']);
Route::get('/plan-aranzmana/{aranzmanId}', [\App\Http\Controllers\PlanAranzmanaController::class,'vratiPlanoveZaAranzman']);

Route::resource('putnici', \App\Http\Controllers\PutnikController::class)->only([
    'index', 'show'
]);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('/aranzmani', [\App\Http\Controllers\AranzmaniController::class,'noviAranzman']);
    Route::delete('/aranzmani/{id}', [\App\Http\Controllers\AranzmaniController::class,'obrisiAranzman']);
    Route::post('/putovanja', [\App\Http\Controllers\PutovanjeController::class,'unesiPutovanje']);
    Route::delete('/putovanja/{id}', [\App\Http\Controllers\PutovanjeController::class,'obrisiPutovanje']);

    Route::resource('putnici', \App\Http\Controllers\PutnikController::class)->only([
        'store', 'update', 'destroy'
    ]);

    Route::get('/grupisano', [\App\Http\Controllers\PutnikController::class,'grupisanoBrojPutnikaPoAranzmanu']);
    Route::get('/aranzmani/{aranzmanId}/putnici', [\App\Http\Controllers\PutnikController::class,'putniciPoAranzmanu']);
    // Uplate
    Route::get('/uplate', [\App\Http\Controllers\UplateController::class, 'uplate']);
    Route::get('/paginacija', [\App\Http\Controllers\UplateController::class, 'paginacija']);
    Route::get('/aranzmani/{aranzmanId}/uplate', [\App\Http\Controllers\UplateController::class, 'uplatePoAranzmanu']);
    Route::post('/uplate', [\App\Http\Controllers\UplateController::class, 'novaUplata']);
    Route::get('/users/{userId}/uplate', [\App\Http\Controllers\UplateController::class, 'uplateZaKorisnika']);
});
