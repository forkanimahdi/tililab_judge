<?php

use App\Http\Controllers\CondidatController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $jurers = User::where('role', 'jurer')->paginate(5);
        return Inertia::render('dashboard', [
            'jurers' => $jurers
        ]);
    })->name('dashboard');
    Route::post('/jurer/store', [UserController::class, 'store'])->name('jurers.store');
    Route::post('/condidat/store', [CondidatController::class, 'store'])->name('condidat.store');
    // Route::post('', [CondidatController::class, 'store'])->name('condidat.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
